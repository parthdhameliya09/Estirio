import { z } from "zod";

export const createRouteSchema = z.object({
  sourceId: z.uuid,
  destinationId: z.uuid,
  distanceKm: z.number,
  estimatedDurationMinutes: z.number,
  isActive: z.boolean,
});

export const updateRouteSchema = z.object({
  params: z.object({
    routeId: z.uuid(),
  }),

  body: z.object({
    sourceId: z.uuid().optional(),
    destinationId: z.uuid().optional(),
    distanceKm: z.number().optional(),
    estimatedDurationMinutes: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export type updateRouteParams = z.infer<typeof updateRouteSchema>;
