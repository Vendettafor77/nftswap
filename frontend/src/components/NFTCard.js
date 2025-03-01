import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const NFTCard = ({ nft, buyNFT }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 嘗試從IPFS獲取NFT圖片
  const imageUrl = `https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${nft.tokenId}`;
  
  // 格式化價格從Wei到ETH
  const formattedPrice = ethers.formatEther(nft.price);
  
  return (
    <div className="nft-card">
      {!imageError ? (
        <img 
          src={imageUrl} 
          alt={`NFT #${nft.tokenId}`} 
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ 
            width: "100%", 
            display: imageLoaded ? "block" : "none" 
          }}
        />
      ) : (
        <div className="image-placeholder">
          <p>NFT #{nft.tokenId}</p>
        </div>
      )}
      
      <div className="nft-info">
        <p>トークンID: {nft.tokenId}</p>
        <p>価格: {formattedPrice} ETH</p>
        <button onClick={() => buyNFT(nft.nftAddr, nft.tokenId, nft.price)}>
          購入
        </button>
      </div>
    </div>
  );
};

export default NFTCard;