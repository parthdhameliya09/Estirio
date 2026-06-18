import { Router } from "express";
import {
  bookings as CreateBookingController,
  getBooking as getBookingsController,
  getBookingById as getBookingByIdController,
  updateBooking as updateBookingController,
} from "./booking.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createBookingSchema, updateBooking } from "./booking.validation.js";

export const bookingRouter = Router();

bookingRouter.post("/", validate(createBookingSchema), CreateBookingController);
bookingRouter.get("/", getBookingsController);
bookingRouter.get("/:bookingId", getBookingByIdController);
bookingRouter.patch("/:bookingId", validate(updateBooking), updateBookingController);
