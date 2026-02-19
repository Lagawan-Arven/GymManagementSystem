import { createContext, useContext, useState, useEffect } from "react";
import { signinUser, signupUser } from "../services/api/authService";
import { useNavigate, Navigate } from "react-router-dom";

interface SignupPayload {
  name: string;
  age: number;
  sex: string;
  email: string;
  password: string;
}

interface SigninPayload {
  emailUsername: string;
  password: string;
}

interface User {
  id: string;
  role: string;
  name: string;
  age: number;
  sex: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signin: (data: SigninPayload) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "coach") {
        navigate("/coach");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "owner") {
        navigate("/ownder");
      }
      console.log(user);
    }
  }, [user, navigate]);

  const signin = async (data: SigninPayload) => {
    console.log("[Auth] User signing in...");

    const response = await signinUser(data);
    if (response?.user) {
      localStorage.setItem("access_token", response.access_token);
      setUser(response.user);
      console.log("[Auth] Signin success");
    } else {
      console.log("[Auth] Signin failed");
    }
  };

  const signup = async (data: SignupPayload) => {
    console.log("[Auth] User signing up...");

    const response = await signupUser(data);
    if (response?.status) {
      if (response.status === "ok") {
        console.log("[Auth] Signup success");
      } else {
        console.log("[Auth] Signup failed");
      }
    }
  };

  const signout = () => {
    console.log("[Auth] User signing out...");
    localStorage.setItem("access_token", "");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
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
