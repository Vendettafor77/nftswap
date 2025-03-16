import { ethers } from "ethers";

/**
 * 網絡配置
 */
const NETWORKS = {
  // 主網
  1: {
    chainId: "1",
    name: "Ethereum Mainnet",
    currency: "ETH",
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID || "YOUR_INFURA_PROJECT_ID"}`,
    blockExplorer: "https://etherscan.io",
  },
  // Goerli測試網
  5: {
    chainId: "5",
    name: "Goerli Testnet",
    currency: "ETH",
    rpcUrl: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID || "YOUR_INFURA_PROJECT_ID"}`,
    blockExplorer: "https://goerli.etherscan.io",
  },
  // Sepolia測試網
  11155111: {
    chainId: "11155111",
    name: "Sepolia Testnet",
    currency: "ETH",
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID || "YOUR_INFURA_PROJECT_ID"}`,
    blockExplorer: "https://sepolia.etherscan.io",
  },
  // BSC測試網
  97: {
    chainId: "97",
    name: "BSC Testnet",
    currency: "tBNB",
    rpcUrl:
      process.env.REACT_APP_BSC_TESTNET_RPC_URL ||
      "https://bsc-testnet-dataseed.bnbchain.org",
    blockExplorer: "https://testnet.bscscan.com",
  },
  // 本地開發網絡
  31337: {
    chainId: "31337",
    name: "Hardhat Local",
    currency: "ETH",
    rpcUrl: "http://localhost:8545",
    blockExplorer: "",
  },
};

// WalletConnect項目ID - 實際使用時需替換為您自己的項目ID
const WALLET_CONNECT_PROJECT_ID =
  process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID ||
  "YOUR_WALLET_CONNECT_PROJECT_ID";

/**
 * 獲取目前支持的錢包類型
 * @returns {Array<{id: string, name: string, icon: string}>} 錢包類型列表
 */
export const getSupportedWallets = () => {
  return [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "/images/wallets/metamask.svg",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "/images/wallets/walletconnect.svg",
    },
  ];
};

/**
 * 檢查MetaMask是否已安裝
 * @returns {boolean} 是否已安裝MetaMask
 */
export const isMetaMaskInstalled = () => {
  return typeof window !== "undefined" && Boolean(window.ethereum);
};

/**
 * 連接錢包
 * @param {string} walletType - 錢包類型 ('metamask' | 'walletconnect')
 * @returns {Promise<{provider: ethers.providers.Provider, address: string, chainId: string}>} 連接結果
 */
export const connectWallet = async (walletType) => {
  let provider;
  let chainId;
  let address;

  try {
    if (walletType === "metamask") {
      // 檢查MetaMask是否已安裝
      if (!isMetaMaskInstalled()) {
        throw new Error("請安裝MetaMask錢包擴展");
      }

      // 檢查已有賬戶
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      // 如果沒有已連接的賬戶，則請求連接
      if (!accounts || accounts.length === 0) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }

      // 創建提供者
      provider = new ethers.BrowserProvider(window.ethereum);

      // 獲取網絡信息 - 使用直接請求方法獲取chainId以確保準確性
      const chainIdHex = await window.ethereum.request({
        method: "eth_chainId",
      });
      // 將十六進制chainId轉換為十進制字符串
      chainId = parseInt(chainIdHex, 16).toString();

      // 獲取賬戶 - 使用直接請求方法確保準確性
      const currentAccounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      address = currentAccounts[0];
    } else if (walletType === "walletconnect") {
      try {
        // 動態導入WalletConnect
        const { EthereumProvider } = await import(
          "@walletconnect/ethereum-provider"
        );

        // WalletConnect v2配置
        const wcProvider = await EthereumProvider.init({
          projectId: WALLET_CONNECT_PROJECT_ID,
          chains: [97], // BSC測試網作為主要鏈
          optionalChains: [1, 5, 11155111, 31337], // 其他支持的鏈
          showQrModal: true,
          methods: [
            "eth_sendTransaction",
            "eth_signTransaction",
            "personal_sign",
            "eth_sign",
            "eth_signTypedData",
          ],
          events: ["chainChanged", "accountsChanged"],
          rpcMap: {
            1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            5: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            11155111: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            97: "https://bsc-testnet-dataseed.bnbchain.org",
            31337: "http://localhost:8545",
          },
          metadata: {
            name: "NFT交易平台",
            description: "使用WalletConnect連接到NFT交易平台",
            url: window.location.origin,
            icons: [`${window.location.origin}/logo192.png`],
          },
        });

        // 連接WalletConnect
        await wcProvider.enable();

        // 創建ethers提供者
        provider = new ethers.BrowserProvider(wcProvider);

        // 獲取網絡信息
        const network = await provider.getNetwork();
        chainId = network.chainId.toString();

        // 獲取賬戶
        const accounts = await provider.listAccounts();
        address = await accounts[0].getAddress();
      } catch (error) {
        console.error("WalletConnect連接失敗:", error);
        throw new Error("WalletConnect連接失敗，請重試");
      }
    } else {
      throw new Error("不支持的錢包類型");
    }

    return { provider, address, chainId };
  } catch (error) {
    console.error("連接錢包失敗:", error);
    throw error;
  }
};

/**
 * 斷開錢包連接
 * @param {string} walletType - 錢包類型
 */
export const disconnectWallet = async (walletType) => {
  if (walletType === "walletconnect") {
    try {
      // 如果是WalletConnect，需要主動斷開連接
      const { EthereumProvider } = await import(
        "@walletconnect/ethereum-provider"
      );

      const wcProvider = await EthereumProvider.init({
        projectId: WALLET_CONNECT_PROJECT_ID,
      });

      if (wcProvider.connected) {
        await wcProvider.disconnect();
      }
    } catch (error) {
      console.error("斷開WalletConnect失敗:", error);
    }
  }

  // MetaMask不需要主動斷開連接
};

/**
 * 獲取錢包提供者
 * @param {string} walletType - 錢包類型
 * @returns {Promise<ethers.providers.Provider|null>} 錢包提供者
 */
export const getWalletProvider = async (walletType) => {
  try {
    if (walletType === "metamask" && isMetaMaskInstalled()) {
      return new ethers.BrowserProvider(window.ethereum);
    } else if (walletType === "walletconnect") {
      // 動態導入WalletConnect
      const { EthereumProvider } = await import(
        "@walletconnect/ethereum-provider"
      );

      // 創建WalletConnect提供者
      const wcProvider = await EthereumProvider.init({
        projectId: WALLET_CONNECT_PROJECT_ID,
        chains: [97], // BSC測試網
        optionalChains: [1, 5, 11155111, 31337],
        showQrModal: true,
        rpcMap: {
          1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
          5: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
          11155111: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
          97: "https://bsc-testnet-dataseed.bnbchain.org",
          31337: "http://localhost:8545",
        },
      });

      return new ethers.BrowserProvider(wcProvider);
    }
    return null;
  } catch (error) {
    console.error("獲取提供者失敗:", error);
    return null;
  }
};

/**
 * 獲取錢包地址
 * @param {ethers.providers.Provider} provider - ethers提供者
 * @returns {Promise<string|null>} 錢包地址
 */
export const getWalletAddress = async (provider) => {
  if (!provider) return null;

  try {
    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
      return await accounts[0].getAddress();
    }
    return null;
  } catch (error) {
    console.error("獲取錢包地址失敗:", error);
    return null;
  }
};

/**
 * 獲取網絡信息
 * @param {string} chainId - 鏈ID
 * @returns {Object|null} 網絡信息
 */
export const getNetworkInfo = (chainId) => {
  return NETWORKS[chainId] || null;
};

/**
 * 格式化地址顯示
 * @param {string} address - 錢包地址
 * @param {number} [prefix=6] - 前綴長度
 * @param {number} [suffix=4] - 後綴長度
 * @returns {string} 格式化後的地址
 */
export const formatAddress = (address, prefix = 6, suffix = 4) => {
  if (!address) return "";
  if (address.length < prefix + suffix) return address;
  return `${address.substring(0, prefix)}...${address.substring(address.length - suffix)}`;
};

/**
 * 添加自定義網絡
 * @param {Object} networkParams - 網絡參數
 * @returns {Promise<boolean>} 是否成功
 */
export const addNetwork = async (networkParams) => {
  if (!window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkParams],
    });
    return true;
  } catch (error) {
    console.error("添加網絡失敗:", error);
    return false;
  }
};

/**
 * 添加BSC測試網到MetaMask
 * @returns {Promise<boolean>} 是否成功
 */
export const addBscTestnet = async () => {
  if (!window.ethereum) {
    console.error("MetaMask未安裝");
    return false;
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x61", // 97的十六進制表示
          chainName: "BSC Testnet",
          nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
          },
          rpcUrls: [
            "https://bsc-testnet-dataseed.bnbchain.org",
            "https://bsc-testnet-dataseed1.bnbchain.org",
            "https://bsc-testnet-dataseed2.bnbchain.org",
            "https://bsc-testnet-dataseed3.bnbchain.org",
            "https://bsc-testnet-dataseed4.bnbchain.org",
            "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
            "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
          ],
          blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
      ],
    });

    // 切換成功後，確保chainId已更新
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    console.log("切換後的chainId:", chainIdHex);

    return true;
  } catch (error) {
    console.error("添加BSC測試網失敗:", error);
    return false;
  }
};
