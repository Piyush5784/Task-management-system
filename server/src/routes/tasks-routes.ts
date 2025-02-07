import express, { Request, Response, NextFunction } from "express";
import { roleCheckMiddleware, userCheck } from "../middlewares/user-middleware";
import { validationResult } from "express-validator";
import {
  AddComment,
  createTask,
  getAllComments,
  getTasks,
  updateTask,
} from "../controllers/tasks-controller";

const router = express.Router();

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    return;
  }
  next();
};

router.post(
  "/create",
  userCheck,
  roleCheckMiddleware,
  validateRequest,
  createTask
);

router.post("/update", roleCheckMiddleware, updateTask);

router.post("/getAllTasks", getTasks);

router.post("/comment", AddComment);

router.get("/getComments", getAllComments);

module.exports = router;
