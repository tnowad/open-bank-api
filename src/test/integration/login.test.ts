import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.utils";
import { login } from "../../controllers/auth.controllers";

// Mocking the token utility functions
jest.mock("./your-token-utils", () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

describe("login", () => {
  let req: Request;
  let res: Response;
  const mockJsonResponse = jest.fn();
  const mockStatus = jest.fn(() => ({ json: mockJsonResponse }));

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "password",
      },
    } as Request;
    res = {
      json: mockJsonResponse,
      status: mockStatus,
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate access token and refresh token and send them in the response", async () => {
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";
    (generateAccessToken as jest.Mock).mockReturnValue(mockAccessToken);
    (generateRefreshToken as jest.Mock).mockReturnValue(mockRefreshToken);

    await login(req, res);

    expect(generateAccessToken).toHaveBeenCalled();
    expect(generateRefreshToken).toHaveBeenCalled();
    expect(mockJsonResponse).toHaveBeenCalledWith({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });
  });

  it("should handle errors and send an error response", async () => {
    const mockError = new Error("Login error");
    (generateAccessToken as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJsonResponse).toHaveBeenCalledWith({
      error: "An error occurred during login",
    });
  });
});
