import { z } from "zod";

export const updateUserSchema = z.object({
   body: z.object({
      firstName: z.string().min(1, { message: "Name is required" }).optional(),
      lastName: z.string().optional(),
      phoneNumber: z.e164({ message: "enter a valid phone number" }).optional(),
   }),
});
