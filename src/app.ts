import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { authRouter, endpointRouter } from "./routes";
import { errorHandlerMiddleware, notFoundMiddleware } from "./middleware";
import listEndpoints, { Endpoint } from "express-list-endpoints";

dotenv.config();
const PORT = process.env.PORT;

class App {
  public app: express.Application;
  private static instance: App;

  private constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.databaseSetup();
    this.routes();
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private config(): void {
    // set view engine and view folder
  }

  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private databaseSetup(): void {
    // setup database
  }

  private routes(): void {
    this.app.use("/", endpointRouter);
    this.app.use("/api", authRouter);
    this.app.use("*", notFoundMiddleware);
    this.app.use(errorHandlerMiddleware);
  }

  public run(): void {
    this.app.listen(PORT, () => {
      console.log(`> Server is running on http://localhost:${PORT}.`);
    });
  }
}

export default App.getInstance();
