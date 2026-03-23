import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon, Menu, X } from "lucide-react";

const PublicTopBar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full content-center">
        <div className="flex justify-between px-5">
          {/*================= LOGO =================  */}
          <div className="flex gap-2 items-center">
            <img src="/vite.svg" alt="logo" className="md:size-10" />
            <h1 className="md:text-[24px] font-bold">
              Fast<span className="text-red-500">AFIT</span>
            </h1>
          </div>
          {/*================= THEME TOGGLE AND CALL TO ACTION BUTTON =================  */}
          <div className="flex gap-5 items-center">
            <div onClick={toggleTheme} className="text-red-500">
              {theme === "light" ? (
                <Moon className="size-4 md:size-5" />
              ) : (
                <Sun className="size-4 md:size-5" />
              )}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-2 py-1 text-[16px] md:text-[20px] font-semibold border hover:border-red-500 rounded-xl hover:text-red-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicTopBar;
