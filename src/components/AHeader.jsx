import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const AHeader = () => {
  const headRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headRef.current?.querySelectorAll(".char");

      if (chars?.length) {
        gsap.from(chars, {
          y: 90,
          opacity: 0,
          stagger: 0.025,
          duration: 0.85,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.6,
      });
    }, headRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="roboto-condensed relative w-full h-[67vh] min-h-[550px] bg-cover bg-[center_right_35%] sm:bg-center flex items-center pt-14 sm:pt-16 lg:pt-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/h1.png')",
      }}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.79) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">

          {/* Small Heading */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-5 h-px bg-red-500" />

            <span
              className="roboto-condensed uppercase text-[13px] sm:text-[14px] tracking-[4px] sm:tracking-[5px] font-medium"
              style={{
                color: "#fb2c36",
              }}
            >
              Join Our Artist Network
            </span>
          </motion.div>

          {/* Main Heading */}
          <div ref={headRef} className="overflow-hidden pb-2">
            <h1
              className="roboto-condensed font-semibold leading-[0.98] tracking-tight text-white"
              style={{
                fontSize: "clamp(2.7rem, 6.5vw, 6.2rem)",
              }}
            >
              {"Ready to create".split("").map((ch, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{
                    whiteSpace: ch === " " ? "pre" : "normal",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}

              <br />

              <span className="char inline-block">something&nbsp;</span>

              <span className="text-[#ee0640] whitespace-nowrap">
                {"extraordinary?".split("").map((ch, i) => (
                  <span key={i} className="char inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
            className="roboto-condensed mt-5 text-white/80 max-w-xl leading-relaxed"
            style={{
              fontSize: "clamp(0.88rem, 1.1vw, 1.05rem)",
            }}
          >
            Join our creative network and collaborate with brands, creators,
            and visionary teams from around the world.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AHeader;