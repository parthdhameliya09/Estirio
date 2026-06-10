import { Prisma } from "../../../generated/prisma/client.js";
import prisma from "../../config/prisma.js";
import { UpdateBookingRecord, createBookingInputRecord,passengerRecordPayload,seatRecordPayload,updateStatusBookingPayload } from "./booking.types.js";
import{seat_status} from "../../../generated/prisma/client.js";

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
export const getBookingSeatsById=async(bookingId:string,tx:Prisma.TransactionClient)=>{
  return await prisma.booking_seats.findMany({
    where:{id:bookingId}
  })
}
export const cancleBookingById = async (bookingId: string,updatePayload: UpdateBookingRecord,tx:Prisma.TransactionClient) => {
  return await prisma.bookings.update({
    where: { id: bookingId },
    data:updatePayload
  });
};
export const releaseSeat=async(seatsIds:string[], tx:Prisma.TransactionClient)=>{
  return await tx.seat_inventory.updateMany({
    where:{
      id:{
        in:seatsIds
      }
    },
    data:{  
      status:seat_status.available
    }
  
  })
}
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
