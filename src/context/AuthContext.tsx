import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { showSuccessToast } from "../components/util";

import {
  LoginUser,
  RegisterUser,
  GetCurrentUser,
} from "../services/api/authService";
import type { LoginPayload, RegisterPayload, User } from "../schemas";

interface AuthContextType {
  loading: boolean;
  user: User | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    } else {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetchCurrentUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.user);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    }
  };

  const login = async (data: LoginPayload) => {
    console.log("[Auth] User logging in...");
    try {
      const response = await LoginUser(data);

      localStorage.setItem("access_token", response.access_token);
      setUser(response.user);
      console.log("[Auth] Login success");
      showSuccessToast(response.message);
    } catch (err) {
      console.error("Error while user login: ", err);
      toast.error("Login failed");
    }
  };

  const register = async (data: RegisterPayload) => {
    console.log("[Auth] User registering...");

    try {
      const response = await RegisterUser(data);
      if (response?.success) {
        console.log("[Auth] Registration success");
        showSuccessToast(response.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Registration failed");
      console.error("Error while user registering: ", err);
    }
  };

  const logout = () => {
    console.log("[Auth] User logging out...");
    localStorage.setItem("access_token", "");
    setUser(null);
    showSuccessToast("Logout success");
    navigate("/");
    console.log("[Auth] User logged out");
  };

  return (
    <AuthContext.Provider value={{ loading, user, login, register, logout }}>
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
