import React from "react";
import styled from "styled-components";
import NFTCard from "../NFTCard/NFTCard";

// 容器包裝，確保有固定高度但不設置單獨的滾動條
const GridWrapper = styled.div`
  min-height: 70vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  /* 確保與搜索欄對齊 */
  margin: 0;
  padding: 0;

  /* 保持頁面高度一致，防止因結果數量變化導致頁面高度變化 */
  display: flex;
  flex-direction: column;

  /* 確保與右側菜單兼容的佈局，但只對具有右側菜單的頁面 */
  @media (min-width: 769px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: visible;
  }
`;

// NFT卡片的統一尺寸
const CARD_MIN_WIDTH = 260; // 卡片最小寬度
const CARD_GAP = 24; // 卡片間距

// 固定大小的網格容器
const Grid = styled.div`
  display: grid;
  grid-gap: ${CARD_GAP}px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  min-height: 600px;

  /* 確保卡片最小寬度，防止擠壓變形 */
  & > div {
    min-width: ${CARD_MIN_WIDTH}px;
    height: auto;
  }

  /* 根據頁面類型應用不同的佈局規則 */
  ${(props) =>
    props.hasRightSidebar
      ? `
      /* 有右側邊欄的頁面 - 市場、瀏覽等頁面 */
      @media (min-width: 1800px) {
        grid-template-columns: repeat(4, 1fr);
        max-width: calc(100% - 320px);
      }

      @media (min-width: 1400px) and (max-width: 1799px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: calc(100% - 320px);
      }

      @media (min-width: 1000px) and (max-width: 1399px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: calc(100% - 320px);
      }

      @media (min-width: 769px) and (max-width: 999px) {
        grid-template-columns: repeat(1, 1fr);
        max-width: calc(100% - 320px);
      }
    `
      : `
      /* 沒有右側邊欄的頁面 - MyNFT頁面 */
      @media (min-width: 1800px) {
        grid-template-columns: repeat(4, 1fr);
        max-width: 100%;
      }

      @media (min-width: 1400px) and (max-width: 1799px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: 100%;
      }

      @media (min-width: 1000px) and (max-width: 1399px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 100%;
      }

      @media (min-width: 769px) and (max-width: 999px) {
        grid-template-columns: repeat(1, 1fr);
        max-width: 100%;
      }
    `}

  /* 共用的小屏幕佈局 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
    max-width: 100%;
  }
`;

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
  margin: 40px auto 80px;
  min-height: 400px; /* 添加最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.7;
  }
`;

/**
 * NFT卡片網格組件
 * @param {Array} items - NFT卡片數據
 * @param {Function} onItemAction - 卡片操作回調
 * @param {String|Function} actionText - 操作按鈕文字
 * @param {Function} renderStatus - 渲染狀態回調
 * @param {Function} renderActionButton - 自定義按鈕渲染
 * @param {Object} selectedNFT - 已選中的NFT
 * @param {String} className - 附加類名
 * @param {String} itemIdPrefix - 每個NFT卡片ID的前綴，用於DOM選擇
 * @param {String} imageUrlKey - 指定NFT對象中用於圖片URL的屬性名，默認為"image"
 * @param {Boolean} hasRightSidebar - 頁面是否有右側邊欄，影響網格佈局
 * @returns {JSX.Element} NFT卡片網格
 */
const NFTGrid = ({
  items = [],
  onItemAction,
  actionText,
  renderStatus,
  renderActionButton,
  selectedNFT,
  className,
  itemIdPrefix = "nft-",
  imageUrlKey = "image",
  hasRightSidebar = true, // 預設有右側邊欄
}) => {
  // 簡化按鈕處理邏輯
  const getCustomButton = (nft) => {
    if (!renderActionButton) return null;

    // 簡化點擊處理函數
    const handleClick = (e) => {
      if (onItemAction) {
        onItemAction(nft, e);
      }
    };

    // 傳遞點擊處理函數給自定義按鈕渲染器
    return renderActionButton(nft, handleClick);
  };

  return (
    <GridWrapper>
      {items.length === 0 ? (
        <EmptyState>
          <h3>NFTが見つかりません</h3>
          <p>検索条件を変更してお試しください。</p>
        </EmptyState>
      ) : (
        <Grid className={className} hasRightSidebar={hasRightSidebar}>
          {items.map((nft) => {
            const isNFTSelected =
              selectedNFT && selectedNFT.tokenId === nft.tokenId;

            // 生成唯一ID，用於DOM選擇和滾動定位
            // 確保優先使用tokenId，因為在跨頁面操作時需要保持一致
            const nftItemId = `${itemIdPrefix}${nft.tokenId}`;

            // 創建帶有自定義圖片URL的NFT數據對象
            const nftWithImageUrl = {
              ...nft,
              // 如果指定的imageUrlKey存在，則使用該字段的值作為圖片URL
              imageUrl: nft[imageUrlKey] || nft.image,
            };

            return (
              <NFTCard
                key={nft.tokenId}
                id={nftItemId}
                nft={nftWithImageUrl}
                actionText={actionText}
                onAction={onItemAction}
                statusMessage={renderStatus ? renderStatus(nft) : null}
                customActionButton={
                  renderActionButton ? () => getCustomButton(nft) : null
                }
                isSelected={isNFTSelected}
              />
            );
          })}
        </Grid>
      )}
    </GridWrapper>
  );
};

export default NFTGrid;
