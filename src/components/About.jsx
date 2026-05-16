const teamMembers = [
  {
    role: "Creative Director",
    name: "CARL GODBOUT",
  },

  {
    role: "Content Strategist",
    name: "CAMILLE BRIÈRE",
  },

  {
    role: "Senior Consultant",
    name: "STÉPHANIE BRUNELLE",
  },

  {
    role: "CEO & General Director",
    name: "PIERRE-LUC PAIEMENT",
  },

  {
    role: "Strategy Director",
    name: "MICHÈLE RIENDEAU",
  },

  {
    role: "Lead Consultant",
    name: "MEGGIE LAVOIE",
  },
];

const About = () => {
  return (
    <section
      className="
        min-h-screen
        bg-black
        text-white

        

        py-14
        sm:py-18
        lg:py-22
      "
    >
      {/* Heading */}
      <div className="mb-16 sm:mb-20 lg:mb-24 px-5
        sm:px-8
        md:px-12
        lg:px-20">
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
          Explore
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
          Our Team
        </h1>
      </div>

      {/* Team */}
      <div className="bg-black text-white">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="
            border-t
            border-zinc-700

            px-4
            sm:px-8
            md:px-12
            lg:px-16

            py-6
            sm:py-8
            lg:py-10

            flex
            flex-col
            md:flex-row

            md:items-center
            md:justify-between

            gap-4
          "
        >
          {/* Left */}
          <p
            className="
              text-lg
              sm:text-xl
              lg:text-2xl

              text-zinc-200
              font-medium
            "
          >
            {member.role}
          </p>

          {/* Right */}
          <h2
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl

              font-medium
              tracking-tight

              md:text-right
            "
          >
            {member.name}
          </h2>
        </div>
      ))}

      {/* Bottom Border */}
      <div className="border-t border-zinc-700" />
    </div>
    </section>
  );
};

export default About;
