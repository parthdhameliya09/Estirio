import prisma from "../../config/prisma";
export const updateUserRole = async (roleId: string, targetUserId: string) => {
   return await prisma.users.update({
      where: {
         id: targetUserId,
      },
      data: {
         roleId,
      },
   });
};
