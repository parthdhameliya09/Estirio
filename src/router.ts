import { Router } from 'express';

// import authRoutes from "./modules/auth/auth.routes";
import operatorRoutes from "./modules/operator/operator.routes";
const router = Router();

// router.use("/auth", authRoutes);
router.use("/operators", operatorRoutes)

export default router;
