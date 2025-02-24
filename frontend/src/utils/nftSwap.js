import { ethers } from "ethers";
import nftSwapABI from "../abis/NFTSwapABI.json";
import wtfApeABI from "../abis/WTFApeABI.json";

const nftSwapAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"; // 更新這裡
const wtfApeAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

export const getNftSwapContract = () => {
  if (!window.ethereum) {
    alert("Metamaskをインストールしてください");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(nftSwapAddress, nftSwapABI, signer);
};

export const getWtfApeContract = () => {
  if (!window.ethereum) {
    alert("Metamaskをインストールしてください");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(wtfApeAddress, wtfApeABI, signer);
};

// 添加 mint 函数
export const mintWtfApe = async (to, tokenId) => {
  try {
    const contract = getWtfApeContract();
    if (!contract) return;
    await contract.mint(to, tokenId);
    console.log("Mint 成功");
  } catch (error) {
    console.error("Mint 失敗:", error);
  }
};

// 添加 getListedNFTs 函数
export const getListedNFTs = async (nftAddr) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return [];
    console.log("Contract methods:", Object.keys(contract.interface.functions));
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
    const contract = getNftSwapContract();
    if (!contract) return;
    await contract.list(nftAddr, tokenId, price);
    console.log("NFT 上架成功");
  } catch (error) {
    console.error("NFT 上架失敗:", error);
  }
};

// 添加 revokeNFT 函数
export const revokeNFT = async (nftAddr, tokenId) => {
  try {
    const contract = getNftSwapContract();
    if (!contract) return;
    await contract.revoke(nftAddr, tokenId);
    console.log("NFT 撤銷成功");
  } catch (error) {
    console.error("NFT 撤銷失敗:", error);
  }
};

// 添加 updateNFTPrice 函数
export const updateNFTPrice = async (nftAddr, tokenId, newPrice) => {
  try {
    const contract = getNftSwapContract();
    if (!contract) return;
    await contract.update(nftAddr, tokenId, newPrice);
    console.log("NFT 価格更新成功");
  } catch (error) {
    console.error("NFT 価格更新失敗:", error);
  }
  console.log("Contract:", contract);
  console.log("Contract methods:", Object.keys(contract.interface.functions));
};
