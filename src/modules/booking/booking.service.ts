import {
  findAllBookings,
  findBookingById,
  cancleBookingById,
  getTripById,
  getSeatsByIds,
  createBookingRecord,
  createBookingSeatsRecord,
  createPassengerRecord,
  upateSeatStatus,
  getBookingSeatsById,
  releaseSeat,
  releaseExpiredLocks,
} from "./booking.dao.js";
import { Prisma } from "../../../generated/prisma/client.js";
import { createBookingInput } from "./booking.types.js";
import prisma from "../../config/prisma.js";
import { booking_status, seat_status } from "../../../generated/prisma/client.js";

export const createBooking = async (bookingData: createBookingInput) => {
  try {
    const { userId, tripId, pickupStopId, dropoffStopId, passenger } = bookingData;
    const trip = await getTripById(tripId);
    console.log("trip", trip);
    if (!trip) {
      throw new Error("Trip not found");
    }
    const seatIds = passenger.map((p) => p.seatInventoryId);
    console.log("seatIds", seatIds);

    const lockUntil = new Date(Date.now() + 10 * 60 * 1000);

    const result = await prisma.$transaction(
      async (tx) => {
        await releaseExpiredLocks(tx);

        const seats = await getSeatsByIds(seatIds, tx);
        if (seats.length !== seatIds.length) {
          throw new Error("seat not exists");
        }
        console.log("seats", seats);

        const seatNotAvailable = seats.filter((seat) => {
          if (seat.status === "booked") {
            return true;
          }
          if (
            seat.status === "locked" &&
            seat.lockedUntil &&
            seat.lockedUntil > new Date(Date.now())
          ) {
            return true;
          }
          return false;
        });
        if (seatNotAvailable.length > 0) {
          throw new Error("Some seats are not available");
        }

        for (let i = 0; i < seats.length; i++) {
          const updateStatusBookingPayload = {
            lockedBy: userId,
            status: seat_status.locked,
            lockedUntil: lockUntil,
          };
          const updates = await upateSeatStatus(seats[i].id, updateStatusBookingPayload, tx);
          console.log("update", updates);
        }

        const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
        const totalSeats = seats.length;
        // create booking
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
        console.log("bookingrecord", bookingRecord);
        const bookingId = bookingRecord.id;

        // create booking seats
        const bookingseats = [];
        for (let i = 0; i < seats.length; i++) {
          const seatRecordPaload = {
            seatInventoryId: seats[i].id,
            fare: seats[i].price,
            bookingId,
          };
          const seatRecord = await createBookingSeatsRecord(seatRecordPaload, tx);
          console.log("seatrecord", seatRecord);
          bookingseats.push(seatRecord);
        }

        //create passenger
        for (let i = 0; i < passenger.length; i++) {
          const passengerRecordPayload = {
            bookingId,
            bookingSeatsId: bookingseats[i].id,
            firstName: passenger[i].firstName,
            lastName: passenger[i].lastName,
            age: passenger[i].age,
            gender: passenger[i].gender,
          };
          const pass = await createPassengerRecord(passengerRecordPayload, tx);
          console.log("pass", pass);
        }
        const ans = {
          bookingId: bookingRecord.id,
          totalAmount,
          totalSeats,
          status: booking_status.pending_payment,
          lockUntil,
        };
        console.log("response", ans);
        return {
          bookingId: bookingRecord.id,
          totalAmount,
          totalSeats,
          status: booking_status.pending_payment,
          lockUntil,
        };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBookings = async () => {
  return await findAllBookings();
};

export const getBookingById = async (bookingId: string) => {
  return await findBookingById(bookingId);
};

export const cancleBooking = async ({
  bookingId,
  cancellationReason,
}: {
  bookingId: string;
  cancellationReason: string;
}) => {
  const updatePayload = {
    status: booking_status.cancelled,
    cancellationReason,
  };

  return prisma.$transaction(async (tx) => {
    const bookingSeats = await getBookingSeatsById(bookingId, tx);
    const seatIdS = bookingSeats.map((seat) => seat.seatInventoryId);
    const upadatebooking = cancleBookingById(bookingId, updatePayload, tx);
    await releaseSeat(seatIdS, tx);

    return upadatebooking;
  });
};
