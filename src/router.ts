import { Router } from 'express';

// import authRoutes from "./modules/auth/auth.routes";
import operatorRoutes from "./modules/operator/operator.routes";
import bookingRoutes from "./modules/booking/booking.route";
import crewRoutes from "./modules/crew/crew.routes";
import busRoutes from "./modules/bus/bus.routes";
const router = Router();

// router.use("/auth", authRoutes);
router.use("/operators", operatorRoutes);
router.use("/booking", bookingRoutes);
router.use("/crews", crewRoutes);
router.use("/buses", busRoutes);

export default router;
