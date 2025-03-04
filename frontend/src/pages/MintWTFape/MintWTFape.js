import React, { useState } from "react";
import styled from "styled-components";

const MintContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const MintHeader = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MintCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PreviewSection = styled.div`
  flex: 1;
`;

const NFTPreview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${(props) => props.theme.borderRadius.large};
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.background};
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RandomizeButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
`;

const MintSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MintInfo = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const InfoTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
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
`;

const PriceTag = styled.div`
  background-color: ${(props) => props.theme.colors.primary}22;
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  font-weight: bold;
  font-size: 1.2rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const QuantityLabel = styled.span`
  margin-right: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.primary};
`;

const QuantityButton = styled.button`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  margin: 0 ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm};
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md} 0;
  margin-bottom: ${(props) => props.theme.spacing.md};
  border-top: 1px solid ${(props) => props.theme.colors.text.secondary}33;
  border-bottom: 1px solid ${(props) => props.theme.colors.text.secondary}33;
`;

const TotalLabel = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;

const TotalAmount = styled.span`
  color: ${(props) => props.theme.colors.accent};
  font-weight: bold;
  font-size: 1.2rem;
`;

const MintButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: auto;

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.secondary}88;
  }
`;

const MintingStatus = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  text-align: center;
  color: ${(props) =>
    props.success ? props.theme.colors.success : props.theme.colors.error};
  background-color: ${(props) =>
    props.success
      ? props.theme.colors.success + "22"
      : props.theme.colors.error + "22"};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  display: ${(props) => (props.visible ? "block" : "none")};
`;

// TokenID导航按钮样式更改
const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
`;

const NavButton = styled.button`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};

  svg {
    width: 20px;
    height: 20px;
  }
`;

// TokenID输入区样式
const TokenIdControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const TokenIdLabel = styled.span`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`;

const TokenIdInput = styled.input`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  text-align: center;
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
    setMintStatus({ visible: false, success: false, message: "" });

    try {
      // 模拟铸造过程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟成功铸造
      setMintStatus({
        visible: true,
        success: true,
        message: `おめでとうございます！TokenID: ${tokenId}のWTFape NFTのミントに成功しました。`,
      });
    } catch (error) {
      setMintStatus({
        visible: true,
        success: false,
        message:
          "ミントに失敗しました。ウォレットの接続を確認して再試行してください。",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <MintContainer>
      <MintHeader>
        <Title>WTFape NFTをミントする</Title>
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
          <RandomizeButton onClick={handleRandomPreview}>
            ランダムプレビュー
          </RandomizeButton>

          <NavigationButtons>
            <NavButton onClick={handlePrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              前のNFT
            </NavButton>
            <NavButton onClick={handleNext}>
              次のNFT
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </NavButton>
          </NavigationButtons>
        </PreviewSection>

        <MintSection>
          <MintInfo>
            <InfoTitle>WTFape #{tokenId}</InfoTitle>
            <InfoText>
              WTFapeを所有すると、アートワークの完全な所有権と、コミュニティイベントや将来のプロジェクトエアドロップに参加する特権が得られます。
            </InfoText>

            <PriceContainer>
              <PriceTag>{pricePerNFT} ETH</PriceTag>
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
              <TotalAmount>{pricePerNFT.toFixed(2)} ETH</TotalAmount>
            </TotalPrice>
          </MintInfo>

          <MintButton disabled={isMinting} onClick={handleMint}>
            {isMinting ? "ミント中..." : "このWTFapeをミントする"}
          </MintButton>

          <MintingStatus
            visible={mintStatus.visible}
            success={mintStatus.success}
          >
            {mintStatus.message}
          </MintingStatus>
        </MintSection>
      </MintCard>
    </MintContainer>
  );
};

export default MintWTFape;
