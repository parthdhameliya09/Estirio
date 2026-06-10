import { z } from "zod";

export const createCrewSchema = z.object({
    params: z.object({
        id: z.string().uuid("id must be a valid UUID"),
    }),
    body : z.object({
    role: z.enum(["driver", "conductor"]),
    userId: z.string().uuid("userId must be a valid UUID"),
    operatorId: z.string().uuid("operatorId must be a valid UUID"),
    licenseNumber: z.string().min(1, "License number is required"),
    licenseExpiry: z.string().datetime("licenseExpiry must be a valid ISO datetime"),
    emergencyContact: z.string().min(10, "Emergency contact must be at least 10 characters"),
    })
});

export const updateCrewSchema = z.object({
    params: z.object({
        id: z.string().uuid("id must be a valid UUID"),
    }),
    body : z.object({
    role: z.enum(["driver", "conductor"]).optional(),
    licenseNumber: z.string().min(1).optional(),
    licenseExpiry: z.string().datetime().optional(),
    emergencyContact: z.string().min(10).optional(),
    isActive: z.boolean().optional(),
    })
});

export type createCrewSchema = z.infer<typeof createCrewSchema>;
export type updateCrewSchema = z.infer<typeof updateCrewSchema>;