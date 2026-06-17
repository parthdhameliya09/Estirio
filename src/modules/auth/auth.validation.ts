import z from "zod";

export const registerSchema = z.object({
   body: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.email().toLowerCase(),
      password: z.string().min(6),
      phoneNumber: z.e164(),
   }),
});

export const loginSchema = z.object({
   body: z.object({
      email: z.email().toLowerCase(),
      password: z.string().min(6),
   }),
});
