// SPDX-License-Identifier: MIT
import { ethers } from "ethers";
import * as contractUtils from "./contractUtils";
import venApeABI from "../abis/VenAPEABI.json";

// VenAPE合約地址
const venApeAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // 本地Hardhat網絡地址

/**
 * @description 獲取 VenAPE 合約實例
 * @param {boolean} readOnly - 是否為只讀模式
 * @returns {Promise<ethers.Contract>} VenAPE合約實例
 */
export const getVenApeContract = async (readOnly = false) => {
  try {
    return await contractUtils.getContract(venApeAddress, venApeABI, readOnly);
  } catch (error) {
    console.error("獲取 VenAPE 合約失敗:", error);
    throw error;
  }
};

/**
 * @description 鑄造 VenAPE NFT
 * @param {string} to - 接收者地址
 * @param {number|string} tokenId - 代幣ID
 * @param {Object} options - 交易選項
 * @returns {Promise<Object>} 交易結果
 */
export const mintVenApe = async (to, tokenId, options = {}) => {
  try {
    const contract = await getVenApeContract();
    const tx = await contract.mint(to, tokenId, {
      ...options,
    });
    return {
      hash: tx.hash,
      wait: () => tx.wait(),
    };
  } catch (error) {
    console.error("鑄造 VenAPE 失敗:", error);
    throw error;
  }
};

/**
 * @description 獲取 VenAPE NFT 的元數據
 * @param {number|string} tokenId - 代幣ID
 * @returns {Promise<Object>} 元數據對象
 */
export const getVenApeMetadata = async (tokenId) => {
  try {
    // 這裡應該實現獲取元數據的邏輯
    // 可能需要從IPFS或其他存儲服務獲取
    return {
      name: `VenAPE #${tokenId}`,
      description: "VenAPE是一個獨特的藝術收藏品，擁有它將獲得社區特權。",
      image: `https://example.com/venape/${tokenId}.png`,
      attributes: [
        {
          trait_type: "背景",
          value: "藍色",
        },
        {
          trait_type: "皮膚",
          value: "金色",
        },
        {
          trait_type: "眼睛",
          value: "激光",
        },
        {
          trait_type: "服裝",
          value: "太空服",
        },
      ],
    };
  } catch (error) {
    console.error("獲取 VenAPE 元數據失敗:", error);
    throw error;
  }
};

/**
 * @description 獲取 VenAPE NFT 的擁有者歷史
 * @param {number|string} tokenId - 代幣ID
 * @returns {Promise<Array>} 擁有者歷史數組
 */
export const getVenApeOwnerHistory = async (tokenId) => {
  try {
    // 這裡應該實現獲取擁有者歷史的邏輯
    // 可能需要查詢過去的Transfer事件
    return [
      {
        owner: "0x1234567890123456789012345678901234567890",
        from: "0x0000000000000000000000000000000000000000",
        timestamp: Date.now() - 1000000,
      },
      {
        owner: "0x2345678901234567890123456789012345678901",
        from: "0x1234567890123456789012345678901234567890",
        timestamp: Date.now() - 500000,
      },
    ];
  } catch (error) {
    console.error("獲取 VenAPE 擁有者歷史失敗:", error);
    throw error;
  }
};

/**
 * @description 獲取可用的 VenAPE 代幣ID
 * @returns {Promise<Array>} 可用的代幣ID數組
 */
export const getAvailableTokenIds = async () => {
  try {
    // 這裡應該實現獲取可用代幣ID的邏輯
    // 可能需要查詢已經鑄造的代幣ID，然後返回未鑄造的ID
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  } catch (error) {
    console.error("獲取可用 VenAPE 代幣ID失敗:", error);
    throw error;
  }
};

/**
 * @description 使用元數據鑄造 VenAPE NFT
 * @param {string} to - 接收者地址
 * @param {number|string} tokenId - 代幣ID
 * @param {Object} metadata - 元數據對象
 * @param {Object} options - 交易選項
 * @returns {Promise<Object>} 交易結果
 */
export const mintVenApeWithMetadata = async (
  to,
  tokenId,
  metadata,
  options = {}
) => {
  try {
    // 這裡應該實現使用元數據鑄造NFT的邏輯
    // 可能需要先上傳元數據到IPFS，然後再鑄造NFT
    const tx = await mintVenApe(to, tokenId, options);
    return {
      hash: tx.hash,
      wait: () => tx.wait(),
      metadata,
    };
  } catch (error) {
    console.error("使用元數據鑄造 VenAPE 失敗:", error);
    throw error;
  }
};

export default {
  getVenApeContract,
  mintVenApe,
  getVenApeMetadata,
  getVenApeOwnerHistory,
  getAvailableTokenIds,
  mintVenApeWithMetadata,
};
