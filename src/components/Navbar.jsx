import { useState, useEffect, useRef } from "react";
import logo from "/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const navLinks = [
  { name: "About", to: "about" },
  { name: "Work", to: "work" },
  { name: "Services", to: "services" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // Mount animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(
        logoRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.7,
        },
        0.2,
      );

      tl.from(
        linksRef.current?.querySelectorAll(".nav-link"),
        {
          y: -16,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
        },
        0.35,
      );

      tl.from(
        btnRef.current,
        {
          y: -16,
          opacity: 0,
          duration: 0.6,
        },
        0.6,
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (showMenu) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        mobileLinksRef.current.filter(Boolean),
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  const handleNavClick = (section) => {
    setShowMenu(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={headerRef}
      className="w-full fixed top-0 left-0 z-50 transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center justify-between px-6 sm:px-12 py-3 sm:py-2.5">
        {/* Logo */}
        <Link to="/" ref={logoRef}>
          <img
            src={logo}
            alt="Sarvalay"
            className="w-24 sm:w-36 object-contain transition-all duration-300"
            style={{ filter: "none" }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12" ref={linksRef}>
          <nav className="flex items-center gap-10">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link.to)}
                className="nav-link roboto-condensed relative text-[15px] font-medium cursor-pointer transition-colors duration-200 group"
                style={{ color: "#111" }}
              >
                {link.name}

                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-400 rounded-full"
                  style={{
                    background: "#ee0653",
                    transitionDuration: "350ms",
                  }}
                />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div ref={btnRef} className="flex items-center gap-3">
            
            <Link to="/bookConsultation">
              <button
                className="roboto-condensed relative overflow-hidden px-6 py-2.5 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-300 group"
                style={{
                  background: "#111",
                  color: "#fff",
                  border: "1px solid #111",
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.borderColor = "#dc2626";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(220,38,38,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111";
                  e.currentTarget.style.borderColor = "#111";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />

                <span className="relative">Book Consultation</span>
              </button>
            </Link>
            <Link to="/artist">
              <button
                className="roboto-condensed relative overflow-hidden px-6 py-2.5 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-300 group"
                style={{
                  background: "#111",
                  color: "#fff",
                  border: "1px solid #111",
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.borderColor = "#dc2626";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(220,38,38,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111";
                  e.currentTarget.style.borderColor = "#111";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />

                <span className="relative">Join As Artist</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden z-50 p-1 transition-colors duration-200"
          style={{
            color: "#111",
            fontSize: "26px",
          }}
          aria-label="Toggle menu"
        >
          {showMenu ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 min-h-screen overflow-y-auto flex flex-col items-center"
          style={{
            background: "#ffffff",
            paddingTop: "140px",
            paddingBottom: "50px",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.15), transparent)",
            }}
          />

          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <button
                key={i}
                ref={(el) => (mobileLinksRef.current[i] = el)}
                onClick={() => handleNavClick(link.to)}
                className="roboto-condensed relative text-3xl font-semibold text-black cursor-pointer group transition-colors duration-200 hover:text-[#ee0653]"
              >
                {link.name}

                <span
                  className="absolute -bottom-2 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: "#ee0653" }}
                />
              </button>
            ))}
          </nav>

          <div
            ref={(el) => (mobileLinksRef.current[navLinks.length] = el)}
            className="mt-12 flex flex-col gap-4"
          >
            <Link to="/bookConsultation" onClick={() => setShowMenu(false)}>
              <button
                className="roboto-condensed w-full px-8 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                  boxShadow: "0 8px 24px rgba(220,38,38,0.35)",
                  letterSpacing: "0.04em",
                }}
                onClick={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(220,38,38,0.5)";
                  e.currentTarget.style.transform = "scale(0.96)";

                  setTimeout(() => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(220,38,38,0.35)";
                    e.currentTarget.style.transform = "scale(1)";
                  }, 150);
                }}
              >
                Book Consultation
              </button>
            </Link>
            <Link to="/artist" onClick={() => setShowMenu(false)}>
              <button
                className="roboto-condensed w-full px-8 py-3.5 rounded-full font-medium text-white cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                  boxShadow: "0 8px 24px rgba(220,38,38,0.35)",
                  letterSpacing: "0.04em",
                }}
                onClick={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(220,38,38,0.5)";
                  e.currentTarget.style.transform = "scale(0.96)";

                  setTimeout(() => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(220,38,38,0.35)";
                    e.currentTarget.style.transform = "scale(1)";
                  }, 150);
                }}
              >
                Join As Artist
              </button>
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-3 opacity-20">
            <div className="w-8 h-px bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-4 h-px bg-white" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
