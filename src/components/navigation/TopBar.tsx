import { FaUserCircle, FaRegMoon, FaRegSun } from "react-icons/fa";
import { MdMessage, MdCircleNotifications } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };
  return (
    <>
      <header className="w-full h-[10vh] bg-white/80 dark:bg-black/80 lg:text-2xl lg:px-20 ">
        {/* */}
        <div className="flex h-full justify-end items-center lg:gap-5">
          <button>
            <MdMessage />
          </button>
          <button>
            <MdCircleNotifications />
          </button>
          <button onClick={toggleTheme} className="lg:mx-5">
            {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
          </button>

          <div className="flex gap-1 items-center">
            <FaUserCircle className="" />
            <h1 className="lg:text-xl ">User</h1>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
