import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section
      className="roboto-condensed relative w-full h-screen bg-cover bg-[center_right_35%] sm:bg-center flex items-center pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/new.jpeg')",
      }}
    >
      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mt-10 sm:mt-0">
        {/* Small Heading */}

        <div className="flex items-center gap-3 mb-5 sm:mb-4">
          <div className="w-6 h-px bg-red-500" />
          <motion.p
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[12px] sm:text-[20px] lg:text-[22px] tracking-[2px] sm:tracking-[6px] uppercase text-red-500 font-semibold whitespace-nowrap"
            style={{ letterSpacing: "5px" }}
          >
            ART EXECUTION PLATFORM
          </motion.p>
        </div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-[2rem] leading-[1.25] sm:text-5xl sm:leading-[1.08] lg:text-7xl lg:leading-[1.05] font-semibold max-w-[95%] sm:max-w-full text-white"
        >
          We Transform
          <br />
          Commercial Spaces
          <br />
          Through <span className="text-red-500">Curated Art</span>
          <br />& <span className="text-red-500">Flawless Execution</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-white text-sm sm:text-base mt-7 sm:mt-6 leading-7 sm:leading-7 max-w-[95%] sm:max-w-xl"
        >
          From concept to installation and long-term care, Sarvalay delivers
          end-to-end art solutions with verified artists, precision execution,
          and unmatched reliability.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-5 mt-10 sm:mt-8"
        >
          {/* Top Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-5">
            {/* Book Consultation */}
            <Link to="/bookConsultation">
              <div className="group relative inline-block">
                <button className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 hover:scale-105 shadow-[0_15px_40px_rgba(220,38,38,0.35)] cursor-pointer relative overflow-hidden">
                  <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    Book Consultation
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Problem
                  </span>
                </button>
              </div>
            </Link>

            {/* Join Artist */}
            <Link to="/artist">
              <div className="group relative inline-block">
                <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden">
                  <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    Join As Artist
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Solution
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
