// 文件路径：frontend/src/components/RevokeNFT.js
import React, { useState } from "react";
import { revokeNFT } from "../utils/nftSwap"; // 假设在 utils/nftSwap.js 中已实现

const RevokeNFT = () => {
  const [nftAddr, setNftAddr] = useState("");
  const [tokenId, setTokenId] = useState("");

  const handleRevoke = async () => {
    // 调用撤单函数
    await revokeNFT(nftAddr, tokenId);
  };

  return (
    <div>
      <h2>出品取消</h2>
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
      <button onClick={handleRevoke}>取消</button>
    </div>
  );
};

export default RevokeNFT;
