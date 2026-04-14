import React, { createContext, useContext, useState, useEffect } from "react";
import type { Owner, Admin, Member, Subscription } from "../types";
import { api } from "../api/axios";

// The union type of all possible users based on our backend
type AppUser = Owner | Admin | Member;

interface AuthContextType {
  user: AppUser | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (user: AppUser, token: string, subscription: Subscription) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  // Start loading as true so we don't flash the login screen on refresh
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // On app mount, check if we have a saved user and token
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedSub = localStorage.getItem("subscription");

    if (storedUser && storedToken && storedSub) {
      setUser(JSON.parse(storedUser));
      setSubscription(JSON.parse(storedSub));
    }
    setIsLoading(false);
  }, []);

  const setAuth = (
    newUser: AppUser,
    token: string,
    subscription: Subscription,
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("subscription", JSON.stringify(subscription));
    setUser(newUser);
    setSubscription(subscription);
  };

  const logout = async () => {
    try {
      // 1. Call the backend to blacklist the token in Redis
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout API failed, but clearing local state anyway",
        error,
      );
    } finally {
      // 2. Clear frontend state regardless of backend success
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("subscription");
      setUser(null);
      setSubscription(null);

      // 3. Kick them back to landing page
      window.location.href = "/";
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isLoading,
        isAuthenticated,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context cleanly in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
