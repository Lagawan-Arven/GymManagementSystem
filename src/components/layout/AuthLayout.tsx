import { Outlet } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon } from "lucide-react";

const AuthLayout = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };
  return (
    <>
      <div className=" bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="content-center">
          {/*=================== HEADER =======================*/}
          <header className="h-[10vh] w-full md:h-[15vh] bg-white/70 dark:bg-black/80">
            <div className="w-full h-full content-center">
              <div className="flex justify-between px-2 md:px-5">
                {/*================= LOGO =================  */}
                <div className="flex gap-2 items-center">
                  <img src="/vite.svg" alt="logo" className="md:size-10" />
                  <h1 className="md:text-[24px] font-bold">
                    Fast<span className="text-red-500">AFIT</span>
                  </h1>
                </div>
                {/*================= THEME TOGGLE =================  */}
                <div className="flex gap-5 items-center">
                  <div onClick={toggleTheme} className="text-red-500">
                    {theme === "light" ? <Moon /> : <Sun />}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/*=================== MAIN =======================*/}
          <main className="h-[90vh] md:h-[85vh]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
