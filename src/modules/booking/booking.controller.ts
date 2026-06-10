import {Request,Response} from "express";
import {
    getBookings as getBookingsService,
    createBooking as createBookingService,
    getBookingById as getBookingByIdService,
    cancleBooking as cancleBookingService} from "./booking.service.js";
import {BookingParams} from "./booking.types.js";
import {updateBookingParamsRequest} from "./booking.validation.js"


export const bookings = async (req:Request, res:Response)=>{
    try{
    //    const userId=req.user.id;
       const bookingData=req.body;
       const result=await createBookingService(bookingData);
       return res.status(201).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const getBooking = async (req:Request, res:Response)=>{
    try{
       const bookings= await getBookingsService();
       return res.status(200).json(bookings);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const getBookingById = async (req:Request<BookingParams>, res:Response)=>{
    try{
       const {bookingId}=req.params;
       const result= await getBookingByIdService(bookingId);
       return res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const updateBooking = async (req:Request<updateBookingParamsRequest['params']>, res:Response)=>{
    try{
       const {bookingId}=req.params;
       const {cancellationReason}=req.body;
       const result= await cancleBookingService({bookingId, cancellationReason});
        return res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}