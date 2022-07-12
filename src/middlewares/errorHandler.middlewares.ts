import { HttpException } from "@/exceptions";
import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = err.status || 500;
    const message: string = err.message || "Something went wrong";

    // Todo: Replace console log with logger in feature
    console.log(`${req.method} ${req.path} ${status} ${message}`);

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorHandlerMiddleware;
