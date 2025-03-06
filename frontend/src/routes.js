import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MintWTFape from "./pages/MintWTFape/MintWTFape";
import MyNFTs from "./pages/MyNFTs/MyNFTs";

// 臨時頁面組件
const TempPage = ({ title }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>{title}</h2>
    <p>このページは開発中です</p>
  </div>
);

const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-nfts" element={<MyNFTs />} />
        <Route path="/history" element={<TempPage title="取引履歴" />} />
        <Route path="/mint-wtfape" element={<MintWTFape />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
