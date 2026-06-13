import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Wall Art & Murals",
    description:
      "Custom hand-painted murals and wall art that bring your space, brand and story to life.",
    image: "/images/item1.jpeg",
    accent: "#ee0653",
  },
  {
    title: "Art Installations",
    description:
      "Large-scale and bespoke art installations crafted to enhance environments and create unforgettable experiences.",
    image: "/images/item2.jpeg",
    accent: "#C9A847",
  },
  {
    title: "Space Transformation",
    description:
      "End-to-end transformation of commercial spaces aligned with your vision, brand and audience.",
    image: "/images/item3.jpeg",
    accent: "#ee0653",
  },
  {
    title: "Art Maintenance & Restoration",
    description:
      "Long-term care, maintenance and restoration to keep your art as stunning as day one.",
    image: "/images/item4.jpeg",
    accent: "#C9A847",
  },
];

const highlights = [
  {
    title: "Verified Artist Network",
    desc: "A curated network of skilled artists focused on quality and professional execution.",
    icon: "✦",
  },
  {
    title: "Quality & Reliability",
    desc: "Premium materials, expert execution & timely delivery.",
    icon: "◈",
  },
  {
    title: "End-to-End Management",
    desc: "From concept & consultation to execution & maintenance.",
    icon: "⬡",
  },
  {
    title: "3+5 Year Maintenance",
    desc: "Comprehensive maintenance guarantee.",
    icon: "◉",
  },
  {
    title: "Transparent Process",
    desc: "Regular updates & clear communication at every step.",
    icon: "◎",
  },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const onMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
  };

  const onMouseEnter = () => {
    setHovered(true);
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.7, ease: "power2.out" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative overflow-hidden cursor-pointer"
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(0,0,0,0.08)",
          background: "#fff",
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.4s",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.13), 0 0 0 1px ${service.accent}30`
            : "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "280px" }}>
          <img
            ref={imgRef}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />

          {/* Gradient over image */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, rgba(5,3,2,0.7) 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0.5,
            }}
          />

          {/* Accent glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${service.accent}22 0%, transparent 65%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Index badge */}
          <div
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center roboto-condensed font-semibold text-sm text-white"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            0{index + 1}
          </div>

          {/* Category pill bottom-left of image */}
          <div
            className="absolute bottom-4 left-4 transition-all duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span
              className="roboto-condensed uppercase text-white/80 px-3 py-1 rounded-full text-[9px]"
              style={{
                letterSpacing: "3px",
                background: `${service.accent}22`,
                backdropFilter: "blur(8px)",
                border: `1px solid ${service.accent}40`,
              }}
            >
              Sarvalay
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          <h3
            className="roboto-condensed font-semibold text-black leading-tight"
            style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
          >
            {service.title}
          </h3>

          {/* Animated accent bar */}
          <div
            className="mt-4 mb-4 rounded-full transition-all duration-500"
            style={{
              height: "2px",
              width: hovered ? "60px" : "32px",
              background: `linear-gradient(to right, ${service.accent}, ${service.accent}40)`,
            }}
          />

          <p
            className="roboto-condensed text-zinc-500 leading-relaxed"
            style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)" }}
          >
            {service.description}
          </p>

          {/* Arrow hint on hover */}
          <div
            className="flex items-center gap-2 mt-5 transition-all duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
            }}
          >
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const highlightsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word stagger
      const words = headingRef.current?.querySelectorAll(".word");
      if (words?.length) {
        gsap.from(words, {
          y: 70,
          opacity: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Highlights slide in
      const items = highlightsRef.current?.querySelectorAll(".highlight-item");
      if (items?.length) {
        gsap.from(items, {
          x: -40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="text-black px-5 sm:px-8 md:px-12 lg:px-20 py-24 sm:py-32 overflow-hidden"
      style={{ background: "#f8f5f1" }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-3 mb-7"
      >
        <div className="w-6 h-px bg-red-500" />
        <span className="roboto-condensed uppercase text-[20px] sm:text-[15px] tracking-[5px] font-medium text-red-500">
          Services We Provide
        </span>
        <div className="w-6 h-px bg-red-500" />
      </motion.div>

      {/* Heading — word stagger via GSAP */}
      <div ref={headingRef} className="text-center mb-5 overflow-hidden">
        <h2
          className="roboto-condensed font-light tracking-tight text-black leading-tight max-w-5xl mx-auto"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          <span className="word inline-block mr-[0.25em]">End-to-End</span>
          <span className="word inline-block mr-[0.25em]">Artistic</span>
          <span className="word inline-block mr-[0.25em]">Solutions</span>
          <span className="word inline-block mr-[0.25em]">for</span>

          <span className="word inline-block mx-2 px-3 py-1 rounded-lg  text-red-500">
            Inspiring
          </span>

          <span className="word inline-block text-red-500">Spaces</span>
        </h2>
      </div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="roboto-condensed text-center text-zinc-500 max-w-2xl mx-auto mb-16 sm:mb-20 leading-relaxed"
        style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
      >
        From concept to care, we deliver complete art solutions with verified
        artists, precision execution, and unmatched reliability.
      </motion.p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      {/* Highlights strip */}
      <motion.div
        ref={highlightsRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-14 sm:mt-16 rounded-[24px] overflow-hidden"
        style={{
          border: "1px solid rgba(0,0,0,0.08)",
          background: "linear-gradient(135deg, #fff 0%, #f8f4ef 100%)",
        }}
      >
        {/* Top accent line */}
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(238,6,83,0.4), rgba(201,168,71,0.4), transparent)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-black/6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-item group px-6 py-7 transition-colors duration-300 hover:bg-white/70 cursor-default"
            >
              {/* Icon */}
              <span
                className="block mb-3 transition-colors duration-300 group-hover:text-red-500"
                style={{ fontSize: "18px", color: "rgba(238,6,83,0.4)" }}
              >
                {item.icon}
              </span>

              <h4
                className="roboto-condensed font-semibold text-black mb-2 leading-tight"
                style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
              >
                {item.title}
              </h4>

              <p
                className="roboto-condensed text-zinc-500 leading-relaxed"
                style={{ fontSize: "clamp(0.72rem, 0.95vw, 0.82rem)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
