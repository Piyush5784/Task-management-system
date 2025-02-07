import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Sidebar = () => {
  const { user, handleSelectedTab, selectedTab, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
  ];
  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/logout`);
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="md:w-64 w-full bg-white md:h-[90vh] gap-10 shadow-md flex flex-col justify-between p-6">
      <div className="flex gap-5 flex-col">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        {links.map((item, idx) => (
          <Link
            key={idx}
            to={item.href}
            className={`rounded-md px-3 cursor-pointer py-2 shadow-lg border border-gray-100 font-medium ${
              selectedTab === item.href
                ? "bg-gray-900 text-white"
                : "text-gray-900 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSelectedTab(item.href)}
            aria-current={currentPath === item.href ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <nav className="space-y-2">
        {!user ? (
          <Link
            to="/login"
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Login
          </Link>
        ) : (
          <div className="flex gap-4   items-start justify-between flex-col">
            <div className="flex flex-wrap text-gray-700">{user?.username}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
