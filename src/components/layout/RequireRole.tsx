import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";

interface RequireRoleProps {
  allowedRoles: string[];
}

export const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  const { user } = useAuth();

  // If there's no user, or their role isn't in the allowed list, bounce them
  if (!user || !allowedRoles.includes(user.role)) {
    toast.error("Access Denied: You do not have permission to view this page.");
    return <Navigate to="/" replace />;
  }

  // If they have the right role, render the child route
  return <Outlet />;
};
