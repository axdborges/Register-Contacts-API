import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { IContactRequestBody, IContactUpdate, IContactDelete, IContactResponse } from '../interfaces/contacts';
import ContactsService from '../services/Contacts.service';

export default class ContactsController {
    static async create(req: Request, res: Response) {
      const data: IContactRequestBody = req.body;
      try {
        const newContact = await ContactsService.create(data);
        return res.status(201).send(instanceToPlain(newContact));
      } catch (error) {
        if (error instanceof Error){
          return res.status(400).send({ message: "Cannot create contact"})
        }
      }
    }
  
    static async read( req: Request, res: Response ) {
      const contacts = await ContactsService.read();
      return res.status(200).send(instanceToPlain(contacts));
    }
  
    static async readById(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const contact = await ContactsService.readById(id);
        return res.status(200).send(instanceToPlain(contact));
      } catch (error) {
        if (error instanceof Error){
          return res.status(404).send(error.message)
        }
      }
    }

    static async update(req: IContactUpdate, res: IContactResponse) {
      const { id } = req.params;
      try {     
        const updatedContact = await ContactsService.update(id, req.body);
        return res.status(200).send(instanceToPlain(updatedContact));
      } catch (error) {
        if (error instanceof Error){
          return res.status(404).send(error.message)
        }
      }
    }

    static async delete(req: IContactDelete, res: Response) {
      const { id } = req.params;
      try {
        await ContactsService.delete(id);
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error){
          return res.status(404).send(error.message)
        }
      }
    }
};