import React from "react";
import styled from "styled-components";
import NFTCard from "../NFTCard/NFTCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.text.secondary};
  grid-column: 1 / -1;
`;

const NFTGrid = ({ nfts = [], onNFTAction, actionText }) => {
  if (nfts.length === 0) {
    return (
      <EmptyState>
        <h3>NFTがありません</h3>
        <p>NFTをお持ちでない場合は、まずNFTを入手してください。</p>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {nfts.map((nft, index) => (
        <NFTCard
          key={`${nft.tokenId}-${index}`}
          nft={nft}
          actionText={actionText}
          onAction={() => onNFTAction(nft)}
        />
      ))}
    </Grid>
  );
};

export default NFTGrid;
