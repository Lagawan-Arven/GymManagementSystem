import { createContext, useContext, useState } from "react";
import { signinUser } from "../services/api/authService";

interface AuthContextType {
  user: any | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  const signin = async (email: string, password: string) => {
    console.log("[Auth] User loggin in...");

    const response = await signinUser({ email, password });
    setUser(response.data);
  };

  const signout = () => {
    console.log("[Auth] User logging out...");
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
