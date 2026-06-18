import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    tripId: z.uuid(),
    pickupStopId: z.uuid(),
    dropoffStopId: z.uuid(),

    passenger: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        seatInventoryId: z.uuid(),
        gender: z.string(),
      }),
    ),
  }),
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
