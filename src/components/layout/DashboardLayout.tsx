import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const DashboardLayout = () => {
  return (
    <div className="bg-background flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* Scrollable Page Content */}
        <main className="bg-muted/20 flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
