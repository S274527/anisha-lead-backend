import * as express from "express";
import AuthController from "admin/controllers/auth/auth.controller";
import * as AuthValidation from "../controllers/auth/auth.validation";
import { auth } from "admin/middlewares";

const router = express.Router();

const { validateLoginUserBody, validateUpdateProfileBody, validateChangePasswordBody } = AuthValidation;
const { login, editProfile, changePassword } = AuthController;

router.post("/login", validateLoginUserBody, login);
router.post("/edit-profile", auth, validateUpdateProfileBody, editProfile);
router.post("/change-password", auth, validateChangePasswordBody, changePassword);

export default router;
