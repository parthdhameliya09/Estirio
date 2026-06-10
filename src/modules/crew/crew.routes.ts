import { Router } from "express";
import {
    createCrewController,
    getCrewController,
    getCrewsByOperatorController,
    updateCrewController,
} from "./crew.controller";
import { validate } from "../../middlewares/validate";
import { createCrewSchema, updateCrewSchema } from "./crew.validation";

const router = Router();

router.post("/", validate(createCrewSchema), createCrewController);
router.get("/operator/:operatorId", getCrewsByOperatorController);
router.get("/:id", getCrewController);
router.patch("/:id", validate(updateCrewSchema), updateCrewController);

export default router;
