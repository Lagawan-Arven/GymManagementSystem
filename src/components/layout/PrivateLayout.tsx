import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";

const PrivateLayout = () => {
  return (
    <>
      <div className="relative dark:bg-black dark:text-white h-dvh lg:flex">
        <div className="absolute w-full lg:h-full lg:w-[15vw] lg:relative">
          <SideBar />
        </div>

        <div className="w-full ">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
