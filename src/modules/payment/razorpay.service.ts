import { razorpay } from "../../config/razorpay";
import crypto from "crypto";

export const createRazorPayOrder = async (amount: number, receipt: string) => {
  return await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: receipt,
  });
};

export const verifyRazorpaySignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
) => {
  const generateSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");

  if (generateSignature === razorpaySignature) {
    return true;
  } else {
    return false;
  }
};
