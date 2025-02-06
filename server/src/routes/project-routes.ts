import express from "express";
import { roleCheckMiddleware } from "../middlewares/user-middleware";
import {
  createProject,
  fetchSpecificProject,
  getAllProject,
} from "../controllers/project-controllers";
const router = express.Router();

router.post("/createProject", roleCheckMiddleware, createProject);

router.get("/getAll", getAllProject);

router.get("/specificProject/:id", fetchSpecificProject);

module.exports = router;
