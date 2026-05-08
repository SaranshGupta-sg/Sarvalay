
import logo from "/images/logo.png";


const Navbar = () => {
  

  return (
    <header className="px-20 py-6 w-full bg-black text-white flex justify-between items-start">
      {/* logo */}
      <div className="cursor-pointer">
        <a href="https://google.com" target="_blank" rel="noreferrer">
          <img src={logo} height={100} width={160} alt="Logo" />
        </a>
      </div>

      <nav className="flex items-center gap-16">
        <div className="flex gap-10 mr-37">
        
            <a
            href="/"
            className="text-xl text-white no-underline hover:opacity-70 transition"
          >
            Work
          </a>

          <a
            href="/"
            className="text-xl text-white no-underline hover:opacity-70 transition"
          >
            About
          </a>

          <a
            href="/"
            className="text-xl text-white no-underline hover:opacity-70 transition"
          >
            Services
          </a>
        </div>

        <button className="bg-white text-black border-none px-6 py-3 text-xl cursor-pointer flex items-center gap-3 hover:bg-gray-300 transition ml-auto">
          Lets Talk
          <span className="text-xl">→</span>
        </button>
         

      </nav>

    </header>
  );
};

export default Navbar;
