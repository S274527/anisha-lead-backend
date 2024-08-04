const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";
import { UserModel } from "./user";

export const Lead = sequelize.define("leads", {
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    contact_number: {
        type: DataTypes.STRING,
    },
    phone_code: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    source: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
    },
    follow_up_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

UserModel.hasMany(Lead, {
    foreignKey: "user_id",
});
