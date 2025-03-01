import React, { useState, useEffect } from "react";
import "./App.css";
import WalletConnect from "./components/WalletConnect";
import NFTCard from "./components/NFTCard";
import ListNFT from "./components/ListNFT";
import UpdateNFT from "./components/UpdateNFT";
import RevokeNFT from "./components/RevokeNFT";
import { getListedNFTs, mintWtfApe, purchaseNFT } from "./utils/nftSwap";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false); // 新增

  const handleBuyNFT = async (nftAddr, tokenId, price) => {
    if (!walletAddress) {
      alert("ウォレットを接続してください");
      return;
    }
    
    setLoading(true);
    const success = await purchaseNFT(nftAddr, tokenId, price);
    if (success) {
      // 刷新NFT列表
      const data = await getListedNFTs("0x0165878A594ca255338adfa4d48449f69242Eb8F");
      setNfts(data);
    }
    setLoading(false);
  };
  
  return (
    <div>
      {/* 現有元素... */}
      <div>
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <NFTCard 
              key={index} 
              nft={nft} 
              buyNFT={handleBuyNFT} 
            />
          ))
        ) : (
          <p>現在、出品されているNFTはありません</p>
        )}
      </div>
    </div>
  );
  return (
    <div className="app-container">
      <h1>NFT スワップ</h1>
      <div className="wallet-section">
        <WalletConnect setWalletAddress={setWalletAddress} />
        <button onClick={handleMint} disabled={loading || !walletAddress}>
          WTFApe を Mint
        </button>
      </div>
      {loading && <p className="loading">処理中...</p>}
      
      <div className="form-section">
        <ListNFT />
      </div>
      
      <div className="form-section">
        <UpdateNFT />
      </div>
      
      <div className="form-section">
        <RevokeNFT />
      </div>
      
      <h2>出品中のNFT</h2>
      <div className="nft-grid">
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <NFTCard key={index} nft={nft} buyNFT={handleBuyNFT} />
          ))
        ) : (
          <p>現在、出品されているNFTはありません</p>
        )}
      </div>
    </div>
  );
}
export default App;