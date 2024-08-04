import { NextFunction, Request, Response } from "express";
import { sendResponse } from "admin/helpers";
import { RESPONSE_TYPE, ERROR_MESSAGE } from "admin/constants";
import { UserModel, PermissionModel } from "database/models";

export default class SeedController {
    static async refreshUser(req: Request, res: Response, next: NextFunction) {
        try {
            await UserModel.destroy({
                where: {
                    email: 'admin@admin.com'
                }
            });
            await UserModel.create({
                email: 'admin@admin.com',
                password: '$2b$10$zHKpWYJ8.clN/.x9Hua0cuMU9Xh2pErG91WxLV5INJyvUwrVlkO.K',
                full_name: 'admin@admin.com',
                active: true,
                type: 'admin'
            });

            await PermissionModel.destroy({
                truncate: true
            });
            await PermissionModel.create({
                title: 'Lead'
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        "Data seeded into the database"
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
