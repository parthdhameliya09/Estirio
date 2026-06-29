import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRoute } from "./modules/payment/payment.routes";
import operatorRoutes from "./modules/operator/operator.routes";
import crewRoutes from "./modules/crew/crew.routes";
import busRoutes from "./modules/bus/bus.routes";
import { userRouter } from "./modules/user/user.routes";
import { adminRouter } from "./modules/admin/admin.routes";
import { tripRoute } from "./modules/trip-management/trip.route";

export const router = Router();


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/operators", operatorRoutes);
router.use("/crews", crewRoutes);
router.use("/buses", busRoutes);
router.use("/booking", bookingRouter);
router.use("/payment", paymentRoute);
router.use("/trip",tripRoute);




