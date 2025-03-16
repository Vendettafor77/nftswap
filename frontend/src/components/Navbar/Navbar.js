import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Navbar.css"; // 使用獨立的CSS文件
import { clearSelectedNFT } from "../../pages/Home/components/sharedState";
import GradientText from "../styled/GradientText";
import { useWallet } from "../../contexts/WalletContext";
import WalletModal from "../WalletConnect/WalletModal";
import { formatAddress } from "../../utils/walletUtils";

// 用於替換現有 CSS .logo 類的 styled-component
const LogoContainer = styled(Link)`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`;

/**
 * 主導航欄組件
 * @returns {JSX.Element} 導航欄組件
 */
const Navbar = () => {
  // 使用錢包上下文
  const { account, isConnected, isConnecting } = useWallet();

  // 錢包模態窗狀態
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // 移動設備菜單狀態
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * 切換移動設備菜單的開關狀態
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * 處理導航點擊，清除選中的NFT狀態
   */
  const handleNavClick = () => {
    // 關閉菜單（如果是移動設備）
    setMenuOpen(false);
    // 清除選中的NFT狀態
    clearSelectedNFT();
  };

  /**
   * 開啟錢包連接模態窗
   */
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  /**
   * 關閉錢包連接模態窗
   */
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="logo" onClick={handleNavClick}>
            NFTマーケット
          </Link>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              ホーム
            </Link>
            <Link to="/my-nfts" className="nav-link" onClick={handleNavClick}>
              マイNFT
            </Link>
            <Link to="/history" className="nav-link" onClick={handleNavClick}>
              取引履歴
            </Link>
            <Link
              to="/mint-venape"
              className="nav-link"
              onClick={handleNavClick}
            >
              Mint VenAPE
            </Link>
          </div>

          <div className="navbar-right">
            {isConnected ? (
              <button
                className="wallet-button connected"
                onClick={openWalletModal}
              >
                {formatAddress(account)}
              </button>
            ) : (
              <button
                className="wallet-button"
                onClick={openWalletModal}
                disabled={isConnecting}
              >
                {isConnecting ? "接続中..." : "ウォレット接続"}
              </button>
            )}

            <div className="menu-toggle" onClick={toggleMenu}>
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 錢包連接模態窗 */}
      <WalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
    </div>
  );
};

export default Navbar;
