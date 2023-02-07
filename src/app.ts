import "reflect-metadata";

import express from "express";

import { userRouter } from "./routes/Users.routes";
import { sessionRouter } from "./routes/Session.routes";
import { contactsRouter } from "./routes/Contacts.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/contacts", contactsRouter);



export default app;