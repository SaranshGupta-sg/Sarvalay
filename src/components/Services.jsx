const services = [
  {
    title: "Wall Art & Murals",
    description:
      "Custom hand-painted murals and wall art that bring your space, brand and story to life.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Art Installations",
    description:
      "Large-scale and bespoke art installations crafted to enhance environments and create unforgettable experiences.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Space Transformation",
    description:
      "End-to-end transformation of commercial spaces aligned with your vision, brand and audience.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Art Maintenance & Restoration",
    description:
      "Long-term care, maintenance and restoration to keep your art as stunning as day one.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
  },
];

const highlights = [
  {
    title: "Verified Artist Network",
    desc: "A curated network of skilled artists focused on quality and professional execution.",
  },
  {
    title: "Quality & Reliability",
    desc: "Premium materials, expert execution & timely delivery",
  },
  {
    title: "End-to-End Management",
    desc: "From concept & consultation to execution & maintenance",
  },
  {
    title: "3+5 Year Maintenance",
    desc: "Comprehensive maintenance guarantee",
  },
  {
    title: "Transparent Process",
    desc: "Regular updates & clear communication at every step",
  },
];

const Services = () => {
  return (
    <section className="bg-[#f8f5f1] text-black px-5 sm:px-8 md:px-12 lg:px-20 py-24 sm:py-28 overflow-hidden">
      {/* Top Label */}
      <div className="flex justify-center mb-6">
        <div className="border border-red-200 rounded-full px-5 py-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-red-700 bg-white">
          Services We Provide
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
          End-to-End Artistic Solutions
          <br />
          for{" "}
          <span className="text-red-700 font-normal">
            Inspiring Spaces
          </span>
        </h2>

        <p className="mt-6 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          From concept to care, we deliver complete art solutions with
          verified artists, precision execution, and unmatched reliability.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white rounded-[28px] overflow-hidden border border-zinc-200 hover:shadow-2xl duration-500"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-[260px]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 duration-700"
              />

              {/* Number */}
              <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm">
                0{index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="p-7">
              <h3 className="text-2xl sm:text-3xl leading-tight font-light">
                {service.title}
              </h3>

              <div className="w-12 h-[2px] bg-red-700 mt-5 mb-5"></div>

              <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>

              
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="mt-14 bg-gradient-to-r from-[#f8f5f1] to-[#f3eee8] rounded-[28px] border border-[#e7dfd6] px-6 sm:px-10 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
    {highlights.map((item, index) => (
      <div
        key={index}
        className={`px-5 py-4 ${
          index !== highlights.length - 1
            ? "lg:border-r lg:border-[#ddd3c8]"
            : ""
        }`}
      >
        <h4 className="text-base font-semibold text-black">
          {item.title}
        </h4>

        <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</div>

      
    </section>
  );
};

export default Services;