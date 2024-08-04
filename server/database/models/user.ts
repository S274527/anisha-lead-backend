const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const UserModel = sequelize.define(
    "users",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        contact_number: {
            type: DataTypes.STRING,
        },
        phone_code: {
            type: DataTypes.STRING,
        },
        profile_photo: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        last_login_at: {
            type: DataTypes.DATE,
        },
        last_login_ip: {
            type: DataTypes.STRING,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
    }
);
