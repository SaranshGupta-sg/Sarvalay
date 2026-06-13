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
import BookConsultation from "./components/BookConsultation";
import Artist from "./components/Artist";

import ScrollToTop from "./components/ScrollToTop";
// import Testimonials from "./components/Testimonials";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full min-h-screen">
              <Navbar />

              <Header />
              <Carousel />
              {/* <Testimonials /> */}

              <div id="work">
                <HorizonalScroll />
              </div>

              <div id="services">
                <Services />
              </div>

              <div id="about">
                <About />
              </div>

              <Ready />
              <Footer />
            </div>
          }
        />

        <Route
          path="/projects"
          element={
            <div className="w-full min-h-screen bg-black text-white">
              <ProjectsPage />
            </div>
          }
        />

        <Route path="/bookConsultation" element={<BookConsultation />} />

        <Route path="/artist" element={<Artist />} />
      </Routes>
    </>
  );
};

export default App;
