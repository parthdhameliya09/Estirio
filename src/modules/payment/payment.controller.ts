import { Request, Response } from "express";
import { createPaymentIntent as createPaymentIntentService } from "./payment.service";
import { verifyPayment as verifyPaymentService } from "./payment.service";

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const result = await createPaymentIntentService({ bookingId });
    return res.status(201).json(result);
  } catch (error) {}
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const result = await verifyPaymentService({
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
    return res.status(201).json(result);
  } catch (error) {}
};
