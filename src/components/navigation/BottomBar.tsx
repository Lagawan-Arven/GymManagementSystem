import { NavLink } from "react-router-dom";

const BottomBar = () => {
  return (
    <footer className="h-[10vh] text-xs  px-3 text-neutral-800 dark:text-neutral-500 lg:px-5 lg:mt-0 lg:pt-7">
      <div className="border-t pt-2 content-center border-neutral-800 md:flex md:justify-between ">
        <div>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="mt-2 flex justify-between md:mt-0 md:gap-4">
          <NavLink to="/policy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms of Service</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
