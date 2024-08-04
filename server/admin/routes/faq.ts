import * as express from "express";
import FaqController from "admin/controllers/faq/faq.controller";
import {
    validateListQuery,
    validateFaqBody
} from "../controllers/faq/faq.validation";
import { validateNumberId } from "helpers/number-id-validate";

const router = express.Router();

const {
    addFaq,
    getFaqs,
    getFaq,
    editFaq,
    deleteFaq,
} = FaqController;

router.get("/list", validateListQuery, getFaqs);
router.get("/get/:id", getFaq);
router.post("/add", validateFaqBody, addFaq);
router.post("/edit/:id", validateNumberId, validateFaqBody, editFaq);
router.delete("/delete/:id", deleteFaq);

export default router;
