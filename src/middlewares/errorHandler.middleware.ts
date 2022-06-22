import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
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
