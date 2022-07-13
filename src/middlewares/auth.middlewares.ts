import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AccessTokenPayload } from "../interfaces";
import { SECRET_KEY } from "@/config";
import { PrismaClient, User } from "@prisma/client";
import { HttpException } from "@/exceptions/http.exceptions";
const prisma = new PrismaClient();

const getAuthorization = (req: Request) => {
  // Read authorization value from cookie
  const cookie = req.cookies && req.cookies["Authorization"];
  if (cookie) {
    console.log(cookie);
    return cookie;
  }

  // Read authorization value from header
  const header = req.headers && req.headers["authorization"];
  if (header) {
    const [scheme, token] = header.split(" ");
    if (scheme === "Bearer") {
      console.log(token);
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
    console.log({ authorization });
    if (authorization) {
      const { id, email } = verifyToken(
        authorization,
        SECRET_KEY
      ) as AccessTokenPayload;

      const user = await prisma.user.findUnique({
        where: {
          id,
          email,
        },
      });

      if (user) {
        (req as AuthenticatedRequest).user = user;
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
