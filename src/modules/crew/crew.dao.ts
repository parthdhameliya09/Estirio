import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export const createCrew = (data: Prisma.crewsCreateInput) => {
    return prisma.crews.create({ data });
};

export const getCrewById = (id: string) => {
    return prisma.crews.findUnique({ where: { id } });
};

export const updateCrew = ({ id, updateData }: { id: string; updateData: Prisma.crewsUpdateInput }) => {
    return prisma.crews.update({
        where: { id },
        data: updateData,
    });
};

export const getAllCrewsByOperator = (operatorId: string) => {
    return prisma.crews.findMany({ where: { operatorId } });
};
