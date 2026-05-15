import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/images/img-1.jpg",
    title: "Modern Fashion Website",
    description:
      "A clean and modern ecommerce experience designed for fashion brands with smooth animations and responsive layouts.",
  },

  {
    image: "/images/img-2.jpg",
    title: "Creative Portfolio Design",
    description:
      "An immersive portfolio website created for a digital creator featuring cinematic transitions and interactive sections.",
  },

  {
    image: "/images/img-3.jpg",
    title: "Luxury Brand Landing Page",
    description:
      "Premium landing page with elegant typography, fullscreen visuals, and engaging scrolling interactions.",
  },

  {
    image: "/images/img-4.jpg",
    title: "Startup Product Showcase",
    description:
      "A responsive product showcase website focused on smooth user experience and modern UI design.",
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
    <section ref={containerRef} className="overflow-hidden bg-black text-white">
      {/* Horizontal Scroll Section */}
      <section
        className="bg-zinc-950 pt-8 overflow-hidden"
        ref={triggerRef}
      >
        <div className="h-screen flex items-center">
          <div ref={imgsRef} className="flex gap-5 sm:gap-8 px-3 sm:px-5 w-max">
            {projects.map((project, index) => (
              <div
                key={index}
                className="
                  w-[98vw]
                  sm:w-[95vw]
                  md:w-[92vw]
                  lg:w-[85vw]
                  xl:w-[78vw]

                  h-[72vh]
                  sm:h-[76vh]
                  md:h-[80vh]
                  lg:h-[84vh]

                  shrink-0
                  rounded-3xl
                  overflow-hidden
                  bg-zinc-900
                  border
                  border-zinc-800
                  flex
                  flex-col
                "
              >
                {/* Image */}
                <div className="flex-1 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-105
                      duration-500
                    "
                  />
                </div>

                {/* Content */}
                <div
                  className="
                    p-4
                    sm:p-5
                    md:p-6
                    bg-black
                  "
                >
                  <h2
                    className="
                      text-lg
                      sm:text-2xl
                      md:text-3xl
                      lg:text-4xl
                      font-bold
                    "
                  >
                    {project.title}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      sm:text-base
                      md:text-lg
                      text-zinc-400
                      leading-relaxed
                      max-w-3xl
                    "
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HorizontalScroll;
