import {createOperator as createOperatorDao,
    getOperatorById as getOperatorByIdDao,
    updateOperator as updateOperatorDao } from "./operator.dao"
import { CreateOperatorRequest,UpdateOperatorRequest } from "./operator.types"
import { Prisma } from "../../../generated/prisma/client"

export const createOperator = async(input:CreateOperatorRequest,UserId:string) => {
    const data: Prisma.bus_operatorsCreateInput = {
        name: input.name,
        gstNumber : input.gstNumber,
        email : input.email,
        phoneNumber : input.phoneNumber,
        isPrivate : input.isPrivate ?? true,
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
    if(input.phoneNumber !== undefined) updateData.phoneNumber = input.phoneNumber;
    if(input.isPrivate !== undefined) updateData.isPrivate = input.isPrivate;
    if(input.isActive !== undefined) updateData.isActive = input.isActive;

    const updatedOperator = await updateOperatorDao({id,updateData});
    return updatedOperator;
}