import { Router }  from 'express'
import { registerController, loginController } from './auth.controller'
export const authRouter = Router()

authRouter.post('/login',loginController)
authRouter.post('/register',registerController)
