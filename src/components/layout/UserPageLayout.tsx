import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import BottomBar from "../navigation/BottomBar";

import { IoSettings } from "react-icons/io5";
import { IoIosJournal, IoIosFitness } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { GiTeacher, GiProgression, GiMuscleUp } from "react-icons/gi";

const UserPageLayout = () => {
  const navLinks = [
    {
      link: "/user/dashboard",
      icon: <MdDashboardCustomize className="lg:size-5" />,
      name: "Dashboard",
    },
    {
      link: "/user/workout_logs",
      icon: <GiMuscleUp className="lg:size-5" />,
      name: "Logs",
    },
    {
      link: "/user/progress",
      icon: <GiProgression className="lg:size-5" />,
      name: "Progress",
    },
    {
      link: "/user/programs",
      icon: <IoIosFitness className="lg:size-5" />,
      name: "Programs",
    },
  ];
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="">
          {/*=================== HEADER =======================*/}
          <header className="h-[10vh] lg:h-[15vh]">
            <TopBar navLinks={navLinks} />
          </header>

          {/*=================== MAIN =======================*/}
          <main className="h-[80vh] lg:h-[85vh] overflow-auto">
            <Outlet />
          </main>

          {/*=================== FOOTER =======================*/}
          <footer className="h-[10vh] lg:hidden">
            <BottomBar navLinks={navLinks} />
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserPageLayout;
