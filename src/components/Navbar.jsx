import { useState } from "react";
import logo from "/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About", to: "about" },
  { name: "Work", to: "work" },
  { name: "Services", to: "services" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById(section);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="w-full bg-white/75 backdrop-blur-md text-black px-6 sm:px-12 py-2.5 fixed top-0 left-0 z-50 border-b border-zinc-200">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-24 sm:w-40 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-16">
          <nav className="flex items-center gap-10">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.to)}
                className="relative text-lg cursor-pointer transition hover:text-zinc-700 before:content-[''] before:absolute before:left-0 before:-bottom-2 before:w-0 before:h-[2px] before:bg-[#ee0653] before:transition-all before:duration-500 hover:before:w-full"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Button */}
          <Link to="/bookConsultation">
            <button className="relative overflow-hidden bg-black text-white px-5 py-3 rounded-full text-md font-medium cursor-pointer transition-all duration-500 border border-black hover:text-black before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white before:transition-all before:duration-500 hover:before:left-0">
              <span className="relative z-10">Book Consultation</span>
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
          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
               <button
                key={index}
                onClick={() => handleNavClick(link.to)}
                className="relative text-lg cursor-pointer transition hover:text-zinc-700 before:content-[''] before:absolute before:left-0 before:-bottom-2 before:w-0 before:h-[2px] before:bg-[#ee0653] before:transition-all before:duration-500 hover:before:w-full"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Button */}
          <Link to="/bookConsultation">
            <button className="group relative overflow-hidden bg-black text-white px-5 py-3 rounded-full text-md font-medium border border-black transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 cursor-pointer">
              <span className="flex items-center gap-2">Book Consultation</span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
