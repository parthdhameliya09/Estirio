import prisma from "../../config/prisma";
import { RegisterInput } from "./auth.type";
import { apiError } from "../../utils/errors/api-error";
import { usersCreateInput } from "../../../generated/prisma/models";

export const findUserByEmail = async (email: string) => {
   console.log("finding user");
   return await prisma.users.findUnique({
      where: { email },
   });
};

export const findRoleByName = async (name: string) => {
   return await prisma.roles.findUnique({
      where: { name },
   });
};

export const createUser = async (data: RegisterInput) => {
   return await prisma.users.create({ data });
};

export const hasPermission = async (roleId: string, permission: string) => {
   return await prisma.role_permissions.findFirst({
      where: {
         roleId,
         permission: {
            name: permission,
         },
      },
   });
};
