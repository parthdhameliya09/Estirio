import { Router } from 'express';

import bookingRoutes from "./modules/booking/booking.route";

const bookingRoute = Router();

bookingRoute.use("/booking",bookingRoutes );

export default bookingRoute;
