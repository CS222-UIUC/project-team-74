import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

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
