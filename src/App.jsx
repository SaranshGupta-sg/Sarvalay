import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import HorizonalScroll from "./components/HorizonalScroll";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <Header />
      <Carousel />
      <HorizonalScroll />
    </div>
  );
};

export default App;
