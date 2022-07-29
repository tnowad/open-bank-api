import App from "./app";
import { AuthRouter, UserRouter } from "./routes";

const app = new App([new AuthRouter(), new UserRouter()]);

app.run();
