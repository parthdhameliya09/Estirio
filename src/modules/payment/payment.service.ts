import { booking_status, payment_status } from "../../../generated/prisma/enums";
import { getBookingById } from "../booking/booking.service";
import { paymentData, PaymentVerifiedData } from "./payment.types";
import {
  getLatestPaymentByBookingId,
  getPaymentModeByName,
  createPaymentRecord,
  getPaymentByOrderId,
  updatePayment as updatePaymentDao,
  updateBooking as updateBookingDao,
  updateSeat as updateSeatDao,
} from "./payment.dao";
import { createRazorPayOrder, verifyRazorpaySignature } from "./razorpay.service";
import prisma from "../../config/prisma.js";
import { getBookingSeatsById } from "../booking/booking.dao";
import { error } from "node:console";

export const createPaymentIntent = async ({ bookingId }: paymentData) => {
  try {
    const booking = await getBookingById(bookingId);
    if (!booking) {
      throw new Error("Booking not Found");
    }
    if (booking.status !== booking_status.pending_payment) {
      throw new Error("Booking is not pending payment");
    }
    const existingPayment = await getLatestPaymentByBookingId(bookingId);
    if (existingPayment) {
      if (existingPayment.status === payment_status.success) {
        throw new Error("Booking already paid");
      }
      if (existingPayment.status === payment_status.pending) {
        return {
          paymentId: existingPayment.id,
          orderId: existingPayment.providerOrderId,
          amount: booking.totalAmount * 100,
          currency: "INR",
          key: process.env.RAZORPAY_KEY_ID,
          status: existingPayment.status,
        };
      }
    }

    const paymentMode = await getPaymentModeByName("Razorpay");
    if (!paymentMode) {
      throw new Error("Payment mode not found");
    }

    const order = await createRazorPayOrder(booking.totalAmount, booking.id);
    console.log(order);

    const payment = await createPaymentRecord({
      bookingId: booking.id,
      paymentModeId: paymentMode.id,
      providerOrderId: order.id,
      amount: booking.totalAmount,
      status: payment_status.pending,
    });
    console.log(payment);
    return {
      paymentId: payment.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      providerOrderId: payment.providerOrderId,
      providerPaymentId: payment.providerPaymentId,
    };
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async ({
  bookingId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: PaymentVerifiedData) => {
  const isValidSignature = verifyRazorpaySignature(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  );

  if (!isValidSignature) {
    throw new Error("Payment verification failed");
  }

  const payment = await getPaymentByOrderId(razorpayOrderId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.bookingId !== bookingId) {
    throw new Error("booking invalid");
  }

  if (payment.status === payment_status.success) {
    return {
      success: true,
      message: "Payment already verified",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    await updatePaymentDao(payment.id, razorpayPaymentId, tx);

    await updateBookingDao(bookingId, tx);

    const bookingSeats = await getBookingSeatsById(bookingId, tx);

    const seatIds = bookingSeats.map((seat) => seat.seatInventoryId);

    await updateSeatDao(seatIds, tx);

    return {
      success: true,
      message: "Payment verified",
    };
  });
  return result;
};
