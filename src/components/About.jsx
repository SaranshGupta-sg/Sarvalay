import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teamMembers = [
  {
    role: "Founder",
    name: "Gagan Singh Hada",
    image: "/images/team-1.jpg",
    color: "bg-orange-500",
  },

  {
    role: "Co Founder",
    name: "Sakshi Gupta",
    image: "/images/team-2.png",
    color: "bg-lime-500",
  },

  {
    role: "Head od Digital Design",
    name: "Abhishek Dhakar",
    image: "/images/team-3.jpg",
    color: "bg-cyan-500",
  },

  {
    role: "Head od Traditional Art",
    name: "Rakshanda Prajapati",
    image: "/images/team-4.jpg",
    color: "bg-pink-500",
  },

  {
    role: "Senior Artist",
    name: "Sunil kasana",
    image: "/images/team-5.jpg",
    color: "bg-yellow-500",
  },

  {
    role: "Senior Artist",
    name: "Divya",
    image: "/images/team-6.jpg",
    color: "bg-violet-500",
  },

  {
    role: "Artist & Project Support",
    name: "Kanishka Singh",
    image: "/images/team-6.jpg",
    color: "bg-violet-500",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="min-h-screen bg-white text-black py-10 sm:py-14 lg:py-22 pt-1 sm:pt-2 lg:pt-1">
      {/* Heading */}
      <div className="mb-16 sm:mb-20 lg:mb-24 px-5 sm:px-8 md:px-12 lg:px-20">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light">
          Explore
        </h1>

        <h1 className="mt-3 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
          Our Team
        </h1>
      </div>

      {/* Team */}
      <div className="bg-white text-black border-y border-zinc-700">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setActiveIndex(index)}
            onHoverEnd={() => setActiveIndex(null)}
            className="relative overflow-hidden border-t border-zinc-700 px-4 sm:px-8 md:px-12 lg:px-20 py-2 sm:py-4 lg:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer duration-500 group"
          >
            {/* Hover Background */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: activeIndex === index ? "0%" : "100%",
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute inset-0 ${member.color} z-0`}
            />

            {/* Left */}
            <p className="relative z-10 text-lg sm:text-xl lg:text-2xl font-medium transition-colors duration-500 group-hover:text-black">
              {member.role}
            </p>

            {/* Right */}
            <div className="relative z-10 flex items-center gap-5">
              {/* Hover Image */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: 8,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="hidden md:block w-28 h-36 lg:w-36 lg:h-44 overflow-hidden rounded-2xl shrink-0"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name */}
              <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight md:text-right transition-colors duration-500 group-hover:text-black">
                {member.name}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
