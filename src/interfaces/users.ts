import * as core from 'express-serve-static-core';
import { Request, Response } from "express";
import { Users } from "../entities/Users.entity";

interface IUserParams extends core.ParamsDictionary {
    id: string;
  }

export type IUserRequest = Request<null, Users, IUserRequestBody>;

export type IUserResponse = Response<Users | any>;
export type IUserList = Response<IUserResponseBody[]>;
export type IUserUpdate = Request<IUserParams, Users, IUserUpdateRequest>;
export type IUserDelete = Request<IUserParams>;


export interface IUserRequestBody {
    name: string;
    email: string;
    password: string;
    telefone: string;
}

export interface IUserUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
    telefone?: string;
}

export interface IUserLoginBody {
    email: string;
    password: string;
}

export interface IUserResponseBody {
    id: string;
    name: string;
    email: string;
    telefone: string;
    isActive?: boolean;
    createdAt: Date;
  }