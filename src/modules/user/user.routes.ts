import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { getUserByIdController, updateUser, deleteUser } from "./user.controller";

export const userRouter = Router();

userRouter.get("/me", authenticate, authorize("users:read"), getUserByIdController);
userRouter.post("/update", authenticate, authorize("users:update"), updateUser);
userRouter.post("/delete", authenticate, authorize("users:delete"), deleteUser);
