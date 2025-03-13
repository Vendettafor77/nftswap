import React from "react";
import styled from "styled-components";
import { EthSymbol } from "../../../components/NFTCard/NFTCard";
import { formatDate } from "../../../utils/dateUtils"; // 需要實現此函數
import GradientText from "../../../components/styled/GradientText";

// 導入原始NFTName組件
import { default as NFTCardComponent } from "../../../components/NFTCard/NFTCard";

// 卡片容器
const Card = styled.div`
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface || "#1e2633"}, ${
      props.theme.colors.surface || "#1e2633"
    }F8)`};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: ${(props) => props.theme.spacing.md};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

// NFT縮略圖
const NFTThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.background};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 交易信息區
const TransactionInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* 確保flex子項可以正確縮小 */
  overflow: hidden; /* 防止內容溢出 */
`;

// 一個純文本包裝元素，沒有額外的樣式
const TextWrapper = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0 0 4px 0; /* 添加底部間距與NFTCard一致 */
  padding: 0;
  line-height: 1.5;
  height: 26px; /* 稍微調整高度 */
  position: relative; /* 與NFTCard一致 */
  z-index: 1; /* 與NFTCard一致 */
`;

const TransactionType = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  width: fit-content;
  min-width: 50px;
  text-align: center;
  background: ${({ type, theme }) => {
    switch (type) {
      case "purchase":
        return "rgba(0, 255, 157, 0.15)";
      case "sale":
        return "rgba(255, 46, 99, 0.15)";
      case "mint":
        return "rgba(106, 17, 203, 0.15)";
      case "transfer":
        return "rgba(37, 117, 252, 0.15)";
      default:
        return theme.colors.background;
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case "purchase":
        return "#00ff9d";
      case "sale":
        return "#ff2e63";
      case "mint":
        return "#6a11cb";
      case "transfer":
        return "#2575fc";
      default:
        return "#ffffff";
    }
  }};
`;

// 交易詳情
const TransactionDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  flex-wrap: wrap; /* 允許在需要時換行 */
  overflow: hidden; /* 防止內容溢出 */
  text-overflow: ellipsis; /* 當文字太長時顯示省略號 */
  white-space: nowrap; /* 保持文字在一行 */
`;

// 交易金額區
const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0; /* 防止價格區域被壓縮 */
  margin-left: auto; /* 確保價格區域靠右 */
  min-width: 80px; /* 提供最小寬度 */
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Date = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  opacity: 0.8;
`;

// 交易對象地址
const Address = styled.span`
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
`;

/**
 * 交易卡片組件
 * @param {Object} transaction - 交易數據
 * @returns {JSX.Element} 交易卡片
 */
const TransactionCard = ({ transaction }) => {
  // 根據交易類型獲取對應的文本
  const getTypeText = (type) => {
    switch (type) {
      case "purchase":
        return "購入";
      case "sale":
        return "販売";
      case "mint":
        return "鋳造";
      case "transfer":
        return "転送";
      default:
        return "取引";
    }
  };

  // 根據交易類型獲取描述文本
  const getDescriptionText = (tx) => {
    switch (tx.type) {
      case "purchase":
        return (
          <>
            から{" "}
            <Address>
              {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
            </Address>{" "}
            購入
          </>
        );
      case "sale":
        return (
          <>
            を{" "}
            <Address>
              {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
            </Address>{" "}
            に販売
          </>
        );
      case "mint":
        return <>を鋳造</>;
      case "transfer":
        return (
          <>
            を{" "}
            <Address>
              {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
            </Address>{" "}
            に転送
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <NFTThumbnail>
        <Image src={transaction.nftImage} alt={transaction.nftName} />
      </NFTThumbnail>

      <TransactionInfo>
        <TransactionType type={transaction.type}>
          {getTypeText(transaction.type)}
        </TransactionType>

        <TextWrapper>
          <GradientText
            id={`tx-gradient-${transaction.id}`}
            fontSize="1.1rem"
            height="26"
            letterSpacing="0.01em"
            style={{ marginTop: "-2px" }}
          >
            {transaction.nftName}
          </GradientText>
        </TextWrapper>

        <TransactionDetails>
          <span>{transaction.nftCollection}</span>
          {getDescriptionText(transaction)}
        </TransactionDetails>
      </TransactionInfo>

      <PriceInfo>
        {transaction.price > 0 && (
          <Price>
            <EthSymbol>Ξ</EthSymbol>
            {transaction.price}
          </Price>
        )}
        <Date>{formatDate(transaction.date)}</Date>
      </PriceInfo>
    </Card>
  );
};

export default TransactionCard;
