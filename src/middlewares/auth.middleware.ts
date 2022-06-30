import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AccessTokenPayload } from "../interfaces";

const secretKey = process.env.SECRET_KEY as string;
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req = req as AuthenticatedRequest;
  const accessToken =
    req.headers.authorization?.split(" ")[1] ?? req.query.token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedToken = verifyToken(
      accessToken as string,
      secretKey
    ) as AccessTokenPayload;

    (req as AuthenticatedRequest).user = {
      id: decodedToken.id,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export default authMiddleware;
