import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { hasPermission } from "../modules/auth/auth.dao";
import { ApiError } from "../utils/errors/api-error";

export function authenticate(req: Request, res: Response, next: NextFunction) {
   try {
      // const authHeader = req.headers.authorization
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
      console.log(req.user);
      next();
   } catch (error) {
      console.error(`Error :${error} `);
   }
}

export function authorize(permission: string) {
   try {
      return async (req: Request, res: Response, next: NextFunction) => {
         const allowed = await hasPermission(req.user.roleId, permission);
         console.log(allowed);
         next();
      };
   } catch (error) {
      console.error(`Error while authorization ${error}`);
      throw new ApiError(401, "User Unauthorized");
   }
}
