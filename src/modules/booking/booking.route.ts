import {Router} from "express";
import {bookings as CreateBookingController,getBooking as getBookingsController,getBookingById as getBookingByIdController,updateBooking as updateBookingController} from "./booking.controller.js";
import {validate} from "../../middlewares/validate.js";
import {createBookingSchema} from "./booking.validation.js";

const router = Router();

router.post("/",validate(createBookingSchema), CreateBookingController);
router.get("/",getBookingsController);
router.get("/:bookingId",getBookingByIdController);
router.patch("/:bookingId", updateBookingController);

export default router;