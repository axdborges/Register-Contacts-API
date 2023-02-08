import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { IUserRequestBody, IUserUpdate, IUserDelete, IUserResponse } from '../interfaces/users';
import UsersService from '../services/Users.service';

export default class UsersController {
    static async create(req: Request, res: Response) {
      const data: IUserRequestBody = req.body;
      try {
        const newUser = await UsersService.create(data);
        return res.status(201).send(instanceToPlain(newUser));
      } catch (error) {
        if (error instanceof Error){
            return res.status(400).send({message: error.message})
        }
      }
    }
  
    static async read( req: Request, res: Response ) {
      
      try {
        const users = await UsersService.read();
        return res.status(200).send(instanceToPlain(users));
      } catch (error) {
        if (error instanceof Error){
          return res.status(401).send({message: error.message})
        }
      }
    }
  
    static async readById(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const user = await UsersService.readById(id);
        return res.status(200).send(instanceToPlain(user));
      } catch (error) {
        if (error instanceof Error){
            return res.status(404).send({message: error.message})
        }
      }
    }

    static async update(req: IUserUpdate, res: IUserResponse) {
      const { id } = req.params;
      try {     
        const updatedUser = await UsersService.update(id, req.body);
        return res.status(200).send(instanceToPlain(updatedUser));
      } catch (error) {
        if (error instanceof Error){
            return res.status(404).send({message: error.message})
        }
      }
    }

    static async delete(req: IUserDelete, res: Response) {
      const { id } = req.params;
      try {
        await UsersService.delete(id);
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error){
            return res.status(404).send({message: error.message})
        }
      }
    }
};