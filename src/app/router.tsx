import { Route, Routes } from "react-router-dom";
import {
  About,
  AdminPage,
  Coaches,
  Contact,
  Landing,
  Services,
  UserPage,
  WorkoutLogs,
  Progress,
  Programs,
} from "../pages";

import {
  OwnerHomePage,
  OwnerHomeDashboard,
  OwnerHomeReports,
  OwnerAdminsPage,
  OwnerMembersPage,
  OwnerLogsPage,
} from "../pages/owner";

import {
  PublicLayout,
  UserPageLayout,
  AdminPageLayout,
  OwnerPageLayout,
} from "../components/layout";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

const AppRouter = () => {
  return (
    <Routes>
      {/*================= PUBLIC ===================*/}
      {/* Auth Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/*============= PROTECTED ===============*/}
      {/* User Pages */}
      <Route element={<UserPageLayout />} HydrateFallback={ErrorFallback}>
        <Route path="/user/dashboard" element={<UserPage />} />
        <Route path="/user/workout_logs" element={<WorkoutLogs />} />
        <Route path="/user/progress" element={<Progress />} />
        <Route path="/user/programs" element={<Programs />} />
        <Route path="/user/coaches" element={<WorkoutLogs />} />
      </Route>

      {/* Admin Pages */}
      <Route element={<AdminPageLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* Owner Pages */}
      <Route element={<OwnerPageLayout />}>
        {/* Home */}
        <Route element={<OwnerHomePage />}>
          <Route path="/owner/home/" element={<OwnerHomeDashboard />} />
        </Route>

        {/* Admins */}
        <Route path="/owner/admins" element={<OwnerAdminsPage />} />

        {/* Members */}
        <Route path="/owner/members" element={<OwnerMembersPage />} />

        {/* Logs */}
        <Route path="/owner/logs" element={<OwnerLogsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
