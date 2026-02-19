import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import type { JSX } from "react";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthGuard;
