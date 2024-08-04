import { Faq } from "admin/models";
import {
    TListFilters,
    TAddFaq
} from "admin/controllers/faq/faq.types";

export default class FaqService {
    static async getFaqs(data: TListFilters) {
        const obj = new Faq();
        const response = await obj.getFaqs(data);
        return response;
    }

    static async addFaq(data: TAddFaq) {
        const obj = new Faq();
        let { dataValues } = await obj.addFaq(data);
        return dataValues;
    }

    static async editFaq(id: string, data: TAddFaq) {
        const obj = new Faq();
        await obj.editFaq(id, data);
        return { ...data };
    }

    static async getFaqById(id: number) {
        const obj = new Faq();
        const response = await obj.getFaqById(id);
        return response;
    }

    static async getFaqsById(id: number[]) {
        const obj = new Faq();
        const response = await obj.getFaqsById(id);
        return response;
    }

    static async deleteFaq(ids: number) {
        const obj = new Faq();
        const response = await obj.deleteFaq(ids);
        return response;
    }
}
