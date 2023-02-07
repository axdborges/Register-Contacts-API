import AppDataSource from "../data-source";
import { hash } from "bcryptjs";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

import { Users } from "../entities/Users.entity";
import { IUserLoginBody } from "../interfaces/users";

config();

export default class SessionService {
    static repository = AppDataSource.getRepository(Users);

    static async login({ email, password }: IUserLoginBody) {
        const user = await this.repository.findOneBy({ email, isActive: true });

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = bcrypt.compareSync(password, user.password);

        if (!hashedPassword) {
            throw new Error("Email/password is wrong");
        }

        const token = sign(
            { isAdm: user.isAdm },
            process.env.SECRET_KEY as string,
            {
                expiresIn: "1d",
                subject: user.id
            }
        )

        return { user , token }
    }
}
