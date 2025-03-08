import React, { useState, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { AnimationContext } from "../../contexts/AnimationContext";
import {
  PrimaryButton,
  OutlineButton,
  SecondaryButton,
} from "../styled/Button";
import { StatusMessage } from "../styled/StatusMessage";

// 邊框流光動畫
const borderGlow = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
  100% {
    opacity: 0;
    transform: scale(1.05);
  }
`;

// 選擇動畫樣式
const cardAnimationStyles = css`
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  &:hover::after {
    animation: ${borderGlow} 1.5s ease-in-out infinite;
  }
  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(
      45deg,
      rgba(131, 58, 180, 0.6),
      rgba(29, 185, 253, 0.6)
    );
    border-radius: ${(props) => props.theme.borderRadius.medium};
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: screen;
  }
`;

// 基礎標籤樣式
const BaseTag = styled.div`
  position: absolute;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
`;

// 修改Card組件
const Card = styled.div`
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface || "#1e2633"}, ${
      props.theme.colors.surface || "#1e2633"
    }F8)`};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${(props) =>
    props.isSelected
      ? "0 15px 30px rgba(106, 17, 203, 0.3)"
      : "0 10px 20px rgba(0, 0, 0, 0.08)"};
  position: relative;
  border: ${(props) =>
    props.isSelected
      ? `2px solid ${props.theme.colors.primary}`
      : "1px solid rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  transform: ${(props) => (props.isSelected ? "translateY(-5px)" : "none")};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(props) => !props.isSelected && cardAnimationStyles}

  ${(props) =>
    props.isSelected &&
    `
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      border-radius: ${props.theme.borderRadius.medium};
      box-shadow: inset 0 0 0 2px ${props.theme.colors.primary};
      pointer-events: none;
    }
  `}
`;

// 修改ImageContainer
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  flex-shrink: 0;
`;

// 修改Image組件
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: inherit;
  z-index: 1;

  ${ImageContainer}:hover & {
    transform: scale(1.02);
  }
`;

// 修改ListingBadge組件
const ListingBadge = styled(BaseTag)`
  top: 10px;
  right: 10px;
  background: ${(props) => props.theme.colors.primary}CC;
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

// 修改價格標示組件
const PriceTag = styled(BaseTag)`
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const EthSymbol = styled.span`
  font-size: 1em;
  color: #00ff9d;
  font-weight: bold;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// 調整卡片內容區域，減少底部空白
const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.md}; /* 減少底部間距 */
  position: relative;
  z-index: 3;
  background: ${(props) => props.theme.colors.surface}F8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: auto;
  min-height: 120px; /* 減少最小高度 */
`;

// 添加卡片信息部分容器
const InfoContainer = styled.div`
  padding: 0;
  margin-bottom: 8px; /* 使用固定間距替代auto */
  flex-grow: 0;
`;

// 使用更高级的字体渐变效果
const NFTName = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  position: relative;
  z-index: 1;
  padding: 0;
`;

const NFTCollection = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  padding: 0;
`;

// 添加動畫切換按鈕容器
const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 42px;
  position: relative;
  z-index: 3;
  flex-shrink: 0;
  margin-top: 0;
  box-sizing: border-box;
`;

// 卡片內建按鈕樣式覆蓋
const CardButton = styled(PrimaryButton)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  height: 42px;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

// 卡片狀態消息
const CardStatusMessage = styled(StatusMessage)`
  width: 100%; /* 確保與按鈕寬度一致 */
  margin: 0;
  padding: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
`;

// 修改組件實現
const NFTCard = ({
  nft,
  actionText,
  onAction,
  statusMessage,
  customActionButton,
  isSelected,
}) => {
  // 使用實際 NFT 數據，而不是測試數據
  const nftData = nft;

  const getActionText =
    typeof actionText === "function"
      ? () => actionText(nftData)
      : () => actionText;

  // 處理按鈕點擊
  const handleAction = () => {
    if (onAction) {
      onAction(nftData);
    }
  };

  return (
    <Card isSelected={isSelected}>
      <ImageContainer>
        <Image src={nftData.image} alt={nftData.name} />
        {nftData.isListed && <ListingBadge>出品中</ListingBadge>}
        {nftData.price && (
          <PriceTag>
            <EthSymbol>Ξ</EthSymbol>
            {nftData.price}
          </PriceTag>
        )}
      </ImageContainer>
      <CardContent>
        <InfoContainer>
          <NFTName>{nftData.name}</NFTName>
          <NFTCollection>{nftData.collection}</NFTCollection>
        </InfoContainer>
        <ActionContainer>
          {onAction && !statusMessage && customActionButton && (
            <div
              style={{
                width: "100%",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: 0,
                margin: 0,
              }}
              onClick={handleAction}
            >
              {customActionButton()}
            </div>
          )}
          {onAction && !statusMessage && !customActionButton && (
            <CardButton onClick={handleAction}>{getActionText()}</CardButton>
          )}
          {statusMessage && (
            <CardStatusMessage
              success={statusMessage.success}
              fadeOut={statusMessage.fadeOut}
              fullWidth
              noArrow
              {...(statusMessage.style || {})}
            >
              {statusMessage.message}
            </CardStatusMessage>
          )}
        </ActionContainer>
      </CardContent>
    </Card>
  );
};

export default NFTCard;
