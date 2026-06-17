import { findUserById, updateUser, deleteUser, getAllUsers } from "./user.dao";
import { apiError } from "../../utils/errors/api-error";

export async function getUsersService() {
   return getAllUsers();
}

export async function getUserByIdService(id: string) {
   const user = await findUserById(id);
   if (!user) {
      throw apiError(404, "User not Found");
   }
}

export async function updateUserService(
   id: string,
   data: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      roleId?: string;
   },
) {
   return await updateUser(id, data);
}

export async function deleteUserService(id: string) {
   return deleteUser(id);
}
