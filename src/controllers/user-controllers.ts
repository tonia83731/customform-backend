import { Request, Response, NextFunction } from "express";
import User from "../models/user-models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userControllers = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, email, password, confirmed_pwd } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hash,
      });

      const userData = user.toJSON();
      delete userData.password;

      return res.status(201).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({ email });

      if (!data)
        return res
          .status(403)
          .json({ success: false, messsage: "Email or password incorrect" });

      const is_password_match = await bcrypt.compare(
        password,
        data.password as string
      );
      if (!is_password_match)
        return res
          .status(403)
          .json({ success: false, messsage: "Email or password incorrect" });

      const payload = {
        id: data._id,
        name: data.name,
        email: data.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });
      return res.status(201).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  // https://codeculturepro.medium.com/implementing-google-login-in-a-node-js-application-b6fbd98ce5e
  googleLogin: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default userControllers;
