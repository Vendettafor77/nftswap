import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import { FontProvider } from "./contexts/FontContext";
import { AnimationProvider } from "./contexts/AnimationContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <FontProvider>
      <Router>
        <AnimationProvider>
          <App />
        </AnimationProvider>
      </Router>
    </FontProvider>
  </ThemeProvider>
);
