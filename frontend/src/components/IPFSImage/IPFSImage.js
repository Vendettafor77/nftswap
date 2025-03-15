import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getHttpUrl,
  DEFAULT_IPFS_GATEWAY,
  ALTERNATE_IPFS_GATEWAYS,
} from "../../utils/ipfsUtils";

// 預設失敗時的佔位圖路徑
const DEFAULT_FALLBACK_IMAGE = "/グレーちゃん.jpeg";

/**
 * 圖片容器樣式組件
 */
const ImageContainer = styled.div`
  position: relative;
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "auto"};
  overflow: hidden;
  border-radius: ${(props) =>
    props.$borderRadius || props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.$backgroundColor || "rgba(0, 0, 0, 0.05)"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
`;

/**
 * 圖片樣式組件
 */
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.$objectFit || "cover"};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  border-radius: inherit; /* 繼承容器的圓角 */
  display: block; /* 確保圖片是塊級元素，避免底部間隙 */
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  position: absolute; /* 確保圖片絕對定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: inherit; /* 繼承背景色 */

  ${(props) =>
    props.$hoverEffect &&
    `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

/**
 * 加載中指示器樣式組件
 */
const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.8rem;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * 錯誤顯示樣式組件
 */
const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white; /* 文字填充顏色 */
  font-size: 1rem;
  padding: 10px;
  text-align: center;
  z-index: 3;
  font-weight: 600;
  border-radius: inherit; /* 繼承容器的圓角 */

  /* 紫色邊框（通過 text-shadow 實現） */
  text-shadow:
    -1px -1px 0 rgb(157, 96, 214),
    1px -1px 0 rgb(157, 96, 214),
    -1px 1px 0 rgb(157, 96, 214),
    1px 1px 0 rgb(157, 96, 214);

  /* 添加淡入動畫，避免閃現 */
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.5s; /* 延遲顯示錯誤信息 */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * 佔位圖容器樣式
 */
const FallbackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit; /* 繼承容器的圓角 */
  overflow: hidden; /* 確保內容不會溢出圓角 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * IPFS圖片組件 - 專門用於顯示IPFS協議的圖片
 * @component
 * @param {Object} props - 組件屬性
 * @param {string} props.src - IPFS圖片URL (ipfs://... 或 http://... 格式都支持)
 * @param {string} props.alt - 圖片替代文本
 * @param {string} [props.gateway=DEFAULT_IPFS_GATEWAY] - 自定義IPFS網關，默認使用DEFAULT_IPFS_GATEWAY
 * @param {string} [props.width='100%'] - 圖片寬度
 * @param {string} [props.height='auto'] - 圖片高度
 * @param {string} [props.objectFit='cover'] - 圖片填充模式
 * @param {boolean} [props.hoverEffect=false] - 是否啟用懸停效果
 * @param {string} [props.borderRadius] - 圖片邊框圓角
 * @param {string} [props.className] - 額外的CSS類名
 * @param {string} [props.backgroundColor] - 背景顏色
 * @param {string} [props.errorText='画像を読み込めません'] - 加載失敗時顯示的文本
 * @param {string} [props.fallbackImage=DEFAULT_FALLBACK_IMAGE] - 加載失敗時顯示的佔位圖片
 * @returns {React.ReactElement} - IPFS圖片組件
 */
const IPFSImage = ({
  src,
  alt,
  gateway = DEFAULT_IPFS_GATEWAY,
  width,
  height,
  objectFit,
  hoverEffect,
  borderRadius,
  className,
  backgroundColor,
  errorText = "画像を読み込めません",
  fallbackImage = DEFAULT_FALLBACK_IMAGE,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [gatewayIndex, setGatewayIndex] = useState(-1); // -1表示使用默認網關
  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const [isAttemptingLoad, setIsAttemptingLoad] = useState(true); // 新增狀態：標記是否正在嘗試加載
  const [showError, setShowError] = useState(false); // 新增狀態：控制錯誤信息顯示
  const [previousImage, setPreviousImage] = useState(null); // 保存之前加載成功的圖片

  const MAX_RETRIES = 2; // 每個網關的最大重試次數
  const MAX_GATEWAY_ATTEMPTS = ALTERNATE_IPFS_GATEWAYS.length; // 最大網關嘗試次數
  const LOAD_TIMEOUT = 8000; // 增加加載超時到8秒
  const ERROR_DISPLAY_DELAY = 800; // 錯誤信息顯示延遲（毫秒）

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setUseFallbackImage(true);
      setIsAttemptingLoad(false);
      // 延遲顯示錯誤信息
      setTimeout(() => setShowError(true), ERROR_DISPLAY_DELAY);
      return;
    }

    // 如果URL没有變化，不重新加載
    if (src === previousImage) {
      return;
    }

    let isMounted = true; // 跟踪組件是否已卸載

    // 重置狀態，但保持之前加載的圖片可見直到新圖片加載成功
    setHasError(false);
    setRetryCount(0);
    setGatewayIndex(-1);
    setUseFallbackImage(false);
    setIsAttemptingLoad(true);
    setShowError(false);

    // 保留之前的isLoaded狀態，避免閃爍
    // 等到新圖片加載成功後再更新isLoaded

    // 設置加載超時
    const timeoutId = setTimeout(() => {
      if (isMounted && !hasError && isAttemptingLoad) {
        console.warn(`IPFSImage: 加載超時 ${src}`);
        handleLoadingFailure();
      }
    }, LOAD_TIMEOUT);

    // 使用默認網關轉換URL
    tryLoadWithGateway(src, gateway);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [src, gateway]);

  /**
   * 嘗試使用指定網關加載圖片
   * @param {string} originalSrc - 原始圖片URL
   * @param {string} currentGateway - 當前使用的網關
   */
  const tryLoadWithGateway = (originalSrc, currentGateway) => {
    try {
      // 如果src為null或undefined，直接失敗
      if (!originalSrc) {
        console.error(`IPFSImage: 無效的圖片URL: ${originalSrc}`);
        handleLoadingFailure();
        return;
      }

      // 檢查src是否已經是http開頭的URL，如果是，直接使用
      if (originalSrc.startsWith("http")) {
        console.log(`IPFSImage: URL已經是HTTP格式，直接使用: ${originalSrc}`);
        setImageUrl(originalSrc);
        return;
      }

      // 檢查是否是本地文件路徑
      if (originalSrc.startsWith("/")) {
        console.log(`IPFSImage: 本地文件路徑，直接使用: ${originalSrc}`);
        setImageUrl(originalSrc);
        return;
      }

      const httpUrl = getHttpUrl(originalSrc, currentGateway);

      // 如果getHttpUrl返回null，表示無法轉換URL
      if (!httpUrl) {
        console.error(`IPFSImage: 無法轉換URL: ${originalSrc}`);
        handleLoadingFailure();
        return;
      }

      console.log(
        `IPFSImage: 使用網關 ${currentGateway} 轉換URL ${originalSrc} -> ${httpUrl}`
      );

      // 添加緩存破壞參數，避免瀏覽器緩存問題
      const cacheBuster = `${httpUrl.includes("?") ? "&" : "?"}cb=${Date.now()}`;
      const finalUrl = httpUrl + cacheBuster;

      // 預加載圖片以檢查是否可訪問
      const preloadImg = new Image();
      preloadImg.onload = () => {
        setImageUrl(finalUrl);
      };
      preloadImg.onerror = () => {
        handleLoadingFailure();
      };
      preloadImg.src = finalUrl;
    } catch (error) {
      console.error(`IPFSImage: URL轉換錯誤:`, error);
      handleLoadingFailure();
    }
  };

  /**
   * 嘗試使用下一個備用網關
   */
  const tryNextGateway = () => {
    const nextGatewayIndex = gatewayIndex + 1;

    if (nextGatewayIndex < MAX_GATEWAY_ATTEMPTS) {
      const nextGateway = ALTERNATE_IPFS_GATEWAYS[nextGatewayIndex];
      console.log(
        `IPFSImage: 切換到備用網關 ${nextGateway} (${nextGatewayIndex + 1}/${MAX_GATEWAY_ATTEMPTS})`
      );

      setGatewayIndex(nextGatewayIndex);
      setRetryCount(0); // 重置當前網關的重試次數

      tryLoadWithGateway(src, nextGateway);
    } else {
      console.log(`IPFSImage: 所有網關都已嘗試，顯示佔位圖`);
      setIsAttemptingLoad(false);
      setUseFallbackImage(true);
      setHasError(true);

      // 延遲顯示錯誤信息
      setTimeout(() => setShowError(true), ERROR_DISPLAY_DELAY);
    }
  };

  /**
   * 處理加載失敗情況
   */
  const handleLoadingFailure = () => {
    if (retryCount < MAX_RETRIES) {
      // 同一網關內重試
      console.log(`IPFSImage: 同一網關重試 (${retryCount + 1}/${MAX_RETRIES})`);
      setRetryCount((prev) => prev + 1);

      // 添加一個隨機參數來避免瀏覽器緩存
      const cacheBuster = `?cb=${Date.now()}`;
      setImageUrl((prev) => (prev.includes("?") ? prev : prev + cacheBuster));
    } else {
      // 當前網關重試達到上限，嘗試下一個網關
      tryNextGateway();
    }
  };

  const handleImageLoad = () => {
    console.log(`IPFSImage: 圖片加載成功 ${imageUrl}`);
    setPreviousImage(src); // 保存成功加載的圖片URL
    setIsLoaded(true);
    setIsAttemptingLoad(false);
    setHasError(false);
    setShowError(false);
  };

  const handleImageError = () => {
    console.error(`IPFSImage: 圖片加載失敗 ${imageUrl}`);

    // 檢查URL是否指向本地文件
    if (src.startsWith("/")) {
      console.log(`IPFSImage: 嘗試直接使用本地路徑: ${src}`);
      setImageUrl(src);
      return;
    }

    // 檢查是否是我們已知的問題URL格式，應用特殊處理
    if (src.includes("ipfs://")) {
      console.log(`IPFSImage: 檢測到ipfs://格式，嘗試特殊處理`);
      // 這裡可以添加特殊處理邏輯
    }

    handleLoadingFailure();
  };

  // 獲取顯示的加載信息
  const getLoaderText = () => {
    if (gatewayIndex >= 0) {
      return `別のゲートウェイで試行中... (${gatewayIndex + 1}/${MAX_GATEWAY_ATTEMPTS})`;
    } else if (retryCount > 0) {
      return `リトライ中... (${retryCount}/${MAX_RETRIES})`;
    }
    return "";
  };

  return (
    <ImageContainer
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      className={className}
      $backgroundColor={backgroundColor}
      style={{
        margin: 0,
        padding: 0,
        border: "none",
        boxSizing: "border-box",
        overflow: "hidden",
        ...props.style,
      }}
    >
      {/* 背景預覽圖 - 如果之前有成功加載的圖片，先顯示它，避免閃爍 */}
      {previousImage && !isLoaded && !hasError && (
        <StyledImage
          src={
            previousImage.startsWith("http")
              ? previousImage
              : getHttpUrl(previousImage, gateway)
          }
          alt={`${alt} (前回のイメージ)`}
          $isLoaded={true}
          $objectFit={objectFit}
          $hoverEffect={false}
          style={{
            opacity: 0.3,
            zIndex: 1,
          }}
        />
      )}

      {/* 主要圖片顯示 */}
      {!hasError && !useFallbackImage && (
        <StyledImage
          src={imageUrl}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          $isLoaded={isLoaded}
          $objectFit={objectFit}
          $hoverEffect={hoverEffect}
          key={`img-${gatewayIndex}-${retryCount}`} // 強制React在重試或切換網關時重新創建img元素
          style={{
            zIndex: 2,
            borderRadius: borderRadius || "inherit",
            backgroundColor: backgroundColor || "inherit",
          }}
        />
      )}

      {/* 備用圖片顯示 */}
      {useFallbackImage && (
        <FallbackContainer>
          <StyledImage
            src={fallbackImage}
            alt={`${alt} (フォールバック画像)`}
            onLoad={() => setIsLoaded(true)}
            $isLoaded={isLoaded}
            $objectFit={objectFit}
            $hoverEffect={false}
            style={{
              borderRadius: borderRadius || "inherit",
              backgroundColor: backgroundColor || "inherit",
            }}
          />
          {showError && (
            <ErrorPlaceholder>
              {errorText}
              {gatewayIndex >= 0 &&
                ` (${MAX_GATEWAY_ATTEMPTS}個のゲートウェイを試しました)`}
            </ErrorPlaceholder>
          )}
        </FallbackContainer>
      )}

      {/* 加載中顯示 */}
      {!isLoaded && isAttemptingLoad && <Loader>{getLoaderText()}</Loader>}

      {/* 錯誤信息顯示 - 只在不再嘗試加載且有錯誤時顯示 */}
      {hasError && !useFallbackImage && !isAttemptingLoad && showError && (
        <ErrorPlaceholder>
          {errorText}
          {gatewayIndex >= 0 &&
            ` (${MAX_GATEWAY_ATTEMPTS}個のゲートウェイを試しました)`}
        </ErrorPlaceholder>
      )}
    </ImageContainer>
  );
};

IPFSImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  gateway: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  objectFit: PropTypes.string,
  hoverEffect: PropTypes.bool,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  errorText: PropTypes.string,
  fallbackImage: PropTypes.string,
};

export default IPFSImage;
