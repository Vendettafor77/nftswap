import { ethers } from "ethers";
import nftSwapABI from "../abis/NFTSwapABI.json";
import wtfApeABI from "../abis/WTFApeABI.json";

const nftSwapAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"; // 更新這裡
const wtfApeAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

export const getNftSwapContract = async () => {
  if (!window.ethereum) {
    alert("Metamaskをインストールしてください");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(nftSwapAddress, nftSwapABI, signer);
  return contract;
};

window.getNftSwapContract = getNftSwapContract;

export const getWtfApeContract = async () => {
  if (!window.ethereum) {
    alert("Metamaskをインストールしてください");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(wtfApeAddress, wtfApeABI, signer);
};

// 添加 mint 函数
export const mintWtfApe = async (to, tokenId) => {
  try {
    const contract = await getWtfApeContract();
    if (!contract) return false;
    await contract.mint(to, tokenId);
    return true;
  } catch (error) {
    console.error("Mint 失敗:", error);
    return false;
  }
};

// 添加 getListedNFTs 函数
export const getListedNFTs = async (nftAddr) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return [];

    // 調用合約的 getListedNFTs 函數
    const result = await contract.getListedNFTs(nftAddr);
    const [tokenIds, prices] = result;
    return tokenIds.map((tokenId, index) => ({
      tokenId: tokenId.toString(),
      price: prices[index].toString(),
    }));
  } catch (error) {
    console.error("NFT 取得失敗:", error);
    return [];
  }
};

// 添加 listNFT 函数
export const listNFT = async (nftAddr, tokenId, price) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return false;
    await contract.list(nftAddr, tokenId, price);
    return true;
  } catch (error) {
    console.error("NFT 上架失敗:", error);
    return false;
  }
};

// 添加 revokeNFT 函数
export const revokeNFT = async (nftAddr, tokenId) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return false;
    await contract.revoke(nftAddr, tokenId);
    return true;
  } catch (error) {
    console.error("NFT 撤銷失敗:", error);
    return false;
  }
};

// 添加 updateNFTPrice 函数
export const updateNFTPrice = async (nftAddr, tokenId, newPrice) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return false;
    await contract.update(nftAddr, tokenId, newPrice);
    return true;
  } catch (error) {
    console.error("NFT 価格更新失敗:", error);
    return false;
  }
};

// 添加購買NFT函數
export const purchaseNFT = async (nftAddr, tokenId, price) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return false;

    // 確保price是BigInt或字符串形式
    const tx = await contract.purchase(nftAddr, tokenId, {
      value: price, // 價格應已經是Wei格式
    });

    await tx.wait();
    return true;
  } catch (error) {
    console.error("NFT 購入失敗:", error);
    alert("NFT購入に失敗しました");
    return false;
  }
};
