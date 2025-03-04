import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";

// 导入主题和全局样式
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

// 导入组件
import Navbar from "./components/Navbar/Navbar";

// 导入页面
import Home from "./pages/Home/Home";
import MintWTFape from "./pages/MintWTFape/MintWTFape";
import MyWTFapes from "./pages/MyWTFapes/MyWTFapes";
import MyNFTs from "./pages/MyNFTs/MyNFTs";
import ListNFT from "./pages/ListNFT/ListNFT";

// 临时页面组件 - 在完整实现前使用
const TempPage = ({ title }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>{title}</h2>
    <p>このページは開発中です</p>
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-nfts" element={<MyNFTs />} />
              <Route path="/list-nft" element={<ListNFT />} />
              <Route path="/history" element={<TempPage title="取引履歴" />} />
              <Route path="/mint-wtfape" element={<MintWTFape />} />
              <Route path="/my-wtfapes" element={<MyWTFapes />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
