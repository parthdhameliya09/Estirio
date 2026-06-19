import {
   findUserById,
   updateUser as updaterUserDao,
   deleteUser as deleteUserDao,
   getAllUsers,
} from "./user.dao";
import { apiError } from "../../utils/errors/api-error";
import { updateUser as updateUserType } from "./user.type";

export const getUsersService = async () => {
   return getAllUsers();
};

export const getUserById = async (id: string) => {
   const user = await findUserById(id);
   if (!user) {
      throw apiError(404, "User not Found");
   }
   return user;
};

export const updateUser = async (id: string, data: updateUserType) => {
   return await updaterUserDao(id, data);
};

export const deleteUser = async (id: string) => {
   return await deleteUserDao(id);
};
