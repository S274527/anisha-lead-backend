const { Op, cast, fn, col } = require("sequelize");
import { TDateFitlers } from "../../controllers/misc/misc.types";
import { Lead as LeadModel } from "database/models";

export class Misc {
    constructor() { }

    public async getLeadByStatus(
        dates: TDateFitlers,
        status: string,
        user_id: string
    ): Promise<number> {
        try {
            let data = 0;
            if (user_id) {
                data = await LeadModel.count(status === 'all' ? {
                    where: {
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                        user_id
                    },
                } : {
                    where: {
                        status: status,
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                        user_id
                    },
                });
            } else {
                data = await LeadModel.count(status === 'all' ? {
                    where: {
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                    },
                } : {
                    where: {
                        status: status,
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                    },
                });
            }
            return data ?? 0;
        } catch (err) {
            return null;
        }
    }

    public async getIncomeSeries(dates: TDateFitlers, user_id: string): Promise<any> {
        try {
            let data: any = null;
            if (user_id) {
                data = await LeadModel.findAll({
                    attributes: [
                        "createdAt"
                    ],
                    where: {
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                        user_id
                    },
                });
            } else {
                data = await LeadModel.findAll({
                    attributes: [
                        "createdAt"
                    ],
                    where: {
                        createdAt: {
                            [Op.gte]: dates.start_date,
                            [Op.lte]: dates.end_date,
                        },
                    },
                });
            }
            return data;
        } catch (err) {
            return null;
        }
    }
}
