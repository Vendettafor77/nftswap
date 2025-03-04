import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NFTCard from "../../components/NFTCard/NFTCard";

const HomeContainer = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl} 0;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}22;
    text-decoration: none;
  }
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.text.primary};
  margin: ${(props) => props.theme.spacing.xl} 0
    ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.active ? "white" : props.theme.colors.text.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin: 0 ${(props) => props.theme.spacing.sm};

  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.primary + "22"};
  }
`;

// NFT出品部分
const ListNFTSection = styled.div`
  background-color: ${(props) => props.theme.colors.background}; // 调整背景色与卡片形成对比
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const NFTSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md}; // 减小间距与NFTGrid一致
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
`;

const PriceInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceCurrency = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.primary}22;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 0 ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0;
  font-weight: bold;
`;

const PriceInput = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius.medium} 0 0
    ${(props) => props.theme.borderRadius.medium};
  border-right: none;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.secondary}88;
  }
`;

// Marketplace部分
const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md}; // 减小间距
  padding: 0; // 确保没有额外的内边距
  width: 100%; // 确保宽度一致
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
  padding: 0; // 与NFTGrid使用相同的padding
  width: 100%; // 确保宽度一致
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

const StatusMessage = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.success
      ? props.theme.colors.success + "22"
      : props.theme.colors.error + "22"};
  color: ${(props) =>
    props.success ? props.theme.colors.success : props.theme.colors.error};
  text-align: center;
`;

// 示例数据
const myNFTs = [
  {
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    image:
      "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    image:
      "https://i.seadn.io/gcs/files/697ac9124075fe018f07313739769b11.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "001",
    name: "サムライNFT",
    collection: "Samurai Collection",
    image: "https://via.placeholder.com/250?text=Samurai",
  },
];

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
];

const Home = () => {
  // 选项卡状态
  const [activeTab, setActiveTab] = useState("marketplace");

  // NFT出品状态
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [listingStatus, setListingStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Marketplace状态
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [collectionFilter, setCollectionFilter] = useState("all");
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
      if (
        searchTerm &&
        !nft.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (collectionFilter !== "all" && nft.collection !== collectionFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_low") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === "price_high") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return parseInt(b.id) - parseInt(a.id);
    });

  // NFT出品处理函数
  const handleSelectNFT = (nft) => {
    setSelectedNFT(nft);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmitListing = async () => {
    if (!selectedNFT || !price) {
      setListingStatus({
        show: true,
        success: false,
        message: "NFTと価格を選択してください。",
      });
      return;
    }

    setListingStatus({ show: false });

    try {
      // 模拟上架过程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setListingStatus({
        show: true,
        success: true,
        message: `${selectedNFT.name}が${price} ETHで出品されました。`,
      });

      // 成功后重置表单
      setSelectedNFT(null);
      setPrice("");
    } catch (error) {
      setListingStatus({
        show: true,
        success: false,
        message: "出品に失敗しました。ウォレットの接続を確認してください。",
      });
    }
  };

  // 购买NFT处理函数
  const handleBuyNFT = async (nft) => {
    try {
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
    <HomeContainer>
      <HeroSection>
        <HeroTitle>NFTマーケットプレイスへようこそ</HeroTitle>
        <HeroSubtitle>
          安全かつ簡単にNFTを売買できるプラットフォーム。
          スマートコントラクトにより、信頼性の高い取引を実現します。
        </HeroSubtitle>
      </HeroSection>

      <TabsContainer>
        <Tab
          active={activeTab === "marketplace"}
          onClick={() => setActiveTab("marketplace")}
        >
          NFTを閲覧・購入
        </Tab>
        <Tab active={activeTab === "list"} onClick={() => setActiveTab("list")}>
          NFTを出品する
        </Tab>
      </TabsContainer>

      {activeTab === "list" ? (
        // NFT出品部分
        <ListNFTSection>
          <SectionTitle>NFTを出品する</SectionTitle>

          <NFTSelection>
            {myNFTs.map((nft, index) => (
              <div key={index}>
                <NFTCard
                  nft={nft}
                  actionText={
                    selectedNFT?.tokenId === nft.tokenId
                      ? "選択済み"
                      : "選択する"
                  }
                  onAction={() => handleSelectNFT(nft)}
                />
              </div>
            ))}
          </NFTSelection>

          <FormGroup>
            <Label htmlFor="price">販売価格</Label>
            <PriceInputContainer>
              <PriceInput
                id="price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.00"
                disabled={!selectedNFT}
              />
              <PriceCurrency>ETH</PriceCurrency>
            </PriceInputContainer>
          </FormGroup>

          <SubmitButton
            onClick={handleSubmitListing}
            disabled={!selectedNFT || !price}
          >
            マーケットに出品する
          </SubmitButton>

          {listingStatus.show && (
            <StatusMessage success={listingStatus.success}>
              {listingStatus.message}
            </StatusMessage>
          )}
        </ListNFTSection>
      ) : (
        // NFTマーケットプレイス部分
        <>
          <SectionTitle>NFTマーケットプレイス</SectionTitle>

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
            {filteredNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={{
                  ...nft,
                  description: `${nft.price} ETH`,
                }}
                actionText="購入する"
                onAction={() => handleBuyNFT(nft)}
                statusMessage={
                  purchaseStatus.show && purchaseStatus.nftId === nft.id
                    ? {
                        success: purchaseStatus.success,
                        message: purchaseStatus.success
                          ? "購入成功！"
                          : "購入失敗",
                      }
                    : null
                }
              />
            ))}
          </NFTGrid>

          {filteredNFTs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#C7CCD8",
              }}
            >
              <h3>NFTが見つかりません</h3>
              <p>検索条件を変更してお試しください。</p>
            </div>
          )}
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
