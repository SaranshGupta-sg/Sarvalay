import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterNav = (section) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById(section);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer  className="min-h-screen bg-black text-white border-t border-zinc-800 px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 justify-between">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-none font-light tracking-tight">
            Built once.
            <br />
            Built right.
          </h1>

          {/* Button */}
          <button
            onClick={() => navigate("/bookConsultation")}
            className="mt-10 sm:mt-12 w-full sm:w-[80%] bg-[#ececec] text-black py-3 sm:py-4 text-md sm:text-lg flex items-center justify-center gap-3 hover:bg-white duration-300 rounded-full"
          >
            Book Consultation
          </button>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="flex flex-col sm:flex-row gap-14 sm:gap-24 lg:gap-32">
          {/* Navigation */}
          <div className="space-y-5 sm:space-y-6">
            {[
              {
                name: "WORK",
                link: "#work",
              },

              {
                name: "ABOUT",
                link: "#about",
              },

              {
                name: "SERVICES",
                link: "#services",
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleFooterNav(item.link.replace("#", ""))}
                className="block text-left text-xl sm:text-2xl font-light cursor-pointer hover:text-zinc-400 duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="space-y-5 sm:space-y-6">
            {[
              {
                name: "INSTAGRAM ↗",
                link: "https://instagram.com/sarvalay/",
              },

              {
                name: "LINKEDIN ↗",
                link: "https://linkedin.com/company/sarvalay/",
              },

              {
                name: "EMAIL ↗",
                link: "mailto:sarvalayworld@gmail.com",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl sm:text-2xl font-light tracking-tight hover:text-zinc-400 transition-all duration-300 hover:translate-x-1"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20 sm:mt-24 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10"></div>

      {/* Bottom Brand Name */}
      <motion.div initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }} className="overflow-hidden">
        <h1 className="text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[18vw] leading-none font-semibold tracking-[-0.03em] text-center text-[#ececec] whitespace-nowrap">
          SARVALAY
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;
