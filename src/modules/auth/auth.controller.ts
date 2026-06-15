import { Request, Response } from 'express'
import { registerService, loginService } from './auth.service'


export async function registerController(req: Request, res: Response) {
    try {
        const data = req.body
        const result = await registerService(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const data = req.body
        const result = await loginService(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error})
    }

}