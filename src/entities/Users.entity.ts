import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Contacts } from './Contacts.entity';

@Entity("Users")
class Users {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    telefone: string;

    @Column({ default: true })
    @Exclude()
    readonly isActive: boolean;

    @CreateDateColumn()
    readonly createdAt: Date;

    @OneToMany(() => Contacts, (contact) => contact.user)
    user: Contacts[];

}

export {Users};