import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Roadmap />
      <Footer />
    </>
  );
}

export default Home;