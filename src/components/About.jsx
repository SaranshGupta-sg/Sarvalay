import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-white text-black py-12 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-helvetica-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-12 sm:mb-16"
        >
          About Us
        </motion.h1>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Transforming Commercial Spaces Through Curated Art
            </h2>

            <p className="text-gray-600 mt-6 text-base sm:text-lg leading-8">
              Sarvalay is a full-service art execution
              platform dedicated to transforming commercial environments
              into inspiring and memorable experiences. We collaborate
              with talented artists and businesses to bring meaningful
              artistic concepts to life.
            </p>

            <p className="text-gray-600 mt-5 text-base sm:text-lg leading-8">
              From artwork selection and commissioning to installation
              and maintenance, we manage every stage with precision,
              ensuring seamless execution and long-term value for our
              clients.
            </p>
          </motion.div>

          {/* Right Side Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            <div className="bg-black text-white p-6 sm:p-8 rounded-3xl">
              <h3 className="text-4xl sm:text-5xl font-bold">50</h3>
              <p className="mt-2 text-gray-300">Projects Completed</p>
            </div>

            <div className="bg-red-500 text-white p-6 sm:p-8 rounded-3xl">
              <h3 className="text-4xl sm:text-5xl font-bold">5</h3>
              <p className="mt-2">Verified Artists</p>
            </div>

            <div className="bg-gray-100 border border-gray-200 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-4xl sm:text-5xl font-bold">98%</h3>
              <p className="mt-2 text-gray-600">
                Client Satisfaction
              </p>
            </div>

            <div className="bg-gray-100 border border-gray-200 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-4xl sm:text-5xl font-bold">24/7</h3>
              <p className="mt-2 text-gray-600">
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