import { NavLink, Outlet } from "react-router-dom";

import { LayoutDashboard } from "lucide-react";
import { BiSolidReport } from "react-icons/bi";

const OwnerHomePage = () => {
  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500">
          {/* Dashboard */}
          <NavLink
            to={"/owner/home/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-red-500 border-r-red-500 text-red-500"
                : "flex gap-2 items-center pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-neutral-500 border-r-neutral-500"
            }
          >
            <LayoutDashboard />
            <h1 className="lg:font-bold text-xl lg:text-2xl">Dashboard</h1>
          </NavLink>

          {/* Reports */}
          <NavLink
            to={"/owner/home/reports"}
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-red-500 border-r-red-500 text-red-500"
                : "flex gap-2 items-center pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-neutral-500 border-r-neutral-500"
            }
          >
            <BiSolidReport className="size-5 lg:size-7" />
            <p className="lg:font-bold text-xl lg:text-2xl">Reports</p>
          </NavLink>
        </header>

        {/*===================== MAIN ==================== */}
        <Outlet />
      </div>
    </>
  );
};

export default OwnerHomePage;
