const { Op } = require("sequelize");
import {
    TListFilters,
    TPermissionsList,
} from "admin/controllers/permissions/permissions.types";
import { PermissionModel } from "database/models";

export class Permissions {
    constructor() { }

    public async getPermissions(filters: TListFilters): Promise<TPermissionsList | any> {
        const total = await PermissionModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await PermissionModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }
}
