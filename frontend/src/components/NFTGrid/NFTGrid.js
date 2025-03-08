import React from "react";
import styled from "styled-components";
import NFTCard from "../NFTCard/NFTCard";

// 固定大小的網格容器，確保1080p下一排顯示4個卡片
const Grid = styled.div`
  display: grid;
  /* 固定大小的網格，不受容器寬度影響 */
  grid-template-columns: repeat(4, minmax(260px, 1fr));
  gap: 24px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  /* 確保卡片最小寬度，防止擠壓變形 */
  & > div {
    min-width: 260px;
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, minmax(260px, 1fr));
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(260px, 1fr));
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
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
  margin: 0 auto;

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

const StandardNFTButton = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;

  button {
    height: 42px;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.lg};
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
}) => {
  if (items.length === 0) {
    return (
      <EmptyState>
        <h3>NFTが見つかりません</h3>
        <p>検索条件を変更してお試しください。</p>
      </EmptyState>
    );
  }

  const getCustomButton = (nft) => {
    return renderActionButton ? renderActionButton(nft) : null;
  };

  return (
    <Grid className={className}>
      {items.map((nft) => {
        const isNFTSelected =
          selectedNFT && selectedNFT.tokenId === nft.tokenId;

        return (
          <NFTCard
            key={nft.id || nft.tokenId}
            nft={nft}
            actionText={actionText}
            onAction={onItemAction}
            statusMessage={renderStatus ? renderStatus(nft) : null}
            customActionButton={
              renderActionButton
                ? () => (
                    <StandardNFTButton>
                      {getCustomButton(nft)}
                    </StandardNFTButton>
                  )
                : null
            }
            isSelected={isNFTSelected}
          />
        );
      })}
    </Grid>
  );
};

export default NFTGrid;
