import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Hero_Homepage from "./components/Hero_Homepage";
import Navbar from "./components/Navbar";

function Homepage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Hero_Homepage />
    </div>
  )
}

export default Homepage;
