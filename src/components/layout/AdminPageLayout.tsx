import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";

import BottomBar from "../navigation/BottomBar";

import { MdDashboardCustomize } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoIosJournal } from "react-icons/io";
import { LuLogs } from "react-icons/lu";

const AdminPageLayout = () => {
  const navLinks = [
    { link: "/admin", icon: <MdDashboardCustomize />, name: "Dashboard" },
    { link: "/admin/entrance_logs", icon: <LuLogs />, name: "Entrance Logs" },
    { link: "/admin/users", icon: <FaUsers />, name: "Users" },
    { link: "/admin/coaches", icon: <GiTeacher />, name: "Coaches" },
    { link: "/admin/journals", icon: <IoIosJournal />, name: "Journals" },
    { link: "/admin/settings", icon: <IoSettings />, name: "Settings" },
    { link: "/admin/support", icon: <BiSupport />, name: "Support" },
  ];
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="relative w-screen lg:flex lg:h-screen">
          <div className="absolute w-full lg:h-full lg:w-[20vw] lg:relative"></div>

          <div className="w-full lg:h-screen">
            <TopBar />
            <Outlet />
            <BottomBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
