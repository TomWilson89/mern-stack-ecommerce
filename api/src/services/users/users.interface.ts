import { Document } from "mongoose";

export enum Role {
  USER = 1,
  ADMIN,
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  getToken(): string;
  matchPassword(password: string): Promise<Boolean>;
}
