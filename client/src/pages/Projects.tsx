import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useAuth } from "../context/AuthProvider";
import Modal from "../components/ModalForm";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useProjects } from "../context/ProjectsProvider";
import ProjectCard from "../components/ProjectCard";
import Sidebar from "../components/Sidebar";
interface ModalTypes {
  projectName: string;
  description: string;
}

const Projects = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { projects, fetchProjects, fetchUsers } = useProjects();
  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalSubmit = async ({
    projectName,
    description,
  }: ModalTypes) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/project/createProject`,
        {
          projectName,
          description,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        handleModalClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 relative">
        <ProjectCard projects={projects} />

        {user && user.role === "Admin" && (
          <div className="absolute top-6 right-6">
            <button
              className="p-2 flex items-center justify-center bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <BiPlus size={20} />
              <span className="ml-2">New Project</span>
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          loading={loading}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
};

export default Projects;
