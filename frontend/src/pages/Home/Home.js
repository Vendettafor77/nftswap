import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import FilterBar from "../../components/Filters/FilterBar";
import ListNFTSection from "./components/ListNFTSection";
import { marketNFTs } from "../../data/mockData";
import { HeroSection } from "../../components/styled";
import { OutlineButton } from "../../components/styled/Button";
import SectionTitle from "../../components/styled/SectionTitle";
import ListNFTForm from "./components/ListNFTForm";
import GradientText from "../../components/styled/GradientText";
import { useLocation, useNavigate } from "react-router-dom";
import IPFSImage from "../../components/IPFSImage";
import { getNFTImageUrl } from "../../utils/ipfsUtils";

// 頁面主容器
const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  /* 應用全局樣式 */
  &.content-container {
    /* 補償滾動條寬度 */
    width: 100%;
    padding-right: calc(20px + 6px); /* 原始padding + 滾動條寬度 */
    box-sizing: border-box;
  }
`;

// 固定寬度的主內容區域
const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
`;

// 標簽切換容器
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// 分離式頁面布局
const PageLayout = styled.div`
  display: flex;
  gap: 30px;
  position: relative;
  align-items: flex-start;
  margin-top: ${(props) => props.theme.spacing.md};
  box-sizing: border-box;

  /* 確保在小屏幕上變為垂直排列 */
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

// 主要內容區（卡片區域）- 固定寬度
const CardSection = styled.div`
  flex: 1;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 移除内边距，确保搜索栏和NFT卡片网格对齐 */
  margin: 0; /* 移除外边距，确保搜索栏和NFT卡片网格对齐 */
  /* 確保內容區高度一致 */
  min-height: 70vh;

  @media (max-width: 1100px) {
    order: 2;
  }
`;

// 側邊欄區域 - 調整寬度
const SidebarSection = styled.div`
  width: 300px; /* 減少寬度 */
  flex-shrink: 0;
  position: relative;
  margin-top: 0;
  padding-top: 0;
  box-sizing: border-box;
  height: 100%;

  @media (max-width: 1100px) {
    width: 100%;
    order: 1;
  }
`;

// 固定位置的側邊欄 - 內容右移
const StickySidebar = styled.div`
  position: sticky;
  top: 20px;
  padding: ${(props) => props.theme.spacing.md};
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0;
`;

// 側邊欄標題 - 增加顯眼度
const SidebarTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: 1.4rem;
  padding-top: 0;
  width: 100%; /* 確保完全填充 */
  text-align: center; /* 居中對齊 */
  font-weight: 600;
`;

// 統計項目 - 增加內間距和對齊
const StatItem = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.xs} 0;
  width: 100%; /* 確保完全填充 */
  padding-left: ${(props) => props.theme.spacing.sm}; /* 左側間距 */
  display: flex;
  justify-content: space-between; /* 標籤和值兩端對齊 */
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 統計標籤
const StatLabel = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// 統計數值
const StatValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-right: ${(props) => props.theme.spacing.sm}; /* 右側間距 */
`;

// 區塊標題 - 增加內間距
const SectionHeading = styled.h4`
  font-size: 1rem;
  margin: ${(props) => props.theme.spacing.md} 0
    ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: ${(props) => props.theme.spacing.xs};
  padding-top: ${(props) => props.theme.spacing.sm};
  width: 100%; /* 確保完全填充 */
  padding-left: ${(props) => props.theme.spacing.sm}; /* 左側間距 */
`;

// 熱門NFT列表 - 增加內間距
const PopularNFTList = styled.div`
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  width: 100%; /* 確保完全填充 */
  padding-left: ${(props) => props.theme.spacing.sm}; /* 左側間距 */
`;

// NFT列表項
const NFTListItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }
`;

// 小型NFT圖片容器
const NFTThumbContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  overflow: hidden;
  margin-right: ${(props) => props.theme.spacing.sm};
`;

// NFT信息
const NFTInfo = styled.div`
  flex: 1;
`;

// NFT名稱
const NFTName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// NFT價格
const NFTPrice = styled.div`
  font-size: 0.8rem;
  color: white;
  display: flex;
  align-items: center;
`;

// ETH符號
const EthSymbol = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #00ff9d;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 3px;
`;

const MarketContainer = styled.div`
  margin-top: 0; /* 移除上边距，确保搜索栏和右侧菜单对齐 */
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 移除内边距，确保搜索栏和NFT卡片网格对齐 */
`;

/**
 * 主頁組件
 * @returns {JSX.Element} 主頁
 */
const Home = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [purchaseStatus, setPurchaseStatus] = useState({
    show: false,
    nftId: null,
    success: false,
    fadeOut: false,
  });

  // 從URL中獲取查詢參數
  const location = useLocation();
  const navigate = useNavigate();

  // 在組件掛載時從URL讀取tab參數
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    // 如果URL中包含有效的標籤參數，則設置為當前標籤
    if (tabParam === "listnft" || tabParam === "marketplace") {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // 處理標籤切換的函數，更新URL
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);

    // 更新URL，不刷新頁面
    navigate(`/?tab=${tabName}`, { replace: true });
  };

  // 將集合緩存為useMemo
  const collections = useMemo(() => {
    return [...new Set(marketNFTs.map((nft) => nft.collection))];
  }, []);

  // 獲取熱門NFT
  const popularNFTs = useMemo(() => {
    return [...marketNFTs]
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      .slice(0, 3);
  }, []);

  // 存儲處理後的NFT圖片URL
  const [processedImageUrls, setProcessedImageUrls] = useState({});

  // 在組件掛載時預處理熱門NFT的圖片URL
  useEffect(() => {
    const fetchPopularNFTImages = async () => {
      const imageUrlsMap = {};

      // 使用Promise.all同時處理所有熱門NFT的圖片
      await Promise.all(
        popularNFTs.map(async (nft) => {
          try {
            // 使用getNFTImageUrl函數獲取正確的圖片URL
            const imageResult = await getNFTImageUrl(nft);
            if (imageResult.url) {
              imageUrlsMap[nft.tokenId] = imageResult.url;
            } else {
              // 如果無法獲取，則使用原始圖片作為後備
              imageUrlsMap[nft.tokenId] = nft.image;
            }
          } catch (error) {
            console.error(`獲取NFT #${nft.tokenId}圖片失敗:`, error);
            imageUrlsMap[nft.tokenId] = nft.image;
          }
        })
      );

      setProcessedImageUrls(imageUrlsMap);
    };

    fetchPopularNFTImages();
  }, [popularNFTs]);

  // 優化過濾和排序邏輯
  const filteredNFTs = useMemo(() => {
    return marketNFTs
      .filter((nft) => {
        if (
          searchTerm &&
          !nft.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }
        if (collectionFilter !== "all" && nft.collection !== collectionFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_low")
          return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === "price_high")
          return parseFloat(b.price) - parseFloat(a.price);
        return parseInt(b.tokenId || "0") - parseInt(a.tokenId || "0");
      });
  }, [searchTerm, collectionFilter, sortBy]);

  // 更新搜索詞的處理程序
  const updateSearchTerm = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 更新排序的處理程序
  const updateSortBy = useCallback((value) => {
    setSortBy(value);
  }, []);

  // 更新收藏過濾器的處理程序
  const updateCollectionFilter = useCallback((value) => {
    setCollectionFilter(value);
  }, []);

  const handleBuy = useCallback(async (nft) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // 儲存購買狀態時使用tokenId，保持一致性
      setPurchaseStatus({
        show: true,
        nftId: nft.tokenId, // 只使用tokenId
        success: true,
        fadeOut: false,
      });

      // 2秒後開始淡出動畫
      setTimeout(() => {
        setPurchaseStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 2000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setPurchaseStatus({
          show: false,
          nftId: null,
          success: false,
          fadeOut: false,
        });
      }, 2400);
    } catch (error) {
      setPurchaseStatus({
        show: true,
        nftId: nft.tokenId, // 只使用tokenId
        success: false,
        fadeOut: false,
      });
    }
  }, []);

  // 創建渲染狀態的函數，避免在JSX中定義函數
  const renderNftStatus = useCallback(
    (nft) => {
      // 確保進行正確的ID比較，只使用tokenId進行匹配
      const nftIdentifier = nft.tokenId;
      const statusIdentifier = purchaseStatus.nftId;

      if (purchaseStatus.show && statusIdentifier === nftIdentifier) {
        return {
          success: purchaseStatus.success,
          message: purchaseStatus.success ? "購入成功！" : "購入失敗",
          fadeOut: purchaseStatus.fadeOut,
          style: {
            width: "100%", // 設置提示消息寬度為100%
            textAlign: "center", // 確保文字居中
            display: "flex",
            justifyContent: "center", // 確保內容水平居中
            alignItems: "center", // 確保內容垂直居中
          },
          centered: true, // 使用StatusMessage的centered屬性
          noArrow: false, // 顯示頂部箭頭
        };
      }
      return null;
    },
    [purchaseStatus]
  );

  // 渲染側邊欄內容
  const renderSidebarContent = () => {
    if (activeTab === "marketplace") {
      return (
        <>
          <SidebarTitle>
            <GradientText
              fontSize="1.4rem"
              height="30"
              centered={true}
              id="sidebar-title"
            >
              マーケット情報
            </GradientText>
          </SidebarTitle>
          <StatItem>
            <StatLabel>総上場数:</StatLabel>
            <StatValue>{marketNFTs.length}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>平均価格:</StatLabel>
            <StatValue>
              <EthSymbol>Ξ</EthSymbol> 1.25
            </StatValue>
          </StatItem>

          {/* 熱門NFT */}
          <SectionHeading>人気のNFT</SectionHeading>
          <PopularNFTList>
            {popularNFTs.map((nft) => (
              <NFTListItem key={nft.tokenId}>
                <NFTThumbContainer>
                  <IPFSImage
                    src={processedImageUrls[nft.tokenId] || nft.image}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                  />
                </NFTThumbContainer>
                <NFTInfo>
                  <NFTName>
                    <GradientText
                      fontSize="0.9rem"
                      height="18"
                      fontWeight="500"
                      id={`nft-name-${nft.tokenId}`}
                    >
                      {nft.name}
                    </GradientText>
                  </NFTName>
                  <NFTPrice>
                    <EthSymbol>Ξ</EthSymbol>
                    {nft.price}
                  </NFTPrice>
                </NFTInfo>
              </NFTListItem>
            ))}
          </PopularNFTList>

          <StatItem>
            <StatLabel>次回のドロップ:</StatLabel>
            <StatValue>3日後</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>取引量(24h):</StatLabel>
            <StatValue>
              <EthSymbol>Ξ</EthSymbol> 32.5
            </StatValue>
          </StatItem>
        </>
      );
    } else {
      // 直接返回ListNFTForm組件，而不是通過ListNFTSection.Form間接引用
      return <ListNFTForm />;
    }
  };

  return (
    <HomeContainer className="content-container">
      <MainContent>
        <HeroSection>
          <h1>NFTマーケットプレイスへようこそ</h1>
          <p>
            安全かつ簡単にNFTを売買できるプラットフォーム。
            スマートコントラクトにより、信頼性の高い取引を実現します。
          </p>
        </HeroSection>

        <TabsContainer>
          <OutlineButton
            $active={activeTab === "marketplace"}
            onClick={() => handleTabChange("marketplace")}
            $gradient={activeTab === "marketplace"}
          >
            マーケットプレイス
          </OutlineButton>
          <OutlineButton
            $active={activeTab === "listnft"}
            onClick={() => handleTabChange("listnft")}
            $gradient={activeTab === "listnft"}
          >
            NFTを出品する
          </OutlineButton>
        </TabsContainer>

        {/* 分離式布局：卡片區和側邊欄 */}
        <PageLayout>
          {/* 卡片區域 */}
          <CardSection>
            {activeTab === "marketplace" ? (
              <MarketContainer>
                <FilterBar
                  searchTerm={searchTerm}
                  onSearchChange={updateSearchTerm}
                  searchPlaceholder="NFTを検索..."
                  filters={[
                    {
                      value: collectionFilter,
                      options: [
                        { value: "all", label: "すべてのコレクション" },
                        ...collections.map((collection) => ({
                          value: collection,
                          label: collection,
                        })),
                      ],
                      onChange: updateCollectionFilter,
                    },
                    {
                      value: sortBy,
                      options: [
                        { value: "recent", label: "最新順" },
                        { value: "price_low", label: "価格（安い順）" },
                        { value: "price_high", label: "価格（高い順）" },
                      ],
                      onChange: updateSortBy,
                    },
                  ]}
                />
                <NFTGrid
                  items={filteredNFTs}
                  actionText="購入する"
                  onItemAction={handleBuy}
                  renderStatus={renderNftStatus}
                />
              </MarketContainer>
            ) : (
              <ListNFTSection standalone={false} />
            )}
          </CardSection>

          {/* 側邊欄 */}
          <SidebarSection>
            <StickySidebar>{renderSidebarContent()}</StickySidebar>
          </SidebarSection>
        </PageLayout>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
