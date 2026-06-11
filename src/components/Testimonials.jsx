import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    video: "/images/video.mp4",
    name: "Rahul Sharma",
  },
  {
    id: 2,
    video: "/images/video.mp4",
    name: "Ananya Singh",
  },
  {
    id: 3,
    video: "/images/video.mp4",
    name: "David Thomas",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f8f5f1] py-15 px-6">
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center mb-14"
      >
        <div className="flex justify-center mb-6">
          <div className="font-helvetica-black border border-red-200 rounded-full px-5 py-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-red-700 bg-white">
            Testimonials
          </div>
        </div>

        <h2 className="roboto-condensed text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          Hear From Our Clients
        </h2>

        <p className="roboto-condensed text-gray-500 mt-4 max-w-2xl mx-auto">
          Discover how our art execution services transformed commercial spaces.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gray-100"
          >
            <video
              src={item.video}
              controls
              playsInline
              className="w-full h-[500px] sm:h-[480px] object-cover"
            />

            <div className="p-4">
              <p className="font-semibold roboto-condensed text-center">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
