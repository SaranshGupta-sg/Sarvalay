const Header = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-[center_right_35%] sm:bg-center flex items-center px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/header-bg.png')",
      }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/5 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mt-10 sm:mt-0">
        {/* Small Heading */}
        <p className="text-[9px] sm:text-sm tracking-[2px] sm:tracking-[4px] uppercase mb-3 sm:mb-4 text-gray-300">
          ART CONSULTANCY & EXECUTION
        </p>

        {/* Main Heading */}
        <h1
          className="text-[2rem] leading-[1.15]
                 sm:text-5xl sm:leading-[1.08]
                 lg:text-7xl lg:leading-[1.05]
                 font-semibold max-w-[95%] sm:max-w-full"
        >
          We Transform
          <br />
          Commercial Spaces
          <br />
          Through <span className="text-red-500">Curated Art</span>
          <br />& <span className="text-red-500">Flawless Execution</span>
        </h1>

        {/* Paragraph */}
        <p className="text-gray-200 text-xs sm:text-base mt-5 sm:mt-6 leading-6 sm:leading-7 max-w-[95%] sm:max-w-xl">
          From concept to installation and long-term care, Sarvalay delivers
          end-to-end art solutions with verified artists, precision execution,
          and unmatched reliability.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-7 sm:mt-8">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium transition duration-300 w-fit">
            Book Consultation
          </button>

          <button className="border border-white/30 hover:bg-white hover:text-black text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium transition duration-300 w-fit">
            Explore Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
