import React, { useState, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { AnimationContext } from "../../contexts/AnimationContext";

// 更优雅的闪光动画
const shine = keyframes`
  from {
    background-position: 200% center;
  }
  to {
    background-position: -200% center;
  }
`;

// 平滑上升动画
const floatUp = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  50% {
    transform: translateY(-10px);
    box-shadow: 0 25px 20px rgba(0,0,0,0.1);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

// 3D翻转效果
const flipAnimation = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0);
  }
  100% {
    transform: perspective(1000px) rotateY(10deg);
  }
`;

// 渐变边框动画
const borderAnimation = keyframes`
  0% {
    border-color: rgba(106, 17, 203, 0.5);
  }
  50% {
    border-color: rgba(37, 117, 252, 0.5);
  }
  100% {
    border-color: rgba(106, 17, 203, 0.5);
  }
`;

// 选择动画样式（可以选择以下三种之一）
const cardAnimationStyles = {
  // 样式1: 3D悬浮效果
  float: css`
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
  `,
  // 样式2: 3D翻转效果
  flip: css`
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
    &:hover {
      animation: ${flipAnimation} 1s ease-in-out forwards;
    }
  `,
  // 样式3: 呼吸光效
  pulse: css`
    position: relative;
    &:hover {
      box-shadow: 0 0 20px rgba(106, 17, 203, 0.4);
      &::before {
        opacity: 1;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #6a11cb, #2575fc, #6a11cb);
      background-size: 400% 400%;
      z-index: -1;
      border-radius: calc(${(props) => props.theme.borderRadius.medium} + 2px);
      opacity: 0;
      transition: opacity 0.3s ease;
      animation: ${shine} 3s linear infinite;
    }
  `,
};

// 修改Card组件，根据animationType使用不同动画
const Card = styled.div`
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface || "#1e2633"}, ${props.theme.colors.surface || "#1e2633"}F8)`};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  // 根据animationType选择动画
  ${(props) => {
    switch (props.animationType) {
      case "float":
        return cardAnimationStyles.float;
      case "flip":
        return cardAnimationStyles.flip;
      case "pulse":
      default:
        return cardAnimationStyles.pulse;
    }
  }}
`;

// 其他组件保持不变
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

// 改进徽章样式
const BadgeContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
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
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) =>
    `linear-gradient(to bottom, ${props.theme.colors.surface}DD, ${props.theme.colors.surface})`};
  position: relative;
  z-index: 1;
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
  margin: ${(props) => props.theme.spacing.sm} 0;
  display: flex;
  align-items: center;
`;

const EthIcon = styled.span`
  margin-right: 4px;
  font-size: 1em;
`;

// 修改ActionButton样式解决边缘问题
const ActionButton = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm} 0;
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-weight: bold;
  margin-top: ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(42, 82, 190, 0.2);

  /* 修复边缘问题，确保渐变色边缘到边 */
  background-origin: border-box;
  background-clip: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(42, 82, 190, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(42, 82, 190, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:hover::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

// 改进状态消息样式
const StatusContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.xs};
  background: ${(props) =>
    props.success
      ? "linear-gradient(45deg, rgba(66, 183, 42, 0.2), rgba(66, 183, 42, 0.1))"
      : "linear-gradient(45deg, rgba(219, 55, 55, 0.2), rgba(219, 55, 55, 0.1))"};
  color: ${(props) => (props.success ? "#42b72a" : "#db3737")};
  border-radius: ${(props) => props.theme.borderRadius.small};
  text-align: center;
  font-size: 0.9rem;
  border-left: 3px solid ${(props) => (props.success ? "#42b72a" : "#db3737")};
`;

// 组件实现
const NFTCard = ({ nft, actionText, onAction, statusMessage }) => {
  const { animationType } = useContext(AnimationContext);

  // 确保 actionText 可以是函数或字符串
  const getActionText =
    typeof actionText === "function" ? () => actionText(nft) : () => actionText;

  return (
    <Card animationType={animationType}>
      <ImageContainer>
        <Image src={nft.image} alt={nft.name} />
        {nft.collection === "Doodles Collection" && (
          <BadgeContainer>
            <Badge>Hot</Badge>
          </BadgeContainer>
        )}
      </ImageContainer>
      <CardContent>
        <NFTName>{nft.name}</NFTName>
        <NFTCollection>{nft.collection}</NFTCollection>
        {nft.price && (
          <NFTDescription>
            <EthIcon>Ξ</EthIcon> {nft.price} ETH
          </NFTDescription>
        )}
        {onAction && (
          <ActionButton onClick={() => onAction(nft)}>
            {getActionText()}
          </ActionButton>
        )}
        {statusMessage && (
          <StatusContainer success={statusMessage.success}>
            {statusMessage.message}
          </StatusContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default NFTCard;
