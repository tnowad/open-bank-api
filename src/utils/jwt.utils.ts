import jwt from "jsonwebtoken";
import { AccessTokenPayload, RefreshTokenPayload } from "../interfaces";

const generateAccessToken = (
  payload: AccessTokenPayload,
  secretKey: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const generateRefreshToken = (
  payload: RefreshTokenPayload,
  secretKey: string
): string => {
  return jwt.sign(payload, secretKey);
};

const verifyToken = (token: string, secretKey: string): unknown => {
  return jwt.verify(token, secretKey);
};

export { generateAccessToken, generateRefreshToken, verifyToken };
