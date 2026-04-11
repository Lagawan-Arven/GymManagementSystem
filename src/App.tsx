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
  BillingPage,
  DashboardOverview,
  MembersPage,
  PaymentsPage,
  SettingsPage,
  LandingPage,
  PricingPage,
  ContactPage,
  SupportPage,
  LogsPage,
  OperationPage,
} from "./pages";

import { PageLoader } from "./components/ui/loader";

import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { OperationLayout } from "./components/layout/OperationLayout";

import { useAuth } from "./context/AuthProvider";

// Kicks logged-in users AWAY from login/register pages
const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />; // Bounce to dashboard

  return <Outlet />; // Let them see the login page
};

// --- The Protected Route Wrapper ---
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;

  // If not logged in, bounce them to the login page
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // If logged in, render the child routes (e.g., Dashboard Layout)
  return <Outlet />;
};

import { RequireRole } from "./components/layout/RequireRole";

function App() {
  console.log("Rendering root app");
  return (
    <>
      <BrowserRouter>
        {/* Global Toaster for notifications */}
        <Toaster position="top-right" richColors />

        <Routes>
          {/* PUBLIC MARKETING ROUTES (Wrapped in PublicLayout) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* AUTH ROUTES (Using AuthLayout) */}

          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* PROTECTED DASHBOARD ROUTES */}
          <Route element={<ProtectedRoute />}>
            {/*  DASHBOARD ROUTES */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/payments" element={<PaymentsPage />} />

              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/support" element={<SupportPage />} />

              <Route element={<RequireRole allowedRoles={["owner"]} />}>
                <Route path="billing" element={<BillingPage />} />
                <Route path="logs" element={<LogsPage />} />
              </Route>
            </Route>
            {/* FULL-SCREEN OPERATION MODE */}
            <Route element={<OperationLayout />}>
              <Route path="operation" element={<OperationPage />} />
            </Route>
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
