import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <Header />
      <Carousel />
    </div>
  );
};

export default App;
