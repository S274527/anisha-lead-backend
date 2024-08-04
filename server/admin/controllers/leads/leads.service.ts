import { Lead } from "admin/models";
import {
    TListFilters,
    TAddLead
} from "admin/controllers/leads/leads.types";

export default class LeadsService {
    static async getLeads(data: TListFilters) {
        const obj = new Lead();
        const response = await obj.getLeads(data);
        return response;
    }

    static async addLead(data: TAddLead) {
        const obj = new Lead();
        let { dataValues } = await obj.addLead(data);
        return dataValues;
    }

    static async editLead(id: string, data: TAddLead) {
        const obj = new Lead();
        await obj.editLead(id, data);
        return { ...data };
    }

    static async getLeadById(id: number) {
        const obj = new Lead();
        const response = await obj.getLeadById(id);
        return response;
    }

    static async getLeadsById(id: number[]) {
        const obj = new Lead();
        const response = await obj.getLeadsById(id);
        return response;
    }

    static async deleteLead(ids: number) {
        const obj = new Lead();
        const response = await obj.deleteLead(ids);
        return response;
    }

    static async getCallbackList(user_id: string) {
        const obj = new Lead();
        const response = await obj.getCallbackList(user_id);
        return response;
    }
}
