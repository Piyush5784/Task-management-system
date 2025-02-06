import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { userModel } from "../models/user-model";
require("dotenv").config();

declare global {
  namespace Express {
    interface Request {
      user?:
        | any
        | Record<string, any>
        | {
            username: string;
            password: string;
            role: "Admin" | "User";
            createdAt: NativeDate;
          };
    }
  }
}

const jwtPassword = process.env.JWT_PASSWORD as string;

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).send({
        message: "Unauthorized access: No token found",
      });
      return;
    }
    jwt.verify(
      token,
      jwtPassword,
      async (err: TokenExpiredError | any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        if (decoded) {
          const user = await userModel.findOne({
            username: decoded.username,
          });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          req.user = user;
        }
        next();
      }
    );
  } catch (error) {
    console.error("Error in userCheck middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const roleCheckMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "Admin") {
    res.status(403).json({
      success: false,
      message: "Forbidden: only admins can perfrom this action",
    });
    return;
  }
  next();
};
