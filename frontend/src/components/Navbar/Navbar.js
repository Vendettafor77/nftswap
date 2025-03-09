import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 使用獨立的CSS文件

/**
 * 主導航欄組件
 * @returns {JSX.Element} 導航欄組件
 */
const Navbar = () => {
  // 錢包連接狀態
  const [connected, setConnected] = useState(false);
  // 移動設備菜單狀態
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * 切換移動設備菜單的開關狀態
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            NFTマーケット
          </Link>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              to="/my-nfts"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              マイNFT
            </Link>
            <Link
              to="/history"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              取引履歴
            </Link>
            <Link
              to="/mint-wtfape"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Mint WTFape
            </Link>
          </div>

          <div className="navbar-right">
            <button
              className="wallet-button"
              onClick={() => setConnected(!connected)}
            >
              {connected ? "ウォレット接続済み" : "ウォレットを接続"}
            </button>

            <div className="menu-toggle" onClick={toggleMenu}>
              <div className={`hamburger ${menuOpen ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
