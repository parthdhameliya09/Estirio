import { Prisma } from "../../../generated/prisma/client.js";
import prisma from "../../config/prisma.js";
import { createBookingInput, createBookingInputRecord,passengerRecordPayload,seatRecordPayload,updateStatusBookingPayload } from "./booking.types.js";

export const createBookingRecord = async (bookingPayload: createBookingInputRecord,tx: Prisma.TransactionClient,) => {
  return await tx.bookings.create({
    data: bookingPayload,
  });
};
export const createBookingSeatsRecord = async (seatRecordPayload: seatRecordPayload,tx: Prisma.TransactionClient,) => {
  return await tx.booking_seats.create({
    data:seatRecordPayload,
  });
};

export const createPassengerRecord = async (passengerPayload: passengerRecordPayload, tx: Prisma.TransactionClient) => {
  return await tx.booking_passengers.create({
    data: passengerPayload,
  });
};

export const upateSeatStatus = async(seatId:string,updateStatusBookingPayload:updateStatusBookingPayload, tx: Prisma.TransactionClient)=>{
    return await tx.seat_inventory.update({
        where:{id:seatId},
        data:updateStatusBookingPayload
    });
}

export const findAllBookings = async () => {
  return await prisma.bookings.findMany();
};

export const findBookingById = async (bookingId: string) => {
  return await prisma.bookings.findUnique({
    where: { id: bookingId },
  });
};

export const updateBookingById = async (bookingId: string,bookingData: Partial<createBookingInput>,) => {
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
export const getSeatsByIds = async (seatIds: string[],tx:Prisma.TransactionClient) => {
  return await tx.seat_inventory.findMany({
    where: {
      id: {
        in: seatIds,
      },
    },
  });
};
