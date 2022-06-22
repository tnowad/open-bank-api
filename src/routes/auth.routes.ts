import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middlewares";
import { authController } from "../controllers";

const authRouter = Router();

authRouter.post("/register", asyncHandler(authController.register));

authRouter.post("/login", asyncHandler(authController.login));

authRouter.post("/logout", authMiddleware, asyncHandler(authController.logout));

export default authRouter;
