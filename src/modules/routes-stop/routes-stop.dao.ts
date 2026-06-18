import prisma from "../../config/prisma";
import { routeStopData, updateRouteStopData } from "./routes-stop.types";

export const getRouteById = async (routeId: string) => {
  return await prisma.routes.findUnique({
    where: {
      id: routeId,
    },
  });
};
export const getLocationById = async (locationId: string) => {
  return await prisma.routes.findUnique({
    where: {
      id: locationId,
    },
  });
};

export const addRouteStop = async ({ routeId, locationId, stopOrder }: routeStopData) => {
  return await prisma.route_stops.create({
    data: {
      routeId,
      locationId,
      stopOrder,
    },
  });
};

export const getRouteStop = async () => {
  return await prisma.route_stops.findMany();
};

export const getRouteStopById = async (routeStopId: string) => {
  return await prisma.route_stops.findUnique({
    where: {
      id: routeStopId,
    },
  });
};

export const updateRouteStop = async (routeStopId: string, updateData: updateRouteStopData) => {
  return await prisma.route_stops.update({
    where: {
      id: routeStopId,
    },
    data: updateData,
  });
};

export const removeRouteStop = async (routeStopId: string) => {
  return await prisma.route_stops.delete({
    where: {
      id: routeStopId,
    },
  });
};
