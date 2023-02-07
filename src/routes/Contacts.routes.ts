import { Router } from 'express';
import ContactsController from '../controllers/Contacts.controller';
import Ensuraces from '../middlewares/Ensuraces.middleware';

export const contactsRouter = Router();

contactsRouter.post(
  '',
  Ensuraces.authentication,
  ContactsController.create
);

contactsRouter.get(
  '',
  Ensuraces.authentication,
  ContactsController.read
);

contactsRouter.get(
  '/:id',
  Ensuraces.authentication,
  ContactsController.readById
);

contactsRouter.patch(
  '/:id',
  Ensuraces.authentication,
  ContactsController.update
);

contactsRouter.delete(
  '/:id',
  Ensuraces.authentication,
  ContactsController.delete
);