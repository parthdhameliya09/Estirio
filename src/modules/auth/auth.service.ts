import { findRoleByName, findUserByEmail, createUser } from "./auth.dao";
import { RegisterRequest, JWTPayload, LoginRequest } from "./auth.type";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import { apiError } from "../../utils/errors/api-error";

const DEFAULT_ROLE = "passenger";

export const register = async (data: RegisterRequest) => {
   const { email: userEmail, password, firstName, lastName, phoneNumber } = data;
   console.log("checking user");
   const existingUser = await findUserByEmail(userEmail);
   console.log(existingUser);
   if (existingUser) {
      console.log("User already exists with email:", userEmail);
      throw apiError(409, "User already exists with this email");
   }
   const role = await findRoleByName(DEFAULT_ROLE);
   if (!role) {
      throw apiError(404, "Role not found");
   }
   const hashedPassword = await hashPassword(data.password);
   const userData = {
      ...data,
      email: userEmail,
      password: hashedPassword,
      roleId: role.id,
   };

   console.log("Creating user with data:", userData);
   const { id: userId, email, roleId } = await createUser(userData);
   const payload: JWTPayload = {
      userId,
      email,
      roleId,
   };
   const token = generateToken(payload);
   return { token };
};

export const login = async (data: LoginRequest) => {
   const { email: userEmail, password } = data;
   const existingUser = await findUserByEmail(userEmail);
   if (!existingUser) {
      console.log("No user found with email:", userEmail);
      throw apiError(401, "Invalid email or password");
   }
   const passwordMatch = await comparePassword(password, existingUser.password);

   if (!passwordMatch) {
      console.log("Invalid Password or Email");
      throw apiError(401, "Invalid email or password");
   }

   const payload: JWTPayload = {
      userId: existingUser.id,
      email: existingUser.email,
      roleId: existingUser.roleId,
   };

   const token = generateToken(payload);

   return { token };
};
