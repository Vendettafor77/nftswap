import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IPFSImage from "../IPFSImage";
import NFTMetadata from "../NFTMetadata";
import {
  getHttpUrl,
  getMetadataUrl,
  fetchNFTMetadata,
  fetchNFTImageUrl,
} from "../../utils/ipfsUtils";

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const Section = styled.section`
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
`;

const CodeBlock = styled.pre`
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.md};
  overflow-x: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  margin: ${(props) => props.theme.spacing.md} 0;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};

  label {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.secondary};
  }

  input {
    padding: ${(props) => props.theme.spacing.sm};
    border-radius: ${(props) => props.theme.borderRadius.small};
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(30, 36, 68, 0.6);
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const Button = styled.button`
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  margin-top: ${(props) => props.theme.spacing.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusMessage = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.9rem;

  &.success {
    background-color: rgba(0, 200, 83, 0.1);
    color: #00c853;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff0000;
  }

  &.loading {
    background-color: rgba(33, 150, 243, 0.1);
    color: #2196f3;
  }
`;

/**
 * IPFS示例組件 - 展示如何使用IPFS相關組件
 * @component
 * @returns {React.ReactElement} - IPFS示例組件
 */
const IPFSExample = () => {
  // 示例IPFS URLs
  const sampleIPFSUrls = [
    "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    "QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
  ];

  // 示例元數據
  const sampleMetadata = {
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    attributes: [
      { trait_type: "Earring", value: "Silver Hoop" },
      { trait_type: "Background", value: "Orange" },
      { trait_type: "Fur", value: "Robot" },
      { trait_type: "Clothes", value: "Striped Tee" },
      { trait_type: "Mouth", value: "Discomfort" },
      { trait_type: "Eyes", value: "X Eyes" },
    ],
    name: "Bored Ape #0",
    description:
      "BAYC是一個NFT集合，每個令牌是由Boring Ape Yacht Club產生的獨特的無聊猿。",
  };

  // 用戶輸入狀態
  const [baseUrl, setBaseUrl] = useState(
    "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"
  );
  const [tokenId, setTokenId] = useState("0");
  const [customUrl, setCustomUrl] = useState("");

  // TokenID動態獲取狀態
  const [dynamicTokenId, setDynamicTokenId] = useState("0");
  const [dynamicBaseUrl, setDynamicBaseUrl] = useState(
    "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"
  );
  const [dynamicMetadata, setDynamicMetadata] = useState(null);
  const [dynamicImageUrl, setDynamicImageUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState(null); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetchMetadata = async () => {
    try {
      setFetchStatus("loading");
      setErrorMessage("");

      // 獲取元數據
      const metadata = await fetchNFTMetadata(dynamicBaseUrl, dynamicTokenId);
      setDynamicMetadata(metadata);

      // 獲取圖片URL
      const imageUrl = await fetchNFTImageUrl(dynamicBaseUrl, dynamicTokenId);
      setDynamicImageUrl(imageUrl);

      setFetchStatus("success");
    } catch (error) {
      console.error("獲取失敗:", error);
      setFetchStatus("error");
      setErrorMessage(error.message || "獲取元數據失敗");
    }
  };

  return (
    <ExampleContainer>
      <Section>
        <SectionTitle>IPFSイメージコンポーネント</SectionTitle>
        <p>
          このコンポーネントはIPFSプロトコルの画像URLを処理し、正しく表示します。
        </p>

        <CodeBlock>
          {`import IPFSImage from '../IPFSImage';
          
// 使用例
<IPFSImage 
  src="ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ" 
  alt="Bored Ape" 
  width="200px"
  height="200px"
/>`}
        </CodeBlock>

        <h3>さまざまなIPFS URL形式のデモ:</h3>
        <ImageGrid>
          {sampleIPFSUrls.map((url, index) => (
            <div key={index}>
              <p>URL: {url}</p>
              <p>変換後: {getHttpUrl(url)}</p>
              <IPFSImage
                src={url}
                alt={`IPFS Image ${index}`}
                width="100%"
                height="200px"
                borderRadius="10px"
              />
            </div>
          ))}
        </ImageGrid>
      </Section>

      <Section>
        <SectionTitle>NFTメタデータコンポーネント</SectionTitle>
        <p>
          このコンポーネントはNFTのメタデータを取得し、画像と属性を表示します。
        </p>

        <CodeBlock>
          {`import NFTMetadata from '../NFTMetadata';
          
// メタデータオブジェクトを直接提供する場合
<NFTMetadata 
  metadata={sampleMetadata} 
  imageHeight="300px"
/>

// ベースURLとトークンIDを提供して自動的にメタデータを取得する場合
<NFTMetadata 
  baseUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq" 
  tokenId="0"
  imageHeight="300px"
/>

// メタデータURLを直接提供する場合
<NFTMetadata 
  metadataUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0" 
  imageHeight="300px"
/>`}
        </CodeBlock>

        <h3>サンプルメタデータの表示:</h3>
        <MetadataGrid>
          <NFTMetadata metadata={sampleMetadata} imageHeight="300px" />

          <div>
            <h3>独自のNFTメタデータを取得する</h3>
            <InputGroup>
              <label>ベースURL:</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"
              />
            </InputGroup>

            <InputGroup>
              <label>トークンID:</label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="0"
              />
            </InputGroup>

            <p>または</p>

            <InputGroup>
              <label>メタデータURL (オプション):</label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0"
              />
            </InputGroup>

            <Button
              onClick={() => {
                // ここでステートを更新して、コンポーネントを再レンダリングさせる
                // 実際のアプリケーションではここで何か処理が必要
                setBaseUrl(baseUrl);
                setTokenId(tokenId);
                setCustomUrl(customUrl);
              }}
            >
              更新
            </Button>
          </div>
        </MetadataGrid>

        {customUrl ? (
          <div style={{ marginTop: "20px" }}>
            <h3>カスタムURLの結果:</h3>
            <NFTMetadata metadataUrl={customUrl} imageHeight="300px" />
          </div>
        ) : (
          baseUrl &&
          tokenId && (
            <div style={{ marginTop: "20px" }}>
              <h3>ベースURL + トークンIDの結果:</h3>
              <NFTMetadata
                baseUrl={baseUrl}
                tokenId={tokenId}
                imageHeight="300px"
              />
            </div>
          )
        )}
      </Section>

      <Section>
        <SectionTitle>トークンIDに基づいたNFTメタデータの取得</SectionTitle>
        <p>
          TokenIDを使用してIPFSからNFTメタデータと画像を動的に取得するデモです。
        </p>

        <CodeBlock>
          {`// TokenID に基づいてメタデータと画像を取得
import { fetchNFTMetadata, fetchNFTImageUrl } from "../../utils/ipfsUtils";

// メタデータを取得
const metadata = await fetchNFTMetadata(
  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", 
  "0"
);

// 画像URLを直接取得
const imageUrl = await fetchNFTImageUrl(
  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", 
  "0"
);`}
        </CodeBlock>

        <InputGroup>
          <label>ベースURL:</label>
          <input
            type="text"
            value={dynamicBaseUrl}
            onChange={(e) => setDynamicBaseUrl(e.target.value)}
            placeholder="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"
          />
        </InputGroup>

        <InputGroup>
          <label>トークンID:</label>
          <input
            type="text"
            value={dynamicTokenId}
            onChange={(e) => setDynamicTokenId(e.target.value)}
            placeholder="0"
          />
        </InputGroup>

        <Button onClick={handleFetchMetadata}>
          メタデータとイメージを取得
        </Button>

        {fetchStatus === "loading" && (
          <StatusMessage className="loading">読み込み中...</StatusMessage>
        )}

        {fetchStatus === "error" && (
          <StatusMessage className="error">{errorMessage}</StatusMessage>
        )}

        {fetchStatus === "success" && (
          <div>
            <StatusMessage className="success">
              メタデータを正常に取得しました！
            </StatusMessage>

            <h3>取得したメタデータ:</h3>
            <CodeBlock>{JSON.stringify(dynamicMetadata, null, 2)}</CodeBlock>

            <h3>画像URL:</h3>
            <p>{dynamicImageUrl}</p>

            <h3>画像プレビュー:</h3>
            <IPFSImage
              src={dynamicImageUrl}
              alt="Dynamic NFT Image"
              width="300px"
              height="300px"
              borderRadius="10px"
            />
          </div>
        )}
      </Section>
    </ExampleContainer>
  );
};

export default IPFSExample;
