import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import MarketFilters from "../../components/Filters/MarketFilters";
import ListNFTSection from "./components/ListNFTSection";
import { marketNFTs } from "../../data/mockData";
import { HeroSection } from "../../components/styled";
import { OutlineButton } from "../../components/styled/Button";
import SectionTitle from "../../components/styled/SectionTitle";

// 更稳定的容器
const HomeContainer = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  transform: translate3d(0, 0, 0); // 强制GPU加速
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
`;

const MarketContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
  transform: translateZ(0);
  will-change: transform;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

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

  // 将集合缓存为useMemo
  const collections = useMemo(() => {
    return [...new Set(marketNFTs.map((nft) => nft.collection))];
  }, []);

  // 优化过滤和排序逻辑
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

  // 更新搜索词的处理程序
  const updateSearchTerm = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 更新排序的处理程序
  const updateSortBy = useCallback((value) => {
    setSortBy(value);
  }, []);

  // 更新收藏过滤器的处理程序
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

  // 创建渲染状态的函数，避免在JSX中定义函数
  const renderNftStatus = useCallback(
    (nft) => {
      if (purchaseStatus.show && purchaseStatus.nftId === nft.id) {
        return {
          success: purchaseStatus.success,
          message: purchaseStatus.success ? "購入成功！" : "購入失敗",
          fadeOut: purchaseStatus.fadeOut,
        };
      }
      return null;
    },
    [purchaseStatus]
  );

  return (
    <HomeContainer>
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

      {activeTab === "list" ? (
        <ListNFTSection />
      ) : (
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
      )}
    </HomeContainer>
  );
};

export default Home;
