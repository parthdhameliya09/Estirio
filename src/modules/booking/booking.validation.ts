import { z } from "zod";
export const createBookingSchema = z.object({
  tripId: z.uuid(),
  pickupStopId: z.uuid(),
  dropoffStopId: z.uuid(),

  passenger: z
    .array(
      z.object({
        firstName: z.string().trim().min(1, { error: "First name is required" }),
        lastName: z.string().trim().min(1, { error: "Last name is required" }),
        age: z
          .number({ error: "Age must be a number" })
          .int({ error: "Age must be an integer" })
          .positive({ error: "Age must be a positive number" }),
        seatInventoryId: z.uuid({ error: "Invalid seat inventory id" }),
      }),
    )
    .min(1, { error: "At least one passenger is required" }),
});

export const updateBooking = z.object({
  params: z.object({
    bookingId: z.uuid("Invalid booking ID format"),
  }),
  body: z.object({
    cancellationReason: z.string(),
  }),
});

export type updateBookingParamsRequest = z.infer<typeof updateBooking>;
