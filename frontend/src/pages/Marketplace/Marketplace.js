import React, { useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const PageDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const SearchInput = styled.input`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
  min-width: 250px;
`;

const FiltersGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
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
  aspect-ratio: 1;
  object-fit: cover;
  background-color: ${(props) => props.theme.colors.background};
`;

const NFTInfo = styled.div`
  padding: ${(props) => props.theme.spacing.md};
`;

const NFTName = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-size: 1.1rem;
`;

const NFTCollection = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => props.theme.spacing.sm} 0;
`;

const PriceLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.85rem;
`;

const PriceValue = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
`;

const BuyButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.sm};
  font-weight: bold;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.sm};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.xl};
  gap: ${(props) => props.theme.spacing.sm};
`;

const PageButton = styled.button`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${(props) =>
    props.active ? "white" : props.theme.colors.text.primary};
  border: 1px solid
    ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.text.secondary}44;

  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.text.secondary}22;
  }
`;

// 示例市场NFT数据
const marketNFTs = [
  {
    id: "1",
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    price: "0.25",
    image:
      "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
    seller: "0x7a86C6eA37F51a9B15aEb408b7c9702e8A718045",
  },
  {
    id: "2",
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    price: "0.31",
    image:
      "https://i.seadn.io/gcs/files/697ac9124075fe018f07313739769b11.png?auto=format&dpr=1&w=1000",
    seller: "0x3bE4890086D61dCC39D5b27f31e64E194fEaE78B",
  },
  {
    id: "3",
    tokenId: "874",
    name: "WTFape #874",
    collection: "WTFape コレクション",
    price: "0.18",
    image:
      "https://i.seadn.io/gcs/files/d3b1a773118e400b2d5f77bbc4aa9e17.png?auto=format&dpr=1&w=1000",
    seller: "0x4A82692bB5E1e8e7B24DAfd6e8D7E67c2f5EEdDa",
  },
  {
    id: "4",
    tokenId: "612",
    name: "WTFape #612",
    collection: "WTFape コレクション",
    price: "0.52",
    image:
      "https://i.seadn.io/gcs/files/e1a31407b6968de5079ea112e45610df.png?auto=format&dpr=1&w=1000",
    seller: "0x9c92c2eA0bb7b7cC7C49E97FBc87fbEa856Aac73",
  },
  {
    id: "5",
    tokenId: "001",
    name: "サムライNFT",
    collection: "Samurai Collection",
    price: "0.15",
    image: "https://via.placeholder.com/250?text=Samurai",
    seller: "0x9c92c2eA0bb7b7cC7C49E97FBc87fbEa856Aac73",
  },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseStatus, setPurchaseStatus] = useState({
    show: false,
    nftId: null,
    success: false,
  });

  // 从所有NFT中提取集合列表
  const collections = [...new Set(marketNFTs.map((nft) => nft.collection))];

  // 筛选和排序NFT
  const filteredNFTs = marketNFTs
    .filter((nft) => {
      // 搜索词过滤
      if (
        searchTerm &&
        !nft.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // 集合过滤
      if (collectionFilter !== "all" && nft.collection !== collectionFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 排序
      if (sortBy === "price_low") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === "price_high") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      // 默认按最新排序
      return parseInt(b.id) - parseInt(a.id);
    });

  // 每页显示8个NFT
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredNFTs.length / itemsPerPage);
  const currentNFTs = filteredNFTs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBuy = async (nft) => {
    try {
      // 这里会调用合约购买功能
      // 模拟购买过程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPurchaseStatus({
        show: true,
        nftId: nft.id,
        success: true,
      });

      // 成功后隐藏信息
      setTimeout(() => {
        setPurchaseStatus({ show: false, nftId: null, success: false });
      }, 3000);
    } catch (error) {
      setPurchaseStatus({
        show: true,
        nftId: nft.id,
        success: false,
      });
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>NFTマーケットプレイス</PageTitle>
        <PageDescription>
          幅広いNFTコレクションから、あなたのお気に入りのNFTを見つけて購入しましょう。
        </PageDescription>
      </PageHeader>

      <FiltersContainer>
        <SearchInput
          placeholder="NFTを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FiltersGroup>
          <FilterSelect
            value={collectionFilter}
            onChange={(e) => setCollectionFilter(e.target.value)}
          >
            <option value="all">すべてのコレクション</option>
            {collections.map((collection, index) => (
              <option key={index} value={collection}>
                {collection}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">最新順</option>
            <option value="price_low">価格（安い順）</option>
            <option value="price_high">価格（高い順）</option>
          </FilterSelect>
        </FiltersGroup>
      </FiltersContainer>

      <NFTGrid>
        {currentNFTs.map((nft) => (
          <NFTCard key={nft.id}>
            <NFTImage src={nft.image} alt={nft.name} />
            <NFTInfo>
              <NFTName>{nft.name}</NFTName>
              <NFTCollection>{nft.collection}</NFTCollection>
              <PriceRow>
                <PriceLabel>価格</PriceLabel>
                <PriceValue>{nft.price} ETH</PriceValue>
              </PriceRow>

              {purchaseStatus.show && purchaseStatus.nftId === nft.id ? (
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    backgroundColor: purchaseStatus.success
                      ? "#36B37E22"
                      : "#FF5C5C22",
                    color: purchaseStatus.success ? "#36B37E" : "#FF5C5C",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {purchaseStatus.success ? "購入成功！" : "購入失敗"}
                </div>
              ) : (
                <BuyButton onClick={() => handleBuy(nft)}>購入する</BuyButton>
              )}
            </NFTInfo>
          </NFTCard>
        ))}
      </NFTGrid>

      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </PageContainer>
  );
};

export default Marketplace;
