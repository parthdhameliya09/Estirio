import {getUserByIdService,updateUserService} from "./user.service";
import { Request, Response } from "express";

export async function getUserByIdController(req: Request, res: Response) {

   const userId = req.user.userId;
   const user = getUserByIdService(userId);
   
}

export async function updateUser(req: Request, res: Response) {
   const userId = req.user.userId;
   const userData = req.body;
   const user = updateUserService(userId, userData);
}

export async function deleteUser(req: Request, res: Response) {
   const userId = req.user.userId;
}
