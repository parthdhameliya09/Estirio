import { z } from "zod";

export const createRouteStopSchema = z.object({
  routeId: z.uuid,
  locationId: z.uuid,
  stopOrder: z.number,
});

export const updateRouteStopSchema = z.object({
  params: z.object({
    routeStopId: z.uuid(),
  }),

  body: z.object({
    routeId: z.uuid().optional(),
    locationId: z.uuid().optional(),
    stopOrder: z.number().optional(),
  }),
});

export type updateRouteStopParams = z.infer<typeof updateRouteStopSchema>;
