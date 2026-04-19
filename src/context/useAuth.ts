import { useContext, createContext } from "react";

import type { Owner, Admin, Subscription } from "../types";

export type AppUser = Owner | Admin;
interface AuthContextType {
  user: AppUser | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (user: AppUser, token: string, subscription: Subscription) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
