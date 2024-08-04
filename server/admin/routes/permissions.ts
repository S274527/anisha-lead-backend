import * as express from "express";
import PermissionsController from "admin/controllers/permissions/permissions.controller";
import * as PermissionsValidation from "../controllers/permissions/permissions.validation";

const router = express.Router();

const { validateListQuery } = PermissionsValidation;

const { getPermissions } = PermissionsController;

router.get("/list", validateListQuery, getPermissions);

export default router;
