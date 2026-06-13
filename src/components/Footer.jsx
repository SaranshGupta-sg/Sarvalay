import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Work", section: "work" },
  { name: "About", section: "about" },
  { name: "Services", section: "services" },
];

const socials = [
  { name: "Instagram", link: "https://instagram.com/sarvalay/" },
  { name: "LinkedIn", link: "https://linkedin.com/company/sarvalay/" },
  { name: "Email", link: "mailto:sarvalayworld@gmail.com" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const lineRef = useRef(null);

  const handleFooterNav = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(
        () =>
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand name parallax — slow drift up on scroll
      gsap.fromTo(
        brandRef.current,
        { y: 60 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
        },
      );

      // Divider line width reveal
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#080808] text-white overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(238,6,83,0.5), rgba(201,168,71,0.3), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(238,6,83,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px",
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20 lg:pt-24">
        {/* ── Top section ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 justify-between">
          {/* Left — headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-red-500" />
              <span
                className="roboto-condensed uppercase text-[10px] tracking-[5px] font-medium"
                style={{ color: "#ee0653" }}
              >
                Let's Work Together
              </span>
            </div>

            <h2
              className="roboto-condensed font-light tracking-tight leading-none"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: "#f0ede8",
              }}
            >
              Built once.
              <br />
              <span
                style={{
                  background: "linear-gradient(to right, #dc2626, #7f1d1d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Built right.
              </span>
            </h2>

            {/* CTA button */}
            <button
              onClick={() => navigate("/bookConsultation")}
              className="group roboto-condensed relative overflow-hidden mt-10 flex items-center gap-4 px-8 py-4 rounded-2xl font-medium text-white transition-shadow duration-300"
              style={{
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                boxShadow: "0 8px 32px rgba(220,38,38,0.35)",
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(220,38,38,0.55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(220,38,38,0.35)")
              }
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                }}
              />

              <span className="relative">Book Consultation</span>

              <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Small note */}
            <p
              className="roboto-condensed mt-4 uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "3px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Free consultation · No commitment
            </p>
          </motion.div>

          {/* Right — nav + socials */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row gap-14 sm:gap-24 lg:gap-28 lg:pt-4"
          >
            {/* Navigation */}
            <div>
              <p
                className="roboto-condensed uppercase text-[9px] tracking-[4px] mb-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Navigate
              </p>
              <div className="space-y-4">
                {navLinks.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleFooterNav(item.section)}
                    className="roboto-condensed group flex items-center gap-3 cursor-pointer transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                    }
                  >
                    <span
                      className="w-0 group-hover:w-4 h-px transition-all duration-300 rounded-full"
                      style={{ background: "#ee0653" }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                        fontWeight: 300,
                      }}
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p
                className="roboto-condensed uppercase text-[9px] tracking-[4px] mb-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Connect
              </p>
              <div className="space-y-4">
                {socials.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="roboto-condensed group flex items-center gap-3 transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                    }
                  >
                    <span
                      style={{
                        fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                        fontWeight: 300,
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "#ee0653" }}
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          ref={lineRef}
          className="mt-16 sm:mt-20 rounded-full"
          style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
        />

        {/* ── Bottom meta row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6"
        >
          <p
            className="roboto-condensed uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            © Sarvalay. All rights reserved.
          </p>
          <p
            className="roboto-condensed uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Art Execution Platform · India
          </p>
        </motion.div>
      </div>

      {/* ── Big brand name ── */}
      <div className="overflow-hidden" ref={brandRef}>
        <h1
          className="roboto-condensed text-center font-semibold whitespace-nowrap select-none leading-none"
          style={{
            fontSize: "clamp(16vw, 19vw, 22vw)",
            letterSpacing: "-0.03em",
            background:
              "rgba(255,255,255,0.3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingBottom: "0.05em",
          }}
        >
          SARVALAY
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
