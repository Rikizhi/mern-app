import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  LoginPage,
  Register,
  ErrorPage,
  Services,
  Events,
  News,
  About,
} from "../../Pages";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/our-services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </Router>
  );
}

export default Routing;
