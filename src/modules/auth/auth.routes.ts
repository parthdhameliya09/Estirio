import { Router }  from 'express'
import { registerController, loginController } from './auth.controller'
import { registerSchema,loginSchema } from './auth.validation'
import { validate} from '../../middlewares/validate.middleware'

export const authRouter = Router()

authRouter.post('/login',validate(loginSchema),loginController)
authRouter.post('/register',validate(registerSchema),registerController)
