const { Op } = require("sequelize");
import {
    TListFilters,
    TUsersList,
    TUser,
    TEditUserProfile,
} from "admin/controllers/user/user.types";
import { Lead, UserModel, UserPermissions } from "database/models";

export class User {
    constructor() {}

    public async getUsers(filters: TListFilters): Promise<TUsersList | any> {
        const where = {
            email: {
                [Op.like]: `%${filters.search}%`,
            },
            type: 'user'
        };
        const total = await UserModel.count({ where });
        const data = await UserModel.findAll({
            attributes: [
                'id',
                'email',
                'full_name',
                'contact_number',
                'phone_code',
                'profile_photo',
                'address',
                'last_login_at',
                'last_login_ip',
                'refresh_token',
                'active',
                'type'
            ],
            offset: filters.offset,
            limit: filters.limit,
            order: [filters?.sorting],
            where: where,
        });
        return { total, data };
    }

    public async editProfile(
        id: number,
        data: TEditUserProfile
    ): Promise<TUser | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getRoleAssigneeByRoleId(ids: string[]): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
            },
        });
        return data ?? null;
    }

    public async addUser(data: TUser): Promise<TUser | any> {
        const res = await UserModel.create(data);
        return res;
    }

    public async updateUser(id: string, data: TUser): Promise<TUser | any> {
        const res = await UserModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }
    public async editUser(id: string, data: TUser): Promise<TUser | any> {
        const res = await UserModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }

    public async getUserById(id: number): Promise<TUser | any> {
        const data = await UserModel.findAll({
            attributes: [
                "id",
                'email',
                'full_name',
                'contact_number',
                'phone_code',
                'profile_photo',
                'address',
                'last_login_at',
                'last_login_ip',
                'refresh_token',
                'active',
                'type'
            ],
            where: {
                id,
            },
            include: [UserPermissions, Lead]
        });
        return data ? data[0] : null;
    }

    public async getUsersById(id: number[]): Promise<TUser[] | any> {
        const data = await UserModel.findAll({
            attributes: [
                "id",
                'email',
                'full_name',
                'contact_number',
                'phone_code',
                'profile_photo',
                'address',
                'last_login_at',
                'last_login_ip',
                'refresh_token',
                'active',
                'type'
            ],
            where: {
                id,
            },
            paranoid: false,
        });
        return data ?? null;
    }

    public async deleteUser(ids: number): Promise<number> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        await UserPermissions.destroy({
            where: {
                user_id: ids,
            },
        });
        return response;
    }

    public async assignPermission(data: any): Promise<TUser | any> {
        const res = await UserPermissions.create(data);
        return res;
    }

    public async updatePermission(data: any): Promise<TUser | any> {
        const res = await UserPermissions.update(data, {
            where: {
                user_id: data.user_id
            }
        });
        return res;
    }
}
