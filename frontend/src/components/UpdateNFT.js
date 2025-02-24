// 文件路径：frontend/src/components/UpdateNFT.js
import React, { useState } from "react";
import { updateNFTPrice } from "../utils/nftSwap"; // 假设在 utils/nftSwap.js 中已实现

const UpdateNFT = () => {
  const [nftAddr, setNftAddr] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleUpdate = async () => {
    // 调用更新价格的函数
    await updateNFTPrice(nftAddr, tokenId, newPrice);
  };

  return (
    <div>
      <h2>価格更新</h2>
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
        placeholder="新しい価格（ETH）"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
};

export default UpdateNFT;
