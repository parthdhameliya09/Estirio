import { Prisma } from "../../../generated/prisma/client";
import {createOperator as createOperatorDao,
    getOperatorById as getOperatorByIdDao,
    updateOperator as updateOperatorDao } from "./operator.dao"
import { CreateOperatorRequest,UpdateOperatorRequest } from "./operator.types"


export const createOperator = async({name, gstNumber, email, phoneNumber, isPrivate,userId}:CreateOperatorRequest) => {
    const data = {
        name,
        gstNumber,
        email,
        phoneNumber,
        isPrivate,
        owner: {
            connect: {
                id: userId
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

export const updateOperator = async({id,name,phoneNumber,isPrivate,isActive}:UpdateOperatorRequest)=>{
    const updateData  = {
        name,
        phoneNumber,
        isPrivate,
        isActive
    };

    if(name !== undefined) updateData.name = name;
    if(phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if(isPrivate !== undefined) updateData.isPrivate = isPrivate;
    if(isActive !== undefined) updateData.isActive = isActive;

    const updatedOperator = await updateOperatorDao({id,updateData});
    return updatedOperator;
}