import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";
import { Footer } from "./Footer";

export const PublicLayout = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
