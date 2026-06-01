import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-[center_right_35%] sm:bg-center flex items-center pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/header-bg.png')",
      }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/0.5 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mt-10 sm:mt-0">
        {/* Small Heading */}
        <motion.p
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-[9px] sm:text-sm tracking-[2px] sm:tracking-[4px] uppercase mb-3 sm:mb-4 text-white"
        >
          ART EXECUTION PLATFORM
        </motion.p>

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
          className="text-[2rem] leading-[1.15] sm:text-5xl sm:leading-[1.08] lg:text-7xl lg:leading-[1.05] font-semibold max-w-[95%] sm:max-w-full text-white"
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
          className="text-white text-xs sm:text-base mt-5 sm:mt-6 leading-6 sm:leading-7 max-w-[95%] sm:max-w-xl"
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
          className="flex flex-col gap-5 mt-8"
        >
          {/* Top Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Book Consultation */}
            <Link to="/bookConsultation">
              <button className="bg-red-700 hover:bg-red-800 text-white px-7 py-4 rounded-xl duration-300">
              Book Consultation
            </button>
            </Link>

            {/* Join Artist */}
            <Link to="/artist">
              <button className="bg-red-700 hover:bg-red-800 text-white px-7 py-4 rounded-xl duration-300">
              Join As Artist
            </button>
            </Link>
          </div>

          {/* Explore Projects */}
          <div>
            <Link to="/projects">
              <button className="group flex items-center justify-between gap-12 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 hover:bg-white hover:text-black shadow-lg cursor-pointer min-w-7.5px">
                <div className="flex items-center gap-4">
                  <span>Explore Projects</span>
                </div>

                {/* Arrow */}
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
