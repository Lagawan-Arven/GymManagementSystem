import { IoSettings } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SideBar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-2 p-4 bg-neutral-500 dark:bg-neutral-800 lg:w-[15vw] lg:h-full lg:px-3 lg:py-10 lg:gap-5 lg:text-md">
        {/* LOGO */}
        <div className="flex gap-2 p-2 border-b-2 mb-2 border-neutral-700 lg:pb-5">
          <img src="src/assets/react.svg" alt="logo" />
          <h1 className="content-center text-xl font-bold lg:text-2xl">
            Fit<span className="text-red-600">Gym</span>
          </h1>
        </div>

        {/* DASHBOARD */}
        <div className="flex gap-1 items-center">
          <NavLink to="/user" className=" ">
            <MdDashboardCustomize />
          </NavLink>
          <h3>Dashboard</h3>
        </div>

        {/* SETTINGS */}
        <div className="flex gap-1 items-center">
          <NavLink to="/settings" className=" ">
            <IoSettings className=" " />
          </NavLink>
          <h3>Settings</h3>
        </div>

        {/* SUPPORT*/}
        <div className="flex gap-1 items-center">
          <NavLink to="/support" className=" ">
            <BiSupport />
          </NavLink>
          <h3>Support</h3>
        </div>

        <div>
          <button
            onClick={() => {
              signout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
