import { Request, Response } from "express";
import { AccessTokenPayload, RefreshTokenPayload } from "../types";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils";
const secretKey = process.env.SECRET_KEY as string;

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;
    console.log(email, username, password);

    const user = {
      id: 1,
      email: "example@exmple.com",
    };

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
      "15m"
    );
    const refreshToken = generateRefreshToken(refreshTokenPayload, secretKey);

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
      accessToken,
      refreshToken,
      _links: links,
    });
  } catch (error) {
    //
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  return;
};

const logout = async (req: Request, res: Response): Promise<void> => {
  return;
};

export { login, register, logout };
