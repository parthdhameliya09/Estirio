import { Prisma } from "../../../generated/prisma/client";
import {
    createBus as createBusDao,
    getBusById as getBusByIdDao,
    getBusesByOperator as getBusesByOperatorDao,
    updateBus as updateBusDao,
    createSeatConfig as createSeatConfigDao,
    getSeatConfigById as getSeatConfigByIdDao,
    getSeatConfigsByBus as getSeatConfigsByBusDao,
    updateSeatConfig as updateSeatConfigDao,
    deleteSeatConfig as deleteSeatConfigDao,
} from "./bus.dao";
import {
    CreateBusRequest,
    UpdateBusRequest,
    CreateSeatConfigRequest,
    UpdateSeatConfigRequest,
} from "./bus.types";

export const createBus = async ({
    operatorId,
    vehicleNumber,
    registrationNumber,
    type,
    totalSeats,
}: CreateBusRequest) => {
    const data: Prisma.busesCreateInput = {
        vehicleNumber,
        registrationNumber,
        type,
        totalSeats,
        bus_operator: { connect: { id: operatorId } },
    };

    return createBusDao(data);
};

export const getBus = async (id: string) => {
    const bus = await getBusByIdDao(id);
    if (!bus) throw new Error("Bus not found");
    return bus;
};

export const getBusesByOperator = async (operatorId: string) => {
    return getBusesByOperatorDao(operatorId);
};

export const updateBus = async ({
    id,
    vehicleNumber,
    registrationNumber,
    type,
    totalSeats,
    isActive,
}: UpdateBusRequest) => {
    const updateData: Prisma.busesUpdateInput = {};

    if (vehicleNumber !== undefined) updateData.vehicleNumber = vehicleNumber;
    if (registrationNumber !== undefined) updateData.registrationNumber = registrationNumber;
    if (type !== undefined) updateData.type = type;
    if (totalSeats !== undefined) updateData.totalSeats = totalSeats;
    if (isActive !== undefined) updateData.isActive = isActive;

    return updateBusDao({ id, updateData });
};

export const createSeatConfig = async ({
    busId,
    seatNumber,
    seatType,
    deck,
    isWindow,
    isLadiesSeat,
}: CreateSeatConfigRequest) => {
    const data: Prisma.seat_configsCreateInput = {
        seatNumber,
        seatType,
        deck,
        isWindow,
        isLadiesSeat,
        bus: { connect: { id: busId } },
    };

    return createSeatConfigDao(data);
};

export const getSeatConfig = async (id: string) => {
    const seat = await getSeatConfigByIdDao(id);
    if (!seat) throw new Error("Seat config not found");
    return seat;
};

export const getSeatConfigsByBus = async (busId: string) => {
    return getSeatConfigsByBusDao(busId);
};

export const updateSeatConfig = async ({
    id,
    seatType,
    deck,
    isWindow,
    isLadiesSeat,
}: UpdateSeatConfigRequest) => {
    const updateData: Prisma.seat_configsUpdateInput = {};

    if (seatType !== undefined) updateData.seatType = seatType;
    if (deck !== undefined) updateData.deck = deck;
    if (isWindow !== undefined) updateData.isWindow = isWindow;
    if (isLadiesSeat !== undefined) updateData.isLadiesSeat = isLadiesSeat;

    return updateSeatConfigDao({ id, updateData });
};

export const deleteSeatConfig = async (id: string) => {
    await getSeatConfig(id); // throws if not found
    return deleteSeatConfigDao(id);
};
