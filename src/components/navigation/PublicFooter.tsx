import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="content-center p-5 xl:py-20 xl:px-20">
      {/* TOP BAR */}
      <div className="flex flex-col gap-5 content-center md:flex-row">
        {/* LOGO & TEXT*/}
        <div className="basis-1/2 ">
          <div className="flex">
            <img src="src/assets/react.svg" alt="Logo" />
            <h4 className="font-bold xl:text-xl">
              Fit<span className="text-red-600">Gym</span>
            </h4>
          </div>
          <p className="text-sm mt-2 pr-10 xl:pr-50 xl:text-md">
            Train smarter. Get stronger. Join a fitness community built for real
            results and long-term performance.
          </p>
        </div>

        {/* CONTACT US */}
        <div className="basis-1/4 ">
          <h6 className="font-bold">CONTACT</h6>
          <ul className="mt-2 text-sm flex flex-col gap-2">
            <li className="flex gap-1">
              <MapPin width={20} height={20} color="red" />
              City, Country
            </li>
            <li className="flex gap-1">
              <Phone width={20} height={20} color="red" />
              +63900 000 0000
            </li>
            <li className="flex gap-1">
              <Mail width={20} height={20} color="red" />
              contactus@email.com
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="basis-1/4 ">
          <h4 className="font-bold">FOLLOW US</h4>
          <div className="flex gap-3 mt-2">
            <a href="" className="border rounded-lg p-2">
              <FaFacebookF
                color="red"
                className="lg:h-[1.5rem] lg:w-[1.5rem]"
              />
            </a>
            <a href="" className="border rounded-lg p-2">
              <FaInstagram
                color="red"
                className="lg:h-[1.5rem] lg:w-[1.5rem]"
              />
            </a>
            <a href="" className="border rounded-lg p-2">
              <FaXTwitter color="red" className="lg:h-[1.5rem] lg:w-[1.5rem]" />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-xs mt-5 pt-2 border-t content-center border-neutral-800 md:flex md:justify-between lg:text-sm lg:mt-10 lg:pt-5">
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

export default Footer;
