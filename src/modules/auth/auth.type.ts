export interface AuthUser {
  id: string;
  email: string;
  roleId: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
export interface JWTPayload {
  userId: string;
  email: string;
  roleId: string;
}
// export interface AuthResponse{
//     token:string
// }
