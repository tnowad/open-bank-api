import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware";
import authControllers from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register", asyncHandler(authControllers.register));

authRouter.post("/login", asyncHandler(authControllers.logout));

authRouter.post(
  "/logout",
  authMiddleware,
  asyncHandler(authControllers.logout)
);

export default authRouter;
