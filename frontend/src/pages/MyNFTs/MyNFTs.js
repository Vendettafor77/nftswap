import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard/NFTCard";
import { useNavigate } from "react-router-dom";
import { PrimaryButton as Button } from "../../components/styled/Button";
import FilterBar from "../../components/Filters/FilterBar";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { StatusMessage } from "../../components/styled/StatusMessage";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
  padding-right: calc(${(props) => props.theme.spacing.xl} + 6px);
`;

const PageHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: ${(props) => props.theme.spacing.md};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 使用與NFTCard相同的SVG漸變文字
const GradientTitle = ({ children }) => {
  const uniqueId = `mynft-title-gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <svg
      width="100%"
      height="50"
      style={{
        maxWidth: "400px",
        overflow: "visible",
        filter: "drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",
      }}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="36"
        fill={`url(#${uniqueId})`}
        fontWeight="600"
        fontSize="2.5rem"
        fontFamily="inherit"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "inherit",
          textRendering: "optimizeLegibility",
          shapeRendering: "geometricPrecision",
          opacity: "0.95",
        }}
      >
        {children}
      </text>
    </svg>
  );
};

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const NFTGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  position: relative;

  > div {
    height: 100%;
    display: flex;
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
  min-width: 120px;
  max-width: 180px;
  width: auto;
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
  width: 95%;
  max-width: 550px;
  z-index: 1000;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${(props) => props.theme.spacing.md};
    text-align: center;
    background: linear-gradient(120deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;

const TransferButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing.lg};
  height: 54px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(106, 17, 203, 0.25);

  &:hover {
    box-shadow: 0 6px 16px rgba(106, 17, 203, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: linear-gradient(120deg, #6a11cb88, #2575fc88);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.colors.text.primary};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  backdrop-filter: blur(4px);
`;

const TransferInput = styled.input.attrs({
  className: "transfer-input",
})`
  && {
    width: 100%;
    padding: 12px 16px;
    margin: ${(props) => props.theme.spacing.lg} 0;
    border-radius: ${(props) => props.theme.borderRadius.medium};
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(30, 36, 68, 0.6);
    color: ${(props) => props.theme.colors.text.primary};
    font-size: 1.1rem;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    -webkit-font-smoothing: antialiased;
    height: 50px;

    &:focus {
      outline: none;
      border-color: rgba(106, 17, 203, 0.5) !important;
      box-shadow: 0 0 0 2px rgba(42, 82, 190, 0.3);
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.text.secondary}99;
    }
  }
`;

const NFTPreview = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.lg} 0;
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  img {
    width: 75px;
    height: 75px;
    border-radius: ${(props) => props.theme.borderRadius.small};
    object-fit: cover;
  }

  div {
    h4 {
      font-size: 1.2rem;
      margin-bottom: ${(props) => props.theme.spacing.sm};
    }

    p {
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }
`;

const TransferStatusMessage = styled.div.attrs((props) => ({
  className: `transfer-status ${props.success ? "success" : "error"}`,
}))`
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
`;

// 添加自定義的 StatusMessage 組件
const CustomStatusMessage = styled(StatusMessage)`
  margin-top: ${(props) => props.theme.spacing.md};
  width: 100%;
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
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeNFT, setActiveNFT] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [transferStatus, setTransferStatus] = useState({
    show: false,
    success: false,
    fadeOut: false,
    message: "",
  });
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
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

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
  const handleNFTAction = (nft, event) => {
    setActiveNFT(nft);

    // 计算菜单位置，将其定位在按钮下方
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      setMenuPosition({
        top: rect.bottom + scrollTop,
        left: rect.left + rect.width / 2 - 90, // 居中显示在按钮下方
      });
    }

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
    if (!recipientAddress.trim()) {
      setTransferStatus({
        show: true,
        success: false,
        fadeOut: false,
        message: "受取人のアドレスを入力してください。",
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setTransferStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setTransferStatus({
          show: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);

      return;
    }

    // 這裡添加轉移邏輯（模擬成功）
    try {
      // 模擬轉移操作
      // 實際應用中，這裡會調用合約方法

      // 顯示成功消息
      setTransferStatus({
        show: true,
        success: true,
        fadeOut: false,
        message: "購入成功！", // 修改為與購入成功相同的文字
      });

      // 成功時，3秒後開始淡出動畫
      setTimeout(() => {
        setTransferStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息並關閉模態框
      setTimeout(() => {
        setTransferStatus({
          show: false,
          success: false,
          fadeOut: false,
          message: "",
        });
        // 僅在成功時關閉模態框和清空輸入
        setShowTransferModal(false);
        setRecipientAddress("");
      }, 3400);
    } catch (error) {
      console.error("轉移失敗:", error);
      setTransferStatus({
        show: true,
        success: false,
        fadeOut: false,
        message: "NFTの転送に失敗しました。",
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setTransferStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setTransferStatus({
          show: false,
          success: false,
          fadeOut: false,
          message: "",
        });
        // 失敗時不關閉模態框，讓用戶可以重試
      }, 3400);
    }
  };

  return (
    <PageContainer className="content-container">
      <PageHeader>
        <Title>
          <GradientTitle>マイNFT</GradientTitle>
        </Title>
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
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            searchPlaceholder="NFTを検索..."
            filters={[
              {
                value: collectionFilter,
                options: [
                  { value: "all", label: "すべてのコレクション" },
                  ...collections.map((collection) => ({
                    value: collection,
                    label: collection,
                  })),
                ],
                onChange: setCollectionFilter,
              },
              {
                value: sortBy,
                options: [
                  { value: "recent", label: "最新順" },
                  { value: "name_asc", label: "名前（A-Z）" },
                  { value: "name_desc", label: "名前（Z-A）" },
                ],
                onChange: setSortBy,
              },
            ]}
          />

          {filteredNFTs.length > 0 ? (
            <NFTGrid
              items={filteredNFTs}
              actionText="操作"
              onItemAction={(nft, event) => handleNFTAction(nft, event)}
              renderStatus={(nft) =>
                nft.statusMessage
                  ? {
                      message: nft.statusMessage,
                      success: nft.statusType === "success",
                      fadeOut: nft.fadeOut,
                    }
                  : null
              }
            />
          ) : (
            <EmptyState>
              <h3>NFTが見つかりません</h3>
              <p>NFTをミントするか、他のユーザーから購入してください。</p>
            </EmptyState>
          )}

          {showActionMenu && activeNFT && (
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
              <ActionMenu
                style={{
                  position: "fixed",
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                  transform: "none",
                  zIndex: 10,
                }}
              >
                {activeNFT.isListed ? (
                  <ActionMenuItem onClick={() => handleRevoke(activeNFT)}>
                    出品を取り消す
                  </ActionMenuItem>
                ) : (
                  <>
                    <ActionMenuItem onClick={() => handleListNFT(activeNFT)}>
                      マーケットに出品
                    </ActionMenuItem>
                    <ActionMenuItem onClick={() => handleTransfer(activeNFT)}>
                      転送する
                    </ActionMenuItem>
                  </>
                )}
                <ActionMenuItem
                  onClick={() => navigate(`/history?nft=${activeNFT.tokenId}`)}
                >
                  履歴ページへ
                </ActionMenuItem>
              </ActionMenu>
            </>
          )}
        </>
      )}

      {showTransferModal && activeNFT && (
        <>
          <ModalOverlay onClick={() => setShowTransferModal(false)} />
          <TransferModal>
            <CloseButton onClick={() => setShowTransferModal(false)} />
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
            <TransferButton
              onClick={handleTransferSubmit}
              fullWidth
              disabled={!recipientAddress.trim()}
            >
              転送する
            </TransferButton>

            {transferStatus.show && (
              <CustomStatusMessage
                success={transferStatus.success}
                fadeOut={transferStatus.fadeOut}
                noArrow={false} // 顯示箭頭
                centered={true} // 居中顯示
              >
                {transferStatus.message}
              </CustomStatusMessage>
            )}
          </TransferModal>
        </>
      )}

      {/* 模態框外的全局提示消息 */}
      {transferStatus.show && !showTransferModal && (
        <StatusMessage
          success={transferStatus.success}
          fadeOut={transferStatus.fadeOut}
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1100,
            minWidth: "300px",
            maxWidth: "80%",
          }}
        >
          {transferStatus.message}
        </StatusMessage>
      )}
    </PageContainer>
  );
};

export default MyNFTs;
