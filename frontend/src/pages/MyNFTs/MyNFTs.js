import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard/NFTCard";
import { useNavigate } from "react-router-dom";
import { PrimaryButton as Button } from "../../components/styled/Button";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

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

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 12px 16px;
  box-sizing: border-box;
  box-shadow: none;
  position: relative;
  z-index: 10;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  width: 180px;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}99;
  }
`;

const FiltersGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;
  transform: translateZ(0);
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  position: relative;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
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
  top: calc(100% + 5px);
  right: 0;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.medium};
  padding: ${(props) => props.theme.spacing.sm} 0;
  z-index: 10;
  min-width: 150px;
`;

const ActionMenuItem = styled.div`
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}22;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.text.secondary}44;
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing.md};
  background-color: transparent;
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.text.primary};
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ListedNFTCard = styled(NFTCard)`
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: "出品中";
    position: absolute;
    top: 10px;
    left: 10px;
    background: ${(props) => props.theme.colors.primary}CC;
    padding: 4px 12px;
    border-radius: 12px;
    color: white;
    font-size: 0.8rem;
    z-index: 5;
  }

  opacity: 0.8;
  filter: grayscale(30%);
`;

const TransferModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
  width: 90%;
  max-width: 500px;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const TransferInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.md} 0;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTPreview = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.md} 0;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  img {
    width: 60px;
    height: 60px;
    border-radius: ${(props) => props.theme.borderRadius.small};
    object-fit: cover;
  }
`;

// 模拟用户拥有的NFT数据
const mockUserNFTs = [
  {
    contractAddress: "0x123...abc",
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: true,
    price: "0.5",
  },
  {
    contractAddress: "0x123...abc",
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: false,
  },
  {
    contractAddress: "0x456...def",
    tokenId: "001",
    name: "サムライNFT #001",
    collection: "Samurai Collection",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: true,
    price: "0.8",
  },
  {
    contractAddress: "0x789...ghi",
    tokenId: "042",
    name: "Doodle #042",
    collection: "Doodles",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: false,
  },
];

const mockWTFapes = [
  {
    contractAddress: "0x123...abc",
    tokenId: "222",
    name: "WTFape #222",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: false,
  },
  {
    contractAddress: "0x123...abc",
    tokenId: "454",
    name: "WTFape #454",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    isListed: true,
    price: "0.3",
  },
];

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeNFT, setActiveNFT] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const navigate = useNavigate();

  // 从所有NFT中提取集合列表
  const collections = [...new Set(nfts.map((nft) => nft.collection))];

  // 模拟从区块链上获取用户的NFT
  useEffect(() => {
    const fetchUserNFTs = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setNfts([...mockUserNFTs, ...mockWTFapes]);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNFTs();
  }, []);

  // 處理搜索
  const handleSearchSubmit = useCallback(() => {
    if (localSearchTerm !== searchTerm) {
      setSearchTerm(localSearchTerm);
    }
  }, [localSearchTerm, searchTerm]);

  // 處理本地搜索變化
  const handleLocalSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  // 處理鍵盤按下
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // 處理失去焦點
  const handleBlur = () => {
    handleSearchSubmit();
  };

  // 筛选和排序NFT
  const filteredNFTs = nfts
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
      // 排序邏輯
      if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name_desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "recent") {
        // 默認按照最新順序（可以使用ID或其他時間戳）
        return parseInt(b.tokenId) - parseInt(a.tokenId);
      }
      return 0;
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

  const handleTransfer = (nft) => {
    setActiveNFT(nft);
    setShowTransferModal(true);
    setShowActionMenu(false);
  };

  const handleTransferSubmit = () => {
    // 這裡稍後添加轉移邏輯
    console.log("Transferring NFT to:", recipientAddress);
    setShowTransferModal(false);
    setRecipientAddress("");
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>マイNFT</Title>
        <Subtitle>
          あなたのウォレットにあるすべてのNFTをここで確認できます。
        </Subtitle>
      </PageHeader>

      {loading ? (
        <LoadingState>
          <h3>NFTを読み込み中...</h3>
          <p>お持ちのNFTを取得しています。しばらくお待ちください。</p>
        </LoadingState>
      ) : (
        <>
          <FiltersContainer>
            <SearchInput
              placeholder="NFTを検索..."
              value={localSearchTerm}
              onChange={handleLocalSearchChange}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              spellCheck="false"
              autoComplete="off"
            />
            <FiltersGroup>
              <CustomSelect
                value={collectionFilter}
                options={[
                  { value: "all", label: "すべてのコレクション" },
                  ...collections.map((collection) => ({
                    value: collection,
                    label: collection,
                  })),
                ]}
                onChange={setCollectionFilter}
              />
              <CustomSelect
                value={sortBy}
                options={[
                  { value: "recent", label: "最新順" },
                  { value: "name_asc", label: "名前（A-Z）" },
                  { value: "name_desc", label: "名前（Z-A）" },
                ]}
                onChange={setSortBy}
              />
            </FiltersGroup>
          </FiltersContainer>

          {filteredNFTs.length > 0 ? (
            <NFTGrid>
              {filteredNFTs.map((nft, index) => (
                <div key={index} style={{ position: "relative" }}>
                  {nft.isListed ? (
                    <ListedNFTCard
                      nft={nft}
                      actionText="操作"
                      onAction={() => handleNFTAction(nft)}
                    />
                  ) : (
                    <NFTCard
                      nft={nft}
                      actionText="操作"
                      onAction={() => handleNFTAction(nft)}
                    />
                  )}
                  {showActionMenu && activeNFT?.tokenId === nft.tokenId && (
                    <>
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          zIndex: 9,
                        }}
                        onClick={handleClickOutside}
                      />
                      <ActionMenu>
                        {nft.isListed ? (
                          <ActionMenuItem
                            onClick={() => handleRevoke(activeNFT)}
                          >
                            出品を取り消す
                          </ActionMenuItem>
                        ) : (
                          <>
                            <ActionMenuItem
                              onClick={() => handleListNFT(activeNFT)}
                            >
                              マーケットに出品
                            </ActionMenuItem>
                            <ActionMenuItem
                              onClick={() => handleTransfer(activeNFT)}
                            >
                              転送する
                            </ActionMenuItem>
                          </>
                        )}
                        <ActionMenuItem
                          onClick={() =>
                            navigate(`/history?nft=${activeNFT.tokenId}`)
                          }
                        >
                          履歴ページへ
                        </ActionMenuItem>
                      </ActionMenu>
                    </>
                  )}
                </div>
              ))}
            </NFTGrid>
          ) : (
            <EmptyState>
              <h3>NFTが見つかりません</h3>
              <p>
                該当するNFTがありません。検索条件を変更するか、NFTを取得してください。
              </p>
            </EmptyState>
          )}
        </>
      )}

      {showTransferModal && activeNFT && (
        <>
          <ModalOverlay onClick={() => setShowTransferModal(false)} />
          <TransferModal>
            <h3>NFTを転送</h3>
            <NFTPreview>
              <img src={activeNFT.image} alt={activeNFT.name} />
              <div>
                <h4>{activeNFT.name}</h4>
                <p>{activeNFT.collection}</p>
              </div>
            </NFTPreview>
            <TransferInput
              placeholder="受取人のアドレスを入力"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <Button onClick={handleTransferSubmit} fullWidth>
              転送する
            </Button>
          </TransferModal>
        </>
      )}
    </PageContainer>
  );
};

export default MyNFTs;
