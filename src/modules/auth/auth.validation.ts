import z from "zod";

export const registerSchema = z.object({
   body: z.object({
      firstName: z.string().min(1, { message: "Name is required" }),
      lastName: z.string(),
      email: z.email({ message: "enter a valid email" }).toLowerCase(),
      password: z.string().min(6),
      phoneNumber: z.e164({ message: "enter a valid phone number" }),
   }),
});

export const loginSchema = z.object({
   body: z.object({
      email: z.email({ message: "enter a valid email" }).toLowerCase(),
      password: z.string().min(6),
   }),
});
