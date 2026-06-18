import { Request, Response } from "express";
import {
  addRouteStop as createRouteStopService,
  getRoutesStop as getRoutesStopService,
  getRoutesStopById as getRouteStopByIdService,
  updateRouteStop as updateRouteStopService,
  removeRouteStop as removeRouteStopService,
} from "./routes-stop.service";
import { updateRouteParams } from "../routes/routes.validation";

export const createRouteStop = async (req: Request, res: Response) => {
  try {
    const { routeId, locationId, stopOrder } = req.body;
    const result = await createRouteStopService({ routeId, locationId, stopOrder });
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoutesStop = async (req: Request, res: Response) => {
  try {
    const result = await getRoutesStopService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRouteStopById = async (
  req: Request<updateRouteParams["params"]>,
  res: Response,
) => {
  try {
    const { routeId } = req.params;
    const result = await getRouteStopByIdService(routeId);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRouteStop = async (req: Request<updateRouteParams["params"]>, res: Response) => {
  try {
    const { routeId } = req.params;
    const updateRouteStopData = req.body;
    const result = await updateRouteStopService(routeId, updateRouteStopData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeRouteStop = async (req: Request<updateRouteParams["params"]>, res: Response) => {
  try {
    const { routeId } = req.params;
    const result = await removeRouteStopService(routeId);
    res.status(200).json({
      message: "Route deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
