import { Router } from "express";
import { authorize } from "../../middlewares/auth.middleware";
import {
   getUserByIdController,
   updateUserController,
   deleteUserController,
} from "./user.controller";
import { updateUserSchema } from "./user.validation";
import { validate } from "../../middlewares/validate.middleware";
export const userRouter = Router();

userRouter.get("/me", authorize("users:read"), getUserByIdController);
userRouter.post(
   "/update",
   authorize("users:update"),
   validate(updateUserSchema),
   updateUserController,
);
userRouter.delete("/delete", authorize("users:delete"), deleteUserController);
