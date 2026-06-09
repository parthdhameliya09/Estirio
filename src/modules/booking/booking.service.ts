import {
  findAllBookings,
  findBookingById,
  updateBookingById,
  getTripById,
  getSeatsByIds,
  createBookingRecord,
  createBookingSeatsRecord,
  createPassengerRecord
} from "./booking.dao.js";
import { createBookingInput } from "./booking.types.js";
import prisma from "../../config/prisma.js";
import { booking_status } from "../../../generated/prisma/client.js";

export const createBooking = async (bookingData: createBookingInput) => {

  const { userId, tripId, pickupStopId, dropoffStopId, passenger} = bookingData;
  const trip = await getTripById(tripId);
  if (!trip) {
    throw new Error("Trip not found");
  }
  const seatIds =passenger.map((p) => p.seatInventoryId) || [];
  const seats = await getSeatsByIds(seatIds);
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
    status:booking_status.pending_payment,
    cancellationReason:"",
  };
  const result = await prisma.$transaction(async (tx) => {
    const bookingRecord = await createBookingRecord(bookingPayload, tx);
    const bookingId =bookingRecord.id;
    const bookingseatsId=[];
    for (let i = 0; i < seats.length; i++) {
      const seatRecord = await createBookingSeatsRecord(seats[i].id,seats[i].price,bookingId, tx);
      bookingseatsId.push(seatRecord.id);
    }
    for(let i=0;i<passenger.length;i++){
      const passengerData= await createPassengerRecord(bookingId,bookingseatsId[i],passenger[i].firstname,passenger[i].lastname,passenger[i].age,passenger[i].gender,tx);
    }
  })
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
