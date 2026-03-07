import { NavLink, Outlet } from "react-router-dom";

import { LayoutDashboard } from "lucide-react";
import { FcSalesPerformance } from "react-icons/fc";

const OwnerHomePage = () => {
  return (
    <>
      <div className="h-full w-full px-2 md:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500 text-red-500">
          {/* Dashboard */}
          <NavLink
            to={"/owner/home"}
            className={({ isActive }) =>
              isActive ? "flex gap-2 items-center " : "flex gap-2 items-center "
            }
          >
            <LayoutDashboard />
            <h1 className=" text-[18px] font-bold md:text-xl">Dashboard</h1>
          </NavLink>
        </header>

        {/*===================== MAIN ==================== */}
        <Outlet />
      </div>
    </>
  );
};

export default OwnerHomePage;
