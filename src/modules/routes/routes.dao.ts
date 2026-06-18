import prisma from "../../config/prisma";
import { routeData, UpdateRouteData } from "./routes.types";

export const getSourceById = async (sourceId: string) => {
  return await prisma.locations.findUnique({
    where: {
      id: sourceId,
    },
  });
};
export const getDestinationById = async (destinationId: string) => {
  return await prisma.locations.findUnique({
    where: {
      id: destinationId,
    },
  });
};

export const addRoute = async ({
  sourceId,
  destinationId,
  distanceKm,
  estimatedDurationMinutes,
  isActive,
}: routeData) => {
  return await prisma.routes.create({
    data: {
      sourceId,
      destinationId,
      distanceKm,
      estimatedDurationMinutes,
      isActive,
    },
  });
};

export const getRoute = async () => {
  return await prisma.routes.findMany();
};

export const getRouteById = async (routeId: string) => {
  return await prisma.routes.findUnique({
    where: {
      id: routeId,
    },
  });
};

export const updateRoute = async (routeId: string, updateData: UpdateRouteData) => {
  return await prisma.routes.update({
    where: {
      id: routeId,
    },
    data: updateData,
  });
};

export const removeRoute = async (routeId: string) => {
  return await prisma.routes.delete({
    where: {
      id: routeId,
    },
  });
};
