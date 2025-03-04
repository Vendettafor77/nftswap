import React, { useState } from "react";
import styled from "styled-components";
import NFTCard from "../NFTCard/NFTCard";

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SwapSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const NFTSelection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  font-size: 1rem;
  font-weight: bold;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.lg};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}DD;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.theme.spacing.lg} 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.colors.text.secondary};
  }

  span {
    padding: 0 ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.text.secondary};
    font-weight: bold;
  }
`;

const SwapForm = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [targetAddress, setTargetAddress] = useState("");

  // 仮のデータ
  const myNFTs = [
    {
      tokenId: "001",
      name: "サムライNFT",
      collection: "Samurai Collection",
      image: "https://via.placeholder.com/250?text=Samurai",
    },
    {
      tokenId: "002",
      name: "フジヤマNFT",
      collection: "Japan Scenery",
      image: "https://via.placeholder.com/250?text=Fujiyama",
    },
  ];

  return (
    <FormContainer>
      <Title>NFTスワップを作成</Title>

      <SwapSection>
        <SectionTitle>自分のNFTを選択</SectionTitle>
        <NFTSelection>
          {myNFTs.map((nft, index) => (
            <div key={index} onClick={() => setSelectedNFT(nft)}>
              <NFTCard
                nft={nft}
                actionText={
                  selectedNFT?.tokenId === nft.tokenId ? "選択済み" : "選択する"
                }
              />
            </div>
          ))}
        </NFTSelection>
      </SwapSection>

      <Divider>
        <span>交換条件</span>
      </Divider>

      <SwapSection>
        <InputGroup>
          <Label htmlFor="targetAddress">相手のウォレットアドレス</Label>
          <Input
            id="targetAddress"
            type="text"
            placeholder="0x..."
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
          />
        </InputGroup>
      </SwapSection>

      <SubmitButton disabled={!selectedNFT || !targetAddress}>
        スワップを作成する
      </SubmitButton>
    </FormContainer>
  );
};

export default SwapForm;
