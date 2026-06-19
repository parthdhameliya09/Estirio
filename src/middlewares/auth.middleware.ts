import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { hasPermission } from "../modules/auth/auth.dao";
import { apiError } from "../utils/errors/api-error";

export const authorize = (permission: string) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const authHeader = req.header("Authorization");
         if (!authHeader) {
            throw apiError(403, "Header missing");
         }
         if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
               message: "Unauthorized",
            });
         }
         const token = authHeader.split(" ")[1];
         const payload = verifyToken(token);
         req.user = {
            ...payload,
         };
         const allowed = await hasPermission(req.user.roleId, permission);
         next();
      } catch (error) {
         console.error(`Error while authorization ${error}`);
         return error;
      }
   };
};
