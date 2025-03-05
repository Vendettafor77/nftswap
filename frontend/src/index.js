import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import { FontProvider } from "./contexts/FontContext";
import { AnimationProvider } from "./contexts/AnimationContext";
import "./index.css";

// 移除index.css导入，避免样式冲突
// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FontProvider>
        <Router>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </Router>
      </FontProvider>
    </ThemeProvider>
  </React.StrictMode>
);
