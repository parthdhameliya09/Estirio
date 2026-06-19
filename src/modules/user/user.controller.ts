import { apiError } from "../../utils/errors/api-error";
import { getUserById, updateUser, deleteUser } from "./user.service";
import { NextFunction, Request, Response } from "express";

export const getUserByIdController = async (req: Request, res: Response,next:NextFunction) => {
   try {
      const userId = req.user.userId;
      const user = await getUserById(userId);
      res.json(user);
   } catch (error) {
      return  next(error)
   }
   
};

export const updateUserController = async (req: Request, res: Response,next:NextFunction) => {
   try {
      const userId = req.user.userId;
      const userData = req.body;
      const user = await updateUser(userId, userData);
      res.json(user);
   } catch (error) {
      return next(error)   
   }
};

export const deleteUserController = async (req: Request, res: Response,next:NextFunction) => {
   try {
      const deleteuser = await deleteUser(req.user.userId);
      if (!deleteuser) {
         throw apiError(500, "Internal Server Error");
      }
      res.status(204).send();
      
   } catch (error) {
      return next(error)
   }
};
