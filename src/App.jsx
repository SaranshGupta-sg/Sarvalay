import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import HorizonalScroll from "./components/HorizonalScroll";
import Services from "./components/Services";
import About from "./components/About";
import Ready from "./components/Ready";
import Footer from "./components/Footer";

import ProjectsPage from "./components/ProjectsPage";

const App = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <div className="w-full min-h-screen bg-black text-white">
            <Navbar />
            <Header />
            <Carousel />
            <HorizonalScroll />
            <Services />
            <About />
            <Ready />
            <Footer />
          </div>
        }
      />

      {/* Projects Page */}
      <Route path="/projects" element={<div className="w-full min-h-screen bg-black text-white"><ProjectsPage /></div>} />
    </Routes>
  );
};

export default App;