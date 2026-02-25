import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthPage } from "../../context/AuthPageContext";

const pages = ["home", "about", "services", "coaches", "contact"];

const PublicTopBar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const { setSigninOpen, setSignupOpen } = useAuthPage();

  return (
    <>
      {/* MOBILE & TABLET */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-0 m-3 z-2 lg:hidden"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <div className="flex flex-col absolute top-0 w-full text-center backdrop-blur-sm gap-5 px-2 py-3">
          <nav className="flex flex-col">
            {pages.map((page, index) =>
              index === 0 ? (
                <NavLink
                  key={index}
                  to="/"
                  children={page.charAt(0).toUpperCase() + page.slice(1)}
                  className="hover:text-red-500"
                />
              ) : (
                <NavLink
                  key={index}
                  to={"/" + page}
                  children={page.charAt(0).toUpperCase() + page.slice(1)}
                  className="hover:text-red-500"
                />
              ),
            )}
          </nav>
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="justify-items-center hover:text-red-500"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
            <button
              className="hover:text-red-500"
              onClick={() => setSigninOpen(true)}
            >
              Signin
            </button>
            <button
              onClick={() => setSignupOpen(true)}
              className="text-white rounded-lg py-2  bg-red-600 dark:text-black"
            >
              Signup
            </button>
          </div>
        </div>
      )}

      {/* LARGE SCREENS */}
      <div className="hidden lg:flex flex-1">
        <nav className="flex flex-1 justify-center gap-10">
          {pages.map((page, index) =>
            index === 0 ? (
              <NavLink
                key={index}
                to="/"
                children={page.charAt(0).toUpperCase() + page.slice(1)}
                className="content-center hover:text-red-500"
              />
            ) : (
              <NavLink
                key={index}
                to={"/" + page}
                children={page.charAt(0).toUpperCase() + page.slice(1)}
                className="content-center hover:text-red-500"
              />
            ),
          )}
        </nav>

        <div className="flex flex-none py-5 mr-5">
          <button onClick={toggleTheme} className="mx-5 hover:text-red-500  ">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <button
            onClick={() => setSigninOpen(true)}
            className="mx-5 hover:text-red-500"
          >
            Signin
          </button>
          <button
            onClick={() => setSignupOpen(true)}
            className=" text-white rounded-lg p-1 bg-red-600 dark:text-black"
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default PublicTopBar;
