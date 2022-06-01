import { Request, Response, NextFunction } from "express";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404);
  res.json({
    error: {
      code: 404,
      message: "URL not found",
      url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
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
  });
};

export default notFoundMiddleware;
