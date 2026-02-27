import { Route, Routes } from "react-router-dom";
import {
  About,
  AdminPage,
  Coaches,
  CoachPage,
  Contact,
  Landing,
  OwnerPage,
  Services,
  UserPage,
  WorkoutLogs,
  Progress,
  Programs,
  Journals,
} from "../pages";
import {
  PublicLayout,
  UserPageLayout,
  CoachPageLayout,
  AdminPageLayout,
  OwnerPageLayout,
} from "../components/layout";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* PROTECTED */}
      {/* User Pages */}
      <Route element={<UserPageLayout />} HydrateFallback={ErrorFallback}>
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/workout_logs" element={<WorkoutLogs />} />
        <Route path="/user/progress" element={<Progress />} />
        <Route path="/user/programs" element={<Programs />} />
        <Route path="/user/journals" element={<Journals />} />
        <Route path="/user/coaches" element={<WorkoutLogs />} />
      </Route>

      {/* Coach Pages */}
      <Route element={<CoachPageLayout />}>
        <Route path="/coach" element={<CoachPage />} />
      </Route>

      {/* Admin Pages */}
      <Route element={<AdminPageLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* Owner Pages */}
      <Route element={<OwnerPageLayout />}>
        <Route path="/owner" element={<OwnerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
