export interface AuthUser {
    id: string
    email:string
    roleId:string
}

export interface RegisterRequest{
    firstName:string
    lastName:string
    email:string
    password:string
    phoneNumber:string
}

export interface RegisterInput extends RegisterRequest{
    roleId:string
}
export interface LoginRequest {
    email:string
    password:string
}
export interface JWTPayload {
    userId: string
    email: string
    roleId: string
}
// export interface AuthResponse{
//     token:string
// }