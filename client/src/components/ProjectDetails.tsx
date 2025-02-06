import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectsProvider";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import { BiPlus } from "react-icons/bi";
import ModalforTasks from "./ModelForTasks";
import { BACKEND_URL } from "../config";
import axios from "axios";
import TaskCard from "./TaskCard";
import { useAuth } from "../context/AuthProvider";
import { LuLoaderCircle } from "react-icons/lu";

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    fetchSpecificProject,
    selectedProject,
    tasks,
    filteredTasks,
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
    applyMultipleFilters(user?._id as string);
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
        handleModalClose();
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
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <LuLoaderCircle size={40} className="animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex w-full">
          <Sidebar />
          <div className="p-6 shadow-lg rounded-2xl w-full">
            <div className="flex justify-between text-gray-800">
              <div>
                <h2 className="text-2xl font-bold">Project Details</h2>
                <p>List of all the project details</p>
              </div>
              {user && user.role === "Admin" && (
                <button
                  className="p-2 flex items-center text-md justify-center bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  <BiPlus size={20} />
                  <span className="ml-2">New task</span>
                </button>
              )}
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
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={filters.assignedToMe}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        assignedToMe: !prev.assignedToMe,
                      }))
                    }
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Assigned to me
                  </span>
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
                  <TaskCard key={task._id} task={task} projectId={id} />
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
