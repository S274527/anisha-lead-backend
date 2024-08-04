import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../helpers/api-validations";

const loginUserBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validateLoginUserBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, loginUserBody, "body");

const updateProfileBody = Joi.object().keys({
    full_name: Joi.string().required(),
    contact_number: Joi.string().required(),
    phone_code: Joi.string().required(),
    profile_photo: Joi.string().optional(),
    address: Joi.string().optional(),
});

export const validateUpdateProfileBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, updateProfileBody, "body");

const changePasswordBody = Joi.object().keys({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
});

export const validateChangePasswordBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => validateReq(req, res, next, changePasswordBody, "body");
