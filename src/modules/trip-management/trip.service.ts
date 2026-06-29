import { createInput } from "./trip.types"
import { getRouteById } from "../routes/routes.dao";
import { getBusById,getDriverById,getConductorById,getOperatorByUserId,createTrip as createTripDao, createTripFare, getBusSeats } from "./trip.dao";
import { trip_status } from "../../../generated/prisma/enums";

export const createTrip=async(data:createInput,userId:string)=>{
     const {routeId,busId,driverId,conductorId,departureTime,arrivalTime,tripCode,price}=data;

     const operator = await getOperatorByUserId(userId);

     if(!operator){
        throw new Error("Operator not found");
     }

     const route = await getRouteById(routeId);
     
     if(!route){
        throw new Error("please select the valid Routes");
     }

     const bus=await getBusById(busId);

     if(!bus){
        throw new Error("Bus not found");
     }

     const driver=await getDriverById(driverId);

     if(!driver){
        throw new Error("driver is not available");
     }
     const conductor=await getConductorById(conductorId);   

     if(!conductor){
        throw new Error("conductor is not available");
    }

    const createTripInputRecord={
        route:{connect:{id:routeId}},
        bus:{connect:{id:busId}},
        driver:{connect:{id:driverId}},
        conductor:{connect:{id:conductorId}},
        departureTime,
        arrivalTime,
        availableSeats:bus.totalSeats,
        status:trip_status.scheduled,
        tripCode
    }

    const tripRecord=await createTripDao(createTripInputRecord);


    const tripFareInputRecord={
        trip:{connect:{id:tripRecord.id}},
        route:{connect:{id:routeId}},
        price
    }

    const tripFareRecord=await createTripFare(tripFareInputRecord);

    const busSeats=await getBusSeats(busId);

    const seatInventoryRecord=busSeats.map((seat)=>({
        tripid:tripRecord.id,
        busSeatId:seat.id,
        price
    }))


    


}
