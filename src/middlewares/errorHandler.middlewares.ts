import { HttpException } from "@/exceptions";
import { Request, Response } from "express";

const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response
) => {
  console.error(err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const errorResponse = {
    error: {
      code: statusCode,
      message: err.message,
      links: [
        {
          rel: "home",
          href: `${req.protocol}://${req.get("host")}`,
        },
        {
          rel: "documentation",
          href: "https://github.com/tnowad/open-bank-api",
        },
      ],
    },
  };
  res.json(errorResponse);
};

export default errorHandlerMiddleware;
