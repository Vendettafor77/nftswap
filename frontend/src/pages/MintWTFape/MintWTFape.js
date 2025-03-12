import React, { useState } from "react";
import styled from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
} from "../../components/styled/Button";
import { StatusMessage } from "../../components/styled/StatusMessage";
import { EthSymbol } from "../../components/NFTCard/NFTCard";

const MintContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
  padding-right: calc(${(props) => props.theme.spacing.xl} + 6px);
  padding-top: 0;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const MintHeader = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-top: 0;
`;

const Title = styled.h1`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

// 使用與NFTCard相同的SVG漸變文字
const GradientTitle = ({ children, className, fontSize = "2.5rem" }) => {
  const uniqueId = `title-gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <svg
      width="100%"
      height={fontSize === "2.5rem" ? "60" : "40"}
      style={{
        maxWidth: fontSize === "2.5rem" ? "600px" : "300px",
        overflow: "visible",
        filter: "drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",
      }}
      className={className}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      <text
        x={fontSize === "2.5rem" ? "50%" : "0"}
        y={fontSize === "2.5rem" ? "45" : "30"}
        fill={`url(#${uniqueId})`}
        fontWeight="600"
        fontSize={fontSize}
        fontFamily="inherit"
        textAnchor={fontSize === "2.5rem" ? "middle" : "start"}
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

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MintCard = styled.div`
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface}, ${props.theme.colors.surface}F8)`};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  position: relative;
`;

const NFTPreview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${(props) => props.theme.borderRadius.large};
  overflow: hidden;
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.background}, ${props.theme.colors.background}F8)`};
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.medium};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const MintSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    `linear-gradient(145deg, ${props.theme.colors.surface}05, ${props.theme.colors.surface}15)`};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const MintInfo = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const InfoTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  height: 40px;
`;

const InfoText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: 1.6;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.background}22;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const PriceTag = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 1.2rem;
`;

const TokenIdControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const TokenIdLabel = styled.span`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const TokenIdInput = styled.input.attrs({
  type: "text",
  className: "search-input token-id-input",
})`
  && {
    width: 180px !important;
    text-align: center;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  background: linear-gradient(
    145deg,
    rgba(106, 17, 203, 0.1),
    rgba(37, 117, 252, 0.1)
  );
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const TotalLabel = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;

const TotalAmount = styled.span`
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 1.2rem;
`;

const MintingStatus = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) =>
    props.success
      ? "linear-gradient(145deg, rgba(66, 183, 42, 0.1), rgba(66, 183, 42, 0.2))"
      : "linear-gradient(145deg, rgba(219, 55, 55, 0.1), rgba(219, 55, 55, 0.2))"};
  color: ${(props) => (props.success ? "#42b72a" : "#db3737")};
  border-left: 3px solid ${(props) => (props.success ? "#42b72a" : "#db3737")};
  display: ${(props) => (props.visible ? "block" : "none")};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
`;

// 示例NFT数据
const nftData = [
  {
    tokenId: "221",
    image:
      "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "453",
    image:
      "https://i.seadn.io/gcs/files/697ac9124075fe018f07313739769b11.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "874",
    image:
      "https://i.seadn.io/gcs/files/d3b1a773118e400b2d5f77bbc4aa9e17.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "612",
    image:
      "https://i.seadn.io/gcs/files/e1a31407b6968de5079ea112e45610df.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "197",
    image:
      "https://i.seadn.io/gcs/files/ce84942656d53eabd17d4cd311f79536.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "308",
    image:
      "https://i.seadn.io/gcs/files/dc6f0c6a33c5fe2c02cf1350dd8b828a.png?auto=format&dpr=1&w=1000",
  },
  {
    tokenId: "759",
    image:
      "https://i.seadn.io/gcs/files/03c44f5f83805652ba076c41fa43c4b1.png?auto=format&dpr=1&w=1000",
  },
];

const MintWTFape = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tokenId, setTokenId] = useState(nftData[0].tokenId);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState({
    visible: false,
    success: false,
    fadeOut: false,
    message: "",
  });

  const pricePerNFT = 0.18; // ETH

  // 处理TokenID输入
  const handleTokenIdChange = (e) => {
    const value = e.target.value;
    setTokenId(value);

    // 尝试根据输入的tokenId找到对应的NFT
    const index = nftData.findIndex((nft) => nft.tokenId === value);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  // 处理导航按钮
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : nftData.length - 1;
    setCurrentIndex(newIndex);
    setTokenId(nftData[newIndex].tokenId);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % nftData.length;
    setCurrentIndex(newIndex);
    setTokenId(nftData[newIndex].tokenId);
  };

  // 随机预览，同时更新TokenID
  const handleRandomPreview = () => {
    const randomIndex = Math.floor(Math.random() * nftData.length);
    setCurrentIndex(randomIndex);
    setTokenId(nftData[randomIndex].tokenId);
  };

  const handleMint = async () => {
    setIsMinting(true);
    setMintStatus({
      visible: false,
      success: false,
      fadeOut: false,
      message: "",
    });

    try {
      // 模拟铸造过程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟成功铸造
      setMintStatus({
        visible: true,
        success: true,
        fadeOut: false,
        message: `おめでとうございます！TokenID: ${tokenId}のWTFape NFTのミントに成功しました。`,
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setMintStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setMintStatus({
          visible: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);
    } catch (error) {
      setMintStatus({
        visible: true,
        success: false,
        fadeOut: false,
        message:
          "ミントに失敗しました。ウォレットの接続を確認して再試行してください。",
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setMintStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setMintStatus({
          visible: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <MintContainer className="content-container">
      <MintHeader>
        <Title>
          <GradientTitle>WTFape NFTをミントする</GradientTitle>
        </Title>
        <Description>
          WTFapeは10,000個のユニークに生成されたアートコレクションです。各WTFapeは一意であり、特別な属性と特徴を持っています。
        </Description>
      </MintHeader>

      <MintCard>
        <PreviewSection>
          <NFTPreview>
            <PreviewImage
              src={nftData[currentIndex].image}
              alt={`WTFape #${tokenId}`}
            />
          </NFTPreview>
          <OutlineButton onClick={handleRandomPreview}>
            ランダムプレビュー
          </OutlineButton>

          <NavigationButtons>
            <OutlineButton direction="prev" onClick={handlePrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              前のNFT
            </OutlineButton>
            <OutlineButton direction="next" onClick={handleNext}>
              次のNFT
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </OutlineButton>
          </NavigationButtons>
        </PreviewSection>

        <MintSection>
          <MintInfo>
            <InfoTitle>
              <GradientTitle fontSize="1.5rem">WTFape #{tokenId}</GradientTitle>
            </InfoTitle>
            <InfoText>
              WTFapeを所有すると、アートワークの完全な所有権と、コミュニティイベントや将来のプロジェクトエアドロップに参加する特権が得られます。
            </InfoText>

            <PriceContainer>
              <PriceTag>
                <EthSymbol>Ξ</EthSymbol>
                {pricePerNFT} ETH
              </PriceTag>
            </PriceContainer>

            <TokenIdControl>
              <TokenIdLabel>Token ID:</TokenIdLabel>
              <TokenIdInput
                type="text"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="NFTのTokenIDを入力"
              />
            </TokenIdControl>

            <TotalPrice>
              <TotalLabel>価格:</TotalLabel>
              <TotalAmount>
                <EthSymbol>Ξ</EthSymbol> {pricePerNFT.toFixed(2)} ETH
              </TotalAmount>
            </TotalPrice>
          </MintInfo>

          <PrimaryButton fullWidth disabled={isMinting} onClick={handleMint}>
            {isMinting ? "ミント中..." : "このWTFapeをミントする"}
          </PrimaryButton>

          {mintStatus.visible && (
            <StatusMessage
              success={mintStatus.success}
              fullWidth
              noArrow
              fadeOut={mintStatus.fadeOut}
              style={{ marginTop: "1rem", width: "100%" }}
            >
              {mintStatus.message}
            </StatusMessage>
          )}
        </MintSection>
      </MintCard>
    </MintContainer>
  );
};

export default MintWTFape;
