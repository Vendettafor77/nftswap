import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import NFTGrid from "../../../components/NFTGrid/NFTGrid";
import { myNFTs } from "../../../data/mockData";
import { PrimaryButton } from "../../../components/styled/Button";
import ListNFTForm from "./ListNFTForm";

// 全局共享的選中NFT狀態（使用useRef替代普通對象）
export const selectedNFTRef = React.createRef();

const Section = styled.div`
  transform: translateZ(0);
  margin-top: 0; /* 確保與主頁卡片部分對齊 */
  width: 100%;
`;

// 搜索欄容器
const FiltersContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing.md};
  width: 100%;
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 12px 16px;
  box-sizing: border-box;
`;

// 搜索輸入框行
const SearchRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// 搜索輸入框
const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  width: 180px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}99;
  }
`;

// 標準網格布局
const StandardGridLayout = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;

// 特殊樣式的選中按鈕 - 確保與普通按鈕尺寸一致
const SelectedButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #ff0080, #7928ca);
  height: 36px; /* 確保固定高度 */
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
  height: 36px;
  font-size: 0.95rem;
  max-width: 100%;
  box-sizing: border-box;
`;

// 包裝器包裹按鈕 - 確保固定尺寸
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  height: 36px; /* 確保固定高度 */
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

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
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
    <Section>
      <FiltersContainer>
        <SearchRow>
          <SearchInput
            placeholder="所持NFTを検索..."
            value={searchTerm}
            onChange={handleSearchChange}
            spellCheck="false"
            autoComplete="off"
          />
        </SearchRow>
      </FiltersContainer>

      <StandardGridLayout>
        <NFTGrid
          items={filteredNFTs}
          renderActionButton={renderActionButton}
          onItemAction={onAction}
          selectedNFT={selectedNFT}
        />
      </StandardGridLayout>
    </Section>
  );
};

// 添加Form作為子組件，方便獨立使用
ListNFTSection.Form = ListNFTForm;

export default ListNFTSection;
