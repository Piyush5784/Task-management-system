import express, { Request, Response } from "express";
import {
  getUsers,
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/user-controller";
import { check, ValidationChain, validationResult } from "express-validator";

const router = express.Router();

export const validateUserLogin: ValidationChain | any = [
  check("username").isString().notEmpty().withMessage("Username is required"),
  check("password").isString().notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export const validateUserRegister: ValidationChain | any = [
  check("username").isString().notEmpty().withMessage("Username is required"),
  check("password").isString().notEmpty().withMessage("Password is required"),
  check("role").isString().notEmpty().withMessage("role is required"),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
router.post("/login", validateUserLogin, loginHandler);

router.post("/register", validateUserRegister, registerHandler);

router.get("/getUsers", getUsers);
router.post("/logout", logoutHandler);

module.exports = router;
