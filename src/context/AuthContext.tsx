import { createContext, useContext, useState, useEffect } from "react";
import { LoginUser, RegisterUser } from "../services/api/authService";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "owner";

interface LoginPayload {
  owner_id: string | null;
  username: string;
  password: string;
  role: UserRole;
}

interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  role: string;
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/home");
      } else if (user.role === "owner") {
        navigate("/home");
      } else {
        console.error("Invalid user role");
      }
      console.log(user);
    }
  }, [user]);

  const login = async (data: LoginPayload) => {
    console.log("[Auth] User logging in...");

    const response = await LoginUser(data);
    if (response) {
      localStorage.setItem("access_token", response.access_token);
      setUser(response.owner ? response.owner : response.admin);
      console.log("[Auth] Login success");
    } else {
      console.log("[Auth] Login failed");
    }
  };

  const register = async (data: RegisterPayload) => {
    console.log("[Auth] User registering...");

    const response = await RegisterUser(data);
    if (response?.success) {
      if (response.success) {
        console.log("[Auth] Registration success");
        navigate("/login");
      } else {
        console.log("[Auth] Registration failed");
      }
    }
  };

  const logout = () => {
    console.log("[Auth] User logging out...");
    localStorage.setItem("access_token", "");
    setUser(null);
    navigate("/login");
    console.log("[Auth] User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider!");
  return context;
};
