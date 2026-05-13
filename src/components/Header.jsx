const Header = () => {
  return (
    <section className="w-full min-h-[calc(100vh-90px)] bg-black text-white flex flex-col justify-center px-6 sm:px-12 lg:px-20">
      
      {/* Small Text */}
      <p className="text-gray-400 text-sm sm:text-base tracking-[4px] uppercase mb-6">
        Creative Frontend Developer
      </p>

      {/* Main Heading */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold leading-tight max-w-6xl">
        Building Modern <br />
        Digital Experiences
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-base sm:text-lg max-w-2xl mt-8 leading-8">
        I create visually appealing and highly responsive websites
        with smooth user experiences using modern frontend technologies.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 mt-10">
        
        <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition">
          View Projects
        </button>

        <button className="border border-gray-600 px-8 py-4 rounded-full text-lg hover:bg-white hover:text-black transition">
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Header;