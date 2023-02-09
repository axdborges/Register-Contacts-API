import { DataSource } from "typeorm";
import "dotenv/config";
import {generateTables1675959336589} from "./migrations/1675959336589-generateTables"
import { Users } from "./entities/Users.entity";
import { Contacts } from "./entities/Contacts.entity";

const AppDataSource = new DataSource(

    process.env.NODE_ENV == 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [Users,Contacts],
    } : {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV == 'production' ? { rejectUnauthorized: false } : false,
        synchronize: false,
        logging: true,
        entities: process.env.NODE_ENV == 'production' ? ['dist/src/entities/*.js'] : [Users, Contacts],
        migrations: process.env.NODE_ENV == 'production' ? ['dist/src/migrations/*.js'] : [generateTables1675959336589],
    }
);


export default AppDataSource;