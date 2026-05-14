import { useState } from "react";
import logo from "/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { name: "Work", path: "/" },
  { name: "About", path: "/" },
  { name: "Services", path: "/" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full bg-black/70 backdrop-blur-md text-white px-6 sm:px-12 py-4 fixed top-0 left-0 z-50">
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
                className="text-lg hover:text-gray-300 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition">
            Let&apos;s Talk →
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden text-3xl z-50"
        >
          {showMenu ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center gap-10">
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
                className="text-3xl font-medium hover:text-gray-300 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Button */}
          <button className="bg-white text-black px-8 py-4 rounded-full text-xl font-medium hover:bg-gray-200 transition">
            Let&apos;s Talk →
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
