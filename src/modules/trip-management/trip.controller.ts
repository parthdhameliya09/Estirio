import { Request,Response,NextFunction } from "express"
import { createTrip as createTripService } from "./trip.service";

export const createTrip=async(req:Request,res:Response)=>{
    try {
        const input=req.body;
         const {userId} = req.user;
        const result=await createTripService(input,userId);
    } catch (error) {
        
    }
}