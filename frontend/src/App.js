import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import GlobalStyle from "./components/styled/GlobalStyle";
import GlobalScrollbarStyle from "./components/styled/GlobalScrollbarStyle";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import { BackgroundDecoration } from "./components/BackgroundEffect";
import { FontProvider } from "./contexts/FontContext";
import "./App.css";

/**
 * 應用程序主組件
 * @returns {JSX.Element} 應用程序界面
 */
const App = () => {
  // 使用行內樣式控制容器寬度
  const navbarContainerStyle = {
    width: "100%", // 擴展到全寬
    maxWidth: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0, // 延伸到最右側
    zIndex: 999,
    backgroundColor: "#1c2241",
    // 確保不遮擋滾動條
    boxSizing: "border-box",
  };

  return (
    <ThemeProvider theme={theme}>
      <FontProvider>
        <GlobalStyle />
        <GlobalScrollbarStyle />
        {/* 導航欄 */}
        <div className="navbar-container-wrapper" style={navbarContainerStyle}>
          <Navbar />
        </div>
        <div className="App">
          <BackgroundDecoration />
          <div className="app-content">
            <AppRoutes />
          </div>
        </div>
      </FontProvider>
    </ThemeProvider>
  );
};

export default App;
