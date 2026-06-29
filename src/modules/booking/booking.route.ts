import { Router } from "express";
import {
  bookings as CreateBookingController,
  getBooking as getBookingsController,
  getBookingById as getBookingByIdController,
  updateBooking as updateBookingController,
} from "./booking.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createBookingSchema, updateBooking } from "./booking.validation.js";
import { authorize } from "../../middlewares/auth.middleware.js";

export const bookingRouter = Router();

bookingRouter.post("/", authorize("bookings:create"), validate(createBookingSchema), CreateBookingController);
bookingRouter.get("/",authorize("bookings:update"), getBookingsController);
bookingRouter.get("/:bookingId",authorize("bookings:read"), getBookingByIdController);
bookingRouter.patch("/:bookingId", authorize("bookings:update"),validate(updateBooking), updateBookingController);
