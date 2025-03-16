import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers } from "ethers";
import {
  connectWallet,
  disconnectWallet,
  getWalletProvider,
  getWalletAddress,
  addBscTestnet,
} from "../utils/walletUtils";
import { useNotification } from "./NotificationContext";

/**
 * 錢包上下文
 * @typedef {Object} WalletContextType
 * @property {string|null} account - 連接的錢包地址
 * @property {ethers.providers.Provider|null} provider - ethers提供者
 * @property {Function} connect - 連接錢包函數
 * @property {Function} disconnect - 斷開錢包連接函數
 * @property {boolean} isConnecting - 是否正在連接中
 * @property {string|null} chainId - 當前連接的鏈ID
 * @property {boolean} isConnected - 是否已連接錢包
 * @property {Function} switchChain - 切換網絡函數
 * @property {string} walletType - 使用的錢包類型 ('metamask' | 'walletconnect' | null)
 * @property {Function} switchToBscTestnet - 切換到BSC測試網函數
 */

// BSC測試網的ChainId
const BSC_TESTNET_CHAIN_ID = "97";
const BSC_TESTNET_CHAIN_ID_HEX = "0x61"; // 97的十六進制

// 本地網絡的ChainId (本地網絡ID是1337或31337)
const LOCALHOST_CHAIN_ID = "31337";
const LOCALHOST_CHAIN_ID_HEX = "0x7a69"; // 31337的十六進制

// 日文提示信息
const MESSAGES = {
  WALLET_CONNECTED: "ウォレットが接続されました",
  WALLET_CONNECTED_TITLE: "接続完了",
  WALLET_RECONNECTED: "ウォレットが再接続されました",
  WALLET_RECONNECTED_TITLE: "再接続完了",
  WALLET_DISCONNECT: "ウォレットとの接続が切断されました",
  WALLET_DISCONNECT_TITLE: "切断完了",
  NETWORK_MISMATCH: "ローカルネットワークに切り替えて最適な体験を得てください",
  NETWORK_MISMATCH_TITLE: "ネットワーク不一致",
  NETWORK_CHANGED: "ネットワークが変更されました",
  CHAIN_ID: "チェーンID",
  LOCALHOST_CONNECTED: "ローカルネットワークでは全ての機能が利用可能です",
  LOCALHOST_CONNECTED_TITLE: "ローカルネットワークに接続済み",
  NON_LOCALHOST:
    "このアプリはローカルネットワーク向けに最適化されています。一部の機能が正常に動作しない可能性があります",
  NON_LOCALHOST_TITLE: "ローカルネットワーク以外",
  // BSC測試網相關消息
  BSC_CONNECTED: "BSCテストネットでは全ての機能が利用可能です",
  BSC_CONNECTED_TITLE: "BSCテストネットに接続済み",
  NON_BSC:
    "このアプリはBSCテストネット向けに最適化されています。一部の機能が正常に動作しない可能性があります",
  NON_BSC_TITLE: "BSCテストネット以外",
  ALREADY_ON_BSC: "すでにBSCテストネットに接続されています",
  ALREADY_ON_BSC_TITLE: "BSCテストネット接続済み",
  ACCOUNT_CHANGED: "ウォレットアカウントが変更されました",
  NEW_ADDRESS: "新しいアドレス",
  SWITCHING_NETWORK: "ローカルネットワークに切り替え中...",
  SWITCHING_NETWORK_TITLE: "ネットワーク切り替え中",
  NETWORK_SWITCHED: "ローカルネットワークへの切り替えが成功しました",
  NETWORK_SWITCHED_TITLE: "ネットワーク切り替え完了",
  ALREADY_ON_LOCALHOST: "すでにローカルネットワークに接続されています",
  ALREADY_ON_LOCALHOST_TITLE: "ローカルネットワーク接続済み",
  SWITCH_FAILED: "ネットワーク切り替えに失敗しました。手動で切り替えてください",
  SWITCH_FAILED_TITLE: "切り替え失敗",
  WALLET_ERROR: "ウォレット設定を確認して再試行してください",
  WALLET_ERROR_TITLE: "ウォレット接続エラー",
  WALLET_RECONNECT_ERROR: "手動でウォレットを接続してください",
  WALLET_RECONNECT_ERROR_TITLE: "ウォレット再接続失敗",
  NO_WALLET:
    "ウォレットが検出されないか、ネットワーク切り替えをサポートしていません",
  NO_WALLET_TITLE: "ネットワーク切り替え不可",
  CONNECTION_ERROR: "ウォレット接続中にエラーが発生しました",
  CONNECTION_ERROR_TITLE: "接続エラー",
  RETRY_CONNECTION: "接続を再試行",
  CONNECTION_TIMEOUT:
    "ウォレット接続がタイムアウトしました。再度お試しください。",
  CONNECTION_TIMEOUT_TITLE: "接続タイムアウト",
};

// 全局變量來跟踪最近的通知，防止重複
let lastNotificationTimestamp = 0;
const NOTIFICATION_DEBOUNCE_MS = 1000; // 1秒去重時間

/**
 * 創建錢包上下文
 */
const WalletContext = createContext(null);

/**
 * 錢包上下文提供者組件
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @returns {JSX.Element} 錢包上下文提供者
 */
export const WalletProvider = ({ children }) => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [lastConnectionError, setLastConnectionError] = useState(null);

  /**
   * 重置連接狀態的輔助函數
   */
  const resetConnectionState = useCallback(() => {
    setIsConnecting(false);
    setConnectionAttempts(0);
    setLastConnectionError(null);
  }, []);

  /**
   * 清除所有持久化數據的輔助函數
   */
  const clearPersistentData = useCallback(() => {
    localStorage.removeItem("walletType");
    localStorage.removeItem("walletLastConnected");
    localStorage.removeItem("walletDisconnected");
  }, []);

  /**
   * 添加重試連接機制
   */
  const retryConnection = useCallback(async () => {
    // 如果嘗試次數過多，阻止繼續嘗試
    if (connectionAttempts >= 3) {
      showError(
        MESSAGES.CONNECTION_ERROR + " - " + MESSAGES.CONNECTION_TIMEOUT,
        {
          title: MESSAGES.CONNECTION_ERROR_TITLE,
        }
      );
      resetConnectionState();
      clearPersistentData();
      return;
    }

    setConnectionAttempts((prev) => prev + 1);
    setIsConnecting(true);

    // 清除所有先前的連接數據
    clearPersistentData();

    // 嘗試重新連接
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.location.reload(); // 重載頁面以重置所有狀態
      } else {
        throw new Error("MetaMask未安裝");
      }
    } catch (error) {
      console.error("重試連接失敗:", error);
      setLastConnectionError(error.message);
      showError(MESSAGES.CONNECTION_ERROR + ": " + error.message, {
        title: MESSAGES.CONNECTION_ERROR_TITLE,
        actions: [
          {
            label: MESSAGES.RETRY_CONNECTION,
            onClick: retryConnection,
          },
        ],
      });
      resetConnectionState();
    }
  }, [
    connectionAttempts,
    resetConnectionState,
    clearPersistentData,
    showError,
  ]);

  /**
   * 檢查本地存儲的錢包連接
   */
  useEffect(() => {
    // 連接超時控制 - 5秒後強制重置連接狀態
    let timeoutId = null;

    const checkPersistedConnection = async () => {
      // 設置連接超時
      timeoutId = setTimeout(() => {
        console.log("錢包連接超時，強制重置狀態");
        setIsConnecting(false);
        localStorage.removeItem("walletType");
        localStorage.removeItem("walletLastConnected");
        setAccount(null);
        setProvider(null);
        setChainId(null);
        setWalletType(null);
      }, 5000); // 5秒超時

      try {
        // 檢查是否已經通過window.ethereum連接
        if (window.ethereum) {
          try {
            setIsConnecting(true);

            // 獲取當前鏈ID
            const chainIdHex = await window.ethereum.request({
              method: "eth_chainId",
            });
            const currentChainId = parseInt(chainIdHex, 16).toString();

            // 嘗試獲取已連接賬戶
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });

            if (accounts && accounts.length > 0) {
              const address = accounts[0];
              const provider = new ethers.BrowserProvider(window.ethereum);

              setProvider(provider);
              setAccount(address);
              setChainId(currentChainId);
              setWalletType("metamask");

              // 將錢包類型保存到本地存儲，實現會話持久化
              localStorage.setItem("walletType", "metamask");

              // 設置上次連接時間
              localStorage.setItem(
                "walletLastConnected",
                Date.now().toString()
              );

              showSuccess(MESSAGES.WALLET_CONNECTED, {
                title: MESSAGES.WALLET_CONNECTED_TITLE,
                message: `${MESSAGES.NEW_ADDRESS}: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
              });

              // 檢查是否在本地網絡上，如果不是則提示
              if (
                currentChainId !== LOCALHOST_CHAIN_ID &&
                currentChainId !== "1337"
              ) {
                showWarning(MESSAGES.NETWORK_MISMATCH, {
                  title: MESSAGES.NETWORK_MISMATCH_TITLE,
                });
              }

              clearTimeout(timeoutId);
              setIsConnecting(false);
              return; // 已經連接，不需要檢查本地存儲
            }
          } catch (error) {
            console.error("檢查現有連接失敗:", error);
          }
        }

        // 如果window.ethereum沒有連接，或者連接失敗，檢查本地存儲
        const persistedWalletType = localStorage.getItem("walletType");
        const lastConnected = localStorage.getItem("walletLastConnected");
        const hasRecentlyDisconnected =
          localStorage.getItem("walletDisconnected");

        // 如果用戶明確斷開連接或者上次連接超過24小時，不自動重連
        if (
          hasRecentlyDisconnected === "true" ||
          (lastConnected &&
            Date.now() - parseInt(lastConnected) > 24 * 60 * 60 * 1000)
        ) {
          localStorage.removeItem("walletType");
          localStorage.removeItem("walletLastConnected");
          localStorage.removeItem("walletDisconnected");
          clearTimeout(timeoutId);
          setIsConnecting(false);
          return;
        }

        if (persistedWalletType) {
          try {
            const { provider, address, chainId } =
              await connectWallet(persistedWalletType);
            if (provider && address) {
              setProvider(provider);
              setAccount(address);
              setChainId(chainId);
              setWalletType(persistedWalletType);

              // 更新上次連接時間
              localStorage.setItem(
                "walletLastConnected",
                Date.now().toString()
              );

              showSuccess(MESSAGES.WALLET_RECONNECTED, {
                title: MESSAGES.WALLET_RECONNECTED_TITLE,
                message: `${MESSAGES.NEW_ADDRESS}: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
              });

              // 檢查是否在本地網絡上，如果不是則提示
              if (chainId !== LOCALHOST_CHAIN_ID && chainId !== "1337") {
                showWarning(MESSAGES.NETWORK_MISMATCH, {
                  title: MESSAGES.NETWORK_MISMATCH_TITLE,
                });
              }
            } else {
              // 如果連接失敗，清除本地存儲
              localStorage.removeItem("walletType");
              localStorage.removeItem("walletLastConnected");
            }
          } catch (error) {
            console.error("自動重連錢包失敗:", error);
            localStorage.removeItem("walletType");
            localStorage.removeItem("walletLastConnected");
            showError(error.message || MESSAGES.WALLET_RECONNECT_ERROR, {
              title: MESSAGES.WALLET_RECONNECT_ERROR_TITLE,
            });
          }
        }
      } catch (error) {
        console.error("錢包連接檢查失敗:", error);
      } finally {
        clearTimeout(timeoutId);
        setIsConnecting(false);
      }
    };

    checkPersistedConnection();

    // 確保在組件卸載時清除超時計時器
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showSuccess, showError, showWarning]);

  /**
   * 監聽錢包事件（賬戶變更、網絡變更）
   */
  useEffect(() => {
    if (!provider) return;

    // 記錄是否由事件觸發斷開連接的標誌
    let disconnectTriggeredByEvent = false;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // 賬戶為空，表示斷開了連接
        disconnectTriggeredByEvent = true;
        disconnectWalletHandler(true); // 跳過事件觸發的通知
        disconnectTriggeredByEvent = false;
      } else {
        // 更新賬戶地址
        setAccount(accounts[0]);

        // 更新provider以確保使用最新連接
        if (window.ethereum) {
          const updatedProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(updatedProvider);

          // 同步更新chainId
          window.ethereum
            .request({ method: "eth_chainId" })
            .then((chainIdHex) => {
              const chainIdDecimal = parseInt(chainIdHex, 16).toString();
              setChainId(chainIdDecimal);

              // 對於Hardhat本地網絡，嘗試進行特殊處理
              if (chainIdDecimal === "31337" || chainIdDecimal === "1337") {
                console.log("檢測到Hardhat網絡，嘗試特殊處理");

                // 先嘗試保存當前賬戶和鏈ID
                setChainId(chainIdDecimal);
                setAccount(accounts[0]);

                // 嘗試建立本地RPC連接 - 使用Promise鏈式調用避免await
                // 先嘗試刪除現有的鏈配置
                window.ethereum
                  .request({
                    method: "wallet_removeEthereumChain",
                    params: [{ chainId: "0x7A69" }], // 31337 in hex
                  })
                  .catch(() =>
                    console.log("移除Hardhat網絡配置失敗，可能尚未添加")
                  )
                  .then(() => {
                    // 再嘗試添加鏈配置
                    return window.ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x7A69", // 31337 in hex
                          chainName: "Hardhat Local",
                          nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18,
                          },
                          rpcUrls: [
                            "http://127.0.0.1:8545",
                            "http://localhost:8545",
                          ],
                          blockExplorerUrls: [],
                        },
                      ],
                    });
                  })
                  .then(() => {
                    // 嘗試強制連接
                    return window.ethereum.request({
                      method: "eth_requestAccounts",
                      params: [],
                    });
                  })
                  .then(() => {
                    console.log("Hardhat網絡處理成功");
                  })
                  .catch((error) => {
                    console.error("Hardhat網絡處理失敗:", error);

                    // 如果處理失敗，至少確保用戶界面更新了賬戶信息
                    showWarning(
                      "Hardhatネットワークへの接続に問題があります。開發環境で動作確認する場合は、MetaMaskでアカウントをクリックして「localhost:3000に接続」を選択してください。",
                      {
                        title: "Hardhat接続警告",
                      }
                    );
                  });
              }
            })
            .catch((error) => {
              console.error("獲取鏈ID失敗:", error);
            });
        }

        showInfo(
          `${MESSAGES.NEW_ADDRESS}: ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          {
            title: MESSAGES.ACCOUNT_CHANGED,
          }
        );

        // 檢查新賬戶地址的網絡是否是本地網絡
        if (chainId !== LOCALHOST_CHAIN_ID && chainId !== "1337") {
          showWarning(MESSAGES.NETWORK_MISMATCH, {
            title: MESSAGES.NETWORK_MISMATCH_TITLE,
          });
        }
      }
    };

    const handleChainChanged = (newChainId) => {
      // 將十六進制字符串轉換為十進制字符串
      const chainIdDecimal = parseInt(newChainId, 16).toString();
      setChainId(chainIdDecimal);
      showInfo(`${MESSAGES.CHAIN_ID}: ${chainIdDecimal}`, {
        title: MESSAGES.NETWORK_CHANGED,
      });

      // 檢查是否切換到本地網絡
      if (chainIdDecimal === LOCALHOST_CHAIN_ID || chainIdDecimal === "1337") {
        showSuccess(MESSAGES.LOCALHOST_CONNECTED, {
          title: MESSAGES.LOCALHOST_CONNECTED_TITLE,
        });
      } else {
        showWarning(MESSAGES.NON_LOCALHOST, {
          title: MESSAGES.NON_LOCALHOST_TITLE,
        });
      }

      // 更新provider但不刷新頁面，避免斷開連接
      if (window.ethereum) {
        const updatedProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(updatedProvider);
      }
    };

    const handleDisconnect = () => {
      // 確保事件觸發的斷開連接不會顯示通知
      if (!disconnectTriggeredByEvent) {
        disconnectTriggeredByEvent = true;
        disconnectWalletHandler(true);
        disconnectTriggeredByEvent = false;
      }
    };

    // 添加事件監聽器
    if (walletType === "metamask" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("disconnect", handleDisconnect);
    }

    return () => {
      // 清理事件監聽器
      if (walletType === "metamask" && window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [provider, walletType, showInfo, showSuccess, showWarning]);

  /**
   * 斷開錢包連接
   */
  const disconnectWalletHandler = useCallback(
    async (skipNotification = false) => {
      try {
        // 防止短時間內重複顯示通知
        const now = Date.now();
        const shouldShowNotification =
          !skipNotification &&
          now - lastNotificationTimestamp > NOTIFICATION_DEBOUNCE_MS;

        if (shouldShowNotification) {
          lastNotificationTimestamp = now;
        }

        // 嘗試清除MetaMask連接狀態
        if (window.ethereum && walletType === "metamask") {
          // 嘗試撤銷權限
          try {
            // 注意: wallet_revokePermissions是實驗性API，可能不被所有版本支持
            await window.ethereum
              .request({
                method: "wallet_revokePermissions",
                params: [{ eth_accounts: {} }],
              })
              .catch((err) =>
                console.log("撤銷權限API不支持，這是正常的:", err)
              );
          } catch (error) {
            console.log("撤銷錢包權限嘗試失敗:", error);
          }

          // 額外的清理嘗試：
          // 1. 清空我們的緩存和狀態
          setAccount(null);
          setProvider(null);
          setChainId(null);
          setWalletType(null);

          // 2. 保存斷開狀態到localStorage
          localStorage.removeItem("walletType");
          localStorage.removeItem("walletLastConnected");
          localStorage.setItem("walletDisconnected", "true");

          // 3. 通知成功（如果需要且未重複）
          if (shouldShowNotification) {
            showInfo(MESSAGES.WALLET_DISCONNECT, {
              title: MESSAGES.WALLET_DISCONNECT_TITLE,
            });
          }

          return;
        }

        // WalletConnect需要主動斷開
        disconnectWallet(walletType);

        // 清除狀態
        setAccount(null);
        setProvider(null);
        setChainId(null);
        setWalletType(null);

        // 移除本地存儲中的錢包類型，並標記為已明確斷開連接
        localStorage.removeItem("walletType");
        localStorage.removeItem("walletLastConnected");
        localStorage.setItem("walletDisconnected", "true");

        if (shouldShowNotification) {
          showInfo(MESSAGES.WALLET_DISCONNECT, {
            title: MESSAGES.WALLET_DISCONNECT_TITLE,
          });
        }
      } catch (error) {
        console.error("斷開連接錯誤:", error);

        // 強制清除本地數據
        setAccount(null);
        setProvider(null);
        setChainId(null);
        setWalletType(null);
        localStorage.removeItem("walletType");
        localStorage.removeItem("walletLastConnected");
        localStorage.setItem("walletDisconnected", "true");

        // 即使出錯也顯示成功消息（如果需要且未重複）
        const now = Date.now();
        if (
          !skipNotification &&
          now - lastNotificationTimestamp > NOTIFICATION_DEBOUNCE_MS
        ) {
          lastNotificationTimestamp = now;
          showInfo(MESSAGES.WALLET_DISCONNECT, {
            title: MESSAGES.WALLET_DISCONNECT_TITLE,
          });
        }
      }
    },
    [walletType, showInfo]
  );

  /**
   * 連接錢包
   * @param {string} walletTypeToConnect - 要連接的錢包類型 ('metamask' | 'walletconnect')
   */
  const connectWalletHandler = async (walletTypeToConnect) => {
    if (isConnecting) return;

    // 連接超時計時器
    let connectionTimeoutId = null;

    try {
      setIsConnecting(true);

      // 設置連接超時 - 20秒後取消連接嘗試
      connectionTimeoutId = setTimeout(() => {
        console.log("錢包連接超時");
        setIsConnecting(false);
        showError(MESSAGES.CONNECTION_TIMEOUT, {
          title: MESSAGES.CONNECTION_TIMEOUT_TITLE,
        });

        // 重要：設置一個用於阻止短時間內重複嘗試連接的標誌
        localStorage.setItem("walletConnectionTimeout", "true");

        // 5秒後清除超時標誌，允許再次嘗試
        setTimeout(() => {
          localStorage.removeItem("walletConnectionTimeout");
        }, 5000);
      }, 20000); // 延長超時時間到20秒

      // 檢查是否在短時間內已經嘗試過連接但超時
      if (localStorage.getItem("walletConnectionTimeout") === "true") {
        throw new Error(MESSAGES.CONNECTION_TIMEOUT);
      }

      // 清除之前斷開連接的標記
      localStorage.removeItem("walletDisconnected");

      const {
        provider: newProvider,
        address,
        chainId: newChainId,
      } = await connectWallet(walletTypeToConnect);

      clearTimeout(connectionTimeoutId); // 連接成功，清除超時
      localStorage.removeItem("walletConnectionTimeout"); // 清除超時標誌

      if (newProvider && address) {
        setProvider(newProvider);
        setAccount(address);
        setChainId(newChainId);
        setWalletType(walletTypeToConnect);

        // 將錢包類型保存到本地存儲，實現會話持久化
        localStorage.setItem("walletType", walletTypeToConnect);
        localStorage.setItem("walletLastConnected", Date.now().toString());

        showSuccess(
          `${MESSAGES.NEW_ADDRESS}: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
          {
            title: MESSAGES.WALLET_CONNECTED_TITLE,
          }
        );

        // 檢查是否在本地網絡上，如果不是則提示
        if (newChainId !== LOCALHOST_CHAIN_ID && newChainId !== "1337") {
          showWarning(MESSAGES.NETWORK_MISMATCH, {
            title: MESSAGES.NETWORK_MISMATCH_TITLE,
          });
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("連接錢包失敗:", error);

      // 清除超時計時器
      if (connectionTimeoutId) clearTimeout(connectionTimeoutId);

      showError(error.message || MESSAGES.WALLET_ERROR, {
        title: MESSAGES.WALLET_ERROR_TITLE,
      });
      return false;
    } finally {
      if (connectionTimeoutId) clearTimeout(connectionTimeoutId);
      setIsConnecting(false);
    }
  };

  /**
   * 切換網絡
   * @param {string} targetChainId - 目標鏈ID
   */
  const switchChain = async (targetChainId) => {
    if (!provider || !window.ethereum) {
      showError(MESSAGES.NO_WALLET, {
        title: MESSAGES.NO_WALLET_TITLE,
      });
      return false;
    }

    try {
      // 將十進制鏈ID轉換為十六進制
      const chainIdHex = `0x${parseInt(targetChainId).toString(16)}`;

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });

      return true;
    } catch (error) {
      console.error("切換網絡失敗:", error);
      // 如果網絡不存在，嘗試添加網絡
      if (error.code === 4902 && targetChainId === LOCALHOST_CHAIN_ID) {
        return await addBscTestnet();
      }

      showError(error.message || "請檢查您的錢包設置並重試", {
        title: "網絡切換失敗",
      });
      return false;
    }
  };

  /**
   * 切換到BSC測試網
   */
  const switchToBscTestnet = async () => {
    if (chainId === BSC_TESTNET_CHAIN_ID) {
      showInfo(MESSAGES.ALREADY_ON_BSC, {
        title: MESSAGES.ALREADY_ON_BSC_TITLE,
      });
      return true;
    }

    try {
      showInfo(
        MESSAGES.SWITCHING_NETWORK.replace(
          "ローカルネットワーク",
          "BSCテストネット"
        ),
        {
          title: MESSAGES.SWITCHING_NETWORK_TITLE,
        }
      );

      // 嘗試切換到BSC測試網
      const success = await switchChain(BSC_TESTNET_CHAIN_ID);

      if (success) {
        showSuccess(
          MESSAGES.NETWORK_SWITCHED.replace(
            "ローカルネットワーク",
            "BSCテストネット"
          ),
          {
            title: MESSAGES.NETWORK_SWITCHED_TITLE,
          }
        );

        // 更新chainId狀態
        setChainId(BSC_TESTNET_CHAIN_ID);

        // 更新提供者
        if (window.ethereum) {
          const updatedProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(updatedProvider);

          // 重新獲取賬戶以確保地址正確
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
          }
        }
      }

      return success;
    } catch (error) {
      console.error("切換到BSC測試網失敗:", error);
      showError(error.message || MESSAGES.SWITCH_FAILED, {
        title: MESSAGES.SWITCH_FAILED_TITLE,
      });
      return false;
    }
  };

  /**
   * 切換到本地網絡
   */
  const switchToLocalhost = async () => {
    // 檢查是否已經在本地網絡上
    if (chainId === LOCALHOST_CHAIN_ID || chainId === "1337") {
      showInfo(MESSAGES.ALREADY_ON_LOCALHOST, {
        title: MESSAGES.ALREADY_ON_LOCALHOST_TITLE,
      });
      return true;
    }

    try {
      showInfo(MESSAGES.SWITCHING_NETWORK, {
        title: MESSAGES.SWITCHING_NETWORK_TITLE,
      });

      // 嘗試切換到本地網絡
      let success = false;

      // 先嘗試31337
      success = await switchChain(LOCALHOST_CHAIN_ID);

      // 如果失敗，嘗試1337
      if (!success) {
        success = await switchChain("1337");
      }

      if (success) {
        showSuccess(MESSAGES.NETWORK_SWITCHED, {
          title: MESSAGES.NETWORK_SWITCHED_TITLE,
        });

        // 更新chainId狀態
        setChainId(LOCALHOST_CHAIN_ID);

        // 更新提供者
        if (window.ethereum) {
          const updatedProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(updatedProvider);

          // 重新獲取賬戶以確保地址正確
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
          }
        }
      }

      return success;
    } catch (error) {
      console.error("切換到本地網絡失敗:", error);
      showError(error.message || MESSAGES.SWITCH_FAILED, {
        title: MESSAGES.SWITCH_FAILED_TITLE,
      });
      return false;
    }
  };

  // 判斷是否在本地網絡上
  const isLocalhost = chainId === LOCALHOST_CHAIN_ID || chainId === "1337";

  // 檢查連接是否持續過長
  useEffect(() => {
    // 如果正在連接，設置監控計時器
    if (isConnecting) {
      const longRunningConnectionTimer = setTimeout(() => {
        console.warn("連接處理時間過長，可能卡住了");
        showWarning(MESSAGES.CONNECTION_TIMEOUT, {
          title: MESSAGES.CONNECTION_TIMEOUT_TITLE,
          actions: [
            {
              label: MESSAGES.RETRY_CONNECTION,
              onClick: () => {
                resetConnectionState();
                clearPersistentData();
                retryConnection();
              },
            },
          ],
        });
        resetConnectionState();
      }, 15000); // 15秒是連接處理的最長時間

      return () => clearTimeout(longRunningConnectionTimer);
    }
  }, [
    isConnecting,
    showWarning,
    retryConnection,
    resetConnectionState,
    clearPersistentData,
  ]);

  // 上下文值
  const contextValue = {
    account,
    provider,
    connect: connectWalletHandler,
    disconnect: disconnectWalletHandler,
    isConnecting,
    chainId,
    walletType,
    isConnected: Boolean(account),
    switchChain,
    switchToBscTestnet,
    isBscTestnet: chainId === BSC_TESTNET_CHAIN_ID,
    switchToLocalhost,
    isLocalhost,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

/**
 * 使用錢包上下文的自定義Hook
 * @returns {WalletContextType} 錢包上下文
 */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error("useWallet必須在WalletProvider內使用");
  }
  return context;
};
