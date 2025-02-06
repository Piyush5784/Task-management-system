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

    console.log(newTask);

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

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;
    const tasks = await taskModel.find({ projectId });

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body;
    const updateData = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

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

export const AddComment = async (req: Request, res: Response) => {
  try {
    const { taskId, text, userId } = req.body;
    const task = await taskModel.findById(taskId);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    const newComment = {
      text,
      userId,
      createdAt: new Date(),
    };

    task.comments.push(newComment);

    await task.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      task,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.json({
      success: false,
      error: "Failed to add comment",
    });
  }
};
