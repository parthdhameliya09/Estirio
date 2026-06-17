import { Router } from "express";
import { authorize } from "../../middlewares/auth.middleware";
import { getUserByIdController, updateUser, deleteUser } from "./user.controller";
import { AuthUser } from "../auth/auth.type";
import { validate } from "../../middlewares/validate.middleware";
export const userRouter = Router();

userRouter.get("/me", authorize("users:read"), getUserByIdController);
userRouter.post("/update", authorize("users:update"), updateUser);
userRouter.post("/delete", authorize("users:delete"), deleteUser);
