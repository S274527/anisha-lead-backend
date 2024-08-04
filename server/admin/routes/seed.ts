import * as express from "express";
import SeedController from "admin/controllers/seed/seed.controller";

const router = express.Router();

const { refreshUser } = SeedController;

router.post("/refresh-user", refreshUser);

export default router;
