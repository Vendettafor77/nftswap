import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
} from "../../components/styled/Button";
import { StatusMessage } from "../../components/styled/StatusMessage";
import { EthSymbol } from "../../components/NFTCard/NFTCard";
import GradientText from "../../components/styled/GradientText";
import { myNFTs } from "../../data/mockData";
import IPFSImage from "../../components/IPFSImage";
import { getNFTImageUrl } from "../../utils/ipfsUtils";

// NFT數據（來自WTFape系列）
const nftData = myNFTs.filter(
  (nft) => nft.collection === "WTFape コレクション"
);

// 主容器 - 減小最小高度，避免內容溢出
const MintPageContainer = styled.div`
  width: 100%;
  min-height: auto;
  padding: ${(props) => props.theme.spacing.md} 0;
  position: relative;
  overflow: hidden;
`;

// 背景裝飾元素 - 移除模糊和動畫效果以減輕 GPU 負擔
const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: 0.2;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    /* 移除模糊效果 */
  }

  &::before {
    top: -100px;
    left: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(106, 17, 203, 0.15),
      transparent 70%
    );
    /* 移除動畫 */
  }

  &::after {
    bottom: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(37, 117, 252, 0.1),
      transparent 70%
    );
    /* 移除動畫 */
  }
`;

// 頁面內容容器 - 調整最大寬度，使其更適合顯示
const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

// 標題區域 - 減少底部間距
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.md};

  h1 {
    margin-bottom: ${(props) => props.theme.spacing.sm};
    font-size: 2.5rem;
    display: inline-block;
  }
`;

// 介紹文本 - 減小字體和行高，使其更緊湊
const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: center;
`;

// 主體內容卡片 - 移除模糊效果和陰影
const MintCard = styled.div`
  background: rgba(18, 21, 34, 0.9);
  border-radius: ${(props) => props.theme.borderRadius.large};
  /* 減少陰影強度 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 100%;
  /* 移除模糊效果 */
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

// 柵格佈局 - 變更比例，使左側更寬
const MintCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// NFT展示區塊 - 減少內邊距，使內容更緊湊
const ShowcaseSection = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    right: 0;
    height: 80%;
    width: 1px;
    background: rgba(106, 17, 203, 0.3);
    /* 簡化漸變為純色 */

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

// NFT圖像展示區 - 移除動畫和簡化陰影
const NFTImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: ${(props) => props.theme.spacing.md};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  /* 降低陰影複雜度 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 18, 31, 0.8);
  /* 移除漸變背景 */

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    z-index: -1;
    border-radius: 17px;
    border: 1px solid rgba(106, 17, 203, 0.2);
    /* 移除動畫和漸變，改用純色邊框 */
  }
`;

// NFT收藏信息卡片 - 簡化背景
const CollectionInfoCard = styled.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

// 收藏信息標題
const CollectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

// 收藏信息列表
const CollectionStatsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.sm};
`;

// 收藏信息項 - 統一邊框樣式
const CollectionStat = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.sm};
  background: rgba(15, 18, 31, 0.8);
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid rgba(106, 17, 203, 0.2) !important;
`;

// 收藏信息數值
const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

// 收藏信息標籤
const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// 導航按鈕區
const NavigationControls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

// 導航按鈕圖標
const NavButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) =>
    props.direction === "prev" ? "0 8px 0 0" : "0 0 0 8px"};
`;

// 特徵和動作區塊 - 減少內邊距
const DetailsSection = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 標題和信息區
const InfoHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// 行動按鈕區
const ActionArea = styled.div`
  margin-top: auto;
  position: relative;
  min-height: 40px; /* 從80px減少到60px，減少空白區域 */
`;

// 懸浮陰影效果 - 用於替代容器動效
const HoverShadowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius.large};
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.3);
  transition: opacity 0.3s ease;
  z-index: -1;

  ${MintCard}:hover & {
    opacity: 1;
  }
`;

// NFT標題
const NFTTitleContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.md};
`;

// NFT描述 - 減小間距
const NFTDescriptionText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// 特徴列表容器 - 統一邊框樣式
const FeaturesContainer = styled.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid rgba(106, 17, 203, 0.2);
`;

// 屬性標題
const FeaturesTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`;

// 屬性列表
const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.sm};
`;

// 屬性項目 - 統一邊框樣式
const FeatureItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: rgba(15, 18, 31, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.2);
`;

// 屬性名稱
const FeatureName = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.8rem;
  margin-bottom: 2px;
`;

// 屬性值
const FeatureValue = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.95rem;
`;

// Token ID 輸入區域 - 使用內聯樣式確保優先級
const TokenIdInputContainer = styled.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(106, 17, 203, 0.2) !important;
  overflow: hidden;
  width: 100%;
`;

// Token ID 標籤
const TokenIdLabel = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  white-space: nowrap;
`;

// 自定義輸入框 - 使用更強大的樣式選擇器確保不被覆蓋
const CustomInput = styled.input.attrs({
  type: "text",
  placeholder: "TokenIDを入力",
  className: "token-id-input",
})`
  &&& {
    background: rgba(15, 18, 31, 0.8) !important;
    border: 2px solid rgba(87, 5, 175, 0.42) !important;
    border-radius: 4px !important;
    color: ${(props) => props.theme.colors.text.primary};
    padding: 8px 12px;
    width: 100px;
    min-width: 100px;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: right;
    margin-left: auto;
    box-shadow: none !important;
  }

  &&&:focus {
    outline: none;
    border: 2px solid rgba(27, 151, 185, 0.72) !important;
    box-shadow: 0 0 0 1px rgba(0, 201, 255, 0.3) !important;
  }

  &&&::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}88;
    text-align: right;
    font-size: 0.95rem;
    font-weight: normal;
  }
`;

// 價格信息區 - 調整背景色和邊框，與其他元素保持一致性
const PriceInfoContainer = styled.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid rgba(106, 17, 203, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 價格標籤
const PriceLabel = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

// 價格金額 - 使用純色，避免漸變
const PriceValue = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;

  /* 移除漸變文字效果，使用純色 */
`;

// 自定義狀態消息
const FixedStatusMessage = styled(StatusMessage)`
  position: absolute;
  bottom: -25px; 
    padding: 20px; /* 直接覆盖原组件的padding */

  left: 50%;
  transform: translateX(-50%);
  width: 90%;、
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.3s forwards;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

// 進度指示器 - 簡化動畫效果
const MintProgressContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const MintProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

// 進度條 - 使用指定的漸變色
const MintProgressBar = styled.div`
  height: 6px;
  width: 100%;
  background: rgba(15, 18, 31, 0.6);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.progress || "45%"};
    background: linear-gradient(120deg, #00ff9d, #00c9ff);
    border-radius: 3px;
  }
`;

// Toast通知樣式
const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 25px;
  background: ${(props) =>
    props.success ? "rgba(38, 194, 129, 0.9)" : "rgba(242, 38, 19, 0.9)"};
  color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

// 組合方案 - 隱藏佔位元素
const MessagePlaceholder = styled.div`
  height: 35px;
  margin-top: 1rem;
  visibility: hidden;
  opacity: 0;
`;

// 組合方案 - 浮動消息
const FloatingMessage = styled(StatusMessage)`
  position: absolute;
  z-index: 10;
  bottom: -20px;
  left: 0;
  width: 100%;
  transform: translateY(0);
  animation: ${(props) => (props.fadeOut ? "fadeSlideOut" : "fadeSlideIn")} 0.4s
    ease forwards;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

/**
 * 優化後的WTFape NFT鑄造頁面
 * 移除了多餘的模糊、動畫和陰影效果，以減輕GPU負擔
 * @returns {JSX.Element} 鑄造頁面組件
 */
const MintWTFape = () => {
  // 狀態管理
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tokenId, setTokenId] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState({
    visible: false,
    success: false,
    fadeOut: false,
    message: "",
  });
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const pricePerNFT = 0.18; // ETH價格
  const totalSupply = 10000; // 總供應量
  const mintedAmount = 4579; // 已鑄造數量（示例）
  const mintProgress = `${((mintedAmount / totalSupply) * 100).toFixed(1)}%`; // 鑄造進度

  // 模擬NFT特徵（實際項目中應從API獲取）
  const nftFeatures = [
    { name: "レア度", value: "エピック" },
    { name: "背景", value: "オレンジ" },
    { name: "皮膚", value: "グレー" },
    { name: "目", value: "X印" },
    { name: "服装", value: "ストライプ" },
  ];

  // 初始化TokenID
  useEffect(() => {
    if (tokenId === "" && nftData && nftData.length > 0) {
      setTokenId(nftData[currentIndex].tokenId);
    }
  }, []);

  // 當currentIndex變化時更新tokenId
  useEffect(() => {
    if (nftData && nftData.length > 0) {
      setTokenId(nftData[currentIndex].tokenId);
    }
  }, [currentIndex]);

  // 獲取並處理NFT圖片
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        setImageLoading(true);

        // 使用getNFTImageUrl函數獲取處理後的圖片URL
        const imageResult = await getNFTImageUrl(nftData[currentIndex]);

        if (imageResult.url) {
          setProcessedImageUrl(imageResult.url);
        } else {
          setProcessedImageUrl(nftData[currentIndex].image);
        }
      } catch (error) {
        console.error(`獲取NFT圖片失敗: ${error.message}`);
        setProcessedImageUrl(nftData[currentIndex].image);
      } finally {
        setImageLoading(false);
      }
    };

    fetchImageUrl();
  }, [currentIndex]);

  // 處理TokenID輸入
  const handleTokenIdChange = (e) => {
    // 只允許輸入數字，並限制範圍為0-9999
    let value = e.target.value.replace(/[^0-9]/g, "");

    // 如果輸入的數字大於9999，則截斷為9999
    if (value !== "" && parseInt(value) > 9999) {
      value = "9999";
    }

    setTokenId(value);

    // 嘗試根據輸入的tokenId找到對應的NFT
    const index = nftData.findIndex((nft) => nft.tokenId === value);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  // 處理導航按鈕
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : nftData.length - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % nftData.length;
    setCurrentIndex(newIndex);
  };

  // 隨機預覽
  const handleRandomPreview = () => {
    const randomIndex = Math.floor(Math.random() * nftData.length);
    setCurrentIndex(randomIndex);
  };

  // 處理鑄造NFT
  const handleMint = async () => {
    setIsMinting(true);
    setMintStatus({
      visible: false,
      success: false,
      fadeOut: false,
      message: "",
    });

    try {
      // 模擬鑄造過程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模擬成功鑄造
      setMintStatus({
        visible: true,
        success: true,
        fadeOut: false,
        message: `おめでとうございます！TokenID: ${tokenId}のWTFape NFTのミントに成功しました。`,
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setMintStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setMintStatus({
          visible: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);
    } catch (error) {
      setMintStatus({
        visible: true,
        success: false,
        fadeOut: false,
        message:
          "ミントに失敗しました。ウォレットの接続を確認して再試行してください。",
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setMintStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setMintStatus({
          visible: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);
    } finally {
      setIsMinting(false);
    }
  };

  // 移除不必要的控制台日誌以提高性能
  return (
    <MintPageContainer>
      <BackgroundDecoration />
      <ContentWrapper>
        <HeaderSection>
          <h1>
            <GradientText
              fontSize="2.5rem"
              height="60"
              maxWidth="600px"
              centered
              fontWeight="700"
            >
              WTFape NFTをミントする
            </GradientText>
          </h1>
          <Description>
            WTFapeは10,000個のユニークに生成されたアートコレクションです。各WTFapeは一意であり、特別な属性と特徴を持っています。
          </Description>
        </HeaderSection>

        <MintCard>
          <MintCardGrid>
            {/* 左側：NFT展示區域 */}
            <ShowcaseSection>
              <NFTImageContainer>
                <IPFSImage
                  src={processedImageUrl || nftData[currentIndex].image}
                  alt={`WTFape #${tokenId || "?"}`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  errorText="画像を読み込めません"
                  borderRadius="16px"
                  backgroundColor="rgba(15, 18, 31, 0.8)"
                  hoverEffect={false} // 禁用懸停效果以減少 GPU 負擔
                />
              </NFTImageContainer>

              {/* 收藏統計信息 */}
              <CollectionInfoCard>
                <CollectionTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  WTFape コレクション
                </CollectionTitle>
                <CollectionStatsList>
                  <CollectionStat>
                    <StatValue>{totalSupply.toLocaleString()}</StatValue>
                    <StatLabel>総供給量</StatLabel>
                  </CollectionStat>
                  <CollectionStat>
                    <StatValue>{mintedAmount.toLocaleString()}</StatValue>
                    <StatLabel>ミント済み</StatLabel>
                  </CollectionStat>
                </CollectionStatsList>
              </CollectionInfoCard>

              {/* 鑄造進度條 */}
              <MintProgressContainer>
                <MintProgressLabel>
                  <span>ミント進捗</span>
                  <span>
                    {mintedAmount.toLocaleString()} /{" "}
                    {totalSupply.toLocaleString()}
                  </span>
                </MintProgressLabel>
                <MintProgressBar progress={mintProgress} />
              </MintProgressContainer>

              <NavigationControls>
                <OutlineButton direction="prev" onClick={handlePrevious}>
                  <NavButtonIcon direction="prev">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="18"
                      height="18"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </NavButtonIcon>
                  前のNFT
                </OutlineButton>

                <OutlineButton onClick={handleRandomPreview}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                  </svg>
                  ランダム
                </OutlineButton>

                <OutlineButton direction="next" onClick={handleNext}>
                  次のNFT
                  <NavButtonIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="18"
                      height="18"
                    >
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </NavButtonIcon>
                </OutlineButton>
              </NavigationControls>
            </ShowcaseSection>

            {/* 右側：詳情和鑄造區域 */}
            <DetailsSection>
              <InfoHeader>
                <NFTTitleContainer>
                  <GradientText
                    fontSize="1.8rem"
                    height="40"
                    maxWidth="100%"
                    fontWeight="700"
                  >
                    WTFape #{tokenId || "?"}
                  </GradientText>
                </NFTTitleContainer>

                <NFTDescriptionText>
                  WTFapeを所有すると、アートワークの完全な所有権と、コミュニティイベントや将来のプロジェクトエアドロップに参加する特権が得られます。
                </NFTDescriptionText>

                {/* 社區信息卡片 - 替換重複的收藏信息 */}
                <CollectionInfoCard>
                  <CollectionTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    コミュニティ情報
                  </CollectionTitle>
                  <CollectionStatsList>
                    <CollectionStat>
                      <StatValue>1.2K+</StatValue>
                      <StatLabel>ディスコードメンバー</StatLabel>
                    </CollectionStat>
                    <CollectionStat>
                      <StatValue>ウィークリー</StatValue>
                      <StatLabel>コミュニティイベント</StatLabel>
                    </CollectionStat>
                  </CollectionStatsList>
                </CollectionInfoCard>

                <FeaturesContainer>
                  <FeaturesTitle>特徴</FeaturesTitle>
                  <FeaturesList>
                    {nftFeatures.map((feature, index) => (
                      <FeatureItem key={index}>
                        <FeatureName>{feature.name}</FeatureName>
                        <FeatureValue>{feature.value}</FeatureValue>
                      </FeatureItem>
                    ))}
                  </FeaturesList>
                </FeaturesContainer>

                <TokenIdInputContainer
                  style={{ border: "1px solid rgba(106, 17, 203, 0.2)" }}
                >
                  <TokenIdLabel>Token ID:</TokenIdLabel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "50%",
                      marginLeft: "auto",
                    }}
                  >
                    <CustomInput
                      value={tokenId}
                      onChange={handleTokenIdChange}
                      autoComplete="off"
                      style={{
                        border: "2px solid #6a11cb",
                        background: "rgba(15, 18, 31, 0.8)",
                        textAlign: "right",
                        width: "100px",
                        padding: "8px 12px",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        borderRadius: "4px",
                        color: "white",
                      }}
                    />
                  </div>
                </TokenIdInputContainer>

                <PriceInfoContainer>
                  <PriceLabel>価格:</PriceLabel>
                  <PriceValue style={{ paddingRight: "12px" }}>
                    <EthSymbol
                      style={{
                        fontSize: "1.2rem",
                        marginRight: "5px",
                      }}
                    >
                      Ξ
                    </EthSymbol>
                    {pricePerNFT.toFixed(2)} ETH
                  </PriceValue>
                </PriceInfoContainer>
              </InfoHeader>

              <ActionArea>
                <PrimaryButton
                  fullWidth
                  disabled={isMinting}
                  onClick={handleMint}
                  style={{
                    height: "45px",
                    fontSize: "1rem",
                    boxShadow: "0 4px 8px rgba(106, 17, 203, 0.15)", // 減輕陰影
                    marginTop: "auto" /* 調整位置，使其與左側按鈕上下對齊 */,
                  }}
                >
                  {isMinting ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          animation: "spin 1s linear infinite",
                          marginRight: "8px",
                        }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      ミント処理中...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: "8px" }}
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      このWTFapeをミントする
                    </>
                  )}
                </PrimaryButton>

                {mintStatus.visible && (
                  <FixedStatusMessage
                    success={mintStatus.success}
                    fullWidth
                    noArrow
                    fadeOut={mintStatus.fadeOut}
                  >
                    {mintStatus.message}
                  </FixedStatusMessage>
                )}
              </ActionArea>
            </DetailsSection>
          </MintCardGrid>
        </MintCard>
      </ContentWrapper>
    </MintPageContainer>
  );
};

export default MintWTFape;
