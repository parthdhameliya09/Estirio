import { Request,Response } from "express";
import { 
    addLocation as addLocationService, 
    getLocation as getLocationService, 
    getLocationById as getLocationByIdService, 
    updateLocation as updateLocationService,
    removeLocation as removeLocationService
} from "./location.service";
import { upadateLocationParams } from "./location.validation";

export const addLocation=async(req:Request,res:Response)=>{
    try{
        const {name,latitude,longitude}=req.body;
        const result=await addLocationService({name,latitude,longitude});
        return res.status(201).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getLocation=async(req:Request,res:Response)=>{
    try{
        const result= await getLocationService();
        return res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getLocationById=async(req:Request<upadateLocationParams['params']>,res:Response)=>{
    try{
        const {locationId}=req.params;
        const result=await getLocationByIdService(locationId);
        return res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }

}

export const updateLocation=async(req:Request<upadateLocationParams['params']>,res:Response)=>{
    try{
        const {locationId}=req.params;
        const updateData=req.body;
        const result=await updateLocationService(locationId,updateData);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const removeLocation=async(req:Request<upadateLocationParams['params']>,res:Response)=>{
    try{
        const {locationId}=req.params;
        const result=await removeLocationService(locationId);
        res.status(200).json({
            message:"Location deleted successfully",
            data:result
        })
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}