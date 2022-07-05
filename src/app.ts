import express from "express";
import bodyParser from "body-parser";
import { authRouter, endpointRouter } from "@/routes";
import { errorHandlerMiddleware, notFoundMiddleware } from "@/middlewares";
import swaggerUi from "swagger-ui-express";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@/config";
import swaggerJSDoc from "swagger-jsdoc";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private static instance: App;

  private constructor() {
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.app = express();
    this.config();
    this.middleware();
    this.databaseSetup();
    this.initializeSwagger();
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
    this.app.use("/api/auth", authRouter);

    this.app.use("*", notFoundMiddleware);
    this.app.use(errorHandlerMiddleware);
  }

  private initializeSwagger() {
    const options: swaggerJSDoc.Options = {
      swaggerDefinition: {
        info: {
          title: "Open Bank API",
          version: "1.0.0",
          description:
            "OpenBankAPI is a powerful and flexible API banking platform that allows developers to integrate banking services into their applications. It provides a secure and scalable solution for managing user accounts, conducting financial transactions, and interacting with external payment gateways.",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  public run(): void {
    this.app.listen(PORT, () => {
      console.log(`> Server is running on http://localhost:${PORT}.`);
    });
  }
}

export default App.getInstance();
