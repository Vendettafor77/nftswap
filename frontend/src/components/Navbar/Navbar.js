import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  background-color: ${(props) => props.theme.colors.surface};
  box-shadow: ${(props) => props.theme.shadows.medium};
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const NavDropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.theme.colors.surface};
  min-width: 160px;
  box-shadow: ${(props) => props.theme.shadows.medium};
  z-index: 1;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm} 0;
`;

const DropdownLink = styled(Link)`
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}22;
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const ConnectButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
  }
`;

const Navbar = () => {
  // ウォレット接続状態をシミュレート
  const [connected, setConnected] = React.useState(false);

  return (
    <NavContainer>
      <Logo>NFTマーケット</Logo>
      <NavLinks>
        <NavLink to="/">ホーム</NavLink>
        <NavLink to="/my-nfts">マイNFT</NavLink>
        <NavLink to="/history">取引履歴</NavLink>
        <NavDropdown>
          <NavLink to="#">WTFape</NavLink>
          <DropdownContent className="dropdown-content">
            <DropdownLink to="/mint-wtfape">WTFapeをミントする</DropdownLink>
            <DropdownLink to="/my-wtfapes">マイWTFape</DropdownLink>
          </DropdownContent>
        </NavDropdown>
      </NavLinks>
      <ConnectButton onClick={() => setConnected(!connected)}>
        {connected ? "ウォレット接続済み" : "ウォレットを接続"}
      </ConnectButton>
    </NavContainer>
  );
};

export default Navbar;
