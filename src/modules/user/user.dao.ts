import prisma from "../../config/prisma";
import { apiError } from "../../utils/errors/api-error";
import { updateUser as updateUserType } from "./user.type";
export const getAllUsers = async () => {
   return await prisma.users.findMany();
};

export const findUserById = async (id: string) => {
   return await prisma.users.findUnique({
      where: { id },
   });
};

export const updateUser = async (id: string, data: updateUserType) => {
   return await prisma.users.update({
      where: { id },
      data,
   });
};

export const deleteUser = async (id: string) => {
   return await prisma.users.delete({
      where: { id },
   });
};
