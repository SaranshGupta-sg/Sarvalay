import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";


const projects = [
  {
    image: "/images/img-1.jpg",
    title: "Modern Fashion Website",
    description:
      "A clean and modern ecommerce experience designed for fashion brands.",
  },

  {
    image: "/images/img-2.jpg",
    title: "Creative Portfolio Design",
    description:
      "An immersive portfolio website with smooth animations and interactions.",
  },

  {
    image: "/images/img-3.jpg",
    title: "Luxury Brand Landing Page",
    description:
      "Premium landing page with elegant typography and fullscreen visuals.",
  },

  {
    image: "/images/img-4.jpg",
    title: "Startup Product Showcase",
    description:
      "A responsive product showcase focused on smooth user experience.",
  },

  {
    image: "/images/img-1.jpg",
    title: "Creative Agency Website",
    description:
      "Modern agency website with cinematic design and smooth transitions.",
  },

  {
    image: "/images/img-2.jpg",
    title: "Minimal Portfolio",
    description:
      "Clean and minimal portfolio experience for creators and brands.",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-7 md:px-11 lg:px-12 pb-20">
        <motion.h1 initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="font-helvetica-black text-5xl sm:text-6xl md:text-7xl lg:text-[9rem] leading-none font-light tracking-tight">
          Our Work
        </motion.h1>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="overflow-hidden rounded-2xl border border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[450px] object-cover hover:scale-105 duration-500"
                />
              </div>

              <div className="mt-5">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
                  {project.title}
                </h2>

                <p className="mt-3 text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;