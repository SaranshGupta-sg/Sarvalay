import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    bg: "#111",
    color: "#fff",
    labelColor: "rgba(255,255,255,0.6)",
    offset: false,
  },
  {
    value: 200,
    suffix: "+",
    label: "Verified Artists",
    bg: "#ee0653",
    color: "#fff",
    labelColor: "rgba(255,255,255,0.75)",
    offset: true,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    bg: "#fff",
    color: "#111",
    labelColor: "#888",
    border: true,
    offset: false,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Project Support",
    bg: "#fff",
    color: "#111",
    labelColor: "#888",
    border: true,
    offset: true,
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef([]);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — char by char
      const chars = headingRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Red bar width reveal
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Left text paragraphs
      const paras = textRef.current?.querySelectorAll(".para");
      gsap.from(paras, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats count-up
      statsRef.current.forEach((card, i) => {
        if (!card) return;
        const stat = stats[i];
        const numEl = card.querySelector(".num");
        const obj = { val: 0 };

        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            if (numEl) numEl.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingChars = "About Us".split("");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="roboto-condensed text-black py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #faf7f2 0%, #f8f5f1 50%, #f3eee7 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Heading ── */}
        <div className="mb-14 sm:mb-18">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-6 h-px bg-red-500" />
            <span
              className="uppercase text-[20px] sm:text-[15px] tracking-[5px] font-medium text-red-500"
            >
              Who We Are
            </span>
          </motion.div>

          <div ref={headingRef} className="overflow-hidden">
            <h1
              className="font-semibold leading-none tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
            >
              {headingChars.map((ch, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
          </div>

          <div
            ref={lineRef}
            className="rounded-full mt-5"
            style={{
              width: "96px",
              height: "5px",
              background: "linear-gradient(to right, #ee0653, #C9A847)",
            }}
          />
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — text */}
          <div ref={textRef}>
            <h2
              className="para font-semibold leading-tight text-black"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
            >
              Transforming Commercial Spaces Through{" "}
              <span className="text-red-500">Curated Art</span>
            </h2>

            <p
              className="para mt-6 leading-8 text-zinc-500"
              style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.02rem)" }}
            >
              Sarvalay is a full-service art execution platform dedicated to
              transforming commercial environments into inspiring and memorable
              experiences. We collaborate with talented artists and businesses
              to bring meaningful artistic concepts to life.
            </p>

            <p
              className="para mt-5 leading-8 text-zinc-500"
              style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.02rem)" }}
            >
              From artwork selection and commissioning to installation and
              maintenance, we manage every stage with precision, ensuring
              seamless execution and long-term value for our clients.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mt-10">
              <div
                className="w-10 h-px"
                style={{ background: "rgba(238,6,83,0.3)" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#ee0653", opacity: 0.5 }}
              />
              <div className="w-5 h-px bg-black/10" />
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:mt-2">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="group relative overflow-hidden cursor-default"
                style={{
                  borderRadius: "24px",
                  padding: "clamp(1.4rem, 2.5vw, 2rem)",
                  background: stat.bg,
                  border: stat.border ? "1px solid rgba(0,0,0,0.08)" : "none",
                  marginTop: stat.offset ? "clamp(16px, 2.5vw, 28px)" : "0",
                  boxShadow:
                    stat.bg === "#111"
                      ? "0 8px 32px rgba(0,0,0,0.18)"
                      : stat.bg === "#ee0653"
                        ? "0 8px 32px rgba(238,6,83,0.28)"
                        : "0 4px 16px rgba(0,0,0,0.06)",
                  transition:
                    "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    stat.bg === "#ee0653"
                      ? "0 20px 50px rgba(238,6,83,0.4)"
                      : stat.bg === "#111"
                        ? "0 20px 50px rgba(0,0,0,0.28)"
                        : "0 16px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    stat.bg === "#111"
                      ? "0 8px 32px rgba(0,0,0,0.18)"
                      : stat.bg === "#ee0653"
                        ? "0 8px 32px rgba(238,6,83,0.28)"
                        : "0 4px 16px rgba(0,0,0,0.06)";
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 pointer-events-none"
                  style={{
                    background:
                      stat.bg === "#111"
                        ? "#ee0653"
                        : stat.bg === "#ee0653"
                          ? "#fff"
                          : "#ee0653",
                    filter: "blur(24px)",
                  }}
                />

                <span
                  className="num font-semibold leading-none block"
                  style={{
                    fontSize: "clamp(2.8rem, 5.5vw, 4rem)",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </span>

                <div
                  className="mt-3 mb-0 rounded-full"
                  style={{
                    height: "1.5px",
                    width: "28px",
                    background:
                      stat.bg === "#111" || stat.bg === "#ee0653"
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(238,6,83,0.3)",
                  }}
                />

                <p
                  className="mt-3 font-medium leading-snug"
                  style={{
                    fontSize: "clamp(0.72rem, 1vw, 0.85rem)",
                    color: stat.labelColor,
                    letterSpacing: "0.3px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
