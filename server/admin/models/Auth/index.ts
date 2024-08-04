import {
    TUpdateUserToken,
    TUpdateUserProfile,
    TUpdateUserPassword,
} from "admin/controllers/auth/auth.types";
import { TUser } from "admin/controllers/user/user.types";
import { UserModel, UserPermissions } from "database/models";

export class Auth {
    constructor() {}

    public async getUserByEmail(email: string): Promise<TUser | any> {
        const data = await UserModel.findOne({
            where: {
                email,
            },
            include: [UserPermissions]
        });
        return data ? data : null;
    }

    public async updateRefreshToken(data: TUpdateUserToken): Promise<boolean> {
        await UserModel.update(
            {
                refresh_token: data.refresh_token,
                last_login_at: data.last_login_at,
                last_login_ip: data.last_login_ip,
            },
            {
                where: {
                    id: data.user_id,
                },
            }
        );
        return true;
    }

    public async editProfile(data: TUpdateUserProfile): Promise<TUser | any> {
        const user = await UserModel.update(
            {
                full_name: data.full_name,
                contact_number: data.contact_number,
                phone_code: data.phone_code,
                address: data.address,
            },
            {
                where: {
                    id: data.user_id,
                },
            }
        );
        return user;
    }
    public async changePassword(data: TUpdateUserPassword): Promise<boolean> {
        await UserModel.update(
            {
                password: data.password,
            },
            {
                where: {
                    id: data.user_id,
                },
            }
        );
        return true;
    }

    public async getUserPassword(id: number): Promise<
        | {
              password: string;
          }
        | any
    > {
        const data = await UserModel.findAll({
            attributes: ["password"],
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }
}
