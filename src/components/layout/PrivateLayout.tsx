import { Outlet } from "react-router-dom";
import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";
import BottomBar from "../navigation/BottomBar";

const PrivateLayout = () => {
  return (
    <>
      <div className=" dark:bg-black dark:text-white">
        <div className="relative lg:flex h-dvh">
          <div className="absolute w-full lg:h-full lg:w-[20vw] lg:relative">
            <SideBar />
          </div>

          <div className="w-full ">
            <TopBar />
            <Outlet />
            <BottomBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
