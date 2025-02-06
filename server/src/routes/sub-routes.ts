import express, { Request, Response } from "express";
import { roleCheckMiddleware, userCheck } from "../middlewares/user-middleware";

const authRoutesHandler = require("./auth-routes");
const projectRoutesHandler = require("./project-routes");
const tasksRoutesHandler = require("./tasks-routes");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Healthy Server",
  });
});
router.use("/auth", authRoutesHandler);

router.use("/tasks", userCheck, tasksRoutesHandler);

router.use("/project", userCheck, projectRoutesHandler);

module.exports = router;
