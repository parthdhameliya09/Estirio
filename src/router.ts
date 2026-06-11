import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes'
import{bookingRouter} from './modules/booking/booking.route'

export const router = Router();

router.use("/auth", authRouter);

router.use("/booking",bookingRouter);

export default router;
