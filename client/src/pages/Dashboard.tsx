import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProjects } from "../context/ProjectsProvider";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { fetchProjects } = useProjects();

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.username}!
          </h2>
          <p className="text-gray-600">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
