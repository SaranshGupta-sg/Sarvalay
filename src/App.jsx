import Header from "./components/Header";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <Header />
    </div>
  );
};

export default App;