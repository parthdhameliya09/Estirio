import {Router} from "express";
import { 
    addLocation as locationController, 
    getLocation as getLocationController, 
    getLocationById as getLocationByIdController,
    updateLocation as updateLocationController,
    removeLocation as removeLocationController
 } from "./location.controller";
 import {createLocationSchema,updateLocationSchema} from "./location.validation";
 import { validate } from "../../middlewares/validate";

export const locationRoutes=Router();

locationRoutes.post("/",validate(createLocationSchema),locationController);
locationRoutes.get("/",getLocationController);
locationRoutes.get("/:locationId",getLocationByIdController);
locationRoutes.patch("/:locationId",validate(updateLocationSchema),updateLocationController);
locationRoutes.delete("/:locationId",removeLocationController);