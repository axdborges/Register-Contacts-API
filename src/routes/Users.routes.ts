import { Router } from 'express';
import UsersController from '../controllers/Users.controller';
import Ensuraces from '../middlewares/Ensuraces.middleware';

export const userRouter = Router();

userRouter.post(
  '',
  UsersController.create
);

userRouter.get(
  '',
  Ensuraces.authentication,
  Ensuraces.onlyAdm,
  UsersController.read
);

userRouter.get(
  '/:id',
  Ensuraces.authentication,
  Ensuraces.partialPermissions,
  UsersController.readById
);

userRouter.patch(
  '/:id',
  Ensuraces.authentication,
  Ensuraces.partialPermissions,
  UsersController.update
);

userRouter.delete(
  '/:id',
  Ensuraces.authentication,
  Ensuraces.partialPermissions,
  UsersController.delete
);