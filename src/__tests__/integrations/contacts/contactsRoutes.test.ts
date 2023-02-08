import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import { mockedUser, mockedAdminLogin, mockedContact, mockedAdmUser } from "../../mocks";

describe("/contacts", () => {
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

    test("POST /contacts -  Must be able to create a contact",async () => {
        await request(app).post('/users').send(mockedAdmUser)
        const adminLogin = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/contacts').set("Authorization", `Bearer ${adminLogin.body.token}`).send(mockedContact)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("telefone")
        expect(response.body).toHaveProperty("user")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
    
        expect(response.body.name).toEqual("Marco aurélio")
        expect(response.body.email).toEqual("marcus@mail.com")
        expect(response.status).toBe(201)        
    });

    test("GET /contacts -  Must be able to list contacts",async () => {
        await request(app).post('/users').send(mockedAdmUser)
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get('/contacts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(1)
     
    });

    test("PATCH /contacts/:id -  should be able to update contact",async () => {
        const newValues = {name: "Valdo Carneiro", email: "valdocarneiro@mail.com"}

        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const contactTobeUpdateRequest = await request(app).get("/contacts").set("Authorization", token)
        const contactTobeUpdateId = contactTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/contacts/${contactTobeUpdateId}`).set("Authorization",token).send(newValues)

        const contactUpdated = await request(app).get("/contacts").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(contactUpdated.body[0].name).toEqual("Valdo Carneiro")
    });   
    
    test("DELETE /contacts/:id -  Must be able to delete contact",async () => {
        // await request(app).post('/users').send(mockedAdmUser)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/contacts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/contacts/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        
    });
})