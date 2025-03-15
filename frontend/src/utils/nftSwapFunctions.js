/**
 * @file nftSwapFunctions.js
 * @description NFTSwap合約函數封裝，提供完整合約操作封裝
 */

import { ethers } from "ethers";
import { getNFTSwapContract, getERC721Contract } from "./nftSwap";
import {
  formatContractAmount,
  listenForTransaction,
  handleContractError,
  TransactionStatus,
} from "./contractUtils";

/**
 * @description 獲取上架的NFT列表
 * @param {string} nftAddr - NFT合約地址
 * @param {Object} [options={}] - 選項
 * @returns {Promise<Array>} 上架的NFT列表
 */
export const getListedNFTs = async (nftAddr, options = {}) => {
  try {
    const contract = await getNFTSwapContract(true);
    if (!contract) return [];

    // 調用合約的getListedNFTs函數
    const result = await contract.getListedNFTs(nftAddr);

    // 解構結果
    const tokenIds = result[0] || [];
    const prices = result[1] || [];
    const sellers = result[2] || [];

    return tokenIds.map((tokenId, index) => ({
      tokenId: tokenId.toString(),
      price: prices[index].toString(),
      seller: sellers[index],
      formattedPrice: formatContractAmount(prices[index], "fromWei"),
    }));
  } catch (error) {
    console.error("獲取上架NFT列表失敗:", error);
    return [];
  }
};

/**
 * @description 獲取用戶上架的NFT列表
 * @param {string} userAddress - 用戶地址
 * @param {string} nftAddr - NFT合約地址
 * @param {Object} [options={}] - 選項
 * @returns {Promise<Array>} 用戶上架的NFT列表
 */
export const getUserListedNFTs = async (userAddress, nftAddr, options = {}) => {
  try {
    const contract = await getNFTSwapContract(true);
    if (!contract) return [];

    // 調用合約的getUserListedNFTs函數
    const result = await contract.getUserListedNFTs(userAddress, nftAddr);

    // 解構結果
    const tokenIds = result[0] || [];
    const prices = result[1] || [];

    return tokenIds.map((tokenId, index) => ({
      tokenId: tokenId.toString(),
      price: prices[index].toString(),
      seller: userAddress,
      formattedPrice: formatContractAmount(prices[index], "fromWei"),
    }));
  } catch (error) {
    console.error("獲取用戶上架NFT列表失敗:", error);
    return [];
  }
};

/**
 * @description 上架NFT
 * @param {string} nftAddr - NFT合約地址
 * @param {number|string} tokenId - 代幣ID
 * @param {string|number|BigInt} price - 價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<{success: boolean, receipt: Object|null, error: Error|null}>} 交易結果
 */
export const listNFT = async (nftAddr, tokenId, price, options = {}) => {
  try {
    // 檢查是否已授權
    const nftContract = await getERC721Contract(nftAddr);
    if (!nftContract) return { success: false, error: "無法獲取NFT合約" };

    // 獲取用戶地址
    const signer = await nftContract.signer;
    const account = await signer.getAddress();

    // 檢查是否已經授權NFTSwap合約操作
    const isApproved = await nftContract.isApprovedForAll(
      account,
      getNFTSwapContract.address
    );

    // 如果未授權，先請求授權
    if (!isApproved) {
      if (options.statusCallback) {
        options.statusCallback({
          status: "APPROVING",
          message: "NFTの承認が必要です",
        });
      }

      try {
        const approveTx = await nftContract.setApprovalForAll(
          getNFTSwapContract.address,
          true
        );

        const approveResult = await listenForTransaction(
          approveTx,
          options.statusCallback
        );

        if (!approveResult.success) {
          return {
            success: false,
            error: new Error("NFT授權失敗"),
            receipt: approveResult.receipt,
          };
        }
      } catch (approveError) {
        console.error("NFT授權失敗:", approveError);
        return {
          success: false,
          error: approveError,
        };
      }
    }

    // 上架NFT
    const contract = await getNFTSwapContract();
    if (!contract) return { success: false, error: "無法獲取NFTSwap合約" };

    // 將價格轉換為wei
    const priceInWei = ethers.parseEther(price.toString());

    // 發送交易
    const tx = await contract.list(nftAddr, tokenId, priceInWei);

    // 監聽交易狀態
    return await listenForTransaction(tx, options.statusCallback);
  } catch (error) {
    console.error("上架NFT失敗:", error);
    const errorInfo = handleContractError(error);

    if (options.statusCallback) {
      options.statusCallback({
        status: TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }

    return { success: false, error: errorInfo };
  }
};

/**
 * @description 撤回上架的NFT
 * @param {string} nftAddr - NFT合約地址
 * @param {number|string} tokenId - 代幣ID
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<{success: boolean, receipt: Object|null, error: Error|null}>} 交易結果
 */
export const revokeNFT = async (nftAddr, tokenId, options = {}) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return { success: false, error: "無法獲取NFTSwap合約" };

    // 發送交易
    const tx = await contract.revoke(nftAddr, tokenId);

    // 監聽交易狀態
    return await listenForTransaction(tx, options.statusCallback);
  } catch (error) {
    console.error("撤回NFT失敗:", error);
    const errorInfo = handleContractError(error);

    if (options.statusCallback) {
      options.statusCallback({
        status: TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }

    return { success: false, error: errorInfo };
  }
};

/**
 * @description 更新NFT價格
 * @param {string} nftAddr - NFT合約地址
 * @param {number|string} tokenId - 代幣ID
 * @param {string|number|BigInt} newPrice - 新價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<{success: boolean, receipt: Object|null, error: Error|null}>} 交易結果
 */
export const updateNFTPrice = async (
  nftAddr,
  tokenId,
  newPrice,
  options = {}
) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return { success: false, error: "無法獲取NFTSwap合約" };

    // 將價格轉換為wei
    const priceInWei = ethers.parseEther(newPrice.toString());

    // 發送交易
    const tx = await contract.update(nftAddr, tokenId, priceInWei);

    // 監聽交易狀態
    return await listenForTransaction(tx, options.statusCallback);
  } catch (error) {
    console.error("更新NFT價格失敗:", error);
    const errorInfo = handleContractError(error);

    if (options.statusCallback) {
      options.statusCallback({
        status: TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }

    return { success: false, error: errorInfo };
  }
};

/**
 * @description 購買NFT
 * @param {string} nftAddr - NFT合約地址
 * @param {number|string} tokenId - 代幣ID
 * @param {string|number|BigInt} price - 價格（ETH）
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @returns {Promise<{success: boolean, receipt: Object|null, error: Error|null}>} 交易結果
 */
export const purchaseNFT = async (nftAddr, tokenId, price, options = {}) => {
  try {
    const contract = await getNFTSwapContract();
    if (!contract) return { success: false, error: "無法獲取NFTSwap合約" };

    // 將價格轉換為wei
    const priceInWei = ethers.parseEther(price.toString());

    // 發送交易
    const tx = await contract.purchase(nftAddr, tokenId, {
      value: priceInWei,
    });

    // 監聽交易狀態
    return await listenForTransaction(tx, options.statusCallback);
  } catch (error) {
    console.error("購買NFT失敗:", error);
    const errorInfo = handleContractError(error);

    if (options.statusCallback) {
      options.statusCallback({
        status: TransactionStatus.FAILED,
        error: errorInfo,
        message: errorInfo.message,
      });
    }

    return { success: false, error: errorInfo };
  }
};

/**
 * @description 獲取NFT詳情
 * @param {string} nftAddr - NFT合約地址
 * @param {number|string} tokenId - 代幣ID
 * @returns {Promise<Object|null>} NFT詳情
 */
export const getNFTDetails = async (nftAddr, tokenId) => {
  try {
    const nftContract = await getERC721Contract(nftAddr, true);
    if (!nftContract) return null;

    // 獲取擁有者
    const owner = await nftContract.ownerOf(tokenId);

    // 獲取標記URI
    let tokenURI = null;
    try {
      tokenURI = await nftContract.tokenURI(tokenId);
    } catch (e) {
      console.warn("無法獲取tokenURI:", e);
    }

    // 獲取上架信息
    const swapContract = await getNFTSwapContract(true);
    let listingInfo = null;

    try {
      const isListed = await swapContract.isListed(nftAddr, tokenId);
      if (isListed) {
        const price = await swapContract.getPrice(nftAddr, tokenId);
        const seller = await swapContract.getSeller(nftAddr, tokenId);

        listingInfo = {
          isListed: true,
          price: price.toString(),
          formattedPrice: formatContractAmount(price, "fromWei"),
          seller,
        };
      } else {
        listingInfo = { isListed: false };
      }
    } catch (e) {
      console.warn("無法獲取上架信息:", e);
      listingInfo = { isListed: false, error: e.message };
    }

    return {
      tokenId: tokenId.toString(),
      owner,
      tokenURI,
      nftAddr,
      listing: listingInfo,
    };
  } catch (error) {
    console.error("獲取NFT詳情失敗:", error);
    return null;
  }
};

/**
 * @description 批量上架NFT
 * @param {string} nftAddr - NFT合約地址
 * @param {Array<{tokenId: string|number, price: string|number|BigInt}>} items - 要上架的NFT列表
 * @param {Object} [options={}] - 選項
 * @param {Function} [options.statusCallback] - 狀態回調函數
 * @param {Function} [options.progressCallback] - 進度回調函數
 * @returns {Promise<{success: boolean, results: Array, errors: Array}>} 批量操作結果
 */
export const batchListNFTs = async (nftAddr, items, options = {}) => {
  if (!items || !items.length) {
    return { success: false, results: [], errors: ["沒有要上架的NFT"] };
  }

  const results = [];
  const errors = [];
  let successCount = 0;

  // 檢查並授權NFT合約
  try {
    const nftContract = await getERC721Contract(nftAddr);
    if (!nftContract) throw new Error("無法獲取NFT合約");

    const signer = await nftContract.signer;
    const account = await signer.getAddress();

    const isApproved = await nftContract.isApprovedForAll(
      account,
      getNFTSwapContract.address
    );

    if (!isApproved) {
      if (options.statusCallback) {
        options.statusCallback({
          status: "APPROVING",
          message: "批量上架前需要授權NFT",
        });
      }

      const approveTx = await nftContract.setApprovalForAll(
        getNFTSwapContract.address,
        true
      );

      const approveResult = await listenForTransaction(
        approveTx,
        options.statusCallback
      );

      if (!approveResult.success) {
        return {
          success: false,
          results: [],
          errors: ["NFT授權失敗"],
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      results: [],
      errors: ["準備批量上架失敗: " + error.message],
    };
  }

  // 逐個上架NFT
  for (let i = 0; i < items.length; i++) {
    const { tokenId, price } = items[i];

    if (options.progressCallback) {
      options.progressCallback(i, items.length);
    }

    try {
      const result = await listNFT(nftAddr, tokenId, price, {
        statusCallback: (status) => {
          if (options.statusCallback) {
            options.statusCallback({
              ...status,
              current: i + 1,
              total: items.length,
              tokenId,
            });
          }
        },
      });

      results.push({ tokenId, result });

      if (result.success) {
        successCount++;
      } else {
        errors.push(
          `TokenID ${tokenId} 上架失敗: ${result.error?.message || "未知錯誤"}`
        );
      }
    } catch (error) {
      results.push({ tokenId, result: { success: false, error } });
      errors.push(`TokenID ${tokenId} 上架失敗: ${error.message}`);
    }
  }

  return {
    success: successCount > 0,
    results,
    errors,
    successCount,
    totalCount: items.length,
  };
};

// 導出其他批量操作函數
export const batchRevokeNFTs = async (nftAddr, tokenIds, options = {}) => {
  // 實現批量撤回NFT的邏輯
  // 類似batchListNFTs的實現
};

export const batchUpdateNFTPrices = async (nftAddr, items, options = {}) => {
  // 實現批量更新NFT價格的邏輯
  // 類似batchListNFTs的實現
};

// 導出所有功能函數
export default {
  getListedNFTs,
  getUserListedNFTs,
  listNFT,
  revokeNFT,
  updateNFTPrice,
  purchaseNFT,
  getNFTDetails,
  batchListNFTs,
  batchRevokeNFTs,
  batchUpdateNFTPrices,
};
