const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const Faq = sequelize.define("faqs", {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
});
