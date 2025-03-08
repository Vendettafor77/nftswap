import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import MarketFilters from "../../components/Filters/MarketFilters";
import ListNFTSection from "./components/ListNFTSection";
import { marketNFTs } from "../../data/mockData";
import { HeroSection } from "../../components/styled";
import { OutlineButton } from "../../components/styled/Button";
import SectionTitle from "../../components/styled/SectionTitle";

// 頁面主容器
const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
`;

// 固定寬度的主內容區域
const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg} 0;
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
  padding-top: 0;
  margin-top: 0;

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

// 側邊欄標題 - 增加右側內間距
const SidebarTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: 1.2rem;
  padding-top: 0;
  width: 100%; /* 確保完全填充 */
  text-align: left; /* 左對齊 */
  padding-left: ${(props) => props.theme.spacing.sm}; /* 統一左側間距 */
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

// 小型NFT圖片
const NFTThumb = styled.img`
  width: 36px;
  height: 36px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  object-fit: cover;
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
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
        return parseInt(b.id) - parseInt(a.id);
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
      setPurchaseStatus({
        show: true,
        nftId: nft.id,
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
        nftId: nft.id,
        success: false,
        fadeOut: false,
      });
    }
  }, []);

  // 創建渲染狀態的函數，避免在JSX中定義函數
  const renderNftStatus = useCallback(
    (nft) => {
      if (purchaseStatus.show && purchaseStatus.nftId === nft.id) {
        return {
          success: purchaseStatus.success,
          message: purchaseStatus.success ? "購入成功！" : "購入失敗",
          fadeOut: purchaseStatus.fadeOut,
          style: { width: "100%" }, // 設置提示消息寬度為100%
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
          <SidebarTitle>マーケット情報</SidebarTitle>

          {/* 市場統計數據 */}
          <StatItem>
            <StatLabel>総NFT数:</StatLabel>
            <StatValue>{marketNFTs.length}点</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>表示中:</StatLabel>
            <StatValue>{filteredNFTs.length}点</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>コレクション数:</StatLabel>
            <StatValue>{collections.length}</StatValue>
          </StatItem>

          {/* 熱門NFT */}
          <SectionHeading>人気のNFT</SectionHeading>
          <PopularNFTList>
            {popularNFTs.map((nft) => (
              <NFTListItem key={nft.id}>
                <NFTThumb src={nft.image} alt={nft.name} />
                <NFTInfo>
                  <NFTName>{nft.name}</NFTName>
                  <NFTPrice>
                    <EthSymbol>Ξ</EthSymbol>
                    {nft.price}
                  </NFTPrice>
                </NFTInfo>
              </NFTListItem>
            ))}
          </PopularNFTList>

          {/* 活動信息 */}
          <SectionHeading>最新情報</SectionHeading>
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
      return <ListNFTSection.Form />;
    }
  };

  return (
    <HomeContainer>
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
            active={activeTab === "marketplace"}
            onClick={() => setActiveTab("marketplace")}
          >
            NFTを閲覧・購入
          </OutlineButton>
          <OutlineButton
            active={activeTab === "list"}
            onClick={() => setActiveTab("list")}
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
                <MarketFilters
                  searchTerm={searchTerm}
                  onSearchChange={updateSearchTerm}
                  sortBy={sortBy}
                  onSortChange={updateSortBy}
                  collectionFilter={collectionFilter}
                  onCollectionChange={updateCollectionFilter}
                  collections={collections}
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
