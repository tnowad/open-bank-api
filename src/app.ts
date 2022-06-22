import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { authRouter, endpointRouter } from "./routes";
import { errorHandlerMiddleware, notFoundMiddleware } from "./middlewares";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

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
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsdoc(options))
    );
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
