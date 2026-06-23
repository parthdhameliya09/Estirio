import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRoute } from "./modules/payment/payment.routes";
import { userRouter } from "./modules/user/user.routes";
import { adminRouter } from "./modules/admin/admin.routes";

export const router = Router();


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

router.use("/booking", bookingRouter);
router.use("/payment", paymentRoute);

