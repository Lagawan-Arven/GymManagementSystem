import { useNavigate, NavLink } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";

interface navLinkProp {
  name: string;
  link: string;
}

const navLinks: navLinkProp[] = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/pricing",
    name: "Pricing",
  },
  {
    link: "/contact",
    name: "Contact",
  },
];

const PublicTopBar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-full content-center">
        <div className="flex justify-between px-2 md:px-5 lg:px-10">
          {/*================= LOGO SECTION =================  */}
          <section className="flex items-center gap-2">
            <h1 className="font-bold md:text-[24px] lg:text-[30px]">
              Arv<span className="text-red-500">Fit</span>
            </h1>
          </section>

          {/*================= NAVS SECTION =================  */}
          <section className="hidden space-x-10 font-semibold md:block">
            {navLinks.map((navLink, index) => (
              <NavLink
                key={index}
                to={navLink.link}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 pb-1 text-black dark:text-white"
                    : "border-b-2 border-neutral-500 pb-1 text-neutral-500"
                }
              >
                <span className="text-[12px] md:text-[16px] lg:text-[20px]">
                  {navLink.name}
                </span>
              </NavLink>
            ))}
          </section>

          {/*================= THEME TOGGLE AND CALL TO ACTION BUTTON SECTION =================  */}
          <section className="flex items-center gap-5">
            <div onClick={toggleTheme} className="text-red-500">
              {theme === "light" ? (
                <Moon className="size-4 md:size-5 lg:size-6" />
              ) : (
                <Sun className="size-4 md:size-5 lg:size-6" />
              )}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-xl border px-2 py-1 text-[16px] font-semibold hover:border-red-500 hover:text-red-500 md:block md:text-[20px]"
            >
              Get Started
            </button>
          </section>

          {/*================= HAMBURGER SECTION =================  */}
          <section className="md:hidden">
            <button className="">
              <GiHamburgerMenu className="size-6" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default PublicTopBar;
