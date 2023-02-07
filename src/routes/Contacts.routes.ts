import { Router } from 'express';
import ContactsController from '../controllers/Contacts.controller';

export const contactsRouter = Router();

contactsRouter.post(
  '',
  ContactsController.create
);

contactsRouter.get(
  '',
  ContactsController.read
);

contactsRouter.get(
  '/:id',
  ContactsController.readById
);

contactsRouter.patch(
  '/:id',
  ContactsController.update
);

contactsRouter.delete(
  '/:id',
  ContactsController.delete
);