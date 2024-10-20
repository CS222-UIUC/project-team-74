import React from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Post from "./pages/Post.jsx";
import Browse from "./pages/Browse.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path = "/home" element = {<Homepage />} />
        <Route path = "/about-us" element = {<AboutUs />} />
        <Route path = "/post" element = {<Post />} />
        <Route path = "/browse" element = {<Browse />} />
      </Routes>
    </Router>
  </StrictMode>
);
