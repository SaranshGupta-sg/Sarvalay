import React from "react";
import logo from "/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <header className="px-20 py-6 w-full bg-black text-white flex justify-between items-start">
      {/* logo */}
      <div className="cursor-pointer">
        <a href="https://google.com" target="_blank" rel="noreferrer">
          <img src={logo} height={100} width={160} alt="Logo" />
        </a>
      </div>

      

      {/* Second Links */}
      <div className="flex flex-col gap-2">
        <a
          href="/"
          className="text-sm text-white no-underline hover:opacity-70 transition"
        >
          Work
        </a>

        <a
          href="/"
          className="text-sm text-white no-underline hover:opacity-70 transition"
        >
          About
        </a>

        <a
          href="/"
          className="text-sm text-white no-underline hover:opacity-70 transition"
        >
          Services
        </a>
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-2">
        <a
          href="/"
          className="text-sm text-white no-underline hover:opacity-70 transition"
        >
          Instagram
        </a>

        <a
          href="/"
          className="text-sm text-white no-underline hover:opacity-70 transition"
        >
          Linkedin
        </a>
      </div>

      {/* Button */}
      <button
        className="bg-white text-black border-none px-6 py-3 text-lg cursor-pointer flex items-center gap-3 hover:bg-gray-300 transition"
      >
        Lets Talk
        <span className="text-xl">→</span>
      </button>

      <div className="ham-menu hidden">
        <button>
            <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
