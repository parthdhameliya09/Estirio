import prisma from "../../config/prisma"
import { RegisterInput } from "./auth.type"
import {ApiError} from "../../utils/errors/api-error"

export async function findUserByEmail(email: string){
    try{
        return await prisma.users.findUnique({
            where:{ email }
        })
    }catch(error){
        console.error('Error occurred while fetching user by email:', error)
        throw new  ApiError(501,'Internal server error')
    }

}

export async function findRoleByName(name: string){

    try {
        const role = await  prisma.roles.findUnique({
            where:{ name }
        })
        if (!role){
            console.log('Role not found with name:', name)
            throw new ApiError(404,'Role not found')
        }
        return role
    } catch (error) {
        console.error('Error occurred while fetching role by name:', error)
        throw new ApiError(500,'Internal server error')
    }
    
}

export async function createUser(data: RegisterInput){
    try {
        return await prisma.users.create({ data })
        
    } catch (error) {
        console.error('Error occurred while creating user:', error)
        throw new ApiError(500,'Internal server error')
    }
}

