import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/images/img-5.jpeg",
    title: "Modern Fashion Website",
    description:
      "A clean and modern ecommerce experience designed for fashion brands with smooth animations and responsive layouts.",
  },

  {
    image: "/images/img-1.jpeg",
    title: "Creative Portfolio Design",
    description:
      "An immersive portfolio website created for a digital creator featuring cinematic transitions and interactive sections.",
  },

  {
    image: "/images/img-2.jpeg",
    title: "Luxury Brand Landing Page",
    description:
      "Premium landing page with elegant typography, fullscreen visuals, and engaging scrolling interactions.",
  },
  {
    type: "projectsPage",
  },
];

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const imgsRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(
    () => {
      const imagesEl = imgsRef.current;

      gsap.to(imagesEl, {
        x: () => -(imagesEl.scrollWidth - window.innerWidth),
        ease: "none",

        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${imagesEl.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,

          // markers: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="overflow-hidden bg-white text-black">
      {/* Horizontal Scroll Section */}
      <section className="bg-white overflow-hidden" ref={triggerRef}>
        <div className="h-screen flex items-center">
          <div ref={imgsRef} className="flex gap-5 sm:gap-8 px-3 sm:px-5 w-max">
            {projects.map((project, index) => {
              // Projects Text Page
              if (project.type === "projectsPage") {
                return (
                  <section
                    key={index}
                    className="w-screen h-screen shrink-0 bg-white text-black px-5 sm:px-8 md:px-12 lg:px-20 py-20 sm:py-24 lg:py-30 flex flex-col justify-center"
                  >
                    {/* Top Heading */}
                    <motion.div
                      initial={{ opacity: 0, y: 120 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="translate-y-[-20px] sm:translate-y-[-30px] lg:translate-y-[-40px]"
                    >
                      <h1 className="font-helvetica-black text-6xl sm:text-5xl md:text-6xl lg:text-[8rem] leading-none font-light tracking-tight">
                        Projects
                      </h1>
                      <div className="w-24 h-1.5 bg-red-500 rounded-full mt-5"></div>
                    </motion.div>

                    {/* Space Between */}
                    <div className="h-20 sm:h-28 lg:h-22" />

                    {/* Bottom Content */}
                    <div className="translate-y-[20px] sm:translate-y-[30px] lg:translate-y-[40px] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-15 lg:gap-11">
                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 120 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="roboto-condensed text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight font-light max-w-6xl"
                      >
                        These are not just projects, they are stories of our
                        clients, our work, and the impact we made.
                      </motion.p>

                      {/* Button */}
                      <Link to="/projects">
                        <button className="headland-one-regular text-orange-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl underline underline-offset-8 whitespace-nowrap hover:opacity-80 duration-300 self-start lg:self-end cursor-pointer">
                          See More ↗
                        </button>
                      </Link>
                    </div>
                  </section>
                );
              }

              // Project Cards
              return (
                <div
                  key={index}
                  className="pt-20 sm:pt-16 md:pt-10 lg:pt-18 flex items-center"
                >
                  <div className="w-[98vw] sm:w-[95vw] md:w-[92vw] lg:w-[85vw] xl:w-[78vw] h-[72vh] sm:h-[76vh] md:h-[80vh] lg:h-[84vh] shrink-0 rounded-3xl overflow-hidden bg-[#f5f5f5] border border-black flex flex-col">
                    {/* Image */}
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 bg-white">
                      <h2 className="font-helvetica-black text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        {project.title}
                      </h2>

                      <p className="roboto-condensed mt-2 text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-3xl">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HorizontalScroll;
