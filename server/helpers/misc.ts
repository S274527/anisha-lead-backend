import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advanced from "dayjs/plugin/advancedFormat";
import { CHART_FILTERS, CHART_TYPE } from "@constants";
import { AlertSetting as AlertSettingModel } from "database/models";
import UserService from "admin/controllers/users/user.service";
dayjs.extend(advanced);
dayjs.extend(utc);
dayjs.extend(timezone);

type TTimeframe =
    | "M1"
    | "M5"
    | "M15"
    | "M30"
    | "H1"
    | "H4"
    | "D1"
    | "W1"
    | "MN";

type TDataSeries = {
    x: string | Date;
    y: string[];
};

export const createFilterDates = (interval: string) => {
    const now = dayjs();
    let startDate: any = "";
    let endDate: any = "";
    let intervalType: any = "";

    if (interval === CHART_FILTERS.ONE_HOUR) {
        startDate = now.set("hour", now.hour() - 1);
        endDate = now;
        intervalType = CHART_TYPE.OneMinute;
    } else if (interval === CHART_FILTERS.SIX_HOUR) {
        startDate = now.set("hour", now.hour() - 6);
        endDate = now;
        intervalType = CHART_TYPE.OneMinute;
    } else if (interval === CHART_FILTERS.TWELEVE_HOUR) {
        startDate = now.set("hour", now.hour() - 12);
        endDate = now;
        intervalType = CHART_TYPE.OneMinute;
    } else if (interval === CHART_FILTERS.ONE_DAY) {
        startDate = now.set("day", now.day() - 1);
        endDate = now;
        intervalType = CHART_TYPE.SixtyMinute;
    } else if (interval === CHART_FILTERS.ONE_WEEK) {
        startDate = now.set("day", now.day() - 7);
        endDate = now;
        intervalType = CHART_TYPE.SixtyMinute;
    } else if (interval === CHART_FILTERS.ONE_MONTH) {
        startDate = now.set("month", now.month() - 1);
        endDate = now;
        intervalType = CHART_TYPE.Daily;
    } else if (interval === CHART_FILTERS.ONE_YEAR) {
        startDate = now.set("year", now.year() - 1);
        endDate = now;
        intervalType = CHART_TYPE.Monthly;
    } else if (interval === CHART_FILTERS.FIVE_YEAR) {
        startDate = now.set("year", now.year() - 5);
        endDate = now;
        intervalType = CHART_TYPE.Monthly;
    }

    return {
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        intervalType,
    };
};

export const createTimeperiodDates = (period: string, date: string) => {
    const now = dayjs(new Date(date));
    let startDate: any = "";
    let endDate: any = "";

    endDate = now;
    if (period == '1d') {
        startDate = now.set("day", now.day() - 1);
    } else if (period == '1w') {
        startDate = now.set("day", now.day() - 7);
    } else if (period == '1m') {
        startDate = now.set("month", now.month() - 1);
    } else if (period == '1y') {
        startDate = now.set("year", now.year() - 1);
    }

    return {
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };
}

const drawdownToPips = (drawdown: any, exchangeRate: any) => {
    const pipValue = getPipValue(exchangeRate);
    return drawdown / pipValue;
};

const getPipValue = (exchangeRate: any) => {
    const lotSize = 100000;
    const pipSize = getPipSize("USD");
    const pipValue = (pipSize / exchangeRate) * lotSize;
    return pipValue;
};

const getPipSize = (currency: any) => {
    if (["JPY"].includes(currency)) {
        return 0.01;
    }

    return 0.0001;
};

const number_format = (value: any, points: number) => {
    return parseFloat(value).toFixed(points);
};

export const calculateDrawDownForTimeFrame = (
    timeFrame: TTimeframe,
    dataSeries: TDataSeries[]
) => {
    const defaultDrawdown = {
        time_frame: timeFrame,
        percentage_raw: 0,
        percentage: "0%",
        pips: "0 pips",
    };

    if (dataSeries && dataSeries?.length) {
        let drawDowns: any = [];
        let lastEntry = dataSeries[0];
        let currentItemNum = 0;
        let entriesCount = dataSeries?.length;
        let peakEntry: any = null;
        let troughEntry: any = null;
        let isDrawdown = false;

        dataSeries.map((entry: TDataSeries) => {
            ++currentItemNum;
            const entryClose = entry.y[3];
            const lastEntryClose = lastEntry?.y[3];
            const peakEntryClose = peakEntry?.y[3];
            const troughEntryClose = troughEntry?.y[3];

            if (!isDrawdown && entryClose < lastEntryClose) {
                isDrawdown = true;
                peakEntry = lastEntry;
            }

            if (isDrawdown && entryClose > lastEntryClose) {
                isDrawdown = false;
                troughEntry = lastEntry;
                let drawdownAmount = peakEntryClose - troughEntryClose;
                let drawdownPips = drawdownToPips(drawdownAmount, troughEntryClose);
                let drawdownPercent = (drawdownAmount / peakEntryClose) * 100;
                drawDowns.push({
                    pips_raw: !Number.isNaN(drawdownPips) ? drawdownPips : 0,
                    percentage_raw: !Number.isNaN(drawdownPercent)
                        ? drawdownPercent
                        : 0,
                    pips:
                        number_format(
                            !Number.isNaN(drawdownPips) ? drawdownPips : 0,
                            4
                        ) + " pips",
                    percentage: !Number.isNaN(drawdownPercent)
                        ? drawdownPercent
                        : 0,
                });
            } else if (isDrawdown && currentItemNum == entriesCount) {
                isDrawdown = false;
                troughEntry = entry;
                let drawdownAmount = peakEntryClose - troughEntryClose;
                let drawdownPips = drawdownToPips(drawdownAmount, troughEntryClose);
                let drawdownPercent = (drawdownAmount / peakEntryClose) * 100;
                drawDowns.push({
                    pips_raw: !Number.isNaN(drawdownPips) ? drawdownPips : 0,
                    percentage_raw: !Number.isNaN(drawdownPercent)
                        ? drawdownPercent
                        : 0,
                    pips:
                        number_format(
                            !Number.isNaN(drawdownPips) ? drawdownPips : 0,
                            4
                        ) + " pips",
                    percentage: !Number.isNaN(drawdownPercent)
                        ? drawdownPercent
                        : 0,
                });
            }
            lastEntry = entry;
        });

        const allDrawDowns = drawDowns;
        const sortedArray = allDrawDowns.sort(function (a: any, b: any) {
            return parseFloat(b.pips_raw) - parseFloat(a.pips_raw);
        });
        const maxDrawDown = sortedArray[0];

        if (maxDrawDown) {
            return {
                time_frame: timeFrame,
                percentage_raw: maxDrawDown["percentage_raw"],
                percentage: `${maxDrawDown["percentage"]?.toFixed(2)}%`,
                pips: maxDrawDown["pips"],
            };
        } else {
            return defaultDrawdown;
        }
    } else {
        return defaultDrawdown;
    }
};

export const getAlertSettings = async (user_id: number) => {
    const data = await AlertSettingModel.findOne({
        where: {
            user_id
        }
    });

    if (!data) return null;

    const user = await UserService.getUserById(user_id as number);

    const {
        timezone,
        send_web_alerts,
        send_web_alerts_always_on,
        web_hours_from,
        web_hours_to,
        send_email_alerts,
        send_email_alerts_always_on,
        email_hours_from,
        email_hours_to,
        email_per_day,
        send_sms_alerts,
        send_sms_alerts_always_on,
        sms_hours_from,
        sms_hours_to,
        sms_per_day,
        additional_email_alerts,
        additional_sms_alerts,
        additional_email_sent,
        additional_sms_sent
    } = data.dataValues;

    let allow_web_alerts = false;
    let allow_email_alerts = false;
    let allow_sms_alerts = false;

    const userTimezone = user?.timezone;
    const todayDate = userTimezone ? dayjs().utc().local().tz(userTimezone) : dayjs(new Date());

    if (send_web_alerts_always_on) {
        allow_web_alerts = true;
    } else if (send_web_alerts) {
        const startDate = `${todayDate.format('YYYY-MM-DD')} ${web_hours_from}:00:00`;
        const endDate = `${todayDate.format('YYYY-MM-DD')} ${web_hours_to}:00:00`;
        const currentDate = todayDate.format('YYYY-MM-DD HH:mm:ss');
        if (currentDate >= startDate && currentDate <= endDate) {
            allow_web_alerts = true;
        }
    } else {
        allow_web_alerts = false;
    }

    if (send_email_alerts_always_on) {
        allow_email_alerts = true;
    } else if (send_email_alerts) {
        const startDate = `${todayDate.format('YYYY-MM-DD')} ${email_hours_from}:00:00`;
        const endDate = `${todayDate.format('YYYY-MM-DD')} ${email_hours_to}:00:00`;
        const currentDate = todayDate.format('YYYY-MM-DD HH:mm:ss');
        if (currentDate >= startDate && currentDate <= endDate) {
            allow_email_alerts = true;
        }
    } else {
        allow_email_alerts = false;
    }

    if (send_sms_alerts_always_on) {
        allow_sms_alerts = true;
    } else if (send_sms_alerts) {
        const startDate = `${todayDate.format('YYYY-MM-DD')} ${sms_hours_from}:00:00`;
        const endDate = `${todayDate.format('YYYY-MM-DD')} ${sms_hours_to}:00:00`;
        const currentDate = todayDate.format('YYYY-MM-DD HH:mm:ss');
        if (currentDate >= startDate && currentDate <= endDate) {
            allow_sms_alerts = true;
        }
    } else {
        allow_sms_alerts = false;
    }

    return {
        allow_web_alerts,
        allow_email_alerts,
        allow_sms_alerts,
        sms_per_day,
        email_per_day,
        additional_email_alerts,
        additional_sms_alerts,
        additional_email_sent,
        additional_sms_sent
    }
}