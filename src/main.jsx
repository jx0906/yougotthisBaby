import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

// <Router> for handling routing logic
// <React.StrictMode> - a development tool that checks for common mistakes and deprecated features; good
// practice to wrap entire app in <React.StrictMode> to catch and address potential issues early in dev
// order of both shouldn't matter much?
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
