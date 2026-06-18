import { locationData, updateLocationData } from "./location.types";
import {
  addLocation as addLocationDao,
  getLocation as getLocationDao,
  getLocationById as getLocationByIdDao,
  updateLocation as updateLocationDao,
  removeLocation as removeLocationDao,
} from "./location.dao";

export const addLocation = async ({ name, latitude, longitude }: locationData) => {
  try {
    return await addLocationDao({ name, latitude, longitude });
  } catch (error) {
    throw new Error("failed to add location");
  }
};

export const getLocation = async () => {
  try {
    return await getLocationDao();
  } catch (error) {
    throw new Error("faild to fetch location");
  }
};

export const getLocationById = async (locationId: string) => {
  try {
    return await getLocationByIdDao(locationId);
  } catch (error) {
    throw new Error("failed to get location by id");
  }
};

export const updateLocation = async (locationId: string, updateData: updateLocationData) => {
  try {
    return await updateLocationDao(locationId, updateData);
  } catch {
    throw new Error("failed to update location");
  }
};

export const removeLocation = async (locationId: string) => {
  try {
    return await removeLocationDao(locationId);
  } catch (error) {
    throw new Error("failed to delete location");
  }
};
