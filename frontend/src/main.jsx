import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      {/* <Navbar /> */}
      <Homepage />
      <Routes>
        <Route path="/" exact component={Homepage} />
      </Routes>
    </Router>
  </StrictMode>
);
