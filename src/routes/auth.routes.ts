import { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
const authRouter = Router();

authRouter.get(
  "register",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("test");
  })
);
authRouter.get("/", (req, res, next) => {
  res.send("test");
});

export default authRouter;
