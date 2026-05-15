import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import HorizonalScroll from "./components/HorizonalScroll";
import Services from "./components/Services";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <Header />
      <Carousel />
      <HorizonalScroll />
      <Services />
    </div>
  );
};

export default App;
