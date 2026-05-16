import React from 'react'

const About = () => {
  return (
    <section
      className="
        min-h-screen
        bg-black
        text-white

        px-5
        sm:px-8
        md:px-12
        lg:px-20

        py-14
        sm:py-18
        lg:py-22
      "
    >
      {/* Heading */}
      <div className="mb-16 sm:mb-20 lg:mb-24">
        <h1
          className="
            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
            text-white
            font-light
          "
        >
          Explore
        </h1>

        <h1
          className="
            mt-3

            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-9xl

            font-light
            leading-none
            tracking-tight
          "
        >
          Our Team
        </h1>
      </div>

      
    </section>
  );
}

export default About
