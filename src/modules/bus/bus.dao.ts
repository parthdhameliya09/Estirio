import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export const createBus = async (data: Prisma.busesCreateInput) => {
    return await prisma.buses.create({ data });
};

export const getBusById = async (id: string) => {
    return await prisma.buses.findUnique({
        where: { id },
        include: { seat_configs: true },
    });
};

export const getBusesByOperator = async (operatorId: string) => {
    return await prisma.buses.findMany({
        where: { operatorId },
        include: { seat_configs: true },
    });
};

export const updateBus = async ({id,updateData,}: {id: string;updateData: Prisma.busesUpdateInput;}) => {
    return await prisma.buses.update({ where: { id }, data: updateData });
};

export const createSeatConfig = async (data: Prisma.seat_configsCreateInput) => {
    return await prisma.seat_configs.create({ data });
};

export const getSeatConfigById = async (id: string) => {
    return await prisma.seat_configs.findUnique({ where: { id } });
};

export const getSeatConfigsByBus = async (busId: string) => {
    return await prisma.seat_configs.findMany({ where: { busId } });
};

export const updateSeatConfig = async ({ id,updateData,}: {id: string, updateData: Prisma.seat_configsUpdateInput;}) => {
    return await prisma.seat_configs.update({ where: { id }, data: updateData });
};

export const deleteSeatConfig = async (id: string) => {
    return await prisma.seat_configs.delete({ where: { id } });
};
