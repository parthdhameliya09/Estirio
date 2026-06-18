import { Router } from "express";
import {
  createPaymentIntent as createPaymentIntentController,
  verifyPayment as verifyPaymentController,
} from "./payment.controller";

export const paymentRoute = Router();

paymentRoute.post("/create-intent", createPaymentIntentController);
paymentRoute.post("/verify", verifyPaymentController);
