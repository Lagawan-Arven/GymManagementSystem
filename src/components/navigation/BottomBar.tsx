import { MdDashboard } from "react-icons/md";

import { NavLink } from "react-router-dom";

const BottomBar = ({ navLinks }) => {
  return (
    <footer className="h-[10vh] text-xs px-3 text-neutral-800 dark:text-neutral-500 lg:px-5 lg:mt-0 lg:pt-7 lg:hidden">
      <div className="border-t pt-2 content-center border-neutral-800 md:flex md:justify-between ">
        <main className="flex gap-5 ">
          {navLinks?.map((navLink, index) => (
            <NavLink
              key={index}
              to={navLink.link}
              className="flex gap-2 items-center justify-center border-b-1 border-neutral-700 lg:justify-start lg:pl-5 pb-2"
            >
              {navLink.icon} {navLink.name}
            </NavLink>
          ))}
        </main>
      </div>
    </footer>
  );
};

export default BottomBar;
