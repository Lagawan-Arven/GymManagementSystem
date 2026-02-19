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
} from "../pages";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import AuthGuard from "../context/AuthGuard";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Protected */}
      <Route element={<PrivateLayout />}>
        <Route path="/user" element={<UserPage />} />
        <Route
          path="/coach"
          element={
            <AuthGuard>
              <CoachPage />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          }
        />
        <Route
          path="/owner"
          element={
            <AuthGuard>
              <OwnerPage />
            </AuthGuard>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
