import * as express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import { auth } from "admin/middlewares";
import seedRouter from "./seed";
import permissionRouter from "./permissions";
import leadRouter from "./lead";
import miscRouter from "./misc";
import faqRouter from "./faq";

const router = express.Router();

router.use("/", authRouter);
router.use("/user", auth, userRouter);
router.use("/seed", seedRouter);
router.use("/permissions", auth, permissionRouter);
router.use("/lead", auth, leadRouter);
router.use("/misc", auth, miscRouter);
router.use("/faq", auth, faqRouter);

export default router;
