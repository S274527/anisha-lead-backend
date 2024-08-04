import dayjs from "dayjs";
import { TDateFitlers } from "./misc.types";
import { Misc } from "admin/models";

export default class MiscService {
    static async getLeadByStatus(dates: TDateFitlers, status: string, user_id: string) {
        try {
            const obj = new Misc();
            const response = await obj.getLeadByStatus(dates, status, user_id);
            return response;
        } catch {
            return null;
        }
    }

    static async getIncomeSeries(dates: TDateFitlers, user_id: string) {
        try {
            const obj = new Misc();
            const response = await obj.getIncomeSeries(dates, user_id);
            let series: any = {};
            if (dates && dates?.timeline?.length) {
                dates?.timeline.map((item) => {
                    if (typeof series[item] !== undefined) {
                        series[item] = 0;
                    }
                });
            }

            if (response && response?.length) {
                response.map((item) => {
                    const indexDate = dayjs(new Date(item.createdAt)).format(
                        "DD MMM YY"
                    );
                    // @ts-ignore
                    series[indexDate] += 1;
                });
            }
            let categories = [];
            let data = [];
            if (series) {
                for (const [key, value] of Object.entries(series)) {
                    categories.push(key);
                    data.push(value);
                }
            }
            return { categories, data };
        } catch {
            return null;
        }
    }
}
