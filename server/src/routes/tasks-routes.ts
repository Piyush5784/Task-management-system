import express, { Request, Response, NextFunction } from "express";
import { roleCheckMiddleware } from "../middlewares/user-middleware";
import { validationResult } from "express-validator";
import { createTask, updateTask } from "../controllers/tasks-controller";

const router = express.Router();

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }
  next();
};

router.post("/create", roleCheckMiddleware, validateRequest, createTask);

router.post("/update", updateTask);

module.exports = router;
