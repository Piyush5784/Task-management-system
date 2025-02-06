import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
