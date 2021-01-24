import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import config from "./config";

interface IConnectParams {
  useNewUrlParser: boolean;
  useCreateIndex: boolean;
  useFindAndModify: boolean;
  useUnifiedTopology: boolean;
  bufferCommands?: boolean;
  bufferMaxEntries?: number;
  reconnectTries?: number;
  reconnectInterval?: number;
  poolSize?: number;
  socketTimeoutMS?: number;
  keepAlive?: boolean;
}

class Database {
  private params: IConnectParams;

  private connected = 0;

  private db: mongoose.Mongoose;

  private env: string;

  private url: string;

  constructor() {
    this.env = config.node_env;
    this.url = config.db.mongo_uri;
    this.params = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 1,
      socketTimeoutMS: 2000000,
      keepAlive: true,
    };
  }

  public connectMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.connect();
        next();
      } catch (err) {
        console.log("Error connecting to database", err);
      }
    };
  }

  public async connect() {
    try {
      if (this.connected) return this.connected;

      this.db = await mongoose.connect(this.url, this.params);
      this.connected = this.db.connections[0].readyState;

      if (this.env !== "test") console.log("=> using new database connection");

      return this.connected;
    } catch (err) {
      console.log("Error connecting to databae", err);
      throw err;
    }
  }
}

const db = new Database();

if (process.env.ENV !== "test") db.connect();

export default db;
