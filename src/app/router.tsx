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
        <Route path="/coach" element={<CoachPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/owner" element={<OwnerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
