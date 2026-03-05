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
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

interface ModalProp {
  heading?: string;
  isOpen: boolean;
  contents?: string[];
}

const Modal = ({ isOpen, heading, contents }: ModalProp) => {
  if (!isOpen) return null;
  return (
    <aside className="absolute  rounded p-4 bg-neutral-400 dark:bg-neutral-700">
      <h1 className="border-b-1 pb-2 border-neutral-500 lg:text-xl ">
        {heading}
      </h1>
      <div className="flex flex-col gap-2 items-start pt-2 lg:text-sm">
        {contents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </aside>
  );
};

const UserModal = ({ isOpen }: ModalProp) => {
  const { user, signout } = useAuth();

  if (!isOpen) return null;

  return (
    <aside className="rounded-2xl p-4 absolute  bg-neutral-400 dark:bg-neutral-700 lg:right-10">
      <h1 className="border-b-1 pb-2 border-neutral-800 dark:border-neutral-500 lg:text-xl ">
        {user ? user.username : "User"}
      </h1>
      <div className="flex flex-col gap-2 items-start pt-2 lg:text-sm">
        <button
          className="flex gap-2 items-center"
          onClick={() => {
            signout();
          }}
        >
          <ImProfile />
          My Profile
        </button>
        <button
          className="flex gap-2 items-center"
          onClick={() => {
            signout();
          }}
        >
          <IoLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ navLinks }) => {
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
      <div className="flex justify-between h-full px-2 lg:px-5 lg:py-2">
        {/*=================== LOGO SECTION =======================*/}
        <section className="text-xs flex gap-2 p-2 border-neutral-700 items-center">
          <img src="/vite.svg" alt="logo" />
          <h1 className="content-center text-sm font-bold lg:text-2xl">
            Gym<span className="text-red-600">MS</span>
          </h1>
        </section>

        {/*=================== NAV SECTION =======================*/}
        <section className="hidden lg:flex lg:gap-10 lg:px-5 place-items-center">
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
              <span className="text-xs text-neutral-500">{navLink.name}</span>
            </NavLink>
          ))}
        </section>

        {/*=================== PROFILE SECTION =======================*/}

        <section className="flex gap-3 items-center lg:gap-5 ">
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
                    ? "text-red-500 size-4 lg:size-6"
                    : "size-4 lg:size-6"
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
                    ? "text-red-500 size-4 lg:size-6"
                    : "size-4 lg:size-6"
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
            className="mx-2 lg:mx-5 text-red-500"
          >
            {theme === "light" ? (
              <FaRegMoon className="size-4 lg:size-6" />
            ) : (
              <MdOutlineWbSunny className="size-4 lg:size-6" />
            )}
          </button>
          {/* PROFILE ICON */}
          <div className="">
            <FaUserCircle
              className="size-8 lg:size-12"
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
