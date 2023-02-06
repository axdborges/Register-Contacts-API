import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

export const userRouter = Router();

userRouter.post(
  '',
  UsersController.create
);

userRouter.get(
  '',
  UsersController.read
);

userRouter.get(
  '/:id',
  UsersController.readById
);

userRouter.patch(
  '/:id',
  UsersController.update
);

userRouter.delete(
  '/:id',
  UsersController.delete
);