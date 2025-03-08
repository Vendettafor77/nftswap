import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../styled/Button";

const NavContainer = styled.nav.attrs(() => ({
  className: "nav-text",
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface}, ${props.theme.colors.surface}F8)`};
  box-shadow: ${(props) => props.theme.shadows.medium};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  text-decoration: none;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
`;

const NavLink = styled(Link).attrs(() => ({
  className: "nav-text",
}))`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.small};
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: rgba(106, 17, 203, 0.1);

    &::after {
      width: 80%;
    }
  }
`;

const NavDropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover .dropdown-content {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface}, ${props.theme.colors.surface}F8)`};
  min-width: 200px;
  box-shadow: ${(props) => props.theme.shadows.large};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm} 0;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
`;

const DropdownLink = styled(Link)`
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(106, 17, 203, 0.1),
      rgba(37, 117, 252, 0.1)
    );
    color: ${(props) => props.theme.colors.primary};
  }
`;

// 固定寬度的錢包按鈕
const WalletButton = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.lg}`};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 180px; /* 固定寬度 */
  height: 42px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* 防止文本換行 */

  /* 進行文本顯示調整 */
  text-overflow: ellipsis;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Navbar = () => {
  // ウォレット接続状態をシミュレート
  const [connected, setConnected] = React.useState(false);

  return (
    <NavContainer>
      <Logo to="/">NFTマーケット</Logo>
      <NavLinks>
        <NavLink to="/">ホーム</NavLink>
        <NavLink to="/my-nfts">マイNFT</NavLink>
        <NavLink to="/history">取引履歴</NavLink>
        <NavLink to="/mint-wtfape">Mint WTFape</NavLink>
      </NavLinks>
      <WalletButton onClick={() => setConnected(!connected)}>
        {connected ? "ウォレット接続済み" : "ウォレットを接続"}
      </WalletButton>
    </NavContainer>
  );
};

export default Navbar;
