import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EthSymbol } from "../../../components/NFTCard/NFTCard";
import { formatDate } from "../../../utils/dateUtils"; // 需要實現此函數
import GradientText from "../../../components/styled/GradientText";
import IPFSImage from "../../../components/IPFSImage";
import { getNFTImageUrl } from "../../../utils/ipfsUtils";

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
  const [imageUrl, setImageUrl] = useState(transaction.nftImage);
  const [isLoading, setIsLoading] = useState(true);

  // 使用useEffect獲取正確的IPFS圖片URL
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        console.log("正在處理交易卡片圖片:", transaction.nftImage);

        // 構建包含必要信息的NFT對象
        // 注意：交易數據結構可能與標準NFT不同，我們需要處理這些差異
        const nftData = {
          tokenId: transaction.tokenId || "", // 交易記錄可能沒有tokenId
          metadataBaseUrl: transaction.metadataBaseUrl || "", // 交易記錄可能沒有metadataBaseUrl
          image: transaction.nftImage, // 使用原始圖片作為備用
          // 添加更多可能的字段來幫助ipfsUtils處理URL
          contractAddress: transaction.contractAddress,
          collection: transaction.nftCollection,
        };

        // 即使沒有metadataBaseUrl和tokenId，也嘗試使用image字段處理URL
        const imageResult = await getNFTImageUrl(nftData);

        if (imageResult.url) {
          console.log("成功獲取處理後的交易圖片URL:", imageResult.url);
          setImageUrl(imageResult.url);
        } else if (transaction.nftImage) {
          // 如果getNFTImageUrl無法處理，但我們有原始URL，直接使用getHttpUrl處理
          console.log("使用getHttpUrl直接處理nftImage:", transaction.nftImage);
          const { getHttpUrl } = await import("../../../utils/ipfsUtils");
          const directUrl = getHttpUrl(transaction.nftImage);
          if (directUrl) {
            setImageUrl(directUrl);
          }
        }
      } catch (error) {
        console.error(`獲取交易圖片失敗: ${error.message}`);
        // 保留原始圖片URL作為備用
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrl();
  }, [
    transaction.nftImage,
    transaction.tokenId,
    transaction.metadataBaseUrl,
    transaction.contractAddress,
    transaction.nftCollection,
  ]);

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
        <IPFSImage
          src={imageUrl}
          alt={transaction.nftName}
          width="100%"
          height="100%"
          objectFit="cover"
          errorText="画像を読み込めません"
          borderRadius="8px"
          backgroundColor="rgba(0, 0, 0, 0.05)"
          hoverEffect={true}
        />
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
