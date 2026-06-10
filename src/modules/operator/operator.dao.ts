import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export const createOperator = (data: Prisma.bus_operatorsCreateInput) => {
    return prisma.bus_operators.create({
        data
    })
}

export const getOperatorById = (id: string) => {
    return prisma.bus_operators.findUnique({
        where: {
            id
        }
    })
}

export const updateOperator = ({id,updateData}: {id:string,updateData:Prisma.bus_operatorsUpdateInput}) => {
    return prisma.bus_operators.update({
        where: {
            id
        },
        data:updateData
    })
}