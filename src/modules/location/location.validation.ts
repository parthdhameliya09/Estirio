import {z} from "zod";

export const createLocationSchema=z.object({
    name:z.string,
    latitude:z.number,
    longitude:z.number
})

export const updateLocationSchema=z.object({
    params: z.object({
        locationId: z.uuid("Invalid booking ID format"),
    }),
    body:z.object({
        name:z.string().optional(),
        latitude:z.number().optional(),
        longitude:z.number().optional()
    }),

});
export type upadateLocationParams=z.infer<typeof updateLocationSchema>;