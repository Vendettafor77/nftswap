import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import NFTGrid from "../../../components/NFTGrid/NFTGrid";
import { myNFTs } from "../../../data/mockData";
import { PrimaryButton } from "../../../components/styled/Button";
import ListNFTForm from "./ListNFTForm";
import { selectedNFTRef } from "./sharedState";
import FilterBar from "../../../components/Filters/FilterBar";

const Section = styled.div`
  transform: translateZ(0);
  margin-top: 0; /* 確保與主頁卡片部分對齊 */
  width: 100%;
  position: relative; /* 確保內部絕對定位元素有參考點 */

  /* 只有在獨立顯示時才應用這些樣式 */
  ${(props) =>
    props.standalone &&
    `
    background: rgba(28, 34, 65, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: ${props.theme.borderRadius.medium};
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  `}
`;

// 特殊樣式的選中按鈕 - 確保與普通按鈕尺寸一致
const SelectedButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #ff0080, #7928ca);
  height: 45px; /* 確保固定高度 */
  font-size: 0.95rem;
  max-width: 100%;
  box-sizing: border-box;

  &:hover {
    background: linear-gradient(90deg, #ff0080, #7928ca);
    box-shadow: 0 6px 14px rgba(255, 0, 128, 0.4);
  }
`;

// 標準按鈕樣式
const StandardButton = styled(PrimaryButton)`
  height: 45px;
  font-size: 0.95rem;
  max-width: 100%;
  box-sizing: border-box;
`;

// 包裝器包裹按鈕 - 確保固定尺寸
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  height: 45px; /* 確保固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * NFT出品頁面組件
 * @param {Object} props - 組件屬性
 * @param {Boolean} props.standalone - 是否獨立使用
 * @returns {JSX.Element} 出品頁面組件
 */
const ListNFTSection = ({ standalone = true }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNFTs = myNFTs.filter((nft) =>
    searchTerm
      ? nft.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 同步選中狀態
  useEffect(() => {
    // 監聽清除事件
    const handleNFTCleared = () => {
      setSelectedNFT(null);
    };

    // 初始載入時檢查是否有預選的NFT
    if (selectedNFTRef.current && !selectedNFT) {
      setSelectedNFT(selectedNFTRef.current);
    }

    window.addEventListener("nft-cleared", handleNFTCleared);

    return () => {
      window.removeEventListener("nft-cleared", handleNFTCleared);
    };
  }, [selectedNFT]);

  // 渲染按鈕函數 - 使用React.memo優化性能
  const renderActionButton = useCallback(
    (nft) => {
      const isSelected = selectedNFT?.tokenId === nft.tokenId;
      return (
        <ButtonWrapper>
          {isSelected ? (
            <SelectedButton fullWidth>選択済み</SelectedButton>
          ) : (
            <StandardButton fullWidth>選択する</StandardButton>
          )}
        </ButtonWrapper>
      );
    },
    [selectedNFT]
  );

  const onAction = (nft) => {
    if (selectedNFT?.tokenId === nft.tokenId) {
      // 取消選中（等同clear操作）
      setSelectedNFT(null);
      selectedNFTRef.current = null;

      // 觸發自定義事件通知其他組件
      window.dispatchEvent(new CustomEvent("nft-cleared"));
    } else {
      // 選中新NFT
      setSelectedNFT(nft);
      selectedNFTRef.current = nft;

      // 觸發自定義事件通知其他組件
      window.dispatchEvent(new CustomEvent("nft-selected"));
    }
  };

  return (
    <Section standalone={standalone}>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="NFTを検索..."
        filters={[
          {
            value: "invisible1",
            options: [{ value: "invisible1", label: " " }],
            onChange: () => {},
            className: "invisible-filter",
          },
          {
            value: "invisible2",
            options: [{ value: "invisible2", label: " " }],
            onChange: () => {},
            className: "invisible-filter",
          },
        ]}
      />
      <NFTGrid
        items={filteredNFTs}
        actionText="選択する"
        renderActionButton={renderActionButton}
        onItemAction={onAction}
        selectedNFT={selectedNFT}
      />
    </Section>
  );
};

// 添加Form作為子組件，方便獨立使用
ListNFTSection.Form = ListNFTForm;

export default ListNFTSection;
