import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="roboto-condensed bg-gradient-to-b from-[#faf7f2] via-[#f8f5f1] to-[#f3eee7] text-black py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16"
        >
          <h1 className="font-helvetica-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight">
            About Us
          </h1>

          <div className="w-24 h-1.5 bg-red-500 rounded-full mt-5"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Transforming Commercial Spaces Through Curated Art
            </h2>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              Sarvalay is a full-service art execution platform dedicated to
              transforming commercial environments into inspiring and memorable
              experiences. We collaborate with talented artists and businesses
              to bring meaningful artistic concepts to life.
            </p>

            <p className="text-gray-600 mt-5 text-lg leading-8">
              From artwork selection and commissioning to installation and
              maintenance, we manage every stage with precision, ensuring
              seamless execution and long-term value for our clients.
            </p>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-2 gap-5 lg:mt-8"
          >
            {/* Card 1 */}
            <div className="bg-[#1f1f1f] text-white p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <h3 className="text-5xl sm:text-6xl font-black">50+</h3>
              <p className="mt-3 text-gray-300">
                Projects Completed
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#8B3A3A] text-white p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl lg:translate-y-10">
              <h3 className="text-5xl sm:text-6xl font-black">5+</h3>
              <p className="mt-3">
                Verified Artists
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-5xl sm:text-6xl font-black">98%</h3>
              <p className="mt-3 text-gray-600">
                Client Satisfaction
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl lg:translate-y-10">
              <h3 className="text-5xl sm:text-6xl font-black">24/7</h3>
              <p className="mt-3 text-gray-600">
                Project Support
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;