import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AccessTokenPayload } from "../interfaces";
import { SECRET_KEY } from "@/config";
import { PrismaClient, User } from "@prisma/client";
import { HttpException } from "@/exceptions/http.exceptions";
const prisma = new PrismaClient();

const getAuthorization = (req: Request) => {
  const cookie = req.cookies?.Authorization;
  if (cookie) {
    return cookie;
  }

  const header = req.headers?.authorization;
  if (header) {
    const [scheme, token] = header.split(" ");
    if (scheme === "Bearer") {
      return token;
    }
  }

  return null;
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = getAuthorization(req);
    if (authorization) {
      const { id } = verifyToken(
        authorization,
        SECRET_KEY
      ) as AccessTokenPayload;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        (req as AuthenticatedRequest).user = user;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(401, "Wrong authentication token"));
  }
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

export default authMiddleware;
