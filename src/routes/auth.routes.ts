import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware";
import { authController } from "../controllers";

const authRouter = Router();

authRouter.post("/register", asyncHandler(authController.register));

authRouter.post("/login", asyncHandler(authController.logout));

authRouter.post("/logout", authMiddleware, asyncHandler(authController.logout));

export default authRouter;
