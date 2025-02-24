import React from 'react';

const NFTCard = ({ nft, buyNFT }) => {
  return (
    <div className="nft-card">
      <h3>{nft.name}</h3>
      <p>価格: {nft.price} ETH</p>
      <button onClick={() => buyNFT(nft.address, nft.tokenId)}>
        購入
      </button>
    </div>
  );
};

export default NFTCard;