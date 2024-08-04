const { Op } = require("sequelize");
import {
    TListFilters,
    TFaqsList,
    TAddFaq,
    TFaq
} from "admin/controllers/faq/faq.types";
import { Faq as FaqModel } from "database/models";

export class Faq {
    constructor() {}

    public async getFaqs(filters: TListFilters): Promise<TFaqsList | any> {
        const where = {
            title: {
                [Op.like]: `%${filters.search}%`,
            }
        };
        const total = await FaqModel.count({ where });
        const data = await FaqModel.findAll({
            offset: filters.offset,
            limit: filters.limit,
            order: [filters?.sorting],
            where: where,
        });
        return { total, data };
    }

    public async addFaq(data: TAddFaq): Promise<TAddFaq | any> {
        const res = await FaqModel.create(data);
        return res;
    }

    public async updateFaq(id: string, data: TAddFaq): Promise<TAddFaq | any> {
        const res = await FaqModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }
    public async editFaq(id: string, data: TAddFaq): Promise<TAddFaq | any> {
        const res = await FaqModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }

    public async getFaqById(id: number): Promise<TFaq | any> {
        const data = await FaqModel.findAll({
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }

    public async getFaqsById(id: number[]): Promise<TFaq[] | any> {
        const data = await FaqModel.findAll({
            where: {
                id,
            }
        });
        return data ?? null;
    }

    public async deleteFaq(ids: number): Promise<number> {
        const response = await FaqModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
