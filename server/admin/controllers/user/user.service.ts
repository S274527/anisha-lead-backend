import { User } from "admin/models";
import {
    TUser,
    TListFilters
} from "admin/controllers/user/user.types";

export default class UserService {
    static async getUsers(data: TListFilters) {
        const obj = new User();
        const response = await obj.getUsers(data);
        return response;
    }

    static async addUser(data: TUser) {
        const obj = new User();
        let { dataValues } = await obj.addUser(data);
        return dataValues;
    }

    static async editUser(id: string, data: TUser) {
        const obj = new User();
        await obj.editUser(id, data);
        return { ...data };
    }

    static async getUserById(id: number) {
        const obj = new User();
        const response = await obj.getUserById(id);
        return response;
    }

    static async getUsersById(id: number[]) {
        const obj = new User();
        const response = await obj.getUsersById(id);
        return response;
    }

    static async deleteUser(ids: number) {
        const obj = new User();
        const response = await obj.deleteUser(ids);
        return response;
    }

    static async assignPermission(data: any) {
        const obj = new User();
        let { dataValues } = await obj.assignPermission(data);
        return dataValues;
    }

    static async updatePermission(data: any) {
        const obj = new User();
        let { dataValues } = await obj.updatePermission(data);
        return dataValues;
    }
}
