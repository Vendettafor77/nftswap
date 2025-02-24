import React, { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import NFTCard from "./components/NFTCard";
import ListNFT from "./components/ListNFT";
import UpdateNFT from "./components/UpdateNFT";
import RevokeNFT from "./components/RevokeNFT";
import { getListedNFTs, mintWtfApe } from "./utils/nftSwap";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false); // 新增

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // 新增
      const data = await getListedNFTs("0x0165878A594ca255338adfa4d48449f69242Eb8F"); // 傳入 NFT 合約地址
      setNfts(data);
      setLoading(false); // 新增
    }
    fetchData();
  }, []);

  const handleMint = async () => {
    if (!walletAddress) {
      alert("ウォレットを接続してください");
      return;
    }
    setLoading(true); // 新增
    await mintWtfApe(walletAddress, 1); // 例として tokenId 1 を mint
    setLoading(false); // 新增
  };

  return (
    <div>
      <h1>NFT スワップ</h1>
      <WalletConnect setWalletAddress={setWalletAddress} />
      <button onClick={handleMint} disabled={loading}>WTFApe を Mint</button> {/* 新增 */}
      {loading && <p>処理中...</p>} {/* 新增 */}
      <ListNFT />
      <UpdateNFT />
      <RevokeNFT />
      <div>
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ))
        ) : (
          <p>現在、出品されているNFTはありません</p>
        )}
      </div>
    </div>
  );
}

export default App;