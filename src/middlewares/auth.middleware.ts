import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { hasPermission } from "../modules/auth/auth.dao";
import { apiError } from "../utils/errors/api-error";

export function authorize(permission: string) {
   return async (req: Request, res: Response) => {
      try {
         const authHeader = req.header("Authorization");
         if (!authHeader?.startsWith("Bearer ")) {
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
      } catch (error) {
         console.error(`Error while authorization ${error}`);
         throw apiError(401, "User Unauthorized");
      }
   };
}
