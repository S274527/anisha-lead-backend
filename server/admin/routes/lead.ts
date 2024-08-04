import * as express from "express";
import LeadsController from "admin/controllers/leads/leads.controller";
import {
    validateListQuery,
    validateLeadBody
} from "../controllers/leads/leads.validation";
import { validateNumberId } from "helpers/number-id-validate";

const router = express.Router();

const {
    addLead,
    getLeads,
    getLead,
    editLead,
    deleteLead,
    getCallbackList
} = LeadsController;

router.get("/list", validateListQuery, getLeads);
router.get("/get/:id", getLead);
router.post("/add", validateLeadBody, addLead);
router.post("/edit/:id", validateNumberId, validateLeadBody, editLead);
router.delete("/delete/:id", deleteLead);

router.get("/callback-list", getCallbackList);

export default router;
