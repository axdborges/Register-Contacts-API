import * as core from 'express-serve-static-core';
import { Request, Response } from "express";
import { Users } from "../entities/Users.entity";

interface IContactParams extends core.ParamsDictionary {
    id: string;
}

export type IContactRequest = Request<null, Users, IContactRequestBody>;

export type IContactResponse = Response<Users | any>;
export type IContactList = Response<IContactResponseBody[]>;
export type IContactUpdate = Request<IContactParams, Users, IContactUpdateRequest>;
export type IContactDelete = Request<IContactParams>;


export interface IContactRequestBody {
    name: string;
    email: string;
    telefone: string;
}

export interface IContactUpdateRequest {
    name?: string;
    email?: string;
    telefone?: string;
}


export interface IContactResponseBody {
    id: string;
    name: string;
    email: string;
    telefone: string;
    createdAt: Date;
}