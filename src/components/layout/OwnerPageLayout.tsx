import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import BottomBar from "../navigation/BottomBar";

import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { LuLogs } from "react-icons/lu";

const OwnerPageLayout = () => {
  const navLinks = [
    {
      link: "/owner/home",
      icon: <IoMdHome className="lg:size-5" />,
      name: "Home",
    },
    {
      link: "/owner/admins",
      icon: <MdAdminPanelSettings className="lg:size-5" />,
      name: "Admins",
    },
    {
      link: "/owner/members",
      icon: <FaUsers className="lg:size-5" />,
      name: "Members",
    },
    {
      link: "/owner/logs",
      icon: <LuLogs className="lg:size-5" />,
      name: "Logs",
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

export default OwnerPageLayout;
