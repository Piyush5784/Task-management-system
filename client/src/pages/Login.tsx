import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      toast.success("User already logged in");
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        login(response.data.user);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-blue-900 text-2xl mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-blue-900 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            disabled={loading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded w-[300px] border border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-blue-900 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-800 text-white p-2 rounded flex items-center justify-center gap-2"
          disabled={loading}
        >
          <AiOutlineLoading3Quarters
            className={`animate-spin ${loading ? "block" : "hidden"}`}
          />
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
