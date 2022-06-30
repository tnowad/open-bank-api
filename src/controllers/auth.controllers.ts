import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { Request, Response } from "express";
import { AccessTokenPayload, RefreshTokenPayload } from "@/interfaces";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt.utils";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY as string;
const prisma = new PrismaClient();

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(401).json({});
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({});
      return;
    }

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id.toString(),
      email: user.email,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      id: user.id.toString(),
    };

    const accessToken = generateAccessToken(
      accessTokenPayload,
      secretKey,
      "1h"
    );

    const refreshToken = generateRefreshToken(refreshTokenPayload, secretKey);

    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });

    const links = {
      self: {
        href: "/login",
        method: "POST",
      },
      refreshToken: {
        href: "/refresh-token",
        method: "POST",
      },
    };

    res.json({
      user,
      accessToken,
      refreshToken,
      _links: links,
    });
  } catch (error) {
    //
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: {
        id: (req as AuthenticatedRequest).user.id,
      },
      data: {
        access_token: null,
        refresh_token: null,
      },
    });
    res.json({
      user,
      message: "Logged out successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the logout process
    res.status(500).json({
      error: "An error occurred while logging out",
    });
  }
};

export { login, register, logout };
