import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard/NFTCard";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const FilterBar = styled.div`
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

const FilterGroup = styled.div`
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.sm} 0;
  z-index: 10;
  min-width: 150px;
`;

const ActionMenuItem = styled.div`
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}22;
    color: ${props => props.theme.colors.primary};
  }
`;

// 模拟用户拥有的NFT数据
const mockUserNFTs = [
  {
    contractAddress: "0x123...abc",
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    image: "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
  },
  {
    contractAddress: "0x123...abc",
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    image: "https://i.seadn.io/gcs/files/697ac9124075fe018f07313739769b11.png?auto=format&dpr=1&w=1000",
  },
  {
    contractAddress: "0x456...def",
    tokenId: "001",
    name: "サムライNFT #001",
    collection: "Samurai Collection",
    image: "https://via.placeholder.com/250?text=Samurai",
  },
  {
    contractAddress: "0x789...ghi",
    tokenId: "042",
    name: "Doodle #042",
    collection: "Doodles",
    image: "https://i.seadn.io/gcs/files/03c44f5f83805652ba076c41fa43c4b1.png?auto=format&dpr=1&w=1000",
  },
];

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [activeNFT, setActiveNFT] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // 从所有NFT中提取集合列表
  const collections = [...new Set(nfts.map(nft => nft.collection))];
  
  // 模拟从区块链上获取用户的NFT
  useEffect(() => {
    const fetchUserNFTs = async () => {
      try {
        // 在实际应用中，这里会调用钱包API或区块链API来获取用户的NFT
        // 例如使用Moralis、Alchemy、Covalent等服务
        
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 使用模拟数据
        setNfts(mockUserNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNFTs();
  }, []);

  // 筛选NFT
  const filteredNFTs = nfts.filter(nft => {
    // 搜索词过滤
    if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // 集合过滤
    if (collectionFilter !== "all" && nft.collection !== collectionFilter) {
      return false;
    }
    
    return true;
  });

  // 处理NFT操作
  const handleNFTAction = (nft) => {
    setActiveNFT(nft);
    setShowActionMenu(true);
  };
  
  // 处理上架NFT
  const handleListNFT = (nft) => {
    window.location.href = `/list-nft?contract=${nft.contractAddress}&tokenId=${nft.tokenId}`;
    setShowActionMenu(false);
  };

  // 处理发送NFT
  const handleSendNFT = (nft) => {
    // 实现发送NFT的逻辑
    console.log("Sending NFT:", nft);
    setShowActionMenu(false);
  };

  // 关闭操作菜单
  const handleClickOutside = () => {
    setShowActionMenu(false);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>マイNFT</Title>
        <Subtitle>あなたのウォレットにあるすべてのNFTをここで確認できます。</Subtitle>
      </PageHeader>

      {loading ? (
        <LoadingState>
          <h3>NFTを読み込み中...</h3>
          <p>お持ちのNFTを取得しています。しばらくお待ちください。</p>
        </LoadingState>
      ) : (
        <>
          <FilterBar>
            <SearchInput
              placeholder="NFTを検索..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            
            <FilterGroup>
              <FilterSelect
                value={collectionFilter}
                onChange={e => setCollectionFilter(e.target.value)}
              >
                <option value="all">すべてのコレクション</option>
                {collections.map((collection, index) => (
                  <option key={index} value={collection}>
                    {collection}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
          </FilterBar>

          {filteredNFTs.length > 0 ? (
            <NFTGrid>
              {filteredNFTs.map((nft, index) => (
                <NFTCard
                  key={index}
                  nft={nft}
                  actionText="操作"
                  onAction={() => handleNFTAction(nft)}
                />
              ))}
            </NFTGrid>
          ) : (
            <EmptyState>
              <h3>NFTが見つかりません</h3>
              <p>該当するNFTがありません。検索条件を変更するか、NFTを取得してください。</p>
            </EmptyState>
          )}
          
          {showActionMenu && activeNFT && (
            <div style={{ position: 'relative' }}>
              <div 
                style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} 
                onClick={handleClickOutside}
              />
              <ActionMenu>
                <ActionMenuItem onClick={() => handleListNFT(activeNFT)}>
                  マーケットに出品
                </ActionMenuItem>
                <ActionMenuItem onClick={() => handleSendNFT(activeNFT)}>
                  送信する
                </ActionMenuItem>
              </ActionMenu>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default MyNFTs;
