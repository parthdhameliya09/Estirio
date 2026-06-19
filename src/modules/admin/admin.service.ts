import prisma from "../../config/prisma";
import { apiError } from "../../utils/errors/api-error";
import { findUserById } from "../user/user.dao";
import { AssignRoleInput } from "./admin.type";
import { findRoleByName } from "../auth/auth.dao";
import { updateUserRole } from "./admin.dao";

export const updateUserRoleService = async (data: AssignRoleInput) => {
   // Validate target user exists
   const { targetUserId, targetUserRole, userId, roleId } = data;

   const target = await findUserById(targetUserId);

   if (!target) {
      throw apiError(404, "User not found");
   }

   const role = await findRoleByName(targetUserRole);
   if (!role) {
      throw apiError(400, "Role not found");
   }

   if (target.roleId === role.id) {
      return target;
   }

   // Find admin role id (used for last-admin guard)
   const adminRole = await findRoleByName("admin");

   if (!adminRole) {
      throw apiError(500, "Admin role not configured");
   }

   // Prevent removing the only admin Role
   if (target.roleId === adminRole.id && role.id !== adminRole.id) {
      const adminCount = await prisma.users.count({
         where: {
            roleId: adminRole.id,
         },
      });

      if (adminCount === 1) {
         throw apiError(400, "Cannot remove the last admin");
      }
   }
   // Prevent own role changing 
   if (targetUserId === userId) {
      throw apiError(403, "You cannot change your own role");
   }

   return await updateUserRole(role.id, target.id);
};
