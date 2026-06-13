import { motion } from "framer-motion";

const Carousel = () => {
  const topRow = [
    "/images/Alora.png",
    "/images/Espresso.png",
    "/images/LazyChuncks.png",
    "/images/Makeover.png",
    "/images/Reboot.png",
    "/images/Sevva.png",
  ];

  const bottomRow = [
    "/images/Alora.png",
    "/images/Espresso.png",
    "/images/LazyChuncks.png",
    "/images/Makeover.png",
    "/images/Reboot.png",
    "/images/Sevva.png",
  ];

  return (
    <section className="w-full min-h-[70vh] sm:min-h-screen bg-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center px-6 mb-20"
      >
        <h1 className="roboto-condensed text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] leading-[1.05] font-light tracking-tight text-black max-w-6xl mx-auto">
          Stories worth telling, brands
          <br />
          worth building
        </h1>
      </motion.div>

      {/* Carousel */}
      <div className="flex flex-col overflow-hidden space-y-5">
        {/* Top Row */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-left">
            {[...topRow, ...topRow, ...topRow].map((image, index) => (
              <div
                key={index}
                className="w-[220px] sm:w-[280px] md:w-[350px] h-[120px] sm:h-[150px] md:h-[180px] mx-3 flex-shrink-0"
              >
                <img
                  src={image}
                  alt={`logo-${index}`}
                  className="w-full h-full object-contain"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-right">
            {[...bottomRow, ...bottomRow, ...bottomRow].map((image, index) => (
              <div
                key={index}
                className="w-[220px] sm:w-[280px] md:w-[350px] h-[120px] sm:h-[150px] md:h-[180px] mx-3 flex-shrink-0"
              >
                <img
                  src={image}
                  alt={`logo-${index}`}
                  className="w-full h-full object-contain"
                  draggable="false"
                />
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
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-33.33%);
            }
          }

          @keyframes rightMove {
            from {
              transform: translateX(-33.33%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Carousel;