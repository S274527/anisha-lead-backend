import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../helpers/api-validations";

const faqBody = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required()
});

export const validateFaqBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, faqBody, "body");

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
