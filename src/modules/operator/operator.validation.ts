import { z } from "zod";

export const createOperatorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    gstNumber: z.string().min(15, "GST Number must be at least 15 characters long"),
    email: z.email(),
    phoneNumber: z.string().min(10, "Phone Number must be at least 10 characters long"),
    isPrivate: z.boolean().default(true),
});

export const getOperatorSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});


export const updateOperatorSchema = z.object({
    params : z.object({id:z.string().min(1, "Id is required")}),
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters long").optional(),
        phoneNumber: z.string().min(10, "Phone Number must be at least 10 characters long").optional(),
        isPrivate: z.boolean().optional(),
        isActive: z.boolean().optional(),
    })
});

export type getOperatorSchema = z.infer<typeof getOperatorSchema>;
export type updateOperatorSchema = z.infer<typeof updateOperatorSchema>;
