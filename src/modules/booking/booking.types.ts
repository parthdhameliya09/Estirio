import { booking_status } from "../../../generated/prisma/client";

interface createBookinInputMaster{
    userId: string;
    tripId:string;
    pickupStopId:string;
    dropoffStopId:string;
}

export interface createBookingInput extends createBookinInputMaster{
    passenger:passengerInfo[];
}

export interface createBookingInputRecord extends createBookinInputMaster{
    totalAmount:number;
    totalSeats:number;
    status:booking_status;
    cancellationReason:string;
}
export interface passengerInfo{
    firstname:string;
    lastname:string;
    age:number;
    gender:string;
    seatInventoryId:string;
}
export interface BookingParams{
  bookingId: string;
}

