import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";
import BottomBar from "../navigation/BottomBar";

import { MdDashboardCustomize } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { AiFillSchedule } from "react-icons/ai";
import { LuLogs } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { IoIosJournal, IoIosFitness } from "react-icons/io";

const CoachPageLayout = () => {
  const navLinks = [
    { link: "/coach", icon: <MdDashboardCustomize />, name: "Dashboard" },
    { link: "/coach/schedules", icon: <AiFillSchedule />, name: "Schedules" },
    { link: "/coach/session_logs", icon: <LuLogs />, name: "Session Logs" },
    { link: "/coach/programs", icon: <IoIosFitness />, name: "Programs" },
    { link: "/coach/journals", icon: <IoIosJournal />, name: "Journals" },
    { link: "/coach/students", icon: <PiStudentFill />, name: "Students" },
    { link: "/coach/settings", icon: <IoSettings />, name: "Settings" },
    { link: "/coach/support", icon: <BiSupport />, name: "Support" },
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

export default CoachPageLayout;
