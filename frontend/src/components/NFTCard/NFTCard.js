import React, { useState, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { AnimationContext } from "../../contexts/AnimationContext";
import { PrimaryButton, OutlineButton } from "../styled/Button";
import { StatusMessage } from "../styled/StatusMessage";

// 邊框流光動畫
const borderGlow = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
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
    animation: ${borderGlow} 2.5s ease-in-out forwards;
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
    border-radius: inherit;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: screen;
  }
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
      border-radius: inherit;
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
  border-radius: ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0 0;
`;

// 修改Image組件，降低z-index
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0 0;
  overflow: hidden;
  z-index: 1;

  ${ImageContainer}:hover & {
    transform: scale(1.08);
  }
`;

// 改进徽章样式
const BadgeContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
`;

const Badge = styled.span`
  background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 100%); /* 自動調整高度 */
  padding: ${(props) =>
    `${props.theme.spacing.md} ${props.theme.spacing.md} calc(${props.theme.spacing.md} + ${props.theme.spacing.sm}) ${props.theme.spacing.md}`};
  background: ${(props) =>
    `linear-gradient(to bottom, 
      ${props.theme.colors.surface}99, 
      ${props.theme.colors.surface}FF
    )`};
  position: relative;
  z-index: 1;
  margin-top: -2px; /* 消除可能的缝隙 */

  /* 添加微妙的玻璃拟态效果 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  /* 顶部阴影渐变 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    pointer-events: none;
  }
`;

// 添加卡片信息部分容器
const InfoContainer = styled.div`
  flex: 1;
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
`;

const NFTCollection = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
`;

// 改进价格显示
const NFTDescription = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  background: linear-gradient(to right, #11998e, #38ef7d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: ${(props) => props.theme.spacing.md} 0 0;
  display: flex;
  align-items: center;
`;

const EthIcon = styled.span`
  margin-right: 4px;
  font-size: 1em;
`;

// 添加動畫切換按鈕容器
const AnimationControls = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 4;
  display: flex;
  gap: 4px;
`;

const AnimationButton = styled(OutlineButton)`
  padding: 2px 8px;
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  ${(props) =>
    props.active &&
    css`
      background: rgba(106, 17, 203, 0.5);
      &:hover {
        background: rgba(106, 17, 203, 0.7);
      }
    `}
`;

// 将這個添加到樣式組件部分
const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: 0;
  height: 38px; /* 精確匹配按鈕高度 */
  position: relative;
`;

// 添加卡片內的狀態消息樣式
const CardStatusMessage = styled(StatusMessage)`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 38px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  vertical-align: middle;

  &::after,
  &::before {
    display: none; /* 移除圖標和箭頭 */
  }
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
        {nftData.collection === "Bored Ape Yacht Club" && (
          <BadgeContainer>
            <Badge>Hot</Badge>
          </BadgeContainer>
        )}
      </ImageContainer>
      <CardContent>
        <InfoContainer>
          <NFTName>{nftData.name}</NFTName>
          <NFTCollection>{nftData.collection}</NFTCollection>
          {nftData.price && (
            <NFTDescription>
              <EthIcon>Ξ</EthIcon> {nftData.price} ETH
            </NFTDescription>
          )}
        </InfoContainer>
        <ActionContainer>
          {onAction && !statusMessage && customActionButton && (
            <div style={{ width: "100%" }} onClick={handleAction}>
              {customActionButton()}
            </div>
          )}
          {onAction && !statusMessage && !customActionButton && (
            <PrimaryButton onClick={handleAction} fullWidth>
              {getActionText()}
            </PrimaryButton>
          )}
          {statusMessage && (
            <CardStatusMessage
              success={statusMessage.success}
              fadeOut={statusMessage.fadeOut}
              fullWidth
              noArrow
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
