import { Outlet } from "react-router-dom";

import NavBar from "../navigation/NavBar";
import Footer from "../navigation/Footer";
import { Signin, Signup } from "../../pages";

const PublicLayout = () => {
  return (
    <div className="relative dark:bg-black dark:text-white">
      <header className="fixed top-0 flex w-full h-[10vh] z-2 bg-white/80  dark:bg-black/80">
        {/* LOGO */}
        <div className="flex gap-2 m-3">
          <img src="src/assets/react.svg" alt="logo" />
          <h1 className="content-center text-xl font-bold">
            Fit<span className="text-red-600">Gym</span>
          </h1>
        </div>
        <NavBar />
      </header>
      <Signin />
      <Signup />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
