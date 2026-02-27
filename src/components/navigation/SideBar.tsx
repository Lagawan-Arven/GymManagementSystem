import { Menu, X } from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const SideBar = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseClass =
    "fixed w-full md:w-[50vw] z-[100] p-4 border-b border-black bg-neutral-300 dark:bg-neutral-800 lg:static lg:block lg:w-[20vw] lg:h-full lg:px-5 lg:text-md";

  return (
    <>
      {/* OPEN BUTTON (Left side) */}
      {!menuOpen && (
        <button
          onClick={() => {
            setMenuOpen(true);
          }}
          className="absolute mt-5 ml-5 lg:hidden"
        >
          <Menu />
        </button>
      )}

      {/* CLOSE BUTTON (Right side) */}
      {menuOpen && (
        <button
          onClick={() => {
            setMenuOpen(false);
          }}
          className="fixed z-101 right-0 mt-5 mr-5 md:right-95 lg:hidden "
        >
          <X />
        </button>
      )}

      <aside className={`${menuOpen ? "block" : "hidden"} ${baseClass}`}>
        {/* LOGO */}
        <div className="flex gap-2 p-2 border-b-2 mb-2 border-neutral-700 lg:pb-5">
          <img src="src\assets\react.svg" alt="logo" />
          <h1 className="content-center text-xl font-bold lg:text-2xl">
            Gym<span className="text-red-600">MS</span>
          </h1>
        </div>

        {/* NAVLINKS */}
        <div className="flex flex-col gap-5 pt-2 px-5 lg:px-2">
          {navLinks?.map((navLink, index) => (
            <NavLink
              onClick={() => setMenuOpen(false)}
              key={index}
              to={navLink.link}
              className="flex gap-2 items-center justify-center border-b-1 border-neutral-700 lg:justify-start lg:pl-5 pb-2"
            >
              {navLink.icon} {navLink.name}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
