import React from "react";

// 全局共享的選中NFT狀態（使用useRef替代普通對象）
export const selectedNFTRef = React.createRef();

// 清除選中NFT的函數
export const clearSelectedNFT = () => {
  // 清空選中的NFT
  selectedNFTRef.current = null;

  // 觸發清除事件，通知所有監聽該事件的組件
  window.dispatchEvent(new CustomEvent("nft-cleared"));
};
