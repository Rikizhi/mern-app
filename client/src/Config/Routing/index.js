import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  LoginPage,
  Register,
  ErrorPage,
} from "../../Pages";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Routing;
