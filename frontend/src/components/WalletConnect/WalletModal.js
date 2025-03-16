import React from "react";
import styled from "styled-components";
import { useWallet } from "../../contexts/WalletContext";
import { getSupportedWallets } from "../../utils/walletUtils";
import { formatAddress } from "../../utils/walletUtils";

// 彈窗背景
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

// 彈窗容器
const ModalContainer = styled.div`
  background-color: #1c2241;
  border-radius: 16px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// 彈窗標題
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

// 標題文本
const ModalTitle = styled.h3`
  font-size: 20px;
  color: #fff;
  margin: 0;
`;

// 關閉按鈕
const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #fff;
  }
`;

// 錢包列表
const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 錢包選項
const WalletOption = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(255, 255, 255, 0.1)"};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(0)")};
  }
`;

// 錢包圖標
const WalletIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

// 錢包信息
const WalletInfo = styled.div`
  flex: 1;
  text-align: left;
`;

// 錢包名稱
const WalletName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

// 錢包描述
const WalletDescription = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

// 已連接的錢包資訊
const ConnectedWallet = styled.div`
  background: rgba(0, 255, 176, 0.1);
  border: 1px solid rgba(0, 255, 176, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`;

const WalletAddress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const Address = styled.div`
  font-family: monospace;
  font-size: 16px;
  color: #fff;
`;

const DisconnectButton = styled.button`
  background: rgba(255, 100, 100, 0.1);
  color: #ff6464;
  border: 1px solid rgba(255, 100, 100, 0.3);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 100, 100, 0.2);
  }
`;

const NetworkBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 8px;
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#00ffb0"};
  margin-right: 8px;
  display: inline-block;
`;

// 切換網絡按鈕
const SwitchNetworkButton = styled.button`
  display: block;
  width: 100%;
  background: rgba(59, 153, 252, 0.1);
  color: #3b99fc;
  border: 1px solid rgba(59, 153, 252, 0.3);
  border-radius: 8px;
  padding: 10px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(59, 153, 252, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 加載指示器
const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #3b99fc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// 加載中容器
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #3b99fc;
  font-size: 16px;
  text-align: center;
`;

// 加載中文字
const LoadingText = styled.span`
  margin-left: 8px;
`;

/**
 * 錢包連接彈窗
 * @param {Object} props - 組件屬性
 * @param {boolean} props.isOpen - 是否打開彈窗
 * @param {Function} props.onClose - 關閉彈窗回調
 * @returns {JSX.Element|null} 錢包連接彈窗
 */
const WalletModal = ({ isOpen, onClose }) => {
  const {
    connect,
    disconnect,
    account,
    isConnecting,
    chainId,
    walletType,
    isConnected,
    switchToLocalhost,
    isLocalhost,
  } = useWallet();
  const supportedWallets = getSupportedWallets();

  // 如果彈窗關閉，不渲染任何內容
  if (!isOpen) return null;

  /**
   * 處理連接錢包
   * @param {string} walletId - 錢包ID
   */
  const handleConnectWallet = async (walletId) => {
    try {
      const success = await connect(walletId);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error("錢包連接失敗:", error);
    }
  };

  /**
   * 處理斷開連接
   */
  const handleDisconnect = () => {
    disconnect();
    onClose(); // 斷開連接後關閉模態框
  };

  /**
   * 處理切換到本地網絡
   */
  const handleSwitchToLocalhost = async () => {
    const success = await switchToLocalhost();
    if (success) {
      // 等待一下讓用戶看到成功消息
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // 獲取當前網絡名稱和顏色
  const getNetworkInfo = (chainId) => {
    const networks = {
      1: { name: "Ethereum Mainnet", color: "#627EEA" },
      5: { name: "Goerli Testnet", color: "#F6C343" },
      11155111: { name: "Sepolia Testnet", color: "#CFB5F0" },
      97: { name: "BSC Testnet", color: "#F3BA2F" },
      31337: { name: "Hardhat Local", color: "#00FFC8" },
      1337: { name: "Localhost Network", color: "#00FFC8" },
    };

    // 處理可能是數字或十六進制字符串的chainId
    let networkId = chainId;

    // 如果是十六進制字符串，轉換為十進制字符串
    if (typeof chainId === "string" && chainId.startsWith("0x")) {
      networkId = parseInt(chainId, 16).toString();
    }

    return (
      networks[networkId] || {
        name: `Unknown Network (${networkId})`,
        color: "#FF6B6B",
      }
    );
  };

  const networkInfo = getNetworkInfo(chainId);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {isConnected ? "ウォレット接続済み" : "ウォレットを接続"}
          </ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        {isConnected ? (
          <ConnectedWallet>
            <WalletName>
              {supportedWallets.find((w) => w.id === walletType)?.name ||
                walletType}
            </WalletName>

            <NetworkBadge>
              <StatusIndicator color={networkInfo.color} /> {networkInfo.name}
            </NetworkBadge>

            <WalletAddress>
              <Address>{formatAddress(account)}</Address>
              <DisconnectButton onClick={handleDisconnect}>
                切断する
              </DisconnectButton>
            </WalletAddress>

            {/* 如果不是本地網絡，顯示切換按鈕 */}
            {!isLocalhost && (
              <SwitchNetworkButton onClick={handleSwitchToLocalhost}>
                ローカルネットワークに切り替え
              </SwitchNetworkButton>
            )}
          </ConnectedWallet>
        ) : isConnecting ? (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>接続中...</LoadingText>
          </LoadingContainer>
        ) : (
          <WalletList>
            {supportedWallets.map((wallet) => (
              <WalletOption
                key={wallet.id}
                onClick={() => handleConnectWallet(wallet.id)}
                disabled={isConnecting}
              >
                <WalletIcon src={wallet.icon} alt={wallet.name} />
                <WalletInfo>
                  <WalletName>{wallet.name}</WalletName>
                  <WalletDescription>
                    {wallet.id === "metamask"
                      ? "最も人気のあるイーサリアムウォレット"
                      : "サポートされている任意のウォレットアプリに接続"}
                  </WalletDescription>
                </WalletInfo>
              </WalletOption>
            ))}

            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
                color: "#999",
                fontSize: "13px",
              }}
            >
              このアプリはローカルネットワーク（Chain ID:
              31337または1337）向けに最適化されています
            </div>
          </WalletList>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WalletModal;
