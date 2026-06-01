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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-20 sm:pt-24 lg:pt-28 px-5 sm:px-8 md:px-12 lg:px-20 pb-20">
        <motion.h1 initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="headland-one-regular text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-none font-light tracking-tight">
          Projects
        </motion.h1>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="overflow-hidden rounded-2xl border border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[280px] sm:h-[380px] md:h-[450px] lg:h-[520px] object-cover hover:scale-105 duration-500"
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