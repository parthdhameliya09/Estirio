import { Router } from "express";
import {
  createRoute as createRouteController,
  getRoutes as getRoutesController,
  getRouteById as getRouteByIdByIdController,
  updateRoute as updateRouteController,
  removeRoute as removeRouteController,
} from "./routes.controller";
import { validate } from "../../middlewares/validate";
import { createRouteSchema, updateRouteSchema } from "./routes.validation";
export const routesRoute = Router();

routesRoute.post("/", validate(createRouteSchema), createRouteController);
routesRoute.get("/", getRoutesController);
routesRoute.get("/:routeId", getRouteByIdByIdController);
routesRoute.patch("/:routeId", validate(updateRouteSchema), updateRouteController);
routesRoute.delete("/:routeId", removeRouteController);
