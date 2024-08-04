const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";
import { UserModel } from "./user";

export const UserPermissions = sequelize.define("user_permissions", {
    permission_id: {
        type: DataTypes.INTEGER,
    },
    view: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    add: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

UserModel.hasMany(UserPermissions, {
    foreignKey: "user_id",
});
