import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="content-center p-5 xl:px-20 xl:py-20">
      {/* TOP BAR */}
      <div className="flex flex-col content-center gap-5 md:flex-row">
        {/* LOGO SECTION*/}
        <section className="basis-1/2">
          <div className="flex">
            <img src="src/assets/react.svg" alt="Logo" />
            <h4 className="font-bold xl:text-xl">
              Fit<span className="text-red-600">Gym</span>
            </h4>
          </div>
          <p className="xl:text-md mt-2 pr-10 text-sm xl:pr-50">
            Train smarter. Get stronger. Join a fitness community built for real
            results and long-term performance.
          </p>
        </section>

        {/* CONTACT US SECTION */}
        <section className="basis-1/4">
          <h6 className="font-bold">CONTACT</h6>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
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
        </section>

        {/* FOLLOW US SECTION */}
        <section className="basis-1/4">
          <h4 className="font-bold">FOLLOW US</h4>
          <div className="mt-2 flex gap-3">
            <a href="" className="rounded-lg border p-2">
              <FaFacebookF color="red" className="lg:h-6 lg:w-6" />
            </a>
            <a href="" className="rounded-lg border p-2">
              <FaInstagram color="red" className="lg:h-6 lg:w-6" />
            </a>
            <a href="" className="rounded-lg border p-2">
              <FaXTwitter color="red" className="lg:h-6 lg:w-6" />
            </a>
          </div>
        </section>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-5 content-center border-t border-neutral-800 pt-2 text-xs md:flex md:justify-between lg:mt-10 lg:pt-5 lg:text-sm">
        <div>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="mt-2 flex justify-between md:mt-0 md:gap-4">
          <NavLink to="/policy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms of Service</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
