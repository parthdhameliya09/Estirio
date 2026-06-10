import { booking_status,seat_status } from "../../../generated/prisma/client";

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
export interface seatRecordPayload{
    seatInventoryId:string;
    fare:number;
    bookingId:string;
}
export interface passengerRecordPayload{
    bookingId:string;
    bookingSeatsId:string;
    firstName:string;
    lastName:string;
    age:number;
    gender:string;
}
export interface updateStatusBookingPayload{
    status:seat_status,
    lockedBy:string,
    lockedUntil:Date
}
export interface BookingParams{
  bookingId: string;
}

export interface UpdateBookingRecord{
    cancellationReason:string,
    status:booking_status
}

