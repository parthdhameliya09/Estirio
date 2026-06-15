import * as authDao from './auth.dao'
import { RegisterRequest,JWTPayload,LoginRequest } from './auth.type'
import { hashPassword, comparePassword } from '../../utils/password'
import { generateToken } from '../../utils/jwt'
import { ApiError } from '../../utils/errors/api-error'
const DEFAULT_ROLE = 'passenger'



export async function registerService(data:RegisterRequest){
        const { email:userEmail, password,firstName,lastName,phoneNumber } = data
        const normalizedEmail = userEmail.trim().toLowerCase()

        const existingUser = await authDao.findUserByEmail(normalizedEmail)
        
        if(existingUser){
            console.log('User already exists with email:', normalizedEmail)
            throw new ApiError(409,'User already exists with this email')
        }
        
        const role = await authDao.findRoleByName(DEFAULT_ROLE)
        
        const hashedPassword = await hashPassword(data.password)
        
        const userData ={
            ...data,
            email: normalizedEmail,
            password:hashedPassword,
            roleId: role?.id || ''
        }
        
        const {id:userId,email,roleId} = await authDao.createUser(userData)
        
        const payload : JWTPayload = {
            userId,
            email,
            roleId
        }
        const token = generateToken(payload)
        
        return { token }
    

}

export async function loginService(data:LoginRequest){
    
        
        
        const existingUser = await authDao.findUserByEmail(data.email)
        if(!existingUser){
            console.log('No user found with email:', data.email)
            throw new ApiError(401,'Invalid email or password')
        }
        const passwordMatch = await comparePassword(data.password,existingUser.password)
        
        if (!passwordMatch){
            console.log('Invalid Password or Email')
            throw new ApiError(401,'Invalid email or password')
        }
        
        const payload : JWTPayload = {
            userId: existingUser.id,
            email:existingUser.email,
            roleId:existingUser.roleId,
        }
        
        const token = generateToken(payload)
        
        return { token }
        
        
}