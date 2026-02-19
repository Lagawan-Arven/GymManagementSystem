import { NavLink } from "react-router-dom";

const BottomBar = () => {
  return (
    <footer className="text-xs text-neutral-800 dark:text-neutral-500 lg:px-5 ">
      <div className="border-t content-center border-neutral-800 md:flex md:justify-between lg:pt-2">
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
