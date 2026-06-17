import * as userDao from "./user.dao";
import { apiError } from "../../utils/errors/api-error";

export async function getUsersService() {
   return userDao.getAllUsers();
}

export async function getUserByIdService(id: string) {
   const user = await userDao.findUserById(id);
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
   return await userDao.updateUser(id, data);
}

export async function deleteUser(id: string) {
   return userDao.deleteUser(id);
}
