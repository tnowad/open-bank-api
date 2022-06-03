import { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { authenticationMiddleware } from "../middleware";
const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // register
  })
);

authRouter.post(
  "/login",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // login
  })
);

authRouter.post(
  "/logout",
  authenticationMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // logout
  })
);

export default authRouter;
