import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { BACKEND_URL } from "../config";
const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showProfileOption, setShowProfileOptions] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/logout`);
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div>
      <nav className="bg-blue-600">
        <div className="mx-auto max-w-[97%]">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                {!isMobileMenuOpen ? (
                  <IoMenu size={30} />
                ) : (
                  <CgClose size={30} />
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link to="/" className="font-bold text-white">
                  TMA
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      className={`rounded-md px-3 py-2 text-md font-medium ${
                        currentPath === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      aria-current={
                        currentPath === item.href ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                {user && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowProfileOptions(!showProfileOption)}
                      className="relative flex rounded-full bg-gray-800 text-md focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <div className="text-white font-bold p-3 rounded-full bg-gray-600 w-8 h-8 flex items-center justify-center">
                        {user?.username?.charAt(0)}
                      </div>
                    </button>
                  </div>
                )}

                {showProfileOption && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                    onClick={() => setShowProfileOptions(false)}
                  >
                    <button
                      className="block px-4 cursor-pointer py-2 text-md text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={handleLogout}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                )}
                {showProfileOption && (
                  <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowProfileOptions(false)}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile nav */}
        <div
          className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className={`block rounded-md  px-3 py-2 text-base font-medium ${
                  currentPath === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                aria-current={currentPath === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
