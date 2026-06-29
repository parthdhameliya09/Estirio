import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma"
import { createBookingInput } from "../booking/booking.types"

export const getRouteId=async(routeId:string)=>{
    return await prisma.routes.findUnique({
        where:{
            id:routeId
        }
    })
}

export const getBusById=async(busId:string)=>{
    return await prisma.buses.findUnique({
        where:{
            id:busId
        }
    })
}

export const getDriverById=async(driverId:string)=>{
    return await prisma.crews.findUnique({
        where:{
            id:driverId,
            role:"driver",
            isActive:true
        }
    })
}

export const getConductorById=async(conductorId:string)=>{
    return await prisma.crews.findUnique({
        where:{
            id:conductorId,
            role:"conductor",
            isActive:true
        }
    })
}

export const getOperatorByUserId=async(userId:string)=>{
    return await prisma.bus_operators.findUnique({
        where:{
            id:userId
        }
    })
}

export const createTrip=async(data:Prisma.tripsCreateInput)=>{
    return await prisma.trips.create({
        data
    })
}

export const createTripFare=async(data:Prisma.trip_faresCreateInput)=>{
    return await prisma.trip_fares.create({
        data
    })
}

export const getBusSeats=async(busId:string)=>{
    return await prisma.seat_configs.findMany({
        where:{
            id:busId
        }
    })
}