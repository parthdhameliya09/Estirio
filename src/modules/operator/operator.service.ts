import {createOperator as createOperatorDao,
    getOperatorById as getOperatorByIdDao,
    updateOperator as updateOperatorDao } from "../operator/operator.dao"
import { CreateOperatorRequest,UpdateOperatorRequest } from "./operator.types"
import { Prisma } from "../../../generated/prisma/client"

export const createOperator = async(input:CreateOperatorRequest,UserId:string) => {
    const data: Prisma.bus_operatorsCreateInput = {
        name: input.name,
        gst_number : input.gstNumber,
        email : input.email,
        phone_number : input.phoneNumber,
        is_private : input.isPrivate ?? true,
        owner: {
            connect: {
            id: UserId
            }
        }
    }

    const operator = await createOperatorDao(data);
    return operator;    
} 

export const getOperator = async (id:string)=>{
    const operator = await getOperatorByIdDao(id);
    if(!operator){
        throw new Error("Operator not found");
    }
    return operator;
}

export const updateOperator = async(input:UpdateOperatorRequest,id:string)=>{
    const updateData : Prisma.bus_operatorsUpdateInput = {};

    if(input.name !== undefined) updateData.name = input.name;
    if(input.phoneNumber !== undefined) updateData.phone_number = input.phoneNumber;
    if(input.isPrivate !== undefined) updateData.is_private = input.isPrivate;
    if(input.isActive !== undefined) updateData.is_active = input.isActive;

    const updatedOperator = await updateOperatorDao(id,updateData);
    return updatedOperator;
}