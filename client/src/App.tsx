import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthProvider";
import Projects from "./pages/Projects";
import { ProjectsContextProvider } from "./context/ProjectsProvider";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ProjectsContextProvider>
          <BrowserRouter>
            <Navbar />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </ProjectsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
