import { LuLoaderCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

interface projectCardProps {
  projects: any;
  loading: boolean;
}
const ProjectCard = ({ projects, loading }: projectCardProps) => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800">Projects</h2>

      {loading || !projects ? (
        <div className="flex items-center justify-center h-[100vh]">
          <LuLoaderCircle size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-5">
          {projects.map((project: any, idx: number) => (
            <Link key={idx} to={`/projects/${project._id}`}>
              <div
                key={project._id}
                className="p-4 bg-gray-100 gap-5 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {project.projectName}
                </h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Created At: {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
