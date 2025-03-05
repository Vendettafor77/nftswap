import React, { useState, useCallback } from "react";
import styled from "styled-components";
import NFTGrid from "../../../components/NFTGrid/NFTGrid";
import { myNFTs } from "../../../data/mockData";
import { PrimaryButton } from "../../../components/styled/Button";

const Section = styled.div`
  /* 移除原有的背景色和陰影，與主頁保持一致 */
  transform: translateZ(0);
  will-change: transform;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 12px 16px;
  box-shadow: none;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  width: 220px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}99;
  }
`;

const NFTGridContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};

  /* 確保卡片大小與主頁一致 */
  .nft-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${(props) => props.theme.spacing.lg};
  }
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
  margin-top: ${(props) => props.theme.spacing.xl};
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
  const [searchTerm, setSearchTerm] = useState("");
  const [listingStatus, setListingStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const filteredNFTs = myNFTs.filter((nft) =>
    searchTerm
      ? nft.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

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
      <FiltersContainer>
        <SearchInput
          placeholder="所持NFTを検索..."
          value={searchTerm}
          onChange={handleSearchChange}
          spellCheck="false"
          autoComplete="off"
        />
      </FiltersContainer>

      <NFTGridContainer>
        <NFTGrid
          items={filteredNFTs}
          actionText={(nft) =>
            selectedNFT?.tokenId === nft.tokenId ? "選択済み" : "選択する"
          }
          onItemAction={setSelectedNFT}
          className="nft-grid"
        />
      </NFTGridContainer>

      <FormContainer>
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
              autoComplete="off"
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
      </FormContainer>
    </Section>
  );
};

export default ListNFTSection;
