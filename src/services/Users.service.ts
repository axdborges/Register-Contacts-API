import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";
import { Users } from "../entities/Users.entity";

import { IUserRequestBody, IUserUpdateRequest } from "../interfaces/users";


export default class UsersService {

    static repository = AppDataSource.getRepository(Users);

    static async create({ name, email, password, telefone, isAdm }: IUserRequestBody): Promise<Users> {
        const user = await this.repository.findOneBy({ email });
    
        if (user) {
          throw new Error('This email is already being used');
        } 
        const hashedKey = await hash(password, 10);
        const newUser = this.repository.create({ name, email, password: hashedKey, telefone, isAdm });
        const savedUser = await this.repository.save(newUser);
    
        return savedUser;
    }
    
    static async read(): Promise<Users[]> {
        const usersList = await this.repository.find();
        return usersList;
    }
    
    static async readById(id: string): Promise<Users> {
        const specificUser = await this.repository.findOneBy({
            id,
            isActive: true,
        });
        if (!specificUser) {
            throw new Error('User not found');
        }

        return specificUser;
    }

    static async update(id: string, { name, email, password, telefone }: IUserUpdateRequest): Promise<Users> {
        const user = await this.repository.findOneBy({ id, isActive: true });
        if (!user) {
            throw new Error('User not found');
        }

        await this.repository.update(id, {
            name: name ? name : user.name,
            email: email ? email : user.email,
            password: password ? await hash(password, 10) : user.password,
            telefone: telefone ? telefone : user.telefone,
        });
        const updatedUser = await this.repository.findOneBy({ id });
        return updatedUser!;  
    }

    static async delete(id: string) {
        const user = await this.repository.findOneBy({ id, isActive: true });
        if (!user) {
            throw new Error('User not found');
        }

        await this.repository.update(id, {
            isActive: false,
        });
    };
};