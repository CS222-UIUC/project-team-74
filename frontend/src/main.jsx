import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import About_us from "./pages/About_us.jsx";
import Post from "./pages/Post.jsx";
import Browse from "./pages/Browse.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        
        <Route index element={<Homepage />} />
        <Route path = "/home" element = {<Homepage />} />

        <Route path = "/about" element = {<About_us />} />
        <Route path = "/post" element = {<Post />} />
        <Route path = "/browse" element = {<Browse />} />
        
        

          
        
      </Routes>
    </Router>
  </StrictMode>
);
