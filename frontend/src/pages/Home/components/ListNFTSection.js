import React, { useState } from "react";
import styled from "styled-components";
import NFTGrid from "../../../components/NFTGrid/NFTGrid";
import { myNFTs } from "../../../data/mockData";
import SectionTitle from "../../../components/styled/SectionTitle";
import { PrimaryButton } from "../../../components/styled/Button";

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const PriceInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceInput = styled.input`
  flex-grow: 1;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium} 0 0
    ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  border-right: none;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
`;

const PriceCurrency = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.primary}22;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 0 ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
`;

const StatusMessage = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.success
      ? props.theme.colors.success + "22"
      : props.theme.colors.error + "22"};
  color: ${(props) =>
    props.success ? props.theme.colors.success : props.theme.colors.error};
  text-align: center;
  font-weight: 500;
`;

const ListNFTSection = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [listingStatus, setListingStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleSubmit = async () => {
    if (!selectedNFT || !price) {
      setListingStatus({
        show: true,
        success: false,
        message: "NFTと価格を選択してください。",
      });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setListingStatus({
        show: true,
        success: true,
        message: `${selectedNFT.name}が${price} ETHで出品されました。`,
      });
      setSelectedNFT(null);
      setPrice("");
    } catch (error) {
      setListingStatus({
        show: true,
        success: false,
        message: "出品に失敗しました。",
      });
    }
  };

  return (
    <Section>
      <SectionTitle>NFTを出品する</SectionTitle>

      <NFTGrid
        items={myNFTs}
        actionText={(nft) =>
          selectedNFT?.tokenId === nft.tokenId ? "選択済み" : "選択する"
        }
        onItemAction={setSelectedNFT}
      />

      <FormGroup>
        <Label>販売価格</Label>
        <PriceInputContainer>
          <PriceInput
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            disabled={!selectedNFT}
            min="0"
            step="0.01"
          />
          <PriceCurrency>ETH</PriceCurrency>
        </PriceInputContainer>
      </FormGroup>

      <PrimaryButton onClick={handleSubmit} disabled={!selectedNFT || !price}>
        マーケットに出品する
      </PrimaryButton>

      {listingStatus.show && (
        <StatusMessage success={listingStatus.success}>
          {listingStatus.message}
        </StatusMessage>
      )}
    </Section>
  );
};

export default ListNFTSection;
