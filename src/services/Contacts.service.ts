import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";
import { Contacts } from "../entities/Contacts.entity";

import { IContactRequestBody, IContactUpdateRequest } from "../interfaces/contacts";


export default class ContactsService {

    static repository = AppDataSource.getRepository(Contacts);

    static async create({ name, email, telefone }: IContactRequestBody): Promise<Contacts> {
        // const user = await this.repository.findOneBy({ email, telefone });
    
        // if (user) {
        //   throw new Error('This email is already being used');
        // } 
        const newContact = this.repository.create({ name, email, telefone });
        const savedContact = await this.repository.save(newContact);
    
        return savedContact;
    }
    
    static async read(): Promise<Contacts[]> {
        const contactsList = await this.repository.find();
        return contactsList;
    }
    
    static async readById(id: string): Promise<Contacts> {
        const specificContact = await this.repository.findOneBy({
            id
        });
        if (!specificContact) {
            throw new Error('Contact not found');
        }

        return specificContact;
    }

    static async update(id: string, { name, email, telefone }: IContactUpdateRequest): Promise<Contacts> {
        const contact = await this.repository.findOneBy({ id });
        if (!contact) {
            throw new Error('Contact not found');
        }

        await this.repository.update(id, {
            name: name ? name : contact.name,
            email: email ? email : contact.email,
            telefone: telefone ? telefone : contact.telefone
        });
        const updatedContact = await this.repository.findOneBy({ id });
        return updatedContact!;  
    }

    static async delete(id: string) {
        const contact = await this.repository.findOneBy({ id });
        if (!contact) {
            throw new Error('Contact not found');
        }

        await this.repository.delete(id);
    };
};