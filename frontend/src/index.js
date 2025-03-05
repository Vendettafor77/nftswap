import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import GlobalStyles from "./styles/GlobalStyles";
import { AnimationProvider } from "./contexts/AnimationContext";

// 移除index.css导入，避免样式冲突
// import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AnimationProvider>
          <GlobalStyles />
          <App />
        </AnimationProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
