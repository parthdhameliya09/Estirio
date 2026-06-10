import { Router } from 'express';

import {bookingRouter} from "./modules/booking/booking.route";

const router = Router();

router.use("/booking",bookingRouter);

export default router;
