import "reflect-metadata";

import express from "express";

const app = express();
app.use(express.json());

// app.use("/users");
// app.use("/login");
// app.use("/contacts");


export default app;