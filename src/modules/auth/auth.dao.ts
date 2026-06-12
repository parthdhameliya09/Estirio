import prisma from "../../config/prisma"
import { RegisterInput } from "./auth.type"
import {ApiError} from "../../errors/api-error"

export async function findUserByEmail(email: string){
    return await prisma.users.findUnique({
        where:{ email }
    })
}

export async function findRoleByName(name: string){
    return await  prisma.roles.findUnique({
        where:{ name }
    })
    
}

export async function createUser(data: RegisterInput){
    return await prisma.users.create({ data })
}

