import React from "react";

const NFTCard = ({ nft, buyNFT }) => {
    return (
        <div>
            <p>NFTアドレス: {nft.nftAddr}</p>
            <p>トークンID: {nft.tokenId}</p>
            <p>価格: {nft.price} ETH</p>
            <button onClick={() => buyNFT(nft.nftAddr, nft.tokenId, nft.price)}>購入</button>
        </div>
    );
};

export default NFTCard;
