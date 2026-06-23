import { NextFunction, Request, Response } from "express";
import { register, login } from "./auth.service";
import { apiError, AppError } from "../../utils/errors/api-error";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const data = req.body;
      console.log("Received registration data:", data);
      const result = await register(data);
      res.status(201).json(result);
   } catch (error) {
      console.error("Error in registerController:", error);
      return next(error);
   }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const data = req.body;
      const result = await login(data);
      res.status(200).json(result);
   } catch (error) {
      console.error("Error in loginController:", error);
      return next(error);
   }
};
