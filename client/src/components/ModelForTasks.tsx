import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SelectDropdown from "./SelectDropdown";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  id: string;
  onSubmit: (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    userId: string;
    assignedUsername: string;
    id: string;
  }) => void;
}

const ModalforTasks: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  id,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("Pending");
  const [priority, setPriority] = React.useState("Low");
  // const [comments, setComments] = React.useState<
  //   { text: string; createdBy: string; createdAt: Date }[]
  // >([]);
  const [assignedTo, setAssignedTo] = React.useState("");
  const [userId, setUserId] = useState("");
  const [assignedUsername, setAssignedUsername] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      priority,
      userId,
      assignedUsername,
      id,
    });
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed overflow-scroll inset-0 bg-gray-500/50 flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-4xl"
        onClick={handleModalClick}
      >
        <h3 className="text-2xl mb-4">Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                disabled={loading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                disabled={loading}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                rows={1}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-semibold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              disabled={loading}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-semibold mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              disabled={loading}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="assignedUsername"
              className="block text-sm font-semibold mb-2"
            >
              Assigned Username
            </label>
            <SelectDropdown
              setUsername={setAssignedUsername}
              setUserId={setUserId}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectId"
              className="block text-sm font-semibold mb-2"
            >
              Project ID
            </label>
            <input
              type="text"
              id="projectId"
              readOnly={true}
              disabled={true}
              value={id}
              className="w-full opacity-50 px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white flex items-center gap-2 justify-center rounded-lg cursor-pointer"
              disabled={loading}
            >
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalforTasks;
