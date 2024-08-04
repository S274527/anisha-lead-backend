const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const PermissionModel = sequelize.define(
    "permissions",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);
