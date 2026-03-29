import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon } from "lucide-react";

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
        <div className="flex justify-between px-2 md:px-5 lg:px-10">
          {/*================= LOGO =================  */}
          <div className="flex gap-2 items-center">
            <h1 className="md:text-[24px] lg:text-[30px] font-bold">
              Arv<span className="text-red-500">Fit</span>
            </h1>
          </div>
          {/*================= THEME TOGGLE AND CALL TO ACTION BUTTON =================  */}
          <div className="flex gap-5 items-center">
            <div onClick={toggleTheme} className="text-red-500">
              {theme === "light" ? (
                <Moon className="size-4 md:size-5 lg:size-6" />
              ) : (
                <Sun className="size-4 md:size-5 lg:size-6" />
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
