import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../helpers/api-validations";

const leadBody = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    status: Joi.string().required(),
    source: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    user_id: Joi.string().required(),
    follow_up_date: Joi.string().required(),
});

export const validateLeadBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, leadBody, "body");

const listQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export function validateListQuery(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error } = listQuery.validate(req.query);
    if (error) {
        return res.status(400).send({
            message: "Invalid request",
        });
    }
    next();
}
