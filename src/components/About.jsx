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
    <section className="min-h-screen bg-white text-black py-10 sm:py-14 lg:py-22 pt-3 sm:pt-5 lg:pt-7">
      {/* Heading */}
      <div className="mb-16 sm:mb-20 lg:mb-24 px-5 sm:px-8 md:px-12 lg:px-20">
       

        <motion.h1 initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="font-helvetica-black mt-3 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
          Our Team
        </motion.h1>
      </div>

      
    </section>
  );
};

export default About;
