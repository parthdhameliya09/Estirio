import {
  findAllBookings,
  findBookingById,
  updateBookingById,
  getTripById,
  getSeatsByIds,
  createBookingRecord,
  createBookingSeatsRecord,
  createPassengerRecord,
  upateSeatStatus,
} from "./booking.dao.js";
import { Prisma } from "../../../generated/prisma/client.js";
import { createBookingInput, passengerRecordPayload } from "./booking.types.js";
import prisma from "../../config/prisma.js";
import { booking_status,seat_status } from "../../../generated/prisma/client.js";

export const createBooking = async (bookingData: createBookingInput) => {
  try {
    const { userId, tripId, pickupStopId, dropoffStopId, passenger } = bookingData;
    const trip = await getTripById(tripId);
    if (!trip) {
      throw new Error("Trip not found");
    }
    const seatIds = passenger.map((p) => p.seatInventoryId);
    const result = await prisma.$transaction(async (tx) => {
      const seats = await getSeatsByIds(seatIds,tx);
      if (seats.length !== seatIds.length) {
        throw new Error("seat not exists");
      }

      const seatNotAvailable = seats.filter((seat) => seat.status !== "available");
      if (seatNotAvailable.length > 0) {
        throw new Error("Some seats are not available");
      }

      const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
      const totalSeats = seats.length;

      const bookingPayload = {
        userId,
        tripId,
        pickupStopId,
        dropoffStopId,
        totalAmount,
        totalSeats,
        status: booking_status.pending_payment,
        cancellationReason: "",
      };
      const bookingRecord = await createBookingRecord(bookingPayload, tx);
      const bookingId = bookingRecord.id;
      const bookingseatsId = [];
      for (let i = 0; i < seats.length; i++) {
        const seatRecordPaload = {
          seatInventoryId: seats[i].id,
          fare: seats[i].price,
          bookingId,
        };
        const seatRecord = await createBookingSeatsRecord(seatRecordPaload, tx);
        bookingseatsId.push(seatRecord.id);
      }
      for (let i = 0; i < passenger.length; i++) {
        const passengerRecordPayload = {
          bookingId,
          bookingSeatsId: bookingseatsId[i],
          firstName: passenger[i].firstname,
          lastName: passenger[i].lastname,
          age: passenger[i].age,
          gender: passenger[i].gender,
        };
        await createPassengerRecord(passengerRecordPayload, tx);
      }
      for (let i = 0; i < seats.length; i++) {
        const updateStatusBookingPayload={
          lockedBy:userId,
          status:seat_status.locked,
          lockedUntil: new Date(Date.now() + 10 * 60 * 1000)
        }
        await upateSeatStatus(seats[i].id,updateStatusBookingPayload, tx);
      }
    },{isolationLevel: Prisma.TransactionIsolationLevel.Serializable});
    return result;
  } catch (error) {
    throw new Error("Failed to create booking");
  }
};
export const getBookings = async () => {
  return await findAllBookings();
};

export const getBookingById = async (bookingId: string) => {
  return await findBookingById(bookingId);
};
export const updateBooking = async (
  bookingId: string,
  bookingData: Partial<createBookingInput>,
) => {
  return await updateBookingById(bookingId, bookingData);
};
