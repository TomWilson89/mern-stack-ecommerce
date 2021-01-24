import express from "express";
import cors from "cors";
import hpp from "hpp";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import routes from "./routes";
import config from "./config/config";
import "./config/database";
import RouteNotFoundError from "./errors/routeNotFound";
import errorMiddleware from "./middlewares/error";

class App {
  public app: express.Application;

  public port: number;

  constructor(port?: number) {
    this.app = express();

    this.port = port;

    this.initMiddlewares();
  }

  private initMiddlewares() {
    //Security
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: false }));

    //Route handler
    this.app.use(routes);

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(new RouteNotFoundError());
    });

    //error handler
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `App running in ${config.node_env} mode on port ${this.port}`
      );
    });
  }
}

if (module === require.main) {
  new App(Number(process.env.PORT) || 5000).listen();
}
