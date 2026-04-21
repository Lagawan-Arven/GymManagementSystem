import React, { useState } from "react";
import { api } from "../api/axios";

import type { Subscription } from "../types";
import { AuthContext, type AppUser } from "./useAuth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [subscription, setSubscription] = useState<Subscription | null>(() => {
    const storedSub = localStorage.getItem("subscription");
    return storedSub ? JSON.parse(storedSub) : null;
  });
  // Start loading as true so we don't flash the login screen on refresh
  const [isLoading] = useState<boolean>(false);

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
