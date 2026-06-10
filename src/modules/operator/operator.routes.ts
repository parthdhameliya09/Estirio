import { Router } from "express";
import { createOperatorController, getOperatorController, updateOperatorController} from "./operator.controller";
import { validate } from "../../middlewares/validate";
import { createOperatorSchema, updateOperatorSchema } from "./operator.validation";
const router = Router();

router.post("/",validate(createOperatorSchema), createOperatorController);
router.get("/:id", getOperatorController);
router.patch("/:id", validate(updateOperatorSchema), updateOperatorController);

export default router;