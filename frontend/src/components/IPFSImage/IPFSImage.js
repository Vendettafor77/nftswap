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
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  overflow: hidden;
  border-radius: ${(props) =>
    props.borderRadius || props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.backgroundColor || "rgba(0, 0, 0, 0.05)"};
`;

/**
 * 圖片樣式組件
 */
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.objectFit || "cover"};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};

  ${(props) =>
    props.hoverEffect &&
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

  /* 紫色邊框（通過 text-shadow 實現） */
  text-shadow: 
    -1px -1px 0 rgb(157, 96, 214),  
    1px -1px 0 rgb(157, 96, 214),
    -1px 1px 0 rgb(157, 96, 214),
    1px 1px 0 rgb(157, 96, 214);
`;

/**
 * 佔位圖容器樣式
 */
const FallbackContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

  const MAX_RETRIES = 2; // 減少每個網關的最大重試次數，加快失敗檢測
  const MAX_GATEWAY_ATTEMPTS = ALTERNATE_IPFS_GATEWAYS.length; // 最大網關嘗試次數
  const LOAD_TIMEOUT = 5000; // 5秒加載超時

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setUseFallbackImage(true);
      return;
    }

    // 重置狀態
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(0);
    setGatewayIndex(-1);
    setUseFallbackImage(false);

    // 設置加載超時
    const timeoutId = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.warn(`IPFSImage: 加載超時 ${src}`);
        handleLoadingFailure();
      }
    }, LOAD_TIMEOUT);

    // 使用默認網關轉換URL
    tryLoadWithGateway(src, gateway);

    return () => {
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
      setImageUrl(httpUrl + cacheBuster);
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
      setUseFallbackImage(true);
      setHasError(true);
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
    setIsLoaded(true);
  };

  const handleImageError = () => {
    console.error(`IPFSImage: 圖片加載失敗 ${imageUrl}`);
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
      width={width}
      height={height}
      borderRadius={borderRadius}
      className={className}
      backgroundColor={backgroundColor}
      {...props}
    >
      {!hasError && !useFallbackImage && (
        <StyledImage
          src={imageUrl}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          isLoaded={isLoaded}
          objectFit={objectFit}
          hoverEffect={hoverEffect}
          key={`img-${gatewayIndex}-${retryCount}`} // 強制React在重試或切換網關時重新創建img元素
        />
      )}

      {useFallbackImage && (
        <FallbackContainer>
          <StyledImage
            src={fallbackImage}
            alt={`${alt} (フォールバック画像)`}
            onLoad={() => setIsLoaded(true)}
            isLoaded={isLoaded}
            objectFit={objectFit}
            hoverEffect={false}
          />
          <ErrorPlaceholder>
            {errorText}
            {gatewayIndex >= 0 &&
              ` (${MAX_GATEWAY_ATTEMPTS}個のゲートウェイを試しました)`}
          </ErrorPlaceholder>
        </FallbackContainer>
      )}

      {!isLoaded && !hasError && !useFallbackImage && (
        <Loader>{getLoaderText()}</Loader>
      )}

      {hasError && !useFallbackImage && (
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
