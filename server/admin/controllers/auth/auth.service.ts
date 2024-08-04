import { Auth } from "admin/models";
import {
    TUpdateUserToken,
    TUpdateUserProfile,
    TUpdateUserPassword,
} from "./auth.types";

export default class AuthService {
    static async getUserByEmail(email: string) {
        const obj = new Auth();
        const response = await obj.getUserByEmail(email);
        return response;
    }

    static async updateRefreshToken(data: TUpdateUserToken) {
        const obj = new Auth();
        const response = await obj.updateRefreshToken(data);
        return response;
    }

    static async editProfile(data: TUpdateUserProfile) {
        const obj = new Auth();
        const response = await obj.editProfile(data);
        return response;
    }

    static async changePassword(data: TUpdateUserPassword) {
        const obj = new Auth();
        const response = await obj.changePassword(data);
        return response;
    }

    static async getUserPassword(id: number) {
        const obj = new Auth();
        const response = await obj.getUserPassword(id);
        return response;
    }
}
