import { Request, Response } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { userModel } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
};
const jwtPassword = process.env.JWT_PASSWORD as string;

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password: inputPass } = req.body;
    const checkUserExists = await userModel.findOne({
      username,
    });

    if (!checkUserExists) {
      res.json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const comparePass = await bcrypt.compare(
      inputPass,
      checkUserExists.password
    );

    if (!comparePass) {
      res.json({ success: false, message: "Incorrect password" });
      return;
    }
    const token = jwt.sign({ username }, jwtPassword);

    res.cookie("token", token, COOKIE_OPTIONS);

    const { password, ...userWithoutPassword } = checkUserExists.toObject();
    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error " + error,
    });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, password: inputPass, role } = req.body;

    const checkUserExists = await userModel.findOne({
      username,
    });

    if (checkUserExists) {
      res.json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(inputPass, 10);
    const token = jwt.sign({ username }, jwtPassword);

    const saveUser = await userModel.create({
      username,
      password: hashedPassword,
      role,
    });
    const { password, ...userWithoutPassword } = saveUser.toObject();
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      message: "User successfully created",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ",
    });
  }
};
export const logoutHandler = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to logout user",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.json({ success: true, message: "All users fetch successfully", users });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch users" });
  }
};
