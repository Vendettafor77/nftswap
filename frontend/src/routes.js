import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MintWTFape from "./pages/MintWTFape/MintWTFape";
import MyNFTs from "./pages/MyNFTs/MyNFTs";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import IPFSExample from "./components/IPFSExample";

const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-nfts" element={<MyNFTs />} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/mint-wtfape" element={<MintWTFape />} />
        <Route path="/ipfs-example" element={<IPFSExample />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
