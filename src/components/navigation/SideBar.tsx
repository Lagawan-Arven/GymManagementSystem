import { IoSettings } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const navLinks = [
    { link: "/user", icon: <MdDashboardCustomize />, name: "Dashboard" },
    { link: "/settings", icon: <IoSettings />, name: "Settings" },
    { link: "/support", icon: <BiSupport />, name: "Support" },
  ];
  return (
    <>
      <aside className="flex flex-col gap-2 p-4 bg-neutral-400 dark:bg-neutral-800 lg:w-[15vw] lg:h-full lg:px-3 lg:py-10 lg:gap-5 lg:text-md">
        {/* LOGO */}
        <div className="flex gap-2 p-2 border-b-2 mb-2 border-neutral-700 lg:pb-5">
          <img src="src/assets/react.svg" alt="logo" />
          <h1 className="content-center text-xl font-bold lg:text-2xl">
            Fit<span className="text-red-600">Gym</span>
          </h1>
        </div>

        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.link}
            className="flex gap-2 items-center "
          >
            {navLink.icon} {navLink.name}
          </NavLink>
        ))}
      </aside>
    </>
  );
};

export default SideBar;
