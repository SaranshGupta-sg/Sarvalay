const Footer = () => {
  return (
    <footer
      className="
        min-h-screen
        bg-black
        text-white

        border-t
        border-zinc-800

        px-5
        sm:px-8
        md:px-12
        lg:px-20

        py-12
        sm:py-16
        lg:py-20

        flex
        flex-col
        justify-between
      "
    >
      {/* Top Section */}
      <div
        className="
          flex
          flex-col
          lg:flex-row

          gap-16
          lg:gap-10

          justify-between
        "
      >
        {/* Left */}
        <div className="max-w-4xl">
          <h1
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-[5.5rem]

              leading-none
              font-light
              tracking-tight
            "
          >
            Built right. 
            <br />
            Built once.
          </h1>

          {/* Button */}
          <a
            href="#contact"
            className="
              mt-10
              sm:mt-12

              w-full
              sm:w-[80%]

              bg-[#ececec]
              text-black

              py-5
              sm:py-6

              text-lg
              sm:text-xl

              flex
              items-center
              justify-center
              gap-3

              hover:bg-white
              duration-300
            "
          >
            Lets Talk <span>↗</span>
          </a>
        </div>

        {/* Right */}
        <div
          className="
            flex
            flex-col
            sm:flex-row

            gap-14
            sm:gap-24
            lg:gap-32
          "
        >
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
              <a
                key={index}
                href={item.link}
                className="
                  block

                  text-xl
                  sm:text-2xl

                  font-light
                  cursor-pointer

                  hover:text-zinc-400
                  duration-300
                "
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="space-y-5 sm:space-y-6">
            {[
              {
                name: "INSTAGRAM ↗",
                link: "https://instagram.com",
              },

              {
                name: "LINKEDIN ↗",
                link: "https://linkedin.com",
              },

              {
                name: "X (TWITTER) ↗",
                link: "https://x.com",
              },

              {
                name: "EMAIL ↗",
                link: "mailto:hello@dzinr.in",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block

                  text-xl
                  sm:text-2xl

                  font-light
                  cursor-pointer

                  hover:text-zinc-400
                  duration-300
                "
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="
          mt-20
          sm:mt-24

          flex
          flex-col
          sm:flex-row

          items-start
          sm:items-end

          justify-between

          gap-10
        "
      ></div>

      {/* Bottom Brand Name */}
<div
  className="

    overflow-hidden
  "
>
  <h1
    className="
      text-[19vw]
      sm:text-[18vw]
      md:text-[16vw]
      lg:text-[18vw]

      leading-none
      font-semibold
      tracking-[-0.03em]
      text-center

      text-[#ececec]

      whitespace-nowrap
    "
  >
    SARVALAY
  </h1>
</div>
    </footer>
  );
};

export default Footer;