import { Request, Response } from "express";
import { registerService, loginService } from "./auth.service";
import prisma from "../../config/prisma";
import { apiError } from "../../utils/errors/api-error";

export async function registerController(req: Request, res: Response) {
   try {
      const data = req.body;
      console.log("Received registration data:", data);
      const result = await registerService(data);
      res.status(201).json(result);
   } catch (error) {
      console.error("Error in registerController:", error);
      throw apiError(500, "Internal server error");
   }
}

export async function loginController(req: Request, res: Response) {
   try {
      const data = req.body;
      const result = await loginService(data);
      res.status(200).json(result);
   } catch (error) {
      console.error("Error in loginController:", error);
      throw apiError(500, "Internal server error");
   }
}
