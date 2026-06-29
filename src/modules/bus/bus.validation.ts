import { z } from "zod";

export const createBusSchema = z.object({
    body: z.object({
        operatorId: z.string().uuid("operatorId must be a valid UUID"),
        vehicleNumber: z.string().min(1, "Vehicle number is required"),
        registrationNumber: z.string().min(1, "Registration number is required"),
        type: z.enum(["ac", "non_ac"]),
        totalSeats: z.number().int().positive("Total seats must be a positive integer"),
    }),
});

export const getBusSchema = z.object({
    params: z.object({
        id: z.string().uuid("id must be a valid UUID"),
    }),
});

export const updateBusSchema = z.object({
    params: z.object({
        id: z.string().uuid("id must be a valid UUID"),
    }),
    body: z.object({
        vehicleNumber: z.string().min(1).optional(),
        registrationNumber: z.string().min(1).optional(),
        type: z.enum(["ac", "non_ac"]).optional(),
        totalSeats: z.number().int().positive().optional(),
        isActive: z.boolean().optional(),
    }),
});

export const createSeatConfigSchema = z.object({
    params: z.object({
        busId: z.string().uuid("busId must be a valid UUID"),
    }),
    body: z.object({
        seatNumber: z.string().min(1, "Seat number is required"),
        seatType: z.enum(["seater", "sleeper"]),
        deck: z.enum(["upper", "lower"]),
        isWindow: z.boolean(),
        isLadiesSeat: z.boolean(),
    }),
});

export const getSeatConfigSchema = z.object({
    params: z.object({
        busId: z.string().uuid("busId must be a valid UUID"),
        seatId: z.string().uuid("seatId must be a valid UUID"),
    }),
});

export const updateSeatConfigSchema = z.object({
    params: z.object({
        busId: z.string().uuid("busId must be a valid UUID"),
        seatId: z.string().uuid("seatId must be a valid UUID"),
    }),
    body: z.object({
        seatType: z.enum(["seater", "sleeper"]).optional(),
        deck: z.enum(["upper", "lower"]).optional(),
        isWindow: z.boolean().optional(),
        isLadiesSeat: z.boolean().optional(),
    }),
});

export type createBusSchema = z.infer<typeof createBusSchema>;
export type getBusSchema = z.infer<typeof getBusSchema>;
export type updateBusSchema = z.infer<typeof updateBusSchema>;
export type createSeatConfigSchema = z.infer<typeof createSeatConfigSchema>;
export type getSeatConfigSchema = z.infer<typeof getSeatConfigSchema>;
export type updateSeatConfigSchema = z.infer<typeof updateSeatConfigSchema>;
