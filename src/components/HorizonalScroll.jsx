import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  { type: "projectsPage" },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.5)",
    });
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.6, ease: "power2.out" });
  };

  return (
    <div className="pt-16 sm:pt-12 lg:pt-10 flex items-center shrink-0">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
        style={{
          width: "clamp(82vw, 85vw, 88vw)",
          maxWidth: "1100px",
          height: "clamp(72vh, 80vh, 86vh)",
          borderRadius: "24px",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ transformOrigin: "center center" }}
          />
        </div>

        {/* Base gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(5,3,2,0.92) 0%, rgba(5,3,2,0.3) 40%, rgba(5,3,2,0.05) 70%, transparent 100%)",
          }}
        />

        {/* Hover side glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(238,6,83,0.12) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Top row — index + category */}
        <div className="absolute top-6 left-7 right-7 flex items-center justify-between">
          <span
            className="roboto-condensed text-white/40 font-medium"
            style={{ fontSize: "11px", letterSpacing: "3px" }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
          {/* Year */}
          <p
            className="roboto-condensed mb-3"
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#ee0653",
              textTransform: "uppercase",
            }}
          >
            {project.year}
          </p>

          {/* Title */}
          <h2
            className="roboto-condensed font-semibold text-white leading-none mb-3"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)" }}
          >
            {project.title}
          </h2>

          {/* Divider */}
          <div
            className="mb-4 transition-all duration-500 rounded-full"
            style={{
              height: "1px",
              width: hovered ? "80px" : "40px",
              background:
                "linear-gradient(to right, #ee0653, rgba(238,6,83,0.3))",
            }}
          />

          {/* Description — slides up on hover */}
          <p
            className="roboto-condensed text-white/60 leading-relaxed max-w-lg transition-all duration-500"
            style={{
              fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

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
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="overflow-hidden bg-white text-black">
      <section className="bg-white overflow-hidden" ref={triggerRef}>
        <div className="h-screen flex items-center">
          <div ref={imgsRef} className="flex gap-5 sm:gap-7 px-4 sm:px-6 w-max">
            {projects.map((project, index) => {
              // ── End slide ──
              if (project.type === "projectsPage") {
                return (
                  <div
                    key={index}
                    className="w-screen h-screen shrink-0 flex items-center px-8 sm:px-14 lg:px-20"
                  >
                    <div className="w-full max-w-5xl">
                      {/* Big heading */}
                      <h1
                        className="roboto-condensed font-light tracking-tight text-black leading-none mb-8"
                        style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
                      >
                        Projects
                      </h1>

                      {/* Red bar */}
                      <div className="w-20 h-1 rounded-full bg-red-500 mb-12" />

                      {/* Body quote */}
                      <p
                        className="roboto-condensed font-light text-black/60 leading-snug mb-12 max-w-2xl"
                        style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.4rem)" }}
                      >
                        These are not just projects — they are stories of our
                        clients, our craft, and the spaces we transformed.
                      </p>

                      {/* CTA */}
                      <Link to="/projects">
                        <button
                          className="group roboto-condensed flex items-center gap-5 px-8 py-4 rounded-2xl font-medium text-white transition-all duration-300 cursor-pointer"
                          style={{
                            background:
                              "linear-gradient(135deg, #dc2626, #991b1b)",
                            boxShadow: "0 8px 28px rgba(220,38,38,0.3)",
                            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                            letterSpacing: "0.04em",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow =
                              "0 12px 40px rgba(220,38,38,0.5)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.boxShadow =
                              "0 8px 28px rgba(220,38,38,0.3)")
                          }
                        >
                          See All Projects
                          <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">
                            ↗
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              }

              // ── Project card ──
              return (
                <ProjectCard key={index} project={project} index={index} />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HorizontalScroll;
