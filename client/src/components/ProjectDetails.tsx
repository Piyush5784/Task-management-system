import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectsProvider";
import toast, { LoaderIcon } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { BiPlus } from "react-icons/bi";
import ModalforTasks from "./ModelForTasks";
import { BACKEND_URL } from "../config";
import axios from "axios";
import TaskCard from "./TaskCard";
import { useAuth } from "../context/AuthProvider";

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    fetchSpecificProject,
    selectedProject,
    tasks,
    filteredTasks,
    applyFilterAssignedByUser,
    applyFilterByStatus,
    applyFilterByPriority,
    applyMultipleFilters,
    filters,
    setFilters,
  } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      await fetchSpecificProject(id as string);
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  useEffect(() => {
    applyMultipleFilters(id as string);
  }, [filters, tasks]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    userId: string;
    assignedUsername: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/tasks/create`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          projectId: id,
          assignedUsername: data.assignedUsername,
          assignedTo: data.userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to save task");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <div>Invalid Id</div>;
  } else if (loading) {
    return <LoaderIcon />;
  } else {
    return (
      <>
        <div className="flex w-full">
          <Sidebar />
          <div className="p-6 shadow-lg rounded-2xl w-full">
            <div className="flex justify-between text-gray-800">
              <h2 className="text-2xl font-bold">Project Details</h2>
              <button
                className="p-2 flex items-center text-md justify-center bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(true)}
              >
                <BiPlus size={20} />
                <span className="ml-2">New task</span>
              </button>
            </div>

            <p className="text-xl font-semibold mt-4">
              Project name:{" "}
              <span className="text-gray-700">
                {selectedProject?.projectName}
              </span>
            </p>
            <p className="text-gray-600 mt-2">Project ID: {id}</p>
            <p className="mt-2">{selectedProject?.description}</p>
            <p className="text-gray-500 mt-2">
              Created At: {selectedProject?.createdAt?.toString()}
            </p>

            <ModalforTasks
              isOpen={isModalOpen}
              loading={loading}
              onClose={handleModalClose}
              id={id}
              onSubmit={handleModalSubmit}
            />

            {/* Filters Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex gap-4 mt-2">
                {/* Assigned to me filter */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.assignedToMe}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        assignedToMe: e.target.checked,
                      }))
                    }
                  />
                  <span>Assigned to me</span>
                </label>

                {/* Status filter */}
                <select
                  className="border p-2 rounded"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                {/* Priority filter */}
                <select
                  className="border p-2 rounded"
                  value={filters.priority}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                >
                  <option value="">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Task List */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">Project Tasks</h2>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              ) : (
                <p className="text-gray-500 mt-2">No tasks found.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProjectDetails;
