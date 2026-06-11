import {
    addRouteStop as addRouteStopDao,
    getRouteStop as getRoutesStopDao,
    getRouteStopById as getRouteStopByIdDao,
    updateRouteStop as updateRouteStopDao,
    removeRouteStop as removeRouteStopDao
 } from "./routes-stop.dao"
 import { getRouteById,getLocationById } from "./routes-stop.dao";
 import { routeStopData, updateRouteStopData } from "./routes-stop.types";

export const addRouteStop=async({routeId,locationId,stopOrder}:routeStopData)=>{
    try{
        const route=getRouteById(routeId);
        if(!route){
            throw new Error("Route not found");
        }
        const location=getLocationById(locationId);
        if(!location){
            throw new Error("Destination not found")
        }
        return await addRouteStopDao({routeId,locationId,stopOrder});
    }
    catch(error){
        throw new Error("failed to add location");
    }
}

export const getRoutesStop=async()=>{
    try{
        return await getRoutesStopDao();
    }
    catch(error){
        throw new Error("faild to fetch routes-stop");
    }
}

export const getRoutesStopById=async(routeId:string)=>{
    try{
        return await getRouteStopByIdDao(routeId);
    }
    catch(error){
        throw new Error("failed to get location by id");
    }
}

export const updateRouteStop=async(routeId:string,updateData:updateRouteStopData)=>{
    try{
        return await updateRouteStopDao(routeId,updateData);
    }
    catch{
        throw new Error("failed to update route");    
    }
}

export const removeRouteStop=async(routeId:string)=>{
    try{
        return await removeRouteStopDao(routeId);
    }
    catch(error){
        throw new Error("failed to delete location");
    }
}