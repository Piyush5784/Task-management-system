import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useProjects } from "../context/ProjectsProvider";
import { useAuth } from "../context/AuthProvider";

type status = "Pending" | "In Progress" | "Done";
interface TaskProps {
  task: {
    _id: string;
    title: string;
    description: string;
    status: status;
    priority: "Low" | "Medium" | "High";
    assignedUsername: string;
    comments: { text: string; createdBy: string; createdAt: string }[];
    createdAt: string;
    updatedAt: string;
  };
}
const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const [showComments, setShowComments] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task.comments);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(true);
  const { user } = useAuth();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      case "Low":
        return "bg-green-500 text-black";
      default:
        return "bg-gray-300";
    }
  };

  const statusTypes = ["Pending", "In Progress", "Done"];

  const updateTaskStatus = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/tasks/update`,
        { status, taskId: task._id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setSaveSuccess(true);
      } else {
        toast.error(res.data.message);
        setStatus(task.status);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(task.status);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/tasks/comment`,
        { text: comment, taskId: task._id, userId: user._id },
        { withCredentials: true }
      );
      setComments([
        ...comments,
        {
          text: comment,
          createdBy: user.username,
          createdAt: new Date().toISOString(),
        },
      ]);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <div className="w-full mt-10 mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <div className="flex items-center justify-between gap-5">
          {!saveSuccess && (
            <button
              onClick={updateTaskStatus}
              disabled={loading}
              className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
          <span
            className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Assigned to:{" "}
          <span className="font-semibold">{task.assignedUsername}</span>
        </span>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as status);
            setSaveSuccess(false);
          }}
          className="px-3 py-1 text-sm font-semibold rounded-md border border-gray-300 bg-white"
        >
          {statusTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </span>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-500 text-sm hover:underline"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 border-t pt-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="p-2 border rounded-md mt-2 bg-gray-100"
              >
                <p className="text-sm">{comment?.text}</p>
                <span className="text-xs text-gray-500">
                  {comment?.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : "Unknown date"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-md text-sm"
            />
            <button
              onClick={addComment}
              className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
