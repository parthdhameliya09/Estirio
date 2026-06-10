import {Request,Response} from "express";
import {getBookings as getBookingsService,createBooking as createBookingService,getBookingById as getBookingByIdService,updateBooking as updateBookingService} from "./booking.service.js";
import {createBookingInput,BookingParams} from "./booking.types.js";


export const bookings = async (req:Request, res:Response)=>{
    try{
    //    const userId=req.user.id;
       const bookingData=req.body;
       const result=await createBookingService(bookingData);
       res.status(201).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const getBooking = async (req:Request, res:Response)=>{
    try{
       const bookings= await getBookingsService();
        res.status(200).json(bookings);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const getBookingById = async (req:Request<BookingParams>, res:Response)=>{
    try{
       const {bookingId}=req.params;
       const result= await getBookingByIdService(bookingId);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const updateBooking = async (req:Request<BookingParams>, res:Response)=>{
    try{
       const {bookingId}=req.params;
       const bookingData=req.body;
       const result= await updateBookingService(bookingId, bookingData);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}