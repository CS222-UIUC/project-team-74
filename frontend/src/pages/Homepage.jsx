import { useState } from "react";


import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Homepage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

export default Homepage;
