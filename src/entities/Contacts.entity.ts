import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Users } from './Users.entity';

@Entity("Contacts")
class Contacts {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @CreateDateColumn()
    readonly createdAt: Date;

    @ManyToOne(() => Users, { eager: true })
    user: Users;

}

export { Contacts };