import { payment_status } from "../../../generated/prisma/enums";

export interface paymentData {
  bookingId: string;
}

export interface paymentRecordInput {
  bookingId: string;
  paymentModeId: string;
  providerOrderId: string;
  amount: number;
  status: payment_status;
}
export interface PaymentVerifiedData {
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}
