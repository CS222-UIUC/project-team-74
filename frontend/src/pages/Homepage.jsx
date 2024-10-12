import { useState } from "react";


import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Homepage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Homepage;
