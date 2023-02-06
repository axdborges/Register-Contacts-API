import "reflect-metadata";

import express from "express";


import { userRouter } from "./routes/Users.routes";

const app = express();
app.use(express.json());



app.use("/users", userRouter);
// app.use("/login");
// app.use("/contacts");


export default app;