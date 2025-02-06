import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onSubmit: (data: { projectName: string; description: string }) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) => {
  const [projectName, setProjectName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ projectName, description });
  };
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={handleModalClick}
      >
        <h3 className="text-2xl mb-4">Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-semibold mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              disabled={loading}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
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
              rows={4}
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
