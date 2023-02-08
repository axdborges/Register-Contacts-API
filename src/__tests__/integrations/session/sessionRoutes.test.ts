import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import { mockedAdminLogin, mockedAdmUser } from "../../mocks";

describe("/login", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)

        })
    });

    afterAll(async() => {
        await connection.destroy()
    });

    test("POST /login -  should be able to login with the user",async () => {
        await request(app).post("/users").send(mockedAdmUser)
        const response = await request(app).post("/login").send(mockedAdminLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    });

    test("POST /login -  should not be able to login with the incorrect user",async () => {
        const response = await request(app).post("/login").send({
            email: "wrong@mail.com",
            password: "wrongpass"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
             
    })
})