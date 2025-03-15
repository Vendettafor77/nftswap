import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard/NFTCard";
import { useNavigate } from "react-router-dom";
import { PrimaryButton as Button } from "../../components/styled/Button";
import FilterBar from "../../components/Filters/FilterBar";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { StatusMessage } from "../../components/styled/StatusMessage";
import GradientText from "../../components/styled/GradientText";
import { selectedNFTRef } from "../../pages/Home/components/sharedState";
import { myNFTs } from "../../data/mockData";
import IPFSImage from "../../components/IPFSImage";
import { getNFTImageUrl } from "../../utils/ipfsUtils";

// 頁面主容器，與Home頁面的HomeContainer保持一致
const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  /* 應用全局樣式 */
  &.content-container {
    /* 補償滾動條寬度 */
    width: 100%;
    padding-right: calc(20px + 6px); /* 原始padding + 滾動條寬度 */
    box-sizing: border-box;
  }
`;

// 固定寬度的主內容區域，與Home頁面的MainContent保持一致
const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
  padding-top: 0;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const PageHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
  padding-top: 0;
`;

const Title = styled.h1`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 使用共享的GradientText組件替代原有的GradientTitle
const GradientTitle = ({ children }) => {
  return (
    <GradientText
      fontSize="2.5rem"
      height="60"
      maxWidth="400px"
      centered={true}
      id={`mynft-title-${Math.random().toString(36).substring(7)}`}
    >
      {children}
    </GradientText>
  );
};

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
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
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  position: relative;

  /* 確保與Home頁面的MarketContainer一致 */
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0;

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
  background: linear-gradient(145deg, #2a3142, #383f5e);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: ${(props) => props.theme.spacing.sm} 0;
  z-index: 1000;
  min-width: 150px;
  max-width: 180px;
  width: auto;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  backdrop-filter: blur(4px);
  transform-origin: ${(props) =>
    props.flipUp ? "bottom center" : "top center"};
  animation: ${(props) => (props.flipUp ? "popUpFromBottom" : "popDownFromTop")}
    0.3s ease forwards;

  @keyframes popDownFromTop {
    0% {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes popUpFromBottom {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 確保菜單在頁面底部也能完整顯示 */
  max-height: calc(90vh - 20px);
  overflow-y: auto;
  overflow-x: hidden;

  /* 添加三角形指示器 */
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s ease;
  }

  /* 根據 flipUp 屬性決定三角形位置 */
  ${(props) =>
    props.flipUp
      ? `
    &::before {
      border-top: 8px solid #383f5e;
      border-bottom: none;
      bottom: -8px;
    }
  `
      : `
    &::before {
      border-bottom: 8px solid #383f5e;
      border-top: none;
      top: -8px;
    }
  `}
`;

const ActionMenuItem = styled.div`
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: rgba(101, 14, 145, 0.55);
    color: white;
  }

  &:active {
    background-color: rgba(101, 14, 145, 0.75);
    transform: scale(0.98);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  &:last-child::after {
    display: none;
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
    width: 100%;

    p {
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }
`;

// 預覽圖片組件更新
const NFTNamePreviewSVG = ({ children }) => {
  return (
    <GradientText
      fontSize="1.2rem"
      height="30"
      marginBottom="8px"
      id={`transfer-nft-${Math.random().toString(36).substring(7)}`}
    >
      {children}
    </GradientText>
  );
};

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

const NFTCollection = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const ModalCloseButton = styled.button`
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

  // 從所有NFT中提取集合列表
  const collections = [...new Set(nfts.map((nft) => nft.collection))];

  // 模拟从区块链上获取用户的NFT，現在使用集中的myNFTs而不是本地模擬數據
  useEffect(() => {
    const fetchUserNFTs = async () => {
      try {
        // 為了模擬一些NFT已上架的情況，我們將添加isListed和price屬性到導入的myNFTs
        const processedNFTs = await Promise.all(
          myNFTs.map(async (nft) => {
            // 隨機決定某些NFT是否已上架
            const isListed = Math.random() > 0.7;

            // 使用getNFTImageUrl預處理圖片URL
            const imageResult = await getNFTImageUrl(nft);

            return {
              ...nft,
              isListed,
              price: isListed ? (Math.random() * 2 + 0.1).toFixed(2) : null,
              processedImage: imageResult.url || nft.image, // 保留原始URL作為備用
              imageLoading: false,
              imageError: imageResult.error,
            };
          })
        );

        setNfts(processedNFTs);
        // 立即設置加載狀態為false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
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

  // 處理NFT操作，修復菜單定位問題
  const handleNFTAction = (nft, event) => {
    event.stopPropagation();
    setActiveNFT(nft);

    // 計算菜單位置，確保顯示在按鈕正下方而不是卡片右下角
    if (event && event.currentTarget) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      // 這裡的關鍵是找到按鈕相對於其父容器的位置
      const pageContainer = document.querySelector(".content-container");
      const containerRect = pageContainer.getBoundingClientRect();

      // 計算相對於PageContainer的位置
      const relativeLeft = rect.left - containerRect.left + rect.width / 2 - 75; // 水平居中

      // 檢查是否需要向上顯示菜單
      const windowHeight = window.innerHeight;
      const menuHeight = 150; // 估計菜單高度，可以根據實際情況調整
      const isBottomOverflow = rect.bottom + menuHeight + 10 > windowHeight;

      // 根據是否溢出決定菜單位置
      let topPosition;
      if (isBottomOverflow) {
        // 向上顯示，與按鈕頂部對齊
        topPosition = rect.top - containerRect.top - menuHeight - 10;
      } else {
        // 向下顯示，與按鈕底部對齊
        topPosition = rect.bottom - containerRect.top + 25;
      }

      // 確保菜單不會超出頁面頂部
      if (topPosition < 0) {
        topPosition = 10; // 給頁面頂部留出一些空間
      }

      setMenuPosition({
        top: topPosition,
        left: relativeLeft,
        flipUp: isBottomOverflow,
      });
    }

    setShowActionMenu(true);
  };

  // 处理上架NFT
  const handleListNFT = (nft) => {
    // 將選中的NFT保存到sharedState中的selectedNFTRef
    selectedNFTRef.current = nft;

    // 觸發自定義事件通知其他組件
    window.dispatchEvent(new CustomEvent("nft-selected"));

    // 導航到主頁的ListNFT標籤頁
    navigate("/?tab=listnft");

    // 隱藏操作菜單
    setShowActionMenu(false);
  };

  // 处理发送NFT
  const handleSendNFT = (nft) => {
    // 实现发送NFT的逻辑
    setShowActionMenu(false);
  };

  // 关闭操作菜单
  const handleClickOutside = (e) => {
    // 確保點擊事件正確處理
    e.stopPropagation();
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
        message: "転送成功！", // 修改為與転送成功相同的文字
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

  const closeTransferModal = () => {
    setShowTransferModal(false);
  };

  // 移除滾動事件監聽器，允許菜單保持打開
  useEffect(() => {
    // 這裡不再添加自動關閉菜單的滾動監聽器
    // 滾動時菜單保持打開，位置將跟隨滾動（因為使用了基於視窗的fixed定位）
  }, [showActionMenu, activeNFT]);

  // 處理取消出品的函數
  const handleRevoke = (nft) => {
    // 實現取消出品的邏輯
    alert(`取消出品：${nft.name}`); // 臨時測試用，實際應調用合約方法
    setShowActionMenu(false);
  };

  return (
    <>
      <PageContainer className="content-container">
        <MainContent>
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
                  hasRightSidebar={false}
                  onItemAction={(nft, event) => {
                    if (event) {
                      event.preventDefault(); // 防止默認行為
                      event.stopPropagation(); // 阻止事件冒泡
                      handleNFTAction(nft, event);
                    }
                  }}
                  renderStatus={(nft) =>
                    nft.statusMessage
                      ? {
                          message: nft.statusMessage,
                          success: nft.statusType === "success",
                          fadeOut: nft.fadeOut,
                        }
                      : null
                  }
                  imageUrlKey="processedImage" // 使用預處理好的圖片URL
                />
              ) : (
                <EmptyState>
                  <h3>NFTが見つかりません</h3>
                  <p>NFTをミントするか、他のユーザーから購入してください。</p>
                </EmptyState>
              )}

              {showActionMenu && activeNFT && (
                <>
                  <ModalOverlay onClick={() => setShowActionMenu(false)} />
                  <ActionMenu
                    style={{
                      top: `${menuPosition.top}px`,
                      left: `${menuPosition.left}px`,
                    }}
                    flipUp={menuPosition.flipUp}
                  >
                    {activeNFT.isListed ? (
                      <ActionMenuItem
                        onClick={(e) => {
                          e.stopPropagation(); // 阻止事件冒泡
                          handleRevoke(activeNFT);
                        }}
                      >
                        出品を取り消す
                      </ActionMenuItem>
                    ) : (
                      <>
                        <ActionMenuItem
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            handleListNFT(activeNFT);
                          }}
                        >
                          マーケットに出品
                        </ActionMenuItem>
                        <ActionMenuItem
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            handleTransfer(activeNFT);
                          }}
                        >
                          転送する
                        </ActionMenuItem>
                      </>
                    )}
                    <ActionMenuItem
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡
                        navigate(`/history?nft=${activeNFT.tokenId}`);
                      }}
                    >
                      履歴ページへ
                    </ActionMenuItem>
                  </ActionMenu>
                </>
              )}
            </>
          )}
        </MainContent>
      </PageContainer>

      {showTransferModal && activeNFT && (
        <>
          <ModalOverlay onClick={closeTransferModal} />
          <TransferModal>
            <ModalCloseButton onClick={closeTransferModal}>×</ModalCloseButton>
            <h3>NFTを転送</h3>
            <NFTPreview>
              <IPFSImage
                src={activeNFT.processedImage || activeNFT.image}
                alt={activeNFT.name}
                width="100%"
                height="100%"
                objectFit="cover"
              />
              <div>
                <NFTNamePreviewSVG>{activeNFT.name}</NFTNamePreviewSVG>
                <NFTCollection>{activeNFT.collection}</NFTCollection>
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
                noArrow={false}
                centered={true}
              >
                {transferStatus.message}
              </CustomStatusMessage>
            )}
          </TransferModal>
        </>
      )}

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
    </>
  );
};

export default MyNFTs;
