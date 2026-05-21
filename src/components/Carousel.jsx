import { motion } from "framer-motion";

const Carousel = () => {
  const topRow = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const bottomRow = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <section className="w-full bg-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center px-6 mb-16 sm:mb-20 lg:mb-24"
      >
        <h1 className="roboto-condensed text-2xl sm:text-4xl md:text-6xl lg:text-[5rem] leading-[1.05] font-light tracking-tight text-black max-w-6xl mx-auto">
          Stories worth telling, brands
          <br />
          worth building
        </h1>
      </motion.div>

      {/* Carousel */}
      <div className="flex flex-col overflow-hidden space-y-3 sm:space-y-4">
        {/* Top Row */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-left">
            {[...topRow, ...topRow, ...topRow].map((item, index) => (
              <div
                key={index}
                className="w-[180px] sm:w-[220px] md:w-[280px] h-[90px] sm:h-[110px] md:h-[140px] bg-white mx-1 flex items-center justify-center text-black text-xl sm:text-2xl md:text-4xl font-bold flex-shrink-0"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-right">
            {[...bottomRow, ...bottomRow, ...bottomRow].map((item, index) => (
              <div
                key={index}
                className="w-[180px] sm:w-[220px] md:w-[280px] h-[90px] sm:h-[110px] md:h-[140px] bg-white mx-1 flex items-center justify-center text-black text-xl sm:text-2xl md:text-4xl font-bold flex-shrink-0"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .animate-left {
            animation: leftMove 20s linear infinite;
          }

          .animate-right {
            animation: rightMove 20s linear infinite;
          }

          @keyframes leftMove {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-33.33%);
            }
          }

          @keyframes rightMove {
            0% {
              transform: translateX(-33.33%);
            }

            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Carousel;
