import { Suspense } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner"; // Your notification library

import {
  Login,
  Register,
  MyProfilePage,
  HomePage,
  AdminsPage,
  SessionsPage,
  MembersPage,
  LogsPage,
  LandingPage,
  PricingPage,
  ContactPage,
} from "./pages";

import {
  OwnerPageLayout,
  AdminPageLayout,
  PublicLayout,
  AuthLayout,
} from "./components/layout";

import { Loading } from "./components/util";
import { useAuth } from "./context/AuthProvider";

// --- The Protected Route Wrapper ---
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  // If not logged in, bounce them to the login page
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // If logged in, render the child routes (e.g., Dashboard Layout)
  return <Outlet />;
};

function App() {
  console.log("Rendering root app");
  return (
    <>
      <BrowserRouter>
        {/* Global Toaster for notifications */}
        <Toaster position="top-right" richColors />

        <Suspense fallback={<Loading fullScreen text="Page Loading..." />}>
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth Pages */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              {/* Admin Pages */}
              <Route element={<AdminPageLayout />}>
                {/* Profile */}
                <Route path="/admin/profile" element={<MyProfilePage />} />
                {/* Home */}
                <Route path="/admin/home" element={<HomePage />} />
                {/* Sessions */}
                <Route path="/admin/sessions" element={<SessionsPage />} />
                {/* Members */}
                <Route path="/admin/members" element={<MembersPage />} />
                {/* Logs */}
                <Route path="/admin/logs" element={<LogsPage />} />
              </Route>
              {/* Owner Pages */}
              <Route element={<OwnerPageLayout />}>
                {/* Profile */}
                <Route path="/profile" element={<MyProfilePage />} />
                {/* Home */}
                <Route path="/home" element={<HomePage />} />
                {/* Admins */}
                <Route path="/admins" element={<AdminsPage />} />
                {/* Sessions */}
                <Route path="/sessions" element={<SessionsPage />} />
                {/* Members */}
                <Route path="/members" element={<MembersPage />} />
                {/* Logs */}
                <Route path="/logs" element={<LogsPage />} />
              </Route>
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
