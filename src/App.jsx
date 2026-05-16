import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import HorizonalScroll from "./components/HorizonalScroll";
import Services from "./components/Services";
import About from "./components/About";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <Header />
      <Carousel />
      <HorizonalScroll />
      <Services />
      <About />
    </div>
  );
};

export default App;
