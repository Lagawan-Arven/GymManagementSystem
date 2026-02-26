import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";
import BottomBar from "../navigation/BottomBar";

import { IoSettings } from "react-icons/io5";
import { IoIosJournal, IoIosFitness } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { GiTeacher, GiProgression, GiMuscleUp } from "react-icons/gi";

const UserPageLayout = () => {
  const navLinks = [
    { link: "/user", icon: <MdDashboardCustomize />, name: "Dashboard" },
    { link: "/user/workout_logs", icon: <GiMuscleUp />, name: "Workout Logs" },
    { link: "/user/progress", icon: <GiProgression />, name: "Progress" },
    { link: "/user/program", icon: <IoIosFitness />, name: "Programs" },
    { link: "/user/journals", icon: <IoIosJournal />, name: "Journals" },
    { link: "/user/coaches", icon: <GiTeacher />, name: "Coaches" },
    { link: "/user/settings", icon: <IoSettings />, name: "Settings" },
    { link: "/user/support", icon: <BiSupport />, name: "Support" },
  ];
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="relative w-screen h-auto lg:flex lg:h-screen">
          <div className="w-full md:w-[50vw] lg:h-full lg:w-[20vw] ">
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

export default UserPageLayout;
