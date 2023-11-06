import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Home,
  LoginPage,
  Register,
  ErrorPage,
  // Reports,
  // Post,
  // Team,
  // Tables,
  // Account
} from "../../Pages";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="/reports" element={<Reports />} />
        <Route path="/post" element={<Post />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/account" element={<Account />} /> */}
      </Routes>
    </Router>
  );
}

export default Routing;
