import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export const createBus = (data: Prisma.busesCreateInput) => {
    return prisma.buses.create({ data });
};

export const getBusById = (id: string) => {
    return prisma.buses.findUnique({
        where: { id },
        include: { seat_configs: true },
    });
};

export const getBusesByOperator = (operatorId: string) => {
    return prisma.buses.findMany({
        where: { operatorId },
        include: { seat_configs: true },
    });
};

export const updateBus = ({
    id,
    updateData,
}: {
    id: string;
    updateData: Prisma.busesUpdateInput;
}) => {
    return prisma.buses.update({ where: { id }, data: updateData });
};

export const createSeatConfig = (data: Prisma.seat_configsCreateInput) => {
    return prisma.seat_configs.create({ data });
};

export const getSeatConfigById = (id: string) => {
    return prisma.seat_configs.findUnique({ where: { id } });
};

export const getSeatConfigsByBus = (busId: string) => {
    return prisma.seat_configs.findMany({ where: { busId } });
};

export const updateSeatConfig = ({
    id,
    updateData,
}: {
    id: string;
    updateData: Prisma.seat_configsUpdateInput;
}) => {
    return prisma.seat_configs.update({ where: { id }, data: updateData });
};

export const deleteSeatConfig = (id: string) => {
    return prisma.seat_configs.delete({ where: { id } });
};
