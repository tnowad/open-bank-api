import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "@/middlewares";
import { authController } from "@/controllers";
import { Routes } from "@/interfaces";

const authRouter = Router();

authRouter.post("/register", asyncHandler(authController.register));

authRouter.post("/login", asyncHandler(authController.login));

authRouter.post(
  "/logout",
  asyncHandler(authMiddleware),
  asyncHandler(authController.logout)
);

class AuthRouter implements Routes {
  path?: string;
  router: Router;
}

export default AuthRouter;
