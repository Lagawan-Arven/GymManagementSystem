import { FaUserCircle, FaRegMoon } from "react-icons/fa";
import {
  MdMessage,
  MdCircleNotifications,
  MdOutlineWbSunny,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface ModalProp {
  heading?: string;
  isOpen: boolean;
  contents?: string[];
}

const Modal = ({ isOpen, heading, contents }: ModalProp) => {
  if (!isOpen) return null;
  return (
    <aside className="absolute  rounded p-4 bg-neutral-400 dark:bg-neutral-700">
      <h1 className="border-b pb-2 border-neutral-500 md:text-xl ">
        {heading}
      </h1>
      <div className="flex flex-col gap-2 items-start pt-2 md:text-sm">
        {contents?.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </aside>
  );
};

interface TopBarProp {
  navLinks: Array<{
    name: string;
    link: string;
    icon: React.ReactNode;
  }>;
}

const UserModal = ({ isOpen }: { isOpen: boolean }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setIsVisible(true);
    } else if (isOpen === false) {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <>
      {isVisible && (
        <aside className="rounded-2xl p-4 absolute right-2 bg-neutral-400 dark:bg-neutral-700 md:right-10 z-100">
          <h1 className="border-b pb-2 border-neutral-800 dark:border-neutral-500 md:text-xl ">
            {user ? user.username : "User"}
          </h1>
          <div className="flex flex-col gap-2 items-start pt-2 md:text-sm">
            <button
              className="flex gap-2 items-center"
              onClick={() => {
                if (user?.role === "owner") {
                  navigate("/profile");
                } else if (user?.role === "admin") {
                  navigate("/admin/profile");
                }
                setIsVisible(false);
              }}
            >
              <ImProfile />
              My Profile
            </button>
            <button
              className="flex gap-2 items-center"
              onClick={() => {
                logout();
                setIsVisible(false);
              }}
            >
              <IoLogOut />
              Logout
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

const TopBar = ({ navLinks }: TopBarProp) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  const initialMessages = [
    "Message01",
    "Message02",
    "Message03",
    "Message04",
    "Message05",
  ];
  const initialNotifs = ["Notif01", "Notif02", "Notif03"];

  return (
    <>
      <div className="flex justify-between h-full px-2 md:px-5 md:py-2">
        {/*=================== LOGO SECTION =======================*/}
        <section className="text-xs flex gap-2 p-2 border-neutral-700 items-center">
          <h1 className="content-center text-sm font-bold md:text-[24px] lg:text-[30px]">
            Arv<span className="text-red-500">Fit</span>
          </h1>
        </section>

        {/*=================== NAV SECTION =======================*/}
        <section className="hidden md:flex md:gap-10 md:px-5 place-items-center">
          {navLinks?.map((navLink, index) => (
            <NavLink
              key={index}
              to={navLink.link}
              className={({ isActive }) =>
                isActive
                  ? " text-red-500 pb-1 justify-items-center border-b-2 "
                  : "  pb-1 justify-items-center border-b-2 border-neutral-500"
              }
            >
              {navLink.icon}
              <span className="text-[11px] lg:text-[12px] text-neutral-500">
                {navLink.name}
              </span>
            </NavLink>
          ))}
        </section>

        {/*=================== PROFILE SECTION =======================*/}

        <section className="flex gap-3 items-center md:gap-5 ">
          {/*========= HIDDEN FOR NOW ============*/}
          <div className="hidden">
            {/* SEARCH ICON */}
            <div className="hidden md:flex gap-2 items-center  ">
              <CiSearch className="size-6" />
            </div>
            {/* MESSAGE ICON */}
            <button className="">
              <MdMessage
                onClick={() => {
                  setMessageModalOpen(!messageModalOpen);
                  setUserModalOpen(false);
                  setNotifModalOpen(false);
                }}
                className={
                  messageModalOpen
                    ? "text-red-500 size-4 md:size-6"
                    : "size-4 md:size-6"
                }
              />
              <Modal
                isOpen={messageModalOpen}
                heading="Messages"
                contents={initialMessages}
              />
            </button>
            {/* NOTIFICATION ICON */}
            <button>
              <MdCircleNotifications
                className={
                  notifModalOpen
                    ? "text-red-500 size-4 md:size-6"
                    : "size-4 md:size-6"
                }
                onClick={() => {
                  setNotifModalOpen(!notifModalOpen);
                  setMessageModalOpen(false);
                  setUserModalOpen(false);
                }}
              />
              <Modal
                isOpen={notifModalOpen}
                heading="Notifications"
                contents={initialNotifs}
              />
            </button>
          </div>

          {/* SUN MOON ICON */}
          <button
            onClick={() => setTheme(toggleTheme)}
            className="mx-2 md:mx-5 text-red-500"
          >
            {theme === "light" ? (
              <FaRegMoon className="size-4 md:size-5 lg:size-6" />
            ) : (
              <MdOutlineWbSunny className="size-4 md:size-5 lg:size-6" />
            )}
          </button>
          {/* PROFILE ICON */}
          <div className="">
            <FaUserCircle
              className="size-8 md:size-10 lg:size-12"
              onClick={() => {
                setUserModalOpen(!userModalOpen);
                setMessageModalOpen(false);
                setNotifModalOpen(false);
              }}
            />
            <UserModal isOpen={userModalOpen} />
          </div>
        </section>
      </div>
    </>
  );
};

export default TopBar;
