import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import AuthService from "./auth.service";
import {
    sendResponse,
    createAccessToken,
    createRefreshToken,
    createUserResponse,
    createPassword,
} from "admin/helpers";
import { RESPONSE_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from "admin/constants";

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const ip = req.socket.localAddress;
            const user = await AuthService.getUserByEmail(email);

            if (isEmpty(user)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.USER_NOT_EXISTS
                        )
                    );
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.INVALID_LOGIN_REQUEST
                        )
                    );
            }

            const accessToken = createAccessToken({
                id: user.id,
                email: user.email,
                type: user.type
            });

            const refreshToken = createRefreshToken({
                email: user.email,
                type: user.type
            });

            await AuthService.updateRefreshToken({
                user_id: user.id,
                refresh_token: refreshToken,
                last_login_at: new Date(),
                last_login_ip: ip,
            });

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.LOGGED_IN, {
                    user: createUserResponse(user),
                    accessToken,
                    refreshToken,
                })
            );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", 0);
            const full_name = get(req?.body, "full_name", "");
            const contact_number = get(req?.body, "contact_number", "");
            const phone_code = get(req?.body, "phone_code", 0);
            const address = get(req?.body, "address", "");

            const user = await AuthService.editProfile({
                user_id,
                full_name,
                contact_number,
                phone_code,
                address,
            });

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.PROFILE_UPDATED,
                    {
                        user: createUserResponse(user),
                    }
                )
            );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user_id = get(req, "user_id", 0);
            const old_password = get(req?.body, "old_password", "");
            const new_password = get(req?.body, "new_password", "");

            const user = await AuthService.getUserPassword(user_id);
            const validPassword = await bcrypt.compare(
                old_password,
                user.password
            );
            if (!validPassword) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.INVALID_OLD_PASSWORD
                        )
                    );
            }

            const hashedPassword = await createPassword(new_password);
            await AuthService.changePassword({
                user_id,
                password: hashedPassword,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.PASSWORD_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
