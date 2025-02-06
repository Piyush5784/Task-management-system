import { Request, Response } from "express";
import { taskModel } from "../models/tasks-model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      comments = [],
      assignedTo,
      assignedUsername,
      projectId,
    } = req.body;

    const newTask = await taskModel.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      assignedUsername,
      projectId,
      comments,
    });

    res.status(201).json({
      success: true,
      message: "Task successfully created",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      projectId,
      updateData,

      {
        new: true,
      }
    );

    if (!updatedTask) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.json({
      success: false,
      message: "Failed to update task",
    });
  }
};
