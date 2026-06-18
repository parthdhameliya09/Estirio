import prisma from "../../config/prisma";
import { paymentRecordInput } from "./payment.types";
import { booking_status, payment_status, seat_status } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/client.js";

export const getLatestPaymentByBookingId = async (bookingId: string) => {
  return await prisma.payments.findFirst({
    where: {
      bookingId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createPaymentRecord = async (paymentRecord: paymentRecordInput) => {
  return await prisma.payments.create({
    data: paymentRecord,
  });
};

export const getPaymentModeByName = async (name: string) => {
  return await prisma.payment_modes.findUnique({
    where: {
      name,
    },
  });
};

export const getPaymentByOrderId = async (providerOrderId: string) => {
  return await prisma.payments.findUnique({
    where: {
      providerOrderId,
    },
  });
};

export const updatePayment = async (
  paymentId: string,
  razorPayPaymentId: string,
  tx: Prisma.TransactionClient,
) => {
  return await tx.payments.update({
    where: {
      id: paymentId,
    },
    data: {
      status: payment_status.success,
      providerPaymentId: razorPayPaymentId,
    },
  });
};

export const updateBooking = async (bookingId: string, tx: Prisma.TransactionClient) => {
  return await tx.bookings.update({
    where: {
      id: bookingId,
    },
    data: {
      status: booking_status.confirmed,
    },
  });
};

export const updateSeat = async (seatIds: string[], tx: Prisma.TransactionClient) => {
  return await tx.seat_inventory.updateMany({
    where: {
      id: {
        in: seatIds,
      },
    },
    data: {
      status: seat_status.booked,
      lockedBy: null,
      lockedUntil: null,
    },
  });
};
