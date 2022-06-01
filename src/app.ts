import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { authRouter } from "./routes";
import { notFoundMiddleware } from "./middleware";

dotenv.config();
const PORT = process.env.PORT;

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.databaseSetup();
    this.routes();
  }
  private config(): void {
    // about set view engine
    // folder view
  }
  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private databaseSetup(): void {
    // setup database
  }
  private routes(): void {
    this.app.use("*", notFoundMiddleware);
  }
  public run(): void {
    this.app.listen(PORT, () => {
      console.log(`> Server is running on http://localhost:${PORT}.`);
    });
  }
}

export default new App();
