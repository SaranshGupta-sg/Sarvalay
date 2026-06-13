import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ready = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      const text = textRef.current;

      const getScrollAmount = () =>
        -(text.scrollWidth - window.innerWidth + 300);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${text.scrollWidth + window.innerHeight}`,
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Text scroll
      tl.fromTo(
        text,
        {
          x: window.innerWidth < 768 ? 200 : 500,
          scale: 0.96,
          opacity: 0.5,
        },
        {
          x: getScrollAmount,
          scale: 1,
          opacity: 1,
          ease: "none",
        },
        0,
      );

      // Background subtle animation
      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full overflow-hidden flex items-center relative"
      style={{ background: "#ffffff" }}
    >
      {/* Background texture grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px",
        }}
      />

      {/* Subtle background glow */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(238,6,83,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Top & bottom accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgb(253, 6, 83), transparent)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(238,6,83,0.25), transparent)",
        }}
      />

      {/* Scrolling text */}
      <div className="w-max relative z-10">
        <h2
          ref={textRef}
          className="roboto-condensed whitespace-nowrap leading-none font-light tracking-tight will-change-transform"
          style={{
            fontSize: "clamp(14vw, 16vw, 18vw)",
            paddingLeft: "clamp(8vw, 12vw, 20vw)",
            paddingRight: "clamp(50vw, 80vw, 100vw)",
            color: "#000000",
          }}
        >
          so are you ready to{" "}
          <span
            style={{
              background: "linear-gradient(to right, #dc2626, #7f1d1d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            turn some heads?
          </span>
        </h2>
      </div>

      {/* Corner brand mark */}
      <div
        className="absolute top-8 right-8 hidden sm:flex flex-col items-end gap-1"
        style={{ opacity: 0.3 }}
      >
        <span className="roboto-condensed text-black text-[9px] uppercase tracking-[5px]">
          Sarvalay
        </span>
        <div className="w-8 h-px bg-black" />
      </div>
    </section>
  );
};

export default Ready;
