import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class Ensuraces {
    static async authentication(request: Request | any, response: Response, next: NextFunction) {
        let token = request.headers.authorization;

        if (!token) {
            throw new Error('Missing authorization headers');
        }

        token = token.split(' ')[1];

        jwt.verify(
            token,
            process.env.SECRET_KEY as string,
            (error: any, decoded: any) => {
                if (error) {
                    throw new Error('Invalid Token');
                }
      
                request.token = {
                    isAdm: decoded.isAdm,
                    id: decoded.sub,
                };
      
              return next();
            }
        );
    }

    static async onlyAdm(request: Request | any , _: Response, next: NextFunction) {
        if (!request.token.isAdm) {
          throw new Error('User is not admin');
        }
    
        return next();
    }

    static partialPermissions(req: Request | any, _: Response, next: NextFunction) {
        const { id, isAdm } = req.token;
        const { id: userId } = req.params;
    
        if (!isAdm && id !== userId) {
          throw new Error('User is not admin');
        }
    
        next();
    }
}