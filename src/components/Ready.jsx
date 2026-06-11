import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ready = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const text = textRef.current;

      const getScrollAmount = () => {
        return -(text.scrollWidth - window.innerWidth + 300);
      };

      gsap.fromTo(
        text,
        {
          x: window.innerWidth < 768 ? 200 : 500,
          scale: 0.95,
          opacity: 0.7,
        },
        {
          x: getScrollAmount,
          scale: 1,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",

            end: () => `+=${text.scrollWidth + window.innerHeight}`,

            scrub: 2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            // markers: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-[#ececec] text-black overflow-hidden flex items-center"
    >
      <div className="w-max">
        <h2
          ref={textRef}
          className="roboto-condensed whitespace-nowrap text-[30vw] sm:text-[22vw] md:text-[14vw] lg:text-[10vw] leading-none font-light tracking-tight pl-[20vw] sm:pl-[15vw] md:pl-[10vw] pr-[60vw] sm:pr-[80vw] md:pr-[100vw] will-change-transform"
        >
          so are you ready to turn some heads?
        </h2>
      </div>
    </section>
  );
};

export default Ready;
