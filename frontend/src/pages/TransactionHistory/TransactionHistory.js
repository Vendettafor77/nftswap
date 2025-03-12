import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { HeroSection } from "../../components/styled";
import FilterBar from "../../components/Filters/FilterBar";
import TransactionCard from "./components/TransactionCard";
import { mockTransactions } from "../../data/mockData"; // 暫時使用模擬數據

// 與現有頁面一致的佈局容器
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
  /* 確保滾動條不會導致布局偏移 */
  padding-right: calc(${(props) => props.theme.spacing.xl} + 6px);
  padding-top: 0; /* 移除頂部間距 */
  margin-top: ${(props) => props.theme.spacing.lg}; /* 添加頂部外邊距 */
`;

// 與MyNFTs頁面類似的標題區域
const PageHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
  padding-top: 0; /* 移除頂部間距 */
`;

const Title = styled.h1`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

// 使用與NFTCard相同的SVG漸變文字
const GradientTitle = ({ children }) => {
  const uniqueId = `transaction-title-gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <svg
      width="100%"
      height="60"
      style={{
        maxWidth: "400px",
        overflow: "visible",
        filter: "drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",
      }}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="45"
        fill={`url(#${uniqueId})`}
        fontWeight="600"
        fontSize="2.5rem"
        fontFamily="inherit"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "inherit",
          textRendering: "optimizeLegibility",
          shapeRendering: "geometricPrecision",
          opacity: "0.95",
        }}
      >
        {children}
      </text>
    </svg>
  );
};

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

// 交易列表容器
const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

// 空狀態顯示（復用NFTGrid中的樣式）
const EmptyState = styled.div`
  text-align: center;
  padding: 80px 30px;
  color: ${(props) => props.theme.colors.text.secondary};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${(props) => props.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.7;
  }
`;

// 空狀態的漸變標題
const EmptyGradientTitle = ({ children }) => {
  const uniqueId = `empty-title-gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <svg
      width="100%"
      height="40"
      style={{
        maxWidth: "300px",
        overflow: "visible",
        filter: "drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",
      }}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="30"
        fill={`url(#${uniqueId})`}
        fontWeight="600"
        fontSize="1.8rem"
        fontFamily="inherit"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "inherit",
          textRendering: "optimizeLegibility",
          shapeRendering: "geometricPrecision",
          opacity: "0.95",
        }}
      >
        {children}
      </text>
    </svg>
  );
};

/**
 * 交易記錄頁面組件
 * @returns {JSX.Element} 交易記錄頁面
 */
const TransactionHistory = () => {
  // 篩選狀態
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 更新篩選條件的處理函數
  const updateSearchTerm = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const updateTypeFilter = useCallback((value) => {
    setTypeFilter(value);
  }, []);

  const updateSortBy = useCallback((value) => {
    setSortBy(value);
  }, []);

  // 篩選交易記錄
  const filteredTransactions = useMemo(() => {
    return mockTransactions
      .filter((tx) => {
        // 根據搜索詞篩選
        if (
          searchTerm &&
          !tx.nftName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }
        // 根據交易類型篩選
        if (typeFilter !== "all" && tx.type !== typeFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        // 根據排序選項排序
        if (sortBy === "price_high") return b.price - a.price;
        if (sortBy === "price_low") return a.price - b.price;
        // 默認按時間排序（最新的在前）
        return new Date(b.date) - new Date(a.date);
      });
  }, [searchTerm, typeFilter, sortBy]);

  return (
    <PageContainer className="content-container">
      <PageHeader>
        <Title>
          <GradientTitle>取引履歴</GradientTitle>
        </Title>
        <Description>
          あなたのNFT取引履歴を閲覧できます。購入、出品、鋳造、転送などのすべての活動を確認してください。
        </Description>
      </PageHeader>

      {/* 篩選器（使用通用FilterBar組件） */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={updateSearchTerm}
        searchPlaceholder="NFTを検索..."
        filters={[
          {
            value: typeFilter,
            options: [
              { value: "all", label: "すべての取引" },
              { value: "purchase", label: "購入" },
              { value: "sale", label: "販売" },
              { value: "mint", label: "鋳造" },
              { value: "transfer", label: "転送" },
            ],
            onChange: updateTypeFilter,
          },
          {
            value: sortBy,
            options: [
              { value: "recent", label: "最新順" },
              { value: "price_high", label: "価格（高い順）" },
              { value: "price_low", label: "価格（安い順）" },
            ],
            onChange: updateSortBy,
          },
        ]}
      />

      {/* 交易列表 */}
      <TransactionsList>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <EmptyState>
            <h3>
              <EmptyGradientTitle>取引記録が見つかりません</EmptyGradientTitle>
            </h3>
            <p>検索条件を変更してお試しください。</p>
          </EmptyState>
        )}
      </TransactionsList>
    </PageContainer>
  );
};

export default TransactionHistory;
