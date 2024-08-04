import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import UserService from "./user.service";
import AuthService from "../auth/auth.service";
import { sendResponse, createPassword } from "admin/helpers";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "admin/constants";

export default class UserController {
    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const users = await UserService.getUsers({
                offset: parseInt(skip),
                limit: parseInt(size),
                search,
                sorting
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.USERS_FETCHED,
                        users
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const existingUser = await UserService.getUserById(id as number);

            if (isEmpty(existingUser)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.USER_NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.USER_FETCHED,
                        existingUser
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            let value = req.body;
            delete value?.profile_photo_data;

            const existingUser = await AuthService.getUserByEmail(value.email);

            if (!isEmpty(existingUser)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.USER_EXISTS
                        )
                    );
            }

            const hashedPassword = await createPassword(value.password);

            const userData = await UserService.addUser(
                {
                    email: value.email,
                    password: hashedPassword,
                    full_name: value.full_name,
                    contact_number: value.contact_number,
                    phone_code: value.phone_code,
                    address: value.address,
                    active: value.active,
                }
            );

            await UserService.assignPermission(
                {
                    user_id: userData.id,
                    permission_id: value.permission_id,
                    view: value.view,
                    add: value.add,
                    edit: value.edit,
                    delete: value.delete,
                }
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.USER_CREATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editUser(req: Request, res: Response, next: NextFunction) {
        try {
            let value = req.body;
            const { id } = req.params;

            await UserService.editUser(
                id,
                {
                    email: value.email,
                    full_name: value.full_name,
                    contact_number: value.contact_number,
                    phone_code: value.phone_code,
                    address: value.address,
                    active: value.active,
                }
            );

            await UserService.updatePermission(
                {
                    user_id: id,
                    permission_id: value.permission_id,
                    view: value.view,
                    add: value.add,
                    edit: value.edit,
                    delete: value.delete,
                }
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.USER_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.params, "id", "");
            const existingUser = await UserService.getUsersById(ids);

            if (isEmpty(existingUser)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.USER_NOT_EXISTS
                        )
                    );
            }

            await UserService.deleteUser(ids);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.USER_DELETED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
