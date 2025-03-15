/**
 * @file nftSwap.js
 * @description NFTSwap 合約的交互中間層，基於 ethers v6
 */

import { ethers } from "ethers";
import nftSwapABI from "../abis/NFTSwapABI.json";
import erc721ABI from "../abis/ERC721ABI.json";
import contractUtils from "./contractUtils";
import * as venApeFunctions from "./venApeFunctions";

// 合約地址
const nftSwapAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 本地Hardhat網絡地址

/**
 * @description 獲取 NFTSwap 合約實例
 * @param {boolean} [readOnly=false] - 是否為只讀模式
 * @returns {Promise<ethers.Contract|null>} 合約實例或 null
 */
export const getNFTSwapContract = async (readOnly = false) => {
  try {
    return await contractUtils.getContract(
      nftSwapAddress,
      nftSwapABI,
      readOnly
    );
  } catch (error) {
    console.error("獲取 NFTSwap 合約失敗:", error);
    throw error;
  }
};

/**
 * @description 獲取 ERC721 合約實例
 * @param {string} nftAddress - NFT 合約地址
 * @param {boolean} [readOnly=false] - 是否為只讀模式
 * @returns {Promise<ethers.Contract|null>} 合約實例或 null
 */
export const getERC721Contract = async (nftAddress, readOnly = false) => {
  try {
    return await contractUtils.getContract(nftAddress, erc721ABI, readOnly);
  } catch (error) {
    console.error("獲取 ERC721 合約失敗:", error);
    throw error;
  }
};

/**
 * @description 獲取上架的 NFT 列表
 * @param {string} nftAddr - NFT 合約地址
 * @returns {Promise<Array>} 上架的 NFT 列表
 */
export const getListedNFTs = async (nftAddr) => {
  try {
    const contract = await getNFTSwapContract(true);
    if (!contract) return [];

    // 調用合約的 getListedNFTs 函數
    const result = await contract.getListedNFTs(nftAddr);

    // ethers v6 中，結果不再是數組，而是對象，需要解構
    const tokenIds = result[0];
    const prices = result[1];
    const sellers = result[2]; // 假設合約返回賣家地址

    return tokenIds.map((tokenId, index) => ({
      tokenId: tokenId.toString(),
      price: prices[index].toString(),
      seller: sellers[index],
    }));
  } catch (error) {
    console.error("獲取上架 NFT 列表失敗:", error);
    return [];
  }
};

/**
 * @description 上架 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {number|string} tokenId - 代幣 ID
 * @param {string|number|BigInt} price - 價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const listNFT = async (nftAddr, tokenId, price, options = {}) => {
  try {
    // 檢查是否已授權
    const nftContract = await getERC721Contract(nftAddr);
    if (!nftContract) return false;

    const account = await contractUtils.getAccount();
    if (!account) return false;

    const isApproved = await contractUtils.isApprovedForAll(
      nftContract,
      account,
      nftSwapAddress
    );
    if (!isApproved) {
      if (options.statusCallback) {
        options.statusCallback({
          status: "APPROVING",
          message: "NFTの承認が必要です",
        });
      }

      const approvalSuccess = await contractUtils.setApprovalForAll(
        nftContract,
        nftSwapAddress,
        options.statusCallback
      );

      if (!approvalSuccess) {
        return false;
      }
    }

    // 上架 NFT
    const contract = await getNFTSwapContract();
    if (!contract) return false;

    // 將價格轉換為 wei
    const priceInWei = contractUtils.formatContractAmount(price, "toWei");

    const tx = await contract.list(nftAddr, tokenId, priceInWei);
    const result = await contractUtils.listenForTransaction(
      tx,
      options.statusCallback
    );
    return result.success;
  } catch (error) {
    console.error("上架 NFT 失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 撤回上架的 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {number|string} tokenId - 代幣 ID
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const revokeNFT = async (nftAddr, tokenId, options = {}) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return false;

    const tx = await contract.revoke(nftAddr, tokenId);
    const result = await contractUtils.listenForTransaction(
      tx,
      options.statusCallback
    );
    return result.success;
  } catch (error) {
    console.error("撤回 NFT 失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 更新 NFT 價格
 * @param {string} nftAddr - NFT 合約地址
 * @param {number|string} tokenId - 代幣 ID
 * @param {string|number|BigInt} newPrice - 新價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const updateNFTPrice = async (
  nftAddr,
  tokenId,
  newPrice,
  options = {}
) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return false;

    // 將價格轉換為 wei
    const priceInWei = contractUtils.formatContractAmount(newPrice, "toWei");

    const tx = await contract.update(nftAddr, tokenId, priceInWei);
    const result = await contractUtils.listenForTransaction(
      tx,
      options.statusCallback
    );
    return result.success;
  } catch (error) {
    console.error("更新 NFT 價格失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 購買 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {number|string} tokenId - 代幣 ID
 * @param {string|number|BigInt} price - 價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const purchaseNFT = async (nftAddr, tokenId, price, options = {}) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return false;

    // 將價格轉換為 wei
    const priceInWei = contractUtils.formatContractAmount(price, "toWei");

    const tx = await contract.purchase(nftAddr, tokenId, {
      value: priceInWei,
    });

    const result = await contractUtils.listenForTransaction(
      tx,
      options.statusCallback
    );
    return result.success;
  } catch (error) {
    console.error("購買 NFT 失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 批量上架 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {Array<number|string>} tokenIds - 代幣 ID 數組
 * @param {Array<string|number|BigInt>} prices - 價格數組（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const batchListNFTs = async (
  nftAddr,
  tokenIds,
  prices,
  options = {}
) => {
  try {
    if (!tokenIds.length || tokenIds.length !== prices.length) {
      throw new Error("無效的參數");
    }

    // 檢查是否已授權
    const nftContract = await getERC721Contract(nftAddr);
    if (!nftContract) return false;

    const account = await contractUtils.getAccount();
    if (!account) return false;

    const isApproved = await contractUtils.isApprovedForAll(
      nftContract,
      account,
      nftSwapAddress
    );
    if (!isApproved) {
      if (options.statusCallback) {
        options.statusCallback({
          status: "APPROVING",
          message: "NFTの承認が必要です",
        });
      }

      const approvalSuccess = await contractUtils.setApprovalForAll(
        nftContract,
        nftSwapAddress,
        options.statusCallback
      );

      if (!approvalSuccess) {
        return false;
      }
    }

    // 批量上架 NFT
    let successCount = 0;

    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];
      const price = prices[i];

      if (options.statusCallback) {
        options.statusCallback({
          status: "PROCESSING",
          current: i + 1,
          total: tokenIds.length,
          message: `NFTを出品中 (${i + 1}/${tokenIds.length})`,
        });
      }

      const success = await listNFT(nftAddr, tokenId, price, {
        statusCallback: (status) => {
          if (options.statusCallback) {
            options.statusCallback({
              ...status,
              current: i + 1,
              total: tokenIds.length,
            });
          }
        },
      });

      if (success) {
        successCount++;
      }
    }

    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.CONFIRMED,
        successCount,
        totalCount: tokenIds.length,
        message: `${successCount}/${tokenIds.length} NFTが出品されました`,
      });
    }

    return successCount > 0;
  } catch (error) {
    console.error("批量上架 NFT 失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 批量轉移 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {Array<number|string>} tokenIds - 代幣 ID 數組
 * @param {string} to - 接收者地址
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<boolean>} 是否成功
 */
export const batchTransferNFTs = async (
  nftAddr,
  tokenIds,
  to,
  options = {}
) => {
  try {
    if (!tokenIds.length || !to) {
      throw new Error("無效的參數");
    }

    const nftContract = await getERC721Contract(nftAddr);
    if (!nftContract) return false;

    let successCount = 0;

    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];

      if (options.statusCallback) {
        options.statusCallback({
          status: "PROCESSING",
          current: i + 1,
          total: tokenIds.length,
          message: `NFTを転送中 (${i + 1}/${tokenIds.length})`,
        });
      }

      try {
        const tx = await nftContract.transferFrom(
          await contractUtils.getAccount(),
          to,
          tokenId
        );
        const result = await contractUtils.listenForTransaction(
          tx,
          (status) => {
            if (options.statusCallback) {
              options.statusCallback({
                ...status,
                current: i + 1,
                total: tokenIds.length,
              });
            }
          }
        );

        if (result.success) {
          successCount++;
        }
      } catch (error) {
        console.error(`轉移 NFT ${tokenId} 失敗:`, error);
      }
    }

    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.CONFIRMED,
        successCount,
        totalCount: tokenIds.length,
        message: `${successCount}/${tokenIds.length} NFTが転送されました`,
      });
    }

    return successCount > 0;
  } catch (error) {
    console.error("批量轉移 NFT 失敗:", error);
    const errorInfo = contractUtils.handleContractError(error);
    if (options.statusCallback) {
      options.statusCallback({
        status: contractUtils.TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }
    return false;
  }
};

/**
 * @description 獲取用戶擁有的 NFT
 * @param {string} nftAddr - NFT 合約地址
 * @param {string} [owner] - 擁有者地址，默認為當前連接的賬戶
 * @returns {Promise<Array>} 用戶擁有的 NFT 列表
 */
export const getUserNFTs = async (nftAddr, owner) => {
  try {
    const nftContract = await getERC721Contract(nftAddr, true);
    if (!nftContract) return [];

    const ownerAddress = owner || (await contractUtils.getAccount());
    if (!ownerAddress) return [];

    // 獲取餘額
    const balance = await nftContract.balanceOf(ownerAddress);
    const tokenCount = Number(balance);

    const nfts = [];

    // 獲取每個 NFT 的 tokenId
    for (let i = 0; i < tokenCount; i++) {
      try {
        const tokenId = await nftContract.tokenOfOwnerByIndex(ownerAddress, i);
        nfts.push({
          tokenId: tokenId.toString(),
          contractAddress: nftAddr,
        });
      } catch (error) {
        console.error(`獲取 NFT ${i} 失敗:`, error);
      }
    }

    return nfts;
  } catch (error) {
    console.error("獲取用戶 NFT 失敗:", error);
    return [];
  }
};

/**
 * @description 設置事件監聽
 * @param {string} eventName - 事件名稱
 * @param {Function} callback - 回調函數
 * @returns {Function} 取消監聽的函數
 */
export const listenForEvent = async (eventName, callback) => {
  try {
    const contract = await getNFTSwapContract(true);
    if (!contract) return () => {};

    return contractUtils.listenForContractEvent(contract, eventName, callback);
  } catch (error) {
    console.error(`設置 ${eventName} 事件監聽失敗:`, error);
    return () => {};
  }
};

// 導出 venApeFunctions 中的函數
export const {
  getVenApeContract,
  mintVenApe,
  getVenApeMetadata,
  getVenApeOwnerHistory,
  getAvailableTokenIds,
  mintVenApeWithMetadata,
} = venApeFunctions;

export default {
  getNFTSwapContract,
  getERC721Contract,
  getListedNFTs,
  listNFT,
  revokeNFT,
  updateNFTPrice,
  purchaseNFT,
  batchListNFTs,
  batchTransferNFTs,
  getUserNFTs,
  listenForEvent,
};
