import { Router } from 'express';

// import authRoutes from "./modules/auth/auth.routes";
import operatorRoutes from "./modules/operator/operator.routes";
import bookingRoutes from "./modules/booking/booking.route";
const router = Router();

// router.use("/auth", authRoutes);
router.use("/operators", operatorRoutes)
router.use("/booking", bookingRoutes);

export default router;
