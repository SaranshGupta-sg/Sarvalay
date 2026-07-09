import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { id: 1, video: "/images/video.mp4", name: "Rahul Sharma", role: "Director, LazyChunks", rating: 5, quote: "The transformation exceeded every expectation we had." },
  { id: 2, video: "/images/video.mp4", name: "Ananya Singh", role: "Founder, Alora", rating: 5, quote: "Professional, punctual, and incredibly talented artists." },
  { id: 3, video: "/images/video.mp4", name: "David Thomas", role: "CEO, Reboot", rating: 5, quote: "Our space now tells a story our clients remember." },
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: "#C9A847", fontSize: "13px" }}>★</span>
    ))}
  </div>
);

const VideoCard = ({ item, index }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
  };

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 60, opacity: 0, duration: 0.9, ease: "power4.out", delay: index * 0.15,
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={togglePlay}
      style={{ borderRadius: "20px", overflow: "hidden" }}
    >
      <div className="relative" style={{ aspectRatio: "9/16" }}>
        <video
          ref={videoRef}
          src={item.video}
          playsInline
          loop
          muted={muted}
          onTimeUpdate={onTimeUpdate}
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />

        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(5,3,2,0.85) 0%, rgba(5,3,2,0.1) 45%, transparent 100%)",
        }} />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div className="h-full transition-all duration-150" style={{ width: `${progress}%`, background: "#fb2c36" }} />
        </div>

        {/* Top tag + mute */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="roboto-condensed uppercase text-white/70 text-[9px] tracking-[3px] px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            Client Story
          </span>
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {muted ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM3 9v6h4l5 5V4L7 9H3z" /></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            )}
          </button>
        </div>

        {/* Play/Pause */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered || !playing ? 1 : 0 }}>
          <div className="flex items-center justify-center rounded-full transition-all duration-300" style={{
            width: "56px", height: "56px",
            background: playing ? "rgba(255,255,255,0.15)" : "rgba(238,6,83,0.9)",
            backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: playing ? "none" : "0 8px 24px rgba(238,6,83,0.45)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}>
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="5" y="4" width="4" height="16" rx="1" /><rect x="15" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}><polygon points="5,3 19,12 5,21" /></svg>
            )}
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Stars count={item.rating} />
          <p className="roboto-condensed text-white/85 italic mt-2 mb-3 leading-snug" style={{ fontSize: "0.82rem" }}>
            "{item.quote}"
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="roboto-condensed font-semibold text-white leading-tight" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}>
                {item.name}
              </p>
              <p className="roboto-condensed mt-0.5" style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                {item.role}
              </p>
            </div>
            <div className="text-4xl font-serif leading-none" style={{ color: "#fb2c36", opacity: 0.7, lineHeight: 0.8 }}>"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        const target = [98, 20, 4][i];
        const suffix = ["%", "+", "+"][i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.6, ease: "power2.out", delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-6" style={{ background: "#f8f5f1" }}>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-6 h-px bg-red-500" />
          <span className="roboto-condensed uppercase text-[10px] sm:text-[11px] tracking-[5px] font-medium" style={{ color: "#fb2c36" }}>
            Testimonials
          </span>
          <div className="w-6 h-px bg-red-500" />
        </div>

        <h2 className="roboto-condensed font-semibold text-black max-w-2xl mx-auto" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.08 }}>
          Hear From <br className="sm:hidden" />
          <span className="text-red-500">Our Clients</span>
        </h2>

        <p className="roboto-condensed mt-4 max-w-lg mx-auto" style={{ color: "#888", fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", lineHeight: 1.7 }}>
          Discover how our art execution services transformed commercial spaces
          and left a lasting impression.
        </p>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        className="flex items-center justify-center gap-8 sm:gap-14 mb-14"
      >
        {[
          { label: "Client Satisfaction", ref: 0 },
          { label: "Projects Delivered", ref: 1 },
          { label: "Cities Served", ref: 2 },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span ref={el => statsRef.current[i] = el} className="roboto-condensed font-semibold" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "#111" }}>
              0{s.label}
            </span>
            <span className="uppercase tracking-widest text-center" style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.68rem)", color: "#999", letterSpacing: "2.5px" }}>
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Video cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {testimonials.map((item, i) => (
          <VideoCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Trust badges row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-14 sm:mt-16 max-w-3xl mx-auto"
      >
        {["Verified Reviews", "Real Client Footage", "Unedited Testimonials"].map((tag, i) => (
          <span key={i} className="roboto-condensed px-4 py-2 rounded-full text-[11px] uppercase tracking-[2px] font-medium flex items-center gap-2"
            style={{ background: "#fff", color: "#555", border: "1px solid rgba(0,0,0,0.08)" }}>
            <span style={{ color: "#fb2c36" }}>✓</span>{tag}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-12 sm:mt-14"
      >
        <p className="roboto-condensed uppercase tracking-[3px] text-[10px] mb-5" style={{ color: "#bbb" }}>
          Real clients · Real spaces · Real results
        </p>
      </motion.div>
    </section>
  );
};

export default Testimonials;
