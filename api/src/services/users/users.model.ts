import { NextFunction } from "express";
import { Schema, model } from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import config from "../../config/config";
import { IUserDocument, Role } from "./users.interface";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "NameIsRequired"],
    },
    email: {
      type: String,
      required: [true, "EmailIsRequired"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "PasswordIsRequired"],
    },
    role: {
      type: Number,
      enum: Object.keys(Role)
        .filter((role) => !isNaN(Number(role)))
        .map((role) => Number(role)),
      default: Role.USER,
    },
  },
  { timestamps: true }
);

schema.pre<IUserDocument>("save", async function (next: NextFunction) {
  this.email = this.email.toLowerCase();

  if (this.isNew) this.createdAt = new Date();

  if (this.isModified("password") || this.isNew) {
    this.password = await argon2.hash(this.password, {
      parallelism: 2,
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
      timeCost: 10,
    });
  }

  next();
});

schema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expires,
  });
};
schema.methods.matchPassword = async function (
  this: IUserDocument,
  password: string
) {
  return argon2.verify(password, this.password);
};

export const User = model<IUserDocument>("User", schema);

export default User;
