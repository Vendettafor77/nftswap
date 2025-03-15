/**
 * @file useContract.js
 * @description 合約Hook，提供統一的合約訪問接口，整合交易狀態管理
 */

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useTransactionContext } from "../contexts/TransactionContext";
import { getNFTSwapContract, getERC721Contract } from "../utils/nftSwap";
import { TransactionType } from "../contexts/TransactionContext";
import nftSwapABI from "../abis/NFTSwapABI.json";
import erc721ABI from "../abis/ERC721ABI.json";
import venApeABI from "../abis/VenApeABI.json"; // 假設有這個ABI
import { getProvider, getSigner } from "../utils/contractUtils";

/**
 * @description 使用NFTSwap合約Hook
 * @param {boolean} [readOnly=false] - 是否為只讀模式
 * @returns {Object} 包含合約實例和操作方法的對象
 */
export const useNFTSwapContract = (readOnly = false) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { trackTransaction } = useTransactionContext();

  // 初始化合約
  useEffect(() => {
    let mounted = true;

    const initContract = async () => {
      try {
        setLoading(true);
        const contractInstance = await getNFTSwapContract(readOnly);

        if (mounted) {
          setContract(contractInstance);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          console.error("初始化NFTSwap合約錯誤:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initContract();

    return () => {
      mounted = false;
    };
  }, [readOnly]);

  // 上架NFT
  const listNFT = useCallback(
    async (nftAddr, tokenId, price, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 將價格轉換為wei
        const priceInWei = ethers.parseEther(price.toString());

        // 發送交易並跟蹤
        const tx = await contract.list(nftAddr, tokenId, priceInWei);

        const result = await trackTransaction(tx, {
          type: TransactionType.LIST,
          asset: { nftAddr, tokenId, price },
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("上架NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, trackTransaction]
  );

  // 購買NFT
  const purchaseNFT = useCallback(
    async (nftAddr, tokenId, price, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 將價格轉換為wei
        const priceInWei = ethers.parseEther(price.toString());

        // 發送交易並跟蹤
        const tx = await contract.purchase(nftAddr, tokenId, {
          value: priceInWei,
        });

        const result = await trackTransaction(tx, {
          type: TransactionType.BUY,
          asset: { nftAddr, tokenId, price },
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("購買NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, trackTransaction]
  );

  // 撤回NFT
  const revokeNFT = useCallback(
    async (nftAddr, tokenId, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 發送交易並跟蹤
        const tx = await contract.revoke(nftAddr, tokenId);

        const result = await trackTransaction(tx, {
          type: TransactionType.UNLIST,
          asset: { nftAddr, tokenId },
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("撤回NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, trackTransaction]
  );

  // 更新NFT價格
  const updateNFTPrice = useCallback(
    async (nftAddr, tokenId, newPrice, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 將價格轉換為wei
        const priceInWei = ethers.parseEther(newPrice.toString());

        // 發送交易並跟蹤
        const tx = await contract.update(nftAddr, tokenId, priceInWei);

        const result = await trackTransaction(tx, {
          type: TransactionType.OTHER,
          asset: { nftAddr, tokenId, price: newPrice },
          description: "NFT価格更新",
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("更新NFT價格錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, trackTransaction]
  );

  return {
    contract,
    loading,
    error,
    listNFT,
    purchaseNFT,
    revokeNFT,
    updateNFTPrice,
  };
};

/**
 * @description 使用ERC721合約Hook
 * @param {string} tokenAddress - 代幣合約地址
 * @param {boolean} [readOnly=false] - 是否為只讀模式
 * @returns {Object} 包含合約實例和操作方法的對象
 */
export const useERC721Contract = (tokenAddress, readOnly = false) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { trackTransaction } = useTransactionContext();

  // 初始化合約
  useEffect(() => {
    let mounted = true;

    const initContract = async () => {
      if (!tokenAddress) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const contractInstance = await getERC721Contract(
          tokenAddress,
          readOnly
        );

        if (mounted) {
          setContract(contractInstance);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          console.error("初始化ERC721合約錯誤:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initContract();

    return () => {
      mounted = false;
    };
  }, [tokenAddress, readOnly]);

  // 轉移NFT
  const transferNFT = useCallback(
    async (to, tokenId, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 發送交易並跟蹤
        const tx = await contract.transferFrom(
          await getSigner().getAddress(),
          to,
          tokenId
        );

        const result = await trackTransaction(tx, {
          type: TransactionType.TRANSFER,
          asset: { nftAddr: tokenAddress, tokenId, to },
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("轉移NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, tokenAddress, trackTransaction]
  );

  // 設置批准
  const approve = useCallback(
    async (to, tokenId, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 發送交易並跟蹤
        const tx = await contract.approve(to, tokenId);

        const result = await trackTransaction(tx, {
          type: TransactionType.APPROVE,
          asset: { nftAddr: tokenAddress, tokenId, to },
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("批准NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, tokenAddress, trackTransaction]
  );

  // 設置批量批准
  const setApprovalForAll = useCallback(
    async (operator, approved, options = {}) => {
      if (!contract) return { success: false, error: "合約未初始化" };

      try {
        // 發送交易並跟蹤
        const tx = await contract.setApprovalForAll(operator, approved);

        const result = await trackTransaction(tx, {
          type: TransactionType.APPROVE,
          description: approved ? "全てのNFTを承認" : "全てのNFT承認を取消",
          onSuccess: options.onSuccess,
          onFailed: options.onFailed,
        });

        return result;
      } catch (error) {
        console.error("批量批准NFT錯誤:", error);
        return { success: false, error };
      }
    },
    [contract, trackTransaction]
  );

  return {
    contract,
    loading,
    error,
    transferNFT,
    approve,
    setApprovalForAll,
  };
};

// 導出其他常用合約Hook
export default { useNFTSwapContract, useERC721Contract };
