import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRoute } from "./modules/payment/payment.routes";

export const router = Router();

router.use("/auth", authRouter);

router.use("/booking", bookingRouter);

router.use("/payment", paymentRoute);

export default router;
