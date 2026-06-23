import { z } from "zod";

export const updateRoleSchema = z.object({
   body: z.object({
      targetUserId: z.string({ message: "Target User id is required" }),
      targetUserRole: z.string().min(1, { message: "please provide target roleName" }),
   }),
});
