import { useState } from "react";
import logo from "/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Work", path: "/" },
  { name: "About", path: "/" },
  { name: "Services", path: "/" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full bg-white/70 backdrop-blur-md text-black px-6 sm:px-12 py-4 fixed top-0 left-0 z-50 border-b border-zinc-200">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="https://google.com" target="_blank" rel="noreferrer">
          <img src={logo} alt="Logo" className="w-24 sm:w-40 object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-16">
          <nav className="flex items-center gap-10">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="text-lg hover:text-zinc-600 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <Link to="/bookConsultation">
            <button className="bg-black text-white px-5 py-3 rounded-full text-md font-medium hover:bg-zinc-800 transition cursor-pointer">
              Book Consultation
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden text-3xl z-50 text-black"
        >
          {showMenu ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-10 text-black">
          {/* Close Button */}
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-6 right-6 text-4xl"
          >
            <IoClose />
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="text-3xl font-medium hover:text-zinc-500 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Button */}
          <Link to="/login">
            <button className="bg-black text-white px-5 py-4 rounded-full text-xl font-medium hover:bg-zinc-800 transition">
              Book Consultation
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
