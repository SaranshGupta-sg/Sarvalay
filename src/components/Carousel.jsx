
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  "/images/Alora.png",
  "/images/Espresso.png",
  "/images/LazyChuncks.png",
  "/images/Makeover.png",
  "/images/Reboot.png",
  "/images/Sevva.png",
];

const LogoCard = ({ src, index }) => (
  <div
    className="flex-shrink-0 mx-3 group cursor-pointer"
    style={{ width: "clamp(160px, 22vw, 300px)" }}
  >
    <div
      className="flex items-center justify-center transition-all duration-500"
      style={{
        height: "clamp(90px, 12vw, 160px)",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.07)",
        background: "#fff",
        padding: "20px 28px",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = "1px solid rgba(238,6,83,0.2)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(238,6,83,0.08)";
        e.currentTarget.style.background = "#fefefe";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "1px solid rgba(0,0,0,0.07)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "#fff";
      }}
    >
      <img
  src={src}
  alt={`brand-logo-${index}`}
  draggable="false"
  className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
  style={{
    opacity: 0.9,
    transition: "opacity 0.4s, transform 0.4s",
  }}
  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
  onMouseLeave={e => (e.currentTarget.style.opacity = "0.9")}
/>
    </div>
  </div>
);

const Carousel = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);

  const topRow = [...logos, ...logos, ...logos];
  const bottomRow = [...logos, ...logos, ...logos];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word stagger on heading
      const words = headingRef.current?.querySelectorAll(".word");
      if (words?.length) {
        gsap.from(words, {
          y: 60, opacity: 0, stagger: 0.07, duration: 0.9, ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }

      // Line reveal
      gsap.from(lineRef.current, {
        scaleX: 0, transformOrigin: "center", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Counter
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 6, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: counterRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.val) + "+ Brands";
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-20"
      style={{ background: "#fff" }}
    >
      {/* ── Heading ── */}
      <div className="text-center px-6 mb-5">
        {/* Main heading — word stagger via GSAP */}
        <div ref={headingRef} className="overflow-hidden mb-5">
          <h2
            className="roboto-condensed font-light tracking-tight text-black max-w-5xl mx-auto"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.8rem)", lineHeight: 1.06 }}
          >
            {["Stories", "worth", "telling,", "brands"].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.22em]">{w}</span>
            ))}
            <br />
            {["worth", "building"].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.22em]">{w}</span>
            ))}
          </h2>
        </div>

        {/* Thin divider */}
        <div
          ref={lineRef}
          className="mx-auto mb-8"
          style={{ width: "48px", height: "2px", borderRadius: "2px", background: "linear-gradient(to right, #fb2c36, #C9A847)" }}
        />

        {/* Counter */}
        <motion.span
          ref={counterRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="roboto-condensed uppercase"
          style={{ fontSize: "11px", letterSpacing: "4px", color: "#bbb" }}
        >
          6+ Brands
        </motion.span>
      </div>

      {/* ── Carousel ── */}
      <div className="flex flex-col space-y-4 mt-10">

        {/* Top row — left */}
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
          <div className="flex w-max animate-left">
            {topRow.map((src, i) => <LogoCard key={i} src={src} index={i} />)}
          </div>
        </div>

        {/* Bottom row — right */}
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
          <div className="flex w-max animate-right">
            {bottomRow.map((src, i) => <LogoCard key={i} src={src} index={i} />)}
          </div>
        </div>
      </div>

      <style>{`
        .animate-left  { animation: leftMove  22s linear infinite; }
        .animate-right { animation: rightMove 22s linear infinite; }

        @keyframes leftMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes rightMove {
          from { transform: translateX(-33.33%); }
          to   { transform: translateX(0); }
        }

        .animate-left:hover,
        .animate-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Carousel;