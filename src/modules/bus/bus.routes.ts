import { Router } from "express";
import {
    createBusController,
    getBusController,
    getBusesByOperatorController,
    updateBusController,
    createSeatConfigController,
    getSeatConfigsByBusController,
    getSeatConfigController,
    updateSeatConfigController,
    deleteSeatConfigController,
} from "./bus.controller";
import { validate } from "../../middlewares/validate";
import {
    createBusSchema,
    getBusSchema,
    updateBusSchema,
    createSeatConfigSchema,
    getSeatConfigSchema,
    updateSeatConfigSchema,
} from "./bus.validation";

const router = Router();

router.post("/", validate(createBusSchema), createBusController);
router.get("/operator/:operatorId", getBusesByOperatorController);
router.get("/:id", validate(getBusSchema), getBusController);
router.patch("/:id", validate(updateBusSchema), updateBusController);

router.post("/:busId/seats", validate(createSeatConfigSchema), createSeatConfigController);
router.get("/:busId/seats", getSeatConfigsByBusController);
router.get("/:busId/seats/:seatId", validate(getSeatConfigSchema), getSeatConfigController);
router.patch("/:busId/seats/:seatId", validate(updateSeatConfigSchema), updateSeatConfigController);
router.delete("/:busId/seats/:seatId", validate(getSeatConfigSchema), deleteSeatConfigController);

export default router;
