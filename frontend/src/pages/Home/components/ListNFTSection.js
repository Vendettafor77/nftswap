import React, { useState, useCallback, useEffect, useRef } from "react";
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
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  &:hover {
    background: linear-gradient(90deg, #ff0080, #7928ca);
    box-shadow: 0 6px 14px rgba(255, 0, 128, 0.4);
  }
`;

// 標準按鈕樣式
const StandardButton = styled(PrimaryButton)`
  height: 45px;
  font-size: 0.95rem;
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

// 包裝器包裹按鈕 - 確保固定尺寸
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0; /* 添加margin: 0确保没有外边距 */
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
  // 添加一個參考，用於存儲NFT網格的DOM元素
  const nftGridRef = useRef(null);

  const filteredNFTs = myNFTs.filter((nft) =>
    searchTerm
      ? nft.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 滾動到選中的NFT
  const scrollToSelectedNFT = useCallback(() => {
    console.log("嘗試滾動到選中的NFT:", selectedNFT?.tokenId);
    if (selectedNFT && nftGridRef.current) {
      // 尋找選中NFT的元素
      const nftElement = document.getElementById(
        `nft-item-${selectedNFT.tokenId}`
      );
      if (nftElement) {
        console.log("找到NFT元素，開始滾動");
        // 使用scrollIntoView將元素滾動到視圖中
        nftElement.scrollIntoView({
          behavior: "smooth",
          block: "center", // 確保元素在視圖中央
        });
      } else {
        console.log("未找到NFT元素:", `nft-item-${selectedNFT.tokenId}`);
        // 調試：打印所有帶nft-item前綴的元素
        document.querySelectorAll('[id^="nft-item-"]').forEach((el) => {
          console.log("找到元素ID:", el.id);
        });
      }
    }
  }, [selectedNFT]);

  // 同步選中狀態並處理外部跳轉自動滾動
  useEffect(() => {
    console.log("useEffect執行, selectedNFT:", selectedNFT?.tokenId);
    console.log("selectedNFTRef.current:", selectedNFTRef.current?.tokenId);

    // 監聽清除事件
    const handleNFTCleared = () => {
      setSelectedNFT(null);
    };

    // 初始載入時檢查是否有預選的NFT（從外部跳轉）
    const hasExternalSelection = selectedNFTRef.current && !selectedNFT;

    if (hasExternalSelection) {
      console.log(
        "檢測到外部選擇，設置選中NFT:",
        selectedNFTRef.current.tokenId
      );
      setSelectedNFT(selectedNFTRef.current);

      // 使用requestAnimationFrame確保在下一個渲染幀中執行滾動
      requestAnimationFrame(() => {
        console.log("執行即時滾動");
        // 立即檢查元素並滾動，不再使用延遲
        const element = document.getElementById(
          `nft-item-${selectedNFTRef.current.tokenId}`
        );
        if (element) {
          console.log("找到元素並滾動:", element.id);
          element.scrollIntoView({ behavior: "auto", block: "center" }); // 使用auto代替smooth實現無延遲滾動
        } else {
          console.log("仍未找到元素");
          // 如果確實找不到元素，可以再嘗試一次（可能DOM還沒完全更新）
          requestAnimationFrame(() => {
            const retryElement = document.getElementById(
              `nft-item-${selectedNFTRef.current.tokenId}`
            );
            if (retryElement) {
              console.log("重試後找到元素並滾動:", retryElement.id);
              retryElement.scrollIntoView({
                behavior: "auto",
                block: "center",
              });
            } else {
              console.log("重試後仍未找到元素");
            }
          });
        }
      });
    }

    window.addEventListener("nft-cleared", handleNFTCleared);

    return () => {
      window.removeEventListener("nft-cleared", handleNFTCleared);
    };
  }, [selectedNFT]);

  // 渲染按鈕函數 - 接收點擊處理函數，確保按鈕能正確處理選擇事件
  const renderActionButton = useCallback(
    (nft, onClick) => {
      const isSelected = selectedNFT?.tokenId === nft.tokenId;
      return (
        <ButtonWrapper>
          {isSelected ? (
            <SelectedButton fullWidth onClick={onClick}>
              選択済み
            </SelectedButton>
          ) : (
            <StandardButton fullWidth onClick={onClick}>
              選択する
            </StandardButton>
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
      <div ref={nftGridRef}>
        <NFTGrid
          items={filteredNFTs}
          actionText="選択する"
          renderActionButton={renderActionButton}
          onItemAction={onAction}
          selectedNFT={selectedNFT}
          itemIdPrefix="nft-item-" // 添加前綴，用於生成唯一ID
        />
      </div>
    </Section>
  );
};

// 添加Form作為子組件，方便獨立使用
ListNFTSection.Form = ListNFTForm;

export default ListNFTSection;
