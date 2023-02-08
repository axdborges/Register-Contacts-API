import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import { mockedAdmUser, 
        mockedUser, 
        mockedAdminLogin,
        mockedUserLogin,
 } from "../../mocks";

describe("/users", () => {
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

    test("POST /users -  Must be able to create a user",async () => {
        const response = await request(app).post('/users').send(mockedAdmUser)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("telefone")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Alexandre")
        expect(response.body.email).toEqual("alexa@mail.com")
        expect(response.body.isAdm).toEqual(true)
        expect(response.status).toBe(201)        
    });

    test("POST /users -  should not be able to create a user that already exists",async () => {
        const response = await request(app).post('/users').send(mockedAdmUser)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    });

    test("GET /users -  Must be able to list users",async () => {
        await request(app).post('/users').send(mockedAdmUser)
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(1)
     
    });

    test("PATCH /users/:id -  should be able to update user",async () => {
        const newValues = {name: "Valdo Carneiro", email: "valdocarneiro@mail.com"}

        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues)

        const userUpdated = await request(app).get("/users").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(userUpdated.body[0].name).toEqual("Valdo Carneiro")
    });   
    
    test("DELETE /users/:id -  Must be able to soft delete user",async () => {
        await request(app).post('/users').send(mockedAdmUser)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        
    });
})