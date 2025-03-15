/**
 * @file contractUtils.js
 * @description 合約交互基礎工具，提供共用功能
 */

import { ethers } from "ethers";

/**
 * @description 錯誤類型枚舉
 */
export const ErrorTypes = {
  WALLET_NOT_CONNECTED: "WALLET_NOT_CONNECTED",
  USER_REJECTED: "USER_REJECTED",
  NETWORK_ERROR: "NETWORK_ERROR",
  CONTRACT_ERROR: "CONTRACT_ERROR",
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};

/**
 * @description 交易狀態枚舉
 */
export const TransactionStatus = {
  PENDING: "PENDING",
  CONFIRMING: "CONFIRMING",
  CONFIRMED: "CONFIRMED",
  FAILED: "FAILED",
};

/**
 * @description 獲取 ethers v6 Provider 實例
 * @returns {Promise<ethers.BrowserProvider|null>} Provider 實例或 null
 */
export const getProvider = async () => {
  if (!window.ethereum) {
    console.error("未檢測到以太坊錢包");
    return null;
  }

  try {
    // ethers v6 使用 BrowserProvider 替代了 Web3Provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } catch (error) {
    console.error("獲取 Provider 失敗:", error);
    return null;
  }
};

/**
 * @description 獲取當前連接錢包的 Signer 實例
 * @returns {Promise<ethers.Signer|null>} Signer 實例或 null
 */
export const getSigner = async () => {
  try {
    const provider = await getProvider();
    if (!provider) return null;

    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error("獲取 Signer 失敗:", error);
    return null;
  }
};

/**
 * @description 獲取指定合約實例
 * @param {string} address - 合約地址
 * @param {Array} abi - 合約 ABI
 * @param {boolean} [readOnly=false] - 是否為只讀模式（不需要 Signer）
 * @returns {Promise<ethers.Contract|null>} 合約實例或 null
 */
export const getContract = async (address, abi, readOnly = false) => {
  try {
    if (readOnly) {
      const provider = await getProvider();
      if (!provider) return null;
      return new ethers.Contract(address, abi, provider);
    } else {
      const signer = await getSigner();
      if (!signer) return null;
      return new ethers.Contract(address, abi, signer);
    }
  } catch (error) {
    console.error("獲取合約實例失敗:", error);
    return null;
  }
};

/**
 * @description 統一處理合約交互錯誤
 * @param {Error} error - 錯誤對象
 * @returns {Object} 包含錯誤類型和本地化錯誤信息的對象
 */
export const handleContractError = (error) => {
  console.error("合約錯誤:", error);

  // 用戶拒絕交易
  if (
    error.code === "ACTION_REJECTED" ||
    (error.message && error.message.includes("user rejected"))
  ) {
    return {
      type: ErrorTypes.USER_REJECTED,
      message: "トランザクションがキャンセルされました",
      originalError: error,
    };
  }

  // 錢包未連接
  if (
    error.code === "UNSUPPORTED_OPERATION" ||
    (error.message && error.message.includes("no provider"))
  ) {
    return {
      type: ErrorTypes.WALLET_NOT_CONNECTED,
      message: "ウォレットが接続されていません",
      originalError: error,
    };
  }

  // 網絡錯誤
  if (
    error.code === "NETWORK_ERROR" ||
    (error.message && error.message.includes("network"))
  ) {
    return {
      type: ErrorTypes.NETWORK_ERROR,
      message: "ネットワークエラーが発生しました",
      originalError: error,
    };
  }

  // 合約錯誤
  if (
    error.code === "CALL_EXCEPTION" ||
    (error.message && error.message.includes("execution reverted"))
  ) {
    // 嘗試從錯誤信息中提取自定義錯誤信息
    let customMessage = "コントラクトエラーが発生しました";
    try {
      if (error.data) {
        customMessage = `コントラクトエラー: ${error.data}`;
      } else if (error.message && error.message.includes("reason:")) {
        const reason = error.message.split("reason:")[1].trim();
        customMessage = `コントラクトエラー: ${reason}`;
      }
    } catch (e) {
      // 解析錯誤，使用默認信息
    }

    return {
      type: ErrorTypes.CONTRACT_ERROR,
      message: customMessage,
      originalError: error,
    };
  }

  // 交易錯誤
  if (
    error.code === "TRANSACTION_REPLACED" ||
    (error.message && error.message.includes("transaction"))
  ) {
    return {
      type: ErrorTypes.TRANSACTION_ERROR,
      message: "トランザクションエラーが発生しました",
      originalError: error,
    };
  }

  // 未知錯誤
  return {
    type: ErrorTypes.UNKNOWN_ERROR,
    message: "予期せぬエラーが発生しました",
    originalError: error,
  };
};

/**
 * @description 格式化合約金額（wei 與 eth 的轉換）
 * @param {string|number|BigInt} amount - 金額（wei）
 * @param {string} [operation="fromWei"] - 操作類型：fromWei 或 toWei
 * @returns {string} 格式化後的金額
 */
export const formatContractAmount = (amount, operation = "fromWei") => {
  try {
    if (operation === "fromWei") {
      // 從 wei 轉換為 eth
      return ethers.formatEther(amount);
    } else if (operation === "toWei") {
      // 從 eth 轉換為 wei
      return ethers.parseEther(amount.toString());
    }
    return amount.toString();
  } catch (error) {
    console.error("格式化金額失敗:", error);
    return amount.toString();
  }
};

/**
 * @description 監聽交易狀態並提供回調
 * @param {ethers.TransactionResponse} tx - 交易響應對象
 * @param {Function} [statusCallback] - 狀態變更回調函數
 * @returns {Promise<{success: boolean, receipt: ethers.TransactionReceipt|null, error: Error|null}>}
 */
export const listenForTransaction = async (tx, statusCallback = null) => {
  try {
    if (!tx) {
      throw new Error("無效的交易對象");
    }

    // 交易已提交，等待確認
    if (statusCallback) {
      statusCallback({
        status: TransactionStatus.PENDING,
        txHash: tx.hash,
        message: "トランザクションが送信されました",
      });
    }

    // 等待交易被挖掘（1個確認）
    const receipt = await tx.wait(1);

    // 交易確認中
    if (statusCallback) {
      statusCallback({
        status: TransactionStatus.CONFIRMING,
        txHash: tx.hash,
        receipt,
        message: "トランザクションが確認中です",
      });
    }

    // 等待更多確認（可選）
    // const finalReceipt = await tx.wait(3);

    // 交易已確認
    if (statusCallback) {
      statusCallback({
        status: TransactionStatus.CONFIRMED,
        txHash: tx.hash,
        receipt,
        message: "トランザクションが確認されました",
      });
    }

    return {
      success: true,
      receipt,
      error: null,
    };
  } catch (error) {
    console.error("交易監聽失敗:", error);

    // 交易失敗
    if (statusCallback) {
      statusCallback({
        status: TransactionStatus.FAILED,
        txHash: tx?.hash,
        error,
        message: "トランザクションが失敗しました",
      });
    }

    return {
      success: false,
      receipt: null,
      error,
    };
  }
};

/**
 * @description 監聽合約事件
 * @param {ethers.Contract} contract - 合約實例
 * @param {string} eventName - 事件名稱
 * @param {Function} callback - 事件回調函數
 * @param {Object} [filter={}] - 事件過濾條件
 * @returns {Function} 取消監聽的函數
 */
export const listenForContractEvent = (
  contract,
  eventName,
  callback,
  filter = {}
) => {
  if (!contract || !eventName || !callback) {
    console.error("監聽事件參數無效");
    return () => {};
  }

  try {
    // 創建事件監聽器
    const listener = (...args) => {
      callback(...args);
    };

    // 添加事件監聽
    contract.on(eventName, listener);

    // 返回取消監聽的函數
    return () => {
      contract.off(eventName, listener);
    };
  } catch (error) {
    console.error(`監聽 ${eventName} 事件失敗:`, error);
    return () => {};
  }
};

/**
 * @description 獲取當前網絡 ID
 * @returns {Promise<number|null>} 網絡 ID 或 null
 */
export const getNetworkId = async () => {
  try {
    const provider = await getProvider();
    if (!provider) return null;

    const network = await provider.getNetwork();
    return Number(network.chainId);
  } catch (error) {
    console.error("獲取網絡 ID 失敗:", error);
    return null;
  }
};

/**
 * @description 獲取當前賬戶地址
 * @returns {Promise<string|null>} 賬戶地址或 null
 */
export const getAccount = async () => {
  try {
    const provider = await getProvider();
    if (!provider) return null;

    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0] || null;
  } catch (error) {
    console.error("獲取賬戶地址失敗:", error);
    return null;
  }
};

/**
 * @description 獲取賬戶餘額
 * @param {string} [address] - 賬戶地址，默認為當前連接的賬戶
 * @returns {Promise<string|null>} 格式化後的餘額（ETH）或 null
 */
export const getBalance = async (address) => {
  try {
    const provider = await getProvider();
    if (!provider) return null;

    const targetAddress = address || (await getAccount());
    if (!targetAddress) return null;

    const balance = await provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("獲取餘額失敗:", error);
    return null;
  }
};

/**
 * @description 檢查是否已授權 NFT 給指定合約
 * @param {ethers.Contract} nftContract - NFT 合約實例
 * @param {string} ownerAddress - NFT 擁有者地址
 * @param {string} operatorAddress - 操作者地址（通常是 NFTSwap 合約地址）
 * @returns {Promise<boolean>} 是否已授權
 */
export const isApprovedForAll = async (
  nftContract,
  ownerAddress,
  operatorAddress
) => {
  try {
    if (!nftContract || !ownerAddress || !operatorAddress) {
      return false;
    }

    const isApproved = await nftContract.isApprovedForAll(
      ownerAddress,
      operatorAddress
    );
    return isApproved;
  } catch (error) {
    console.error("檢查授權狀態失敗:", error);
    return false;
  }
};

/**
 * @description 授權 NFT 給指定合約
 * @param {ethers.Contract} nftContract - NFT 合約實例
 * @param {string} operatorAddress - 操作者地址（通常是 NFTSwap 合約地址）
 * @param {Function} [statusCallback] - 狀態變更回調函數
 * @returns {Promise<boolean>} 授權是否成功
 */
export const setApprovalForAll = async (
  nftContract,
  operatorAddress,
  statusCallback = null
) => {
  try {
    if (!nftContract || !operatorAddress) {
      return false;
    }

    const tx = await nftContract.setApprovalForAll(operatorAddress, true);
    const result = await listenForTransaction(tx, statusCallback);
    return result.success;
  } catch (error) {
    console.error("授權 NFT 失敗:", error);
    return false;
  }
};

export default {
  getProvider,
  getSigner,
  getContract,
  handleContractError,
  formatContractAmount,
  listenForTransaction,
  listenForContractEvent,
  getNetworkId,
  getAccount,
  getBalance,
  isApprovedForAll,
  setApprovalForAll,
  ErrorTypes,
  TransactionStatus,
};
