import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

const Sidebar = () => {
  const { user, handleSelectedTab, selectedTab } = useAuth();
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

  return (
    <aside className="md:w-64 w-full bg-white md:h-[97vh] shadow-md flex flex-col justify-between p-6">
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
          <div className="flex flex-wrap text-gray-700"></div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
