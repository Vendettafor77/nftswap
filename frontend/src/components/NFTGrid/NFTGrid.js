import React from "react";
import styled from "styled-components";
import NFTCard from "../NFTCard/NFTCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 5px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
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
    if (!renderActionButton) return null;
    return renderActionButton(nft);
  };

  return (
    <Grid className={className}>
      {items.map((nft) => {
        const isNFTSelected =
          selectedNFT &&
          (selectedNFT.id === nft.id || selectedNFT.tokenId === nft.tokenId);

        return (
          <NFTCard
            key={nft.id || nft.tokenId}
            nft={nft}
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
  );
};

export default NFTGrid;
