import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    images: ["/images/img-1.jpeg", "/images/img-2.jpeg", "/images/img-3.jpeg"],
    title: "Modern Fashion Website",
    description: "A clean and modern ecommerce experience designed for fashion brands.",
  },
  {
    images: ["/images/img-2.jpeg", "/images/img-3.jpeg", "/images/img-4.jpeg"],
    title: "Creative Portfolio Design",
    description: "An immersive portfolio website with smooth animations and interactions.",
  },
  {
    images: ["/images/img-3.jpeg", "/images/img-4.jpeg", "/images/img-5.jpeg"],
    title: "Luxury Brand Landing Page",
    description: "Premium landing page with elegant typography and fullscreen visuals.",
  },
  {
    images: ["/images/img-4.jpeg", "/images/img-5.jpeg", "/images/img-1.jpeg"],
    title: "Startup Product Showcase",
    description: "A responsive product showcase focused on smooth user experience.",
  },
  {
    images: ["/images/img-5.jpeg", "/images/img-1.jpeg", "/images/img-2.jpeg"],
    title: "Creative Agency Website",
    description: "Modern agency website with cinematic design and smooth transitions.",
  },
  {
    images: ["/images/img-2.jpeg", "/images/img-3.jpeg", "/images/img-5.jpeg"],
    title: "Minimal Portfolio",
    description: "Clean and minimal portfolio experience for creators and brands.",
  },
];

const ProjectCard = ({ project, index, currentImg, onPrev, onNext }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: (index % 2) * 0.15,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 5;
    gsap.to(cardRef.current, { rotateY: x, rotateX: -y, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
  };

  const onMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
  };

  const onMouseEnter = () => {
    setHovered(true);
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power2.out" });
  };

  // Image crossfade on change
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0.4, scale: 1.04 }, { opacity: 1, scale: hovered ? 1.06 : 1, duration: 0.5, ease: "power2.out" });
    }
  }, [currentImg]);

  return (
    <div ref={cardRef} style={{ transformStyle: "preserve-3d" }}>
      {/* Image block */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ borderRadius: "20px" }}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div style={{ height: "clamp(260px, 38vw, 480px)", overflow: "hidden", borderRadius: "20px" }}>
          <img
            ref={imgRef}
            src={project.images[currentImg]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(to top, rgba(5,3,2,0.75) 0%, rgba(5,3,2,0.15) 45%, transparent 100%)",
            opacity: hovered ? 1 : 0.6,
          }}
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span
            className="roboto-condensed uppercase text-white/80 px-3 py-1 rounded-full"
            style={{
              fontSize: "9px", letterSpacing: "3px",
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {project.category}
          </span>
          <span
            className="roboto-condensed text-white/50"
            style={{ fontSize: "10px", letterSpacing: "2px" }}
          >
            {project.location}
          </span>
        </div>

        {/* Prev/Next */}
        {currentImg > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px",
            }}
          >←</button>
        )}
        {currentImg < project.images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px",
            }}
          >→</button>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {project.images.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentImg ? "20px" : "6px",
                height: "6px",
                background: i === currentImg ? "#ee0653" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        {/* Counter top-right */}
        <div
          className="absolute bottom-4 right-4 roboto-condensed text-white/50"
          style={{ fontSize: "10px", letterSpacing: "2px" }}
        >
          0{currentImg + 1} / 0{project.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="mt-5 px-1">
        <div className="flex items-start justify-between gap-4">
          <h2
            className="roboto-condensed font-semibold text-black leading-tight"
            style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)" }}
          >
            {project.title}
          </h2>
          <span
            className="roboto-condensed shrink-0 mt-1"
            style={{ fontSize: "11px", letterSpacing: "2px", color: "#ee0653" }}
          >
            {project.year}
          </span>
        </div>

        {/* Animated red bar */}
        <div
          className="mt-3 mb-3 rounded-full transition-all duration-500"
          style={{
            height: "1.5px",
            width: hovered ? "64px" : "32px",
            background: "linear-gradient(to right, #ee0653, rgba(238,6,83,0.3))",
          }}
        />

        <p
          className="roboto-condensed text-zinc-500 leading-relaxed"
          style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)" }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [currentImages, setCurrentImages] = useState(projects.map(() => 0));
  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const filterRef = useRef(null);

  const [activeFilter,] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading char stagger
      const chars = headingRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.from(chars, {
          y: 100, opacity: 0, stagger: 0.03, duration: 0.9, ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        });
      }

      // Line reveal
      gsap.from(lineRef.current, {
        scaleX: 0, transformOrigin: "left", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 88%", toggleActions: "play none none reverse" },
      });

      // Filter pills
      gsap.from(filterRef.current?.querySelectorAll(".pill"), {
        y: 20, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: filterRef.current, start: "top 88%", toggleActions: "play none none reverse" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const nextImage = (i) => {
    setCurrentImages(prev => {
      const u = [...prev];
      if (u[i] < projects[i].images.length - 1) u[i]++;
      return u;
    });
  };

  const prevImage = (i) => {
    setCurrentImages(prev => {
      const u = [...prev];
      if (u[i] > 0) u[i]--;
      return u;
    });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="pt-20 sm:pt-24 lg:pt-28 px-5 sm:px-8 md:px-12 lg:px-16 pb-24">

        {/* ── Hero heading ── */}
        <div className="mb-4">
          <div ref={headingRef} className="overflow-hidden">
            <h1
              className="roboto-condensed font-semibold leading-none tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}
            >
              {"Our Work".split("").map((ch, i) => (
                <span key={i} className="char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
          </div>

          <div
            ref={lineRef}
            className="rounded-full mt-5"
            style={{ width: "80px", height: "4px", background: "linear-gradient(to right, #ee0653, #C9A847)" }}
          />
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center gap-8 sm:gap-12 mt-8 mb-12 pb-10"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          {[
            { val: `${projects.length}`, label: "Projects" },
            { val: "100%", label: "Delivered on time" },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="roboto-condensed font-semibold text-black" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                {s.val}
              </span>
              <span className="roboto-condensed text-zinc-400 uppercase" style={{ fontSize: "10px", letterSpacing: "2.5px" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

       

        {/* ── Projects grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => {
            const realIndex = projects.indexOf(project);
            return (
              <ProjectCard
                key={realIndex}
                project={project}
                index={index}
                currentImg={currentImages[realIndex]}
                onPrev={() => prevImage(realIndex)}
                onNext={() => nextImage(realIndex)}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
