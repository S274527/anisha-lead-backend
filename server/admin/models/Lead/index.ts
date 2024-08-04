const { Op } = require("sequelize");
import {
    TListFilters,
    TLeadsList,
    TAddLead,
    TLead
} from "admin/controllers/leads/leads.types";
import { Lead as LeadModel } from "database/models";
const moment = require('moment');

export class Lead {
    constructor() { }

    public async getLeads(filters: TListFilters): Promise<TLeadsList | any> {
        const where = {
            email: {
                [Op.like]: `%${filters.search}%`,
            }
        };
        const total = await LeadModel.count({ where });
        const data = await LeadModel.findAll({
            offset: filters.offset,
            limit: filters.limit,
            order: [filters?.sorting],
            where: where,
        });
        return { total, data };
    }

    public async addLead(data: TAddLead): Promise<TAddLead | any> {
        const res = await LeadModel.create(data);
        return res;
    }

    public async updateLead(id: string, data: TAddLead): Promise<TAddLead | any> {
        const res = await LeadModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }
    public async editLead(id: string, data: TAddLead): Promise<TAddLead | any> {
        const res = await LeadModel.update(data, {
            where: {
                id,
            },
        });
        return res;
    }

    public async getLeadById(id: number): Promise<TLead | any> {
        const data = await LeadModel.findAll({
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }

    public async getLeadsById(id: number[]): Promise<TLead[] | any> {
        const data = await LeadModel.findAll({
            where: {
                id,
            }
        });
        return data ?? null;
    }

    public async deleteLead(ids: number): Promise<number> {
        const response = await LeadModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getCallbackList(user_id: string): Promise<TLeadsList | any> {
        const TODAY_START = moment().format('DD-MM-YYYY');
        const NOW = moment().format('YYYY-MM-DD 23:59');
        const data = await LeadModel.findAll({
            where: {
                user_id,
                status: 'Follow up',
                follow_up_date: moment().format('DD-MM-YYYY')
            },
        });
        console.log([
            TODAY_START,
            NOW,
        ])
        return data;
    }
}
