import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";
import BottomBar from "../navigation/BottomBar";

import { MdDashboardCustomize, MdAdminPanelSettings } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaUsers, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoIosJournal } from "react-icons/io";
import { LuLogs } from "react-icons/lu";

const OwnerPageLayout = () => {
  const navLinks = [
    { link: "/owner", icon: <MdDashboardCustomize />, name: "Dashboard" },
    { link: "/owner/finance", icon: <FaMoneyBillTrendUp />, name: "Finance" },
    { link: "/owner/entrance_logs", icon: <LuLogs />, name: "Logs" },
    { link: "/owner/users", icon: <FaUsers />, name: "Users" },
    { link: "/owner/coaches", icon: <GiTeacher />, name: "Coaches" },
    { link: "/owner/admins", icon: <MdAdminPanelSettings />, name: "Admins" },
    { link: "/owner/journals", icon: <IoIosJournal />, name: "Journals" },
    { link: "/owner/settings", icon: <IoSettings />, name: "Settings" },
    { link: "/owner/support", icon: <BiSupport />, name: "Support" },
  ];
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="relative w-screen lg:flex lg:h-screen">
          <div className="absolute w-full lg:h-full lg:w-[20vw] lg:relative">
            <SideBar navLinks={navLinks} />
          </div>

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

export default OwnerPageLayout;
