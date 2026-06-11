import {
    addRoute as addRouteDao,
    getRoute as getRoutesDao,
    getRouteById as getRouteByIdDao,
    updateRoute as updateRouteDao,
    removeRoute as removeRouteDao
 } from "./routes.dao"
 import { getSourceById,getDestinationById } from "./routes.dao";
 import { routeData, UpdateRouteData } from "./routes.types";

export const addRoute=async({sourceId,destinationId,distanceKm,estimatedDurationMinutes,isActive}:routeData)=>{
    try{
        const source=getSourceById(sourceId);
        if(!source){
            throw new Error("Source not found");
        }
        const destination=getDestinationById(destinationId);
        if(!destination){
            throw new Error("Destination not found")
        }
        return await addRouteDao({sourceId,destinationId,distanceKm,estimatedDurationMinutes,isActive});
    }
    catch(error){
        throw new Error("failed to add location");
    }
}

export const getRoutes=async()=>{
    try{
        return await getRoutesDao();
    }
    catch(error){
        throw new Error("faild to fetch routes");
    }
}

export const getRoutesById=async(routeId:string)=>{
    try{
        return await getRouteByIdDao(routeId);
    }
    catch(error){
        throw new Error("failed to get location by id");
    }
}

export const updateRoute=async(locationId:string,updateData:UpdateRouteData)=>{
    try{
        return await updateRouteDao(locationId,updateData);
    }
    catch{
        throw new Error("failed to update route");    
    }
}

export const removeRoute=async(routeId:string)=>{
    try{
        return await removeRouteDao(routeId);
    }
    catch(error){
        throw new Error("failed to delete location");
    }
}