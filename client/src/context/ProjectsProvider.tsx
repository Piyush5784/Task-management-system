import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  projectName: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
}

interface ProjectsContextType {
  projects: Project[];
  applyFilterAll: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<null>>;
  tasks: any[];
  applyFilterByPriority: (priority: string) => void;
  applyMultipleFilters: (id: string) => void;
  applyFilterAssignedByUser: (userId: string) => void;
  applyFilterByStatus: (status: string) => void;

  setTasks: React.Dispatch<React.SetStateAction<any>>;
  filteredTasks: any[];
  fetchUsers: () => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<any>>;
  filters: {
    assignedToMe: boolean;
    status: string;
    priority: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      assignedToMe: boolean;
      status: string;
      priority: string;
    }>
  >;
  users: string[] | any;
  comments: Record<string, any>;
  setComments: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fetchProjects: () => void;
  fetchSpecificProject: (id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const ProjectsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState<any>([]);
  const [users, setUsers] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    assignedToMe: false,
    status: "",
    priority: "",
  });
  const [comments, setComments] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/auth/getUsers`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilterAssignedByUser = (userId: string) => {
    const filtered = tasks.filter(
      (task: { assignedTo: string }) => String(task.assignedTo) === userId
    );
    setFilteredTasks(filtered);
  };
  const applyFilterAll = () => {
    setFilteredTasks(tasks);
  };

  const applyFilterByStatus = (status: string) => {
    if (!status) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task: { status: string }) => task.status === status
      );
      setFilteredTasks(filtered);
    }
  };

  const applyFilterByPriority = (priority: string) => {
    if (!priority) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task: { priority: string }) => task.priority === priority
      );
      setFilteredTasks(filtered);
    }
  };

  const applyMultipleFilters = (id: string) => {
    let updatedTasks = tasks;

    if (filters.assignedToMe) {
      updatedTasks = updatedTasks.filter(
        (task: { assignedTo: string }) => task.assignedTo === id
      );
    }

    if (filters.status) {
      updatedTasks = updatedTasks.filter(
        (task: { status: string }) => task.status === filters.status
      );
    }

    if (filters.priority) {
      updatedTasks = updatedTasks.filter(
        (task: { priority: string }) => task.priority === filters.priority
      );
    }

    setFilteredTasks(updatedTasks);
  };
  const fetchSpecificProject = async (id: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/project/specificProject/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedProject(response.data.project);
        setTasks(response.data.tasks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch project details");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/project/getAll`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);

        setProjects(response.data.projects);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch project details");
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        fetchProjects,
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        tasks,
        setTasks,
        filteredTasks,
        users,
        applyFilterAssignedByUser,
        applyFilterByPriority,
        applyFilterByStatus,
        applyMultipleFilters,

        applyFilterAll,
        setFilteredTasks,
        filters,
        setFilters,
        comments,
        fetchSpecificProject,
        setComments,
        fetchUsers,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
