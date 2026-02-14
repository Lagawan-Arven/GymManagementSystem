import { createContext, useContext, useState, useEffect } from "react";
import { signinUser } from "../services/api/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/user");
    }
  }, []);

  const signin = async (email: string, password: string) => {
    console.log("[Auth] User signing in...");

    const response = await signinUser({ email, password });

    if (response) {
      localStorage.setItem("access_token", response.access_token);
      setUser(response.name);
      console.log("[Auth] Signin success");
    } else {
      console.log("[Auth] Signin failed");
    }
  };

  const signout = () => {
    console.log("[Auth] User signing out...");
    localStorage.setItem("access_token", "");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
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
