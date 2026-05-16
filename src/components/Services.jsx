const services = [
  {
    icon: "/images/service-1.png",
    title: "Logo Design",
    description:
      "We make logos that feel right. Not just good-looking but meaningful, memorable and built to last for your brand.",
  },

  {
    icon: "/images/service-2.png",
    title: "Brand Identity Development",
    description:
      "A brand is more than a logo. We help you show up the same way everywhere - online, offline and everything between.",
  },

  {
    icon: "/images/service-3.png",
    title: "Packaging Design",
    description:
      "Good packaging tells a story before anyone reads a word. We design packs that stand out, feel great and connect.",
  },

  {
    icon: "/images/service-4.png",
    title: "Website Design & Development",
    description:
      "Your website should work hard and look good. We design sites that are easy to use and built to grow with you.",
  },
];

const Services = () => {
  return (
    <section
      className="
        min-h-screen
        bg-black
        text-white

        px-5
        sm:px-8
        md:px-12
        lg:px-20

        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* Heading */}
      <div className="mb-16 sm:mb-20 lg:mb-24">
        <h1
          className="
            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
            text-white
            font-light
          "
        >
          Services
        </h1>

        <h1
          className="
            mt-3

            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-9xl

            font-light
            leading-none
            tracking-tight
          "
        >
          We Provide
        </h1>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4

          gap-6
          lg:gap-8
        "
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="
              rounded-[2rem]
              border
              border-zinc-800

              bg-zinc-950

              p-7
              sm:p-8

              min-h-[420px]

              flex
              flex-col

              hover:border-orange-500/40
              duration-300
            "
          >
            {/* Icon */}
            <div className="mb-12">
              <img
                src={service.icon}
                alt={service.title}
                className="
                  w-20
                  sm:w-24
                  object-contain
                "
              />
            </div>

            {/* Content */}
            <div className="mt-auto">
              <h3
                className="
                  text-3xl
                  sm:text-4xl

                  leading-tight
                  font-light
                "
              >
                {service.title}
              </h3>

              <p
                className="
                  mt-5

                  text-base
                  sm:text-lg

                  leading-relaxed
                  text-zinc-500
                "
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
