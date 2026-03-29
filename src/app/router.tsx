import { Route, Routes } from "react-router-dom";

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
} from "../pages";

import {
  OwnerPageLayout,
  AdminPageLayout,
  PublicLayout,
  AuthLayout,
} from "../components/layout";

import { Toaster } from "../components/util";

import AuthGuard from "../context/AuthGuard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

const AppRouter = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Pages */}
        <Route
          element={
            <AuthGuard>
              <AdminPageLayout />
            </AuthGuard>
          }
        >
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
        <Route
          element={
            <AuthGuard>
              <OwnerPageLayout />
            </AuthGuard>
          }
        >
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
      </Routes>
    </>
  );
};

export default AppRouter;
