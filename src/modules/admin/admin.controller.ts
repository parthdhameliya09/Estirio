import { Request, Response, NextFunction } from "express";
import { updateUserRoleService } from "./admin.service";
import { apiError } from "../../utils/errors/api-error";
export const updateUserRoleController=async(req: Request, res: Response, next: NextFunction)=> {
   try {
      const data = {
         ...req.user,
         ...req.body,
      };
      const updated = await updateUserRoleService(data);

      return res.json({ user: updated });
   } catch (error) {
      return next(error)
   }
}
