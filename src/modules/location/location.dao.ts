import prisma from "../../config/prisma";
import { locationData,updateLocationData } from "./location.types";

export const addLocation=async({name,latitude,longitude}:locationData)=>{
    return await prisma.locations.create({
        data:{
            name,
            latitude,
            longitude
        }
    })
}

export const getLocation=async()=>{
    return await prisma.locations.findMany();
}

export const getLocationById=async(locationId:string)=>{
    return await prisma.locations.findUnique({
        where:{
            id:locationId
        }
    })
}

export const updateLocation=async(locationId:string,updateData:updateLocationData)=>{
    return await prisma.locations.update({
        where:{
            id:locationId
        },
        data:updateData
    })

}

export const removeLocation=async(locationId:string)=>{
    return await prisma.locations.delete({
        where:{
            id:locationId
        }
    })
}