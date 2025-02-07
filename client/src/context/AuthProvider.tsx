import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  selectedTab: string;
  handleSelectedTab: (tab: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const login = (userData: any) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  const [selectedTab, setSelectedTab] = useState("/dashboard");

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, selectedTab, handleSelectedTab }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
