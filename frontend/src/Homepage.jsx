import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Hero from "./components/Hero";

function Homepage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Hero />
    </div>
  )
}

export default Homepage;
