import { Request, Response } from "express";
import { projectModel } from "../models/projects-model";
import { taskModel } from "../models/tasks-model";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { projectName, description } = req.body;
    const userId = req?.user?.id;

    await projectModel.create({
      projectName,
      description,
      createdBy: userId,
      createrName: req.user.username,
    });

    res.json({
      success: true,
      message: "Project successfully created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to create project",
      error,
    });
    1;
  }
};

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const projects = await projectModel.find({});
    res.json({
      success: true,
      message: "All project fetched successfully",
      projects,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const fetchSpecificProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;

    if (!projectId) {
      res.json({
        success: false,
        message: "Project ID is required",
      });
      return;
    }

    const project = await projectModel.findOne({
      _id: projectId,
    });

    if (!project) {
      res.json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    const tasks = await taskModel.find({
      projectId: projectId,
    });

    res.json({
      success: true,
      message: "Project and tasks fetched successfully",
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch project and tasks",
      error,
    });
  }
};
