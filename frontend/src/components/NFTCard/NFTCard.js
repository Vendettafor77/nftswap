import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { AnimationContext } from "../../contexts/AnimationContext";
import {
  PrimaryButton,
  OutlineButton,
  SecondaryButton,
} from "../styled/Button";
import { StatusMessage } from "../styled/StatusMessage";
import GradientText from "../styled/GradientText";
import IPFSImage from "../IPFSImage";
import { getNFTImageUrl } from "../../utils/ipfsUtils";

// 邊框流光動畫
const borderGlow = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`;

// 加載指示器動畫
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 加載覆蓋層
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  z-index: 4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: 500;
  letter-spacing: 0.02em;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: ${rotate} 1s ease-in-out infinite;
  }
`;

// 選擇動畫樣式 - 簡化動畫效果
const cardAnimationStyles = css`
  position: relative;
  /* 減少過渡動畫時間以降低GPU消耗 */
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  /* 移除hover時的動畫效果，降低GPU消耗 */
  &:hover::after {
    opacity: 0.3;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(131, 58, 180, 0.2),
      rgba(29, 185, 253, 0.2)
    );
    border-radius: 16px; /* 使用與卡片相同的圓角 */
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    /* 移除混合模式以減少GPU渲染負擔 */
    transition: opacity 0.2s ease;
  }
`;

// 基礎標籤樣式
const BaseTag = styled.div`
  position: absolute;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
`;

// 修改Card組件
const Card = styled.div`
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface || "#1e2633"}, ${
      props.theme.colors.surface || "#1e2633"
    }F8)`};
  border-radius: 16px; /* 四個角都設置圓角 */
  overflow: hidden; /* 修改為hidden以確保特效不會超出容器 */
  box-shadow: ${(props) =>
    props.isSelected
      ? "0 15px 30px rgba(106, 17, 203, 0.3)"
      : "0 10px 20px rgba(0, 0, 0, 0.08)"};
  position: relative;
  border: ${(props) =>
    props.isSelected
      ? `2px solid ${props.theme.colors.primary}`
      : "1px solid rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  transform: ${(props) => (props.isSelected ? "translateY(-5px)" : "none")};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1 / 1.6; /* 調整卡片寬高比例，使其更高一些 */
  padding: 0; /* 確保沒有內邊距 */
  margin: 0; /* 確保沒有外邊距 */
  z-index: 1; /* 確保卡片有正確的層級 */

  ${(props) => !props.isSelected && cardAnimationStyles}

  ${(props) =>
    props.isSelected &&
    `
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      border-radius: 16px; /* 增加圓角尺寸 */
      box-shadow: inset 0 0 0 2px ${props.theme.colors.primary};
      pointer-events: none;
    }
  `}
`;

// 圖片容器 - 使用簡化的容器
const NFTImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 保持1:1的寬高比 */
  background-color: #1e2633; /* 使用與Card一致的背景色 */
  overflow: hidden; /* 確保內容不會溢出容器 */
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
`;

// 圖片內容容器 - 絕對定位以填充整個容器
const NFTImageContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
  overflow: hidden;
`;

// 修改Star組件
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 減少過渡動畫時間以降低GPU消耗 */
  transition: transform 0.2s ease;
  border-radius: inherit;
  z-index: 1;
`;

// 修改ListingBadge組件
const ListingBadge = styled(BaseTag)`
  top: 10px;
  right: 10px;
  background: ${(props) => props.theme.colors.primary}CC;
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

// 修改價格標示組件
const PriceTag = styled(BaseTag)`
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const EthSymbol = styled.span`
  font-size: 1em;
  color: #00ff9d;
  font-weight: bold;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// 調整卡片內容區域，減少底部空白
const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.md}; /* 減少底部間距 */
  position: relative;
  z-index: 3;
  background: ${(props) => props.theme.colors.surface}F8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 45%; /* 調整內容區域高度比例 */
  min-height: 140px; /* 增加最小高度 */
  border-radius: 0 0 16px 16px; /* 只設置下方圓角，上方與圖片容器相連 */
`;

// 添加卡片信息部分容器
const InfoContainer = styled.div`
  padding: 0;
  margin-bottom: 8px; /* 使用固定間距替代auto */
  flex-grow: 0;
`;

// 使用更高级的字体渐变效果
const NFTName = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 26px;
  padding-top: 0;
`;

// 使用共享的GradientText組件替代原有的NFTNameSVG
const NFTNameSVG = ({ children, id }) => {
  return (
    <GradientText
      id={`nftGradient-${id}`}
      fontSize="1.1rem"
      height="26"
      letterSpacing="0.01em"
    >
      {children}
    </GradientText>
  );
};

const NFTCollection = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  padding: 0;
`;

// 添加動畫切換按鈕容器
const ActionContainer = styled.div`
  display: flex;
  justify-content: center; /* 修改為居中對齊 */
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 45px; /* 調整為與ListNFTForm中的按鈕高度一致 */
  position: relative; /* 確保作為絕對定位的參考點 */
  z-index: 3;
  flex-shrink: 0;
  margin-top: 0;
  box-sizing: border-box;
`;

// 卡片內建按鈕樣式覆蓋
const CardButton = styled(PrimaryButton)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  height: 45px; /* 調整為與ListNFTForm中的按鈕高度一致 */
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  position: relative; /* 確保按鈕可作為錨點 */
  z-index: 5; /* 確保按鈕可點擊 */
  box-sizing: border-box; /* 確保尺寸包含padding和border */
  font-size: 0.95rem; /* 與ListNFTSection中的按鈕字體大小保持一致 */
`;

// 卡片狀態消息
const CardStatusMessage = styled(StatusMessage)`
  width: 100%; /* 確保與按鈕寬度一致 */
  margin: 0;
  padding: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
  text-align: center; /* 確保文字居中 */
  justify-content: center; /* 確保內容居中 */
  display: flex;
  align-items: center;
`;

/**
 * NFT卡片組件 - 用於顯示單個NFT
 * @component
 * @param {Object} props - 組件屬性
 * @param {Object} props.nft - NFT數據對象
 * @param {string|function} props.actionText - 操作按鈕文字或返回文字的函數
 * @param {function} props.onAction - 點擊操作按鈕時的回調函數
 * @param {Object} props.statusMessage - 狀態消息數據
 * @param {function} props.customActionButton - 自定義操作按鈕渲染函數
 * @param {boolean} props.isSelected - 是否被選中
 * @param {string} props.id - 卡片ID
 * @returns {React.ReactElement} NFT卡片組件
 */
const NFTCard = ({
  nft,
  actionText,
  onAction,
  statusMessage,
  customActionButton,
  isSelected,
  id,
}) => {
  // 使用實際 NFT 數據，而不是測試數據
  const nftData = nft;
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  useEffect(() => {
    let timeoutId;
    let isMounted = true; // 防止組件卸載後設置狀態

    const loadImageUrl = async () => {
      if (retryCount > MAX_RETRIES) {
        console.warn(
          `超過最大重試次數(${MAX_RETRIES})，停止嘗試加載NFT #${nftData.tokenId}的圖片`
        );
        if (isMounted) {
          setLoading(false);
          setLoadError(true);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setLoadError(false);
        }

        // 設置超時定時器，使用IPFSImage中的超時值（1000毫秒）
        timeoutId = setTimeout(() => {
          if (isMounted) {
            console.warn(
              `加載NFT #${nftData.tokenId}的圖片超時，嘗試重試(${retryCount + 1}/${MAX_RETRIES})`
            );
            setRetryCount((prev) => prev + 1);
          }
        }, 1000); // 使用與IPFSImage一致的超時時間（1秒）

        // 使用優化後的函數獲取圖片URL
        const result = await getNFTImageUrl(nftData);

        // 清除超時定時器
        clearTimeout(timeoutId);

        if (isMounted) {
          if (result.error) {
            // 處理錯誤情況
            setLoadError(true);
            console.error(
              `獲取NFT #${nftData.tokenId}圖片失敗: ${result.error}`
            );
          } else {
            // 設置圖片URL
            setImageUrl(result.url);
          }
          // 根據返回的isLoading狀態設置加載狀態
          setLoading(result.isLoading);
        }
      } catch (error) {
        console.error("獲取NFT圖片失敗:", error);

        // 清除超時定時器
        clearTimeout(timeoutId);

        if (isMounted) {
          setLoadError(true);
          setLoading(false);
          // 嘗試重試
          setRetryCount((prev) => prev + 1);
        }
      }
    };

    loadImageUrl();

    // 清理函數
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [nftData, retryCount]);

  const getActionText =
    typeof actionText === "function"
      ? () => actionText(nftData)
      : () => actionText || "操作";

  const handleAction = (event) => {
    if (onAction) {
      onAction(nftData, event);
    }
  };

  return (
    <Card isSelected={isSelected} id={id}>
      <NFTImageWrapper>
        <NFTImageContent>
          <IPFSImage
            src={
              imageUrl !== null && imageUrl !== undefined
                ? imageUrl
                : nftData.image || ""
            }
            alt={nftData.name || `NFT #${nftData.tokenId || "Unknown"}`}
            width="100%"
            height="100%"
            objectFit="cover"
            hoverEffect={false}
            errorText="画像の読み込みに失敗しました"
            backgroundColor="#1e2633"
            borderRadius="16px 16px 0 0" /* 只設置上方圓角 */
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          {loading && (
            <LoadingOverlay>
              読み込み中...
              {retryCount > 0 ? ` (リトライ ${retryCount}/${MAX_RETRIES})` : ""}
            </LoadingOverlay>
          )}
          {nftData.isListed && <ListingBadge>出品中</ListingBadge>}
          {nftData.price && (
            <PriceTag>
              <EthSymbol>Ξ</EthSymbol>
              {nftData.price}
            </PriceTag>
          )}
        </NFTImageContent>
      </NFTImageWrapper>
      <CardContent>
        <InfoContainer>
          <NFTName>
            <NFTNameSVG id={nftData.tokenId}>{nftData.name}</NFTNameSVG>
          </NFTName>
          <NFTCollection>{nftData.collection}</NFTCollection>
        </InfoContainer>
        <ActionContainer>
          {statusMessage ? (
            <CardStatusMessage
              success={statusMessage.success}
              fadeOut={statusMessage.fadeOut}
              style={statusMessage.style}
              centered={statusMessage.centered}
              noArrow={statusMessage.noArrow}
            >
              {statusMessage.message}
            </CardStatusMessage>
          ) : customActionButton ? (
            customActionButton()
          ) : (
            <CardButton onClick={handleAction}>{getActionText()}</CardButton>
          )}
        </ActionContainer>
      </CardContent>
    </Card>
  );
};

export default NFTCard;
