import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export const createOperator = async (data: Prisma.bus_operatorsCreateInput) => {
    return await prisma.bus_operators.create({
        data
    })
}

export const getOperatorById = async (id: string) => {
    return await prisma.bus_operators.findUnique({
        where: {
            id
        }
    })
}

export const updateOperator = async({id,updateData}: {id:string,updateData:Prisma.bus_operatorsUpdateInput}) => {
    return await prisma.bus_operators.update({
        where: {
            id
        },
        data:updateData
    })
}