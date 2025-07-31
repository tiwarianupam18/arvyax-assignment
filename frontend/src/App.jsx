import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SessionEditor from "./pages/SessionEditor";

const isLoggedIn = () => !!localStorage.getItem("token");

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/editor/:id?"
        element={isLoggedIn() ? <SessionEditor /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
