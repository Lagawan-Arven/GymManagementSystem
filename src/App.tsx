import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster, toast } from "sonner"; // Your notification library

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

import { InactiveSubscriptionPage } from "./pages/auth/InactiveSubscriptionPage";
import { PageLoader } from "./components/ui/loader";

import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { OperationLayout } from "./components/layout/OperationLayout";
import { RequireRole } from "./components/layout/RequireRole";
import { useAuth } from "./context/useAuth";

// Kicks logged-in users AWAY from public pages
const AuthRoute = () => {
  const { isAuthenticated, isLoading, user, subscription } = useAuth();

  if (isLoading) return <PageLoader />;

  if (isAuthenticated) {
    // 1. Check subscription status first upon login
    if (subscription && !subscription.isActive) {
      return (
        <Navigate
          to={user?.role === "owner" ? "/billing" : "/unauthorized"}
          replace
        />
      );
    }
    // 2. If active, route normally
    return (
      <Navigate
        to={user?.role === "owner" ? "/dashboard" : "/operation"}
        replace
      />
    );
  }

  return <Outlet />; // Let them see the login page
};

// --- The Protected Route Wrapper ---
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user, subscription } = useAuth();
  const location = useLocation(); // Gets the current URL path

  if (isLoading) return <PageLoader />;

  // If not logged in, bounce them to the login page
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  // --- NEW: STRICT SUBSCRIPTION LOCK ---
  if (subscription && !subscription.isActive) {
    // If Owner is trying to go anywhere EXCEPT billing, force them to billing
    if (user?.role === "owner" && location.pathname !== "/billing") {
      toast.error("Access denied. Subscription expired.");
      return <Navigate to="/billing" replace />;
    }
    // If Admin is trying to go anywhere, force them to unauthorized
    if (user?.role === "admin" && location.pathname !== "/unauthorized") {
      toast.error("Access denied. Subscription expired.");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If logged in and subscription is valid (or they are an owner ON the billing page), render routes
  return <Outlet />;
};

function App() {
  console.log("Rendering root app");
  return (
    <>
      <BrowserRouter>
        {/* Global Toaster for notifications */}
        <Toaster position="top-right" richColors />

        <Routes>
          <Route path="/unauthorized" element={<InactiveSubscriptionPage />} />
          <Route element={<AuthRoute />}>
            {/* PUBLIC MARKETING ROUTES (Wrapped in PublicLayout) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* AUTH ROUTES (Using AuthLayout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* PROTECTED DASHBOARD ROUTES */}
          <Route element={<ProtectedRoute />}>
            {/*  DASHBOARD ROUTES */}
            <Route element={<DashboardLayout />}>
              {/* Pages that can be access by the admin */}
              <Route path="/members" element={<MembersPage />} />
              <Route path="/support" element={<SupportPage />} />
              {/* Owner-only Pages */}
              <Route element={<RequireRole allowedRoles={["owner"]} />}>
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/logs" element={<LogsPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
            {/* FULL-SCREEN OPERATION MODE */}
            <Route element={<OperationLayout />}>
              <Route path="/operation" element={<OperationPage />} />
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
