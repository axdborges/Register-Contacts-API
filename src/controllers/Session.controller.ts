import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import SessionService from "../services/Session.service";

export default class SessionController {
    static async login(req: Request, res: Response) {
        const data = req.body;
        try {
            const resData = await SessionService.login(data)
            return res.status(200).json(instanceToPlain(resData))
        } catch (error) {
            if (error instanceof Error) {
                if (error.message == "User not found"){
                    return res.status(404).json({ message: error.message})
                }
                if(error.message == "Email/password is wrong"){
                    return res.status(403).json({ message: error.message})
                }
            }
        }
    }
}