import { Router } from "express";
import {
  createRouteStop as createRouteStopController,
  getRoutesStop as getRoutesStopController,
  getRouteStopById as getRouteStopByIdController,
  updateRouteStop as updateRouteStopController,
  removeRouteStop as removeRouteStopController,
} from "./routes-stop.controller";
import { validate } from "../../middlewares/validate";
import { createRouteStopSchema, updateRouteStopSchema } from "./routes-stop.validation";
export const routesRoute = Router();

routesRoute.post("/", validate(createRouteStopSchema), createRouteStopController);
routesRoute.get("/", getRoutesStopController);
routesRoute.get("/:routeId", getRouteStopByIdController);
routesRoute.patch("/:routeId", validate(updateRouteStopSchema), updateRouteStopController);
routesRoute.delete("/:routeId", removeRouteStopController);
