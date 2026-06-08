import { Router } from "express";
import { createOperatorController, getOperatorController, updateOperatorController} from "./operator.controller";

const router = Router();

router.post("/", createOperatorController);
router.get("/:id", getOperatorController);
router.patch("/:id", updateOperatorController);

export default router;