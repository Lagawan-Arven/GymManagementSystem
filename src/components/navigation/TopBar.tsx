import { FaUserCircle, FaRegMoon, FaRegSun } from "react-icons/fa";
import { MdMessage, MdCircleNotifications } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";

interface ModalProp {
  heading: string;
  isOpen: boolean;
  contents: string[];
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
    <aside className="rounded-2xl p-4 bg-neutral-400 absolute dark:bg-neutral-700 ">
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

const TopBar = () => {
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
      <header className="w-full h-[10vh] lg:text-2xl lg:py-2 lg:px-10 lg:my-2">
        {/* */}
        <div className="flex h-full border border-neutral-400 dark:border-neutral-700 rounded-2xl justify-end items-center lg:gap-5 lg:px-10">
          <button className="">
            <MdMessage
              onClick={() => {
                setMessageModalOpen(!messageModalOpen);
                setUserModalOpen(false);
                setNotifModalOpen(false);
              }}
            />
            <Modal
              isOpen={messageModalOpen}
              heading="Messages"
              contents={initialMessages}
            />
          </button>
          <button>
            <MdCircleNotifications
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
          <button onClick={toggleTheme} className="lg:mx-5">
            {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
          </button>

          <div className="">
            <FaUserCircle
              className="lg:size-10"
              onClick={() => {
                setUserModalOpen(!userModalOpen);
                setMessageModalOpen(false);
                setNotifModalOpen(false);
              }}
            />
            <UserModal isOpen={userModalOpen} />
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
