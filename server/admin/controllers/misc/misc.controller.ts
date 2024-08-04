import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import MiscService from "./misc.service";
import { sendResponse, getDateRange } from "admin/helpers";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
    METRIC_TYPES,
} from "admin/constants";

export default class MiscController {
    static async getDashboardMetrics(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const range = get(req?.query, "range", "");
            const type = get(req?.query, "type", "");
            const status = get(req?.query, "status", "all");
            const dates = getDateRange(range);
            const user_type = get(req, "user_type", "");
            const user_id = get(req, "user_id", "");

            let response: any;
            if (type === METRIC_TYPES.LeadByStatus) {
                response = {
                    data: await MiscService.getLeadByStatus(dates, status, user_type === 'user' ? user_id : ''),
                };
            } else if (type === METRIC_TYPES.LeadChart) {
                const series = await MiscService.getIncomeSeries(dates, user_type === 'user' ? user_id : '');
                response = {
                    categories: series.categories,
                    data: series.data,
                };
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.METRICS_FETCHED,
                        response
                    )
                );
        } catch (err) {
            return res.status(400).send({
                message: ERROR_MESSAGE.INVALID_REQUEST,
            });
        }
    }
}
