import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FeaturedContainer = styled.section`
  margin: ${(props) => props.theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 ${(props) => props.theme.spacing.lg};
`;

const NFTCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NFTImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background-color: ${(props) => props.theme.colors.background};
`;

const NFTInfo = styled.div`
  padding: ${(props) => props.theme.spacing.md};
`;

const NFTName = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const NFTPrice = styled.p`
  color: ${(props) => props.theme.colors.accent};
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const NFTOwner = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreButton = styled(Link)`
  display: block;
  width: max-content;
  margin: ${(props) => props.theme.spacing.xl} auto 0;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
    text-decoration: none;
  }
`;

// 示例NFT数据
const featuredNfts = [
  {
    tokenId: "1",
    name: "Mystic Ape #124",
    image:
      "https://i.seadn.io/gcs/files/ce84942656d53eabd17d4cd311f79536.png?auto=format&dpr=1&w=1000",
    price: "0.25 ETH",
    owner: "0x7a86C6eA37F51a9B15aEb408b7c9702e8A718045",
  },
  {
    tokenId: "2",
    name: "Cyber Punk #087",
    image:
      "https://i.seadn.io/gcs/files/dc6f0c6a33c5fe2c02cf1350dd8b828a.png?auto=format&dpr=1&w=1000",
    price: "0.31 ETH",
    owner: "0x3bE4890086D61dCC39D5b27f31e64E194fEaE78B",
  },
  {
    tokenId: "3",
    name: "VenAPE #221",
    image:
      "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
    price: "0.18 ETH",
    owner: "0x4A82692bB5E1e8e7B24DAfd6e8D7E67c2f5EEdDa",
  },
  {
    tokenId: "4",
    name: "Doodle #713",
    image:
      "https://i.seadn.io/gcs/files/03c44f5f83805652ba076c41fa43c4b1.png?auto=format&dpr=1&w=1000",
    price: "0.52 ETH",
    owner: "0x9c92c2eA0bb7b7cC7C49E97FBc87fbEa856Aac73",
  },
];

const FeaturedNFTs = () => {
  return (
    <FeaturedContainer>
      <SectionTitle>已上架的热门NFT</SectionTitle>
      <NFTGrid>
        {featuredNfts.map((nft) => (
          <NFTCard key={nft.tokenId}>
            <NFTImage src={nft.image} alt={nft.name} />
            <NFTInfo>
              <NFTName>{nft.name}</NFTName>
              <NFTOwner>
                拥有者:{" "}
                {`${nft.owner.substring(0, 6)}...${nft.owner.substring(nft.owner.length - 4)}`}
              </NFTOwner>
              <NFTPrice>{nft.price}</NFTPrice>
            </NFTInfo>
          </NFTCard>
        ))}
      </NFTGrid>
      <MoreButton to="/marketplace">查看更多 NFT</MoreButton>
    </FeaturedContainer>
  );
};

export default FeaturedNFTs;
