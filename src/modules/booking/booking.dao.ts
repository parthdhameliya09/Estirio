import { Prisma } from "../../../generated/prisma/client.js";
import prisma from "../../config/prisma.js";
import { createBookingInput, createBookingInputRecord } from "./booking.types.js";

export const createBookingRecord = async (
  bookingPayload: createBookingInputRecord,
  tx: Prisma.TransactionClient,
) => {
  return await tx.bookings.create({
    data: bookingPayload,
  });
};
export const createBookingSeatsRecord = async (
  seatInventoryId: string,
  price: number,
  bookingId: string,
  tx: Prisma.TransactionClient,
) => {
  return await tx.booking_seats.create({
    data: {
      bookingId,
      seatInventoryId,
      fare: price,
    },
  });
};

export const createPassengerRecord = async (
  bookingId: string,
  bookingSeatsId: string,
  firstname: string,
  lastname: string,
  age: number,
  gender: string,
  tx: Prisma.TransactionClient,
) => {
  return await tx.booking_passengers.create({
    data: {
      bookingId,
      bookingSeatsId,
      firstName: firstname,
      lastName: lastname,
      age: age,
      gender: gender,
    },
  });
};

export const findAllBookings = async () => {
  return await prisma.bookings.findMany();
};

export const findBookingById = async (bookingId: string) => {
  return await prisma.bookings.findUnique({
    where: { id: bookingId },
  });
};

export const updateBookingById = async (
  bookingId: string,
  bookingData: Partial<createBookingInput>,
) => {
  return await prisma.bookings.update({
    where: { id: bookingId },
    data: bookingData,
  });
};

export const getTripById = async (tripId: string) => {
  return await prisma.trips.findUnique({
    where: { id: tripId },
  });
};
export const getSeatsByIds = async (seatIds: string[]) => {
  return await prisma.seat_inventory.findMany({
    where: {
      id: {
        in: seatIds,
      },
    },
  });
};
