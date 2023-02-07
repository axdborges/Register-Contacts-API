import { Router } from "express";
import session from "../controllers/Session.controller";

export const sessionRouter = Router();

sessionRouter.post(
    "",
    session.login
);