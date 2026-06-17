import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
   return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse({
         body: req.body,
         params: req.params,
         query: req.query,
      });
      if (!result.success) {
         console.log("Validation error:", result.error);
         return res.status(400).json({ error: "validation error" });
      }

      next();
   };
}
