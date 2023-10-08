import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavbar from "./Components/Navbar"; // Gantilah dengan lokasi sebenarnya
import Home from "./Pages/Home";
import OurServices from "./Pages/Services";
import Events from "./Pages/Events";
import News from "./Pages/News";
import AboutUs from "./Pages/About";

function App() {
  return (
    <Router>
      <div>
        <MyNavbar />

        <Routes>
          <Route path="/" element={<Home />} /> {/* Ini adalah halaman utama */}
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
