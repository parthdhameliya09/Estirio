import { Request, Response, NextFunction } from "express";

export type AppError = Error & {
   statusCode?: number;
};

export function globalErrorHandler(
   error: AppError,
   req: Request,
   res: Response,
   next: NextFunction,
) {
   const statusCode = error.statusCode || 500;
   return res.status(statusCode).json({
      message: error.message,
   });
}

export function apiError(statusCode: number, message: string) {
   const error = new Error(message) as Error & { statusCode: number };
   error.statusCode = statusCode;
   return error;
}
