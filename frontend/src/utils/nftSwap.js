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
  console.log("Provider:", provider);
  const signer = await provider.getSigner();
  console.log("Signer:", signer);
  const contract = new ethers.Contract(nftSwapAddress, nftSwapABI, signer);
  console.log("Contract:", contract);
  console.log("nftSwapABI:", nftSwapABI);
  return contract;
};

window.getNftSwapContract = getNftSwapContract;

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
    const contract = await getWtfApeContract();
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

    // 如果需要調試，可使用下面這段代碼打印合約方法列表（ユーザー可見部分：デバッグ用）
    const functionNames = contract.interface.fragments
      .filter(fragment => fragment.type === 'function')
      .map(fragment => fragment.name);
    console.log("Contract methods:", functionNames);
    
    // 調用合約的 getListedNFTs 函數（ユーザー可見部分：NFT一覧取得）
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
    const contract = await getNftSwapContract();
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
    const contract = await getNftSwapContract();
    if (!contract) return;
    await contract.update(nftAddr, tokenId, newPrice);
    console.log("NFT 価格更新成功");
  } catch (error) {
    console.error("NFT 価格更新失敗:", error);
  }
  console.log("Contract:", contract);
  console.log("Contract methods:", contract.interface.getFunctionNames());
};

// 添加購買NFT函數
export const purchaseNFT = async (nftAddr, tokenId, price) => {
  try {
    const contract = await getNftSwapContract();
    if (!contract) return false;
    
    // 確保price是BigInt或字符串形式
    const tx = await contract.purchase(nftAddr, tokenId, {
      value: price  // 價格應已經是Wei格式
    });
    
    console.log("購入トランザクション送信:", tx.hash);
    await tx.wait();
    console.log("NFT 購入成功");
    return true;
  } catch (error) {
    console.error("NFT 購入失敗:", error);
    alert("NFT購入に失敗しました");
    return false;
  }
};