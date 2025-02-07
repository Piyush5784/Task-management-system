import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthProvider";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
            Welcome, {user?.username}!
          </h2>
          <p className="text-gray-600">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
