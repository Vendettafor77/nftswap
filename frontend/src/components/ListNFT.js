import React, { useState } from "react";
import { listNFT } from "../utils/nftSwap";

const ListNFT = () => {
  const [nftAddr, setNftAddr] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div>
      <h2>NFTを出品</h2>
      <input
        type="text"
        placeholder="NFTアドレス"
        value={nftAddr}
        onChange={(e) => setNftAddr(e.target.value)}
      />
      <input
        type="text"
        placeholder="トークンID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="価格（ETH）"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={() => listNFT(nftAddr, tokenId, price)}>出品</button>
    </div>
  );
};

export default ListNFT;
