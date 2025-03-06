import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import GlobalStyle from "./components/styled/GlobalStyle";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import { BackgroundDecoration } from "./components/BackgroundEffect";
import { FontProvider } from "./contexts/FontContext";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <FontProvider>
        <GlobalStyle />
        <div className="App">
          <BackgroundDecoration />
          <Navbar />
          <AppRoutes />
        </div>
      </FontProvider>
    </ThemeProvider>
  );
};

export default App;
