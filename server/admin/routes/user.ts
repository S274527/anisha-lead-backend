import * as express from "express";
import UserController from "admin/controllers/user/user.controller";
import {
  validateListUserQuery,
  validateUserBody
} from "../controllers/user/user.validation";
import { validateNumberId } from "helpers/number-id-validate";

const router = express.Router();

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
} = UserController;

router.get("/list", validateListUserQuery, getUsers);
router.get("/get/:id", validateNumberId, getUser);
router.post("/add", validateUserBody, addUser);
router.post("/edit/:id", validateNumberId, validateUserBody, editUser);
router.delete("/delete/:id", deleteUser);

export default router;
