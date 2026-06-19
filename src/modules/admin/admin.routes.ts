import { Router } from "express";
import { authorize } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateUserRoleController } from "./admin.controller";
import { updateRoleSchema } from "./admin.validation";

export const adminRouter = Router();

adminRouter.post(
   "/users/role",
   authorize("users:update"),
   validate(updateRoleSchema),
   updateUserRoleController,
);
