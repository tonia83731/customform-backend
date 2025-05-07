import { Request, Response, NextFunction } from "express";
import passport from "../config/passport";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err: Error, user: any) => {
      if (err || !user)
        return res.status(401).json({
          success: false,
          message: "unAuthorized",
        });

      req.user = user;
      next();
    }
  )(req, res, next);
};
