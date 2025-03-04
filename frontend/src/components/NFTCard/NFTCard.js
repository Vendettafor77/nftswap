import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition: transform 0.3s ease;
  width: 100%; // 使用100%而不是固定宽度，确保适应容器

  &:hover {
    transform: translateY(-5px);
  }
`;

const NFTImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${(props) =>
    props.src || "https://via.placeholder.com/250"});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing.md};
`;

const NFTName = styled.h3`
  margin: 0;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: 1.4;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NFTInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectionName = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.primary};
`;

const TokenId = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
  }
`;

const StatusMessage = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.success
      ? props.theme.colors.success + "22"
      : props.theme.colors.error + "22"};
  color: ${(props) =>
    props.success ? props.theme.colors.success : props.theme.colors.error};
  text-align: center;
  margin-top: 8px;
`;

const NFTCard = ({
  nft,
  actionText = "スワップする",
  onAction,
  statusMessage,
}) => {
  return (
    <Card>
      <NFTImage src={nft?.image} />
      <CardContent>
        <NFTName>{nft?.name || "NFT名"}</NFTName>
        <NFTDescription>
          {nft?.description || "NFTの説明文がここに表示されます。"}
        </NFTDescription>
        <NFTInfo>
          <CollectionName>{nft?.collection || "コレクション"}</CollectionName>
          <TokenId>ID: {nft?.tokenId || "#000"}</TokenId>
        </NFTInfo>

        {statusMessage ? (
          <StatusMessage success={statusMessage.success}>
            {statusMessage.message}
          </StatusMessage>
        ) : (
          <ActionButton onClick={onAction}>{actionText}</ActionButton>
        )}
      </CardContent>
    </Card>
  );
};

export default NFTCard;
