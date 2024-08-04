import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import PermissionsService from "./permissions.service";
import { sendResponse } from "admin/helpers";
import { RESPONSE_TYPE, ERROR_MESSAGE } from "admin/constants";

export default class PermissionsController {
    static async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const data = await PermissionsService.getPermissions({
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
                        '',
                        data
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
