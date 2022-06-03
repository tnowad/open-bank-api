import { Request, Response, NextFunction } from "express";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] ?? req.query.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authenticationMiddleware;
