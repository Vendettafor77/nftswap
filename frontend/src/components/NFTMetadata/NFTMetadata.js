import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getHttpUrl, getMetadataUrl } from "../../utils/ipfsUtils";
import IPFSImage from "../IPFSImage";

/**
 * 元數據容器樣式
 */
const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.large};
  }
`;

/**
 * 圖片容器樣式
 */
const ImageContainer = styled.div`
  width: 100%;
  height: ${(props) => props.imageHeight || "300px"};
  position: relative;
`;

/**
 * 內容容器樣式
 */
const ContentContainer = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
`;

/**
 * 標題樣式
 */
const Title = styled.h3`
  margin: 0 0 ${(props) => props.theme.spacing.md};
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

/**
 * 屬性列表樣式
 */
const AttributesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};
`;

/**
 * 屬性項目樣式
 */
const AttributeItem = styled.div`
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: ${(props) => props.theme.spacing.sm};
  text-align: center;

  .trait-type {
    font-size: 0.7rem;
    color: ${(props) => props.theme.colors.text.secondary};
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .trait-value {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};
    font-weight: 500;
  }
`;

/**
 * 加載中樣式
 */
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

/**
 * 錯誤消息樣式
 */
const ErrorMessage = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;

/**
 * NFT元數據組件 - 顯示NFT的元數據，包括圖片和屬性
 * @component
 * @param {Object} props - 組件屬性
 * @param {string} [props.metadataUrl] - 元數據URL，如果提供則直接從該URL獲取元數據
 * @param {string} [props.baseUrl] - 集合基礎URL
 * @param {string|number} [props.tokenId] - 代幣ID
 * @param {Object} [props.metadata] - 直接提供的元數據對象，如果提供則不會從URL獲取
 * @param {string} [props.gateway] - 自定義IPFS網關
 * @param {string} [props.imageHeight='300px'] - 圖片高度
 * @param {string} [props.className] - 額外的CSS類名
 * @returns {React.ReactElement} - NFT元數據組件
 */
const NFTMetadata = ({
  metadataUrl,
  baseUrl,
  tokenId,
  metadata: initialMetadata,
  gateway,
  imageHeight,
  className,
  ...props
}) => {
  const [metadata, setMetadata] = useState(initialMetadata || null);
  const [loading, setLoading] = useState(!initialMetadata);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 如果直接提供了元數據，則不需要獲取
    if (initialMetadata) {
      setMetadata(initialMetadata);
      setLoading(false);
      return;
    }

    // 如果沒有提供元數據URL或基礎URL+tokenId，則無法獲取元數據
    if (!metadataUrl && (!baseUrl || tokenId === undefined)) {
      setError("無效的元數據URL或tokenId");
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        // 確定元數據URL
        const url = metadataUrl || getMetadataUrl(baseUrl, tokenId, gateway);

        // 獲取元數據
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `獲取元數據失敗: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        console.error("獲取元數據錯誤:", err);
        setError(err.message || "獲取元數據失敗");
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [metadataUrl, baseUrl, tokenId, initialMetadata, gateway]);

  if (loading) {
    return <Loading>読み込み中...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!metadata) {
    return <ErrorMessage>メタデータが見つかりません</ErrorMessage>;
  }

  return (
    <MetadataContainer className={className} {...props}>
      <ImageContainer imageHeight={imageHeight}>
        <IPFSImage
          src={metadata.image}
          alt={metadata.name || "NFT Image"}
          gateway={gateway}
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </ImageContainer>

      <ContentContainer>
        <Title>{metadata.name || "Unnamed NFT"}</Title>

        {metadata.description && <p>{metadata.description}</p>}

        {metadata.attributes && metadata.attributes.length > 0 && (
          <>
            <h4>属性</h4>
            <AttributesList>
              {metadata.attributes.map((attr, index) => (
                <AttributeItem key={index}>
                  <div className="trait-type">{attr.trait_type}</div>
                  <div className="trait-value">{attr.value}</div>
                </AttributeItem>
              ))}
            </AttributesList>
          </>
        )}
      </ContentContainer>
    </MetadataContainer>
  );
};

NFTMetadata.propTypes = {
  metadataUrl: PropTypes.string,
  baseUrl: PropTypes.string,
  tokenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metadata: PropTypes.object,
  gateway: PropTypes.string,
  imageHeight: PropTypes.string,
  className: PropTypes.string,
};

export default NFTMetadata;
