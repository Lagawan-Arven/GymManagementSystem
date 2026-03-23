import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import BottomBar from "../navigation/BottomBar";

import { FaUsers } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { LuLogs } from "react-icons/lu";
import { PiRecordFill } from "react-icons/pi";

const OwnerPageLayout = () => {
  const navLinks = [
    {
      link: "/admin/home",
      icon: <IoMdHome className="md:size-5" />,
      name: "Home",
    },
    {
      link: "/admin/sessions",
      icon: <PiRecordFill className="md:size-5" />,
      name: "Sessions",
    },
    {
      link: "/admin/members",
      icon: <FaUsers className="md:size-5" />,
      name: "Members",
    },
    {
      link: "/admin/logs",
      icon: <LuLogs className="md:size-5" />,
      name: "Logs",
    },
  ];
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="">
          {/*=================== HEADER =======================*/}
          <header className="h-[10vh] md:h-[15vh]">
            <TopBar navLinks={navLinks} />
          </header>

          {/*=================== MAIN =======================*/}
          <main className="h-[80vh] md:h-[85vh] overflow-auto">
            <Outlet />
          </main>

          {/*=================== FOOTER =======================*/}
          <footer className="h-[10vh] md:hidden">
            <BottomBar navLinks={navLinks} />
          </footer>
        </div>
      </div>
    </>
  );
};

export default OwnerPageLayout;
