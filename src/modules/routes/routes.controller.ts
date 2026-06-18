import { Request, Response } from "express";
import {
  addRoute as createRouteService,
  getRoutes as getRoutesService,
  getRoutesById as getRouteByIdService,
  updateRoute as updateRouteService,
  removeRoute as removeRouteService,
} from "./routes.service";
import { updateRouteParams } from "./routes.validation";

export const createRoute = async (req: Request, res: Response) => {
  try {
    const { sourceId, destinationId, distanceKm, estimatedDurationMinutes, isActive } = req.body;
    const result = await createRouteService({
      sourceId,
      destinationId,
      distanceKm,
      estimatedDurationMinutes,
      isActive,
    });
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const result = await getRoutesService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRouteById = async (req: Request<updateRouteParams["params"]>, res: Response) => {
  try {
    const { routeId } = req.params;
    const result = await getRouteByIdService(routeId);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRoute = async (req: Request<{ routeId: string }>, res: Response) => {
  try {
    const { routeId } = req.params;
    const updateRouteData = req.body;
    const result = await updateRouteService(routeId, updateRouteData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeRoute = async (req: Request<updateRouteParams["params"]>, res: Response) => {
  try {
    const { routeId } = req.params;
    const result = await removeRouteService(routeId);
    res.status(200).json({
      message: "Route deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
