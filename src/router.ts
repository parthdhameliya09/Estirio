import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes'

// import authRoutes from "./modules/auth/auth.routes";
import operatorRoutes from "./modules/operator/operator.routes";
import bookingRoutes from "./modules/booking/booking.route";
import crewRoutes from "./modules/crew/crew.routes";
import busRoutes from "./modules/bus/bus.routes";
export const router = Router();

// router.use("/auth", authRoutes);
router.use("/operators", operatorRoutes);
router.use("/booking", bookingRoutes);
router.use("/crews", crewRoutes);
router.use("/buses", busRoutes);




router.use("/auth", authRouter);

