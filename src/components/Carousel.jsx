const Carousel = () => {
  const topRow = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const bottomRow = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center overflow-hidden space-y-3 sm:space-y-4">
      {/* Top Row */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-left">
          {[...topRow, ...topRow, ...topRow].map((item, index) => (
            <div
              key={index}
              className="
                w-[180px] sm:w-[220px] md:w-[280px]
                h-[90px] sm:h-[110px] md:h-[140px]
                bg-[#1f1f1f]
                rounded-md
                mx-1
                flex
                items-center
                justify-center
                text-white
                text-xl sm:text-2xl md:text-4xl
                font-bold
                flex-shrink-0
              "
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
              className="
                w-[180px] sm:w-[220px] md:w-[280px]
                h-[90px] sm:h-[110px] md:h-[140px]
                bg-[#1f1f1f]
                rounded-md
                mx-1
                flex
                items-center
                justify-center
                text-white
                text-xl sm:text-2xl md:text-4xl
                font-bold
                flex-shrink-0
              "
            >
              {item}
            </div>
          ))}
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
    </div>
  );
};

export default Carousel;
