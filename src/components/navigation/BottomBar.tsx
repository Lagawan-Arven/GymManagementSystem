import { NavLink } from "react-router-dom";

interface NavLink {
  link: string;
  icon: React.ReactNode;
  name: string;
}

interface BottomBarProps {
  navLinks: NavLink[];
}

const BottomBar = ({ navLinks }: BottomBarProps) => {
  return (
    <div className="h-full content-center border-t border-neutral-300 dark:border-neutral-800">
      <section className="flex justify-around place-items-center">
        {navLinks?.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.link}
            className={({ isActive }) =>
              isActive
                ? " text-red-500 pt-2 justify-items-center border-t-2 "
                : "  pt-2 justify-items-center border-t-2 border-neutral-500"
            }
          >
            {navLink.icon}
            <span className="text-xs text-neutral-500">{navLink.name}</span>
          </NavLink>
        ))}
      </section>
    </div>
  );
};

export default BottomBar;
