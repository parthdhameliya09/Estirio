import prisma from "../../config/prisma";
import { apiError } from "../../utils/errors/api-error";

export async function getAllUsers() {
   return await prisma.users.findMany();
}

export async function findUserById(id: string) {
   return await prisma.users.findUnique({
      where: { id },
   });
}

export async function updateUser(
   id: string,
   data: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      roleId?: string;
   },
) {
   return await prisma.users.update({
      where: { id },
      data,
   });
}

export async function deleteUser(id: string) {
   return await prisma.users.delete({
      where: { id },
   });
}
