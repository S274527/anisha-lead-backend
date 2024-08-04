import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../helpers/api-validations";

export const addUserSchema = Joi.object().keys({
    password: Joi.string().optional(),
    email: Joi.string().required(),
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    // country_code: Joi.string().required(),
    address: Joi.string().optional(),
    active: Joi.number().required(),
    profile_photo: Joi.string().optional().allow(null),
    profile_photo_data: Joi.string().optional(),
    permission_id: Joi.string().required(),
    view: Joi.number().required(),
    add: Joi.number().required(),
    edit: Joi.number().required(),
    delete: Joi.number().required(),
});

export const validateUserBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, addUserSchema, "body");

export function validateUserBodyOld(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const body = req.body;
    const { error } = addUserSchema.validate(body);

    if (error) {
        return res.status(400).send({
            message: "Invalid id in request",
        });
    }
    next();
}

const listUserQuery = Joi.object().keys({
    size: Joi.number().required(),
    skip: Joi.number().required(),
    search: Joi.string().optional().allow(""),
    sorting: Joi.string().optional().allow(""),
});

export function validateListUserQuery(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error } = listUserQuery.validate(req.query);
    if (error) {
        return res.status(400).send({
            message: "Invalid request",
        });
    }
    next();
}
