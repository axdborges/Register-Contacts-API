import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";
import { Contacts } from "../entities/Contacts.entity";
import { Users } from "../entities/Users.entity";

import { IContactRequestBody, IContactUpdateRequest } from "../interfaces/contacts";


export default class ContactsService {

    static contactsRepository = AppDataSource.getRepository(Contacts);
    static usersRepository = AppDataSource.getRepository(Users);

    static async checkUserExists(userId: string) {
        const user = await this.usersRepository.findOneBy({
            id: userId,
            isActive: true,
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async create(userId: string, { name, email, telefone }: IContactRequestBody): Promise<Contacts> {
        // const user = await this.contactsRepository.findOneBy({ email, telefone });
    
        // if (user) {
        //   throw new Error('This email is already being used');
        // } 
        const user = await this.checkUserExists(userId);
        const newContact = this.contactsRepository.create({ name, email, telefone, user: user });
        const savedContact = await this.contactsRepository.save(newContact);
    
        return savedContact;
    }
    
    static async read(id: string): Promise<Contacts[]> {
        const contactsList = await this.contactsRepository.find({
            where: { user: {id}}
        });
        return contactsList;
    }
    
    static async readById(id: string): Promise<Contacts> {
        const specificContact = await this.contactsRepository.findOneBy({
            id
        });
        if (!specificContact) {
            throw new Error('Contact not found');
        }

        return specificContact;
    }

    static async update(id: string, { name, email, telefone }: IContactUpdateRequest): Promise<Contacts> {
        const contact = await this.contactsRepository.findOneBy({ id });
        if (!contact) {
            throw new Error('Contact not found');
        }

        await this.contactsRepository.update(id, {
            name: name ? name : contact.name,
            email: email ? email : contact.email,
            telefone: telefone ? telefone : contact.telefone
        });
        const updatedContact = await this.contactsRepository.findOneBy({ id });
        return updatedContact!;  
    }

    static async delete(id: string) {
        const contact = await this.contactsRepository.findOneBy({ id });
        if (!contact) {
            throw new Error('Contact not found');
        }

        await this.contactsRepository.delete(id);
    };
};