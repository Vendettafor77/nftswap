import React, { useState, useCallback } from "react";
import styled from "styled-components";
import NFTGrid from "../../../components/NFTGrid/NFTGrid";
import { myNFTs } from "../../../data/mockData";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/styled/Button";
import { StatusMessage } from "../../../components/styled/StatusMessage";

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
  background-color: ${(props) => props.theme.colors.background}CC;
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
  margin-top: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 400px;
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
  width: 100%;
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

// 新增選中NFT信息顯示組件
const SelectedNFTInfo = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.primary}11;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
`;

const NFTImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-right: ${(props) => props.theme.spacing.sm};
  object-fit: cover;
`;

const NFTDetails = styled.div`
  flex: 1;
`;

const NFTName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTCollection = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: stretch;
  flex-shrink: 0;
  min-width: 250px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ListNFTSection = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [listingStatus, setListingStatus] = useState({
    show: false,
    success: false,
    fadeOut: false,
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
        fadeOut: false,
        message: "NFTと価格を選択してください。",
      });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setListingStatus({
        show: true,
        success: true,
        fadeOut: false,
        message: `${selectedNFT.name}が${price} ETHで出品されました。`,
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setListingStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setListingStatus({
          show: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);

      setSelectedNFT(null);
      setPrice("");
    } catch (error) {
      setListingStatus({
        show: true,
        success: false,
        fadeOut: false,
        message: "出品に失敗しました。",
      });

      // 3秒後開始淡出動畫
      setTimeout(() => {
        setListingStatus((prev) => ({ ...prev, fadeOut: true }));
      }, 3000);

      // 淡出動畫後隱藏信息
      setTimeout(() => {
        setListingStatus({
          show: false,
          success: false,
          fadeOut: false,
          message: "",
        });
      }, 3400);
    }
  };

  const handleClear = () => {
    setSelectedNFT(null);
    setPrice("");
  };

  const renderActionButton = (nft) => {
    const isSelected = selectedNFT?.tokenId === nft.tokenId;
    return isSelected ? (
      <SecondaryButton fullWidth>選択済み</SecondaryButton>
    ) : (
      <PrimaryButton fullWidth>選択する</PrimaryButton>
    );
  };

  const onAction = (nft) => {
    // 如果是選中的 NFT，則取消選中
    if (selectedNFT?.tokenId === nft.tokenId) {
      setSelectedNFT(null);
    } else {
      // 否則設置為選中狀態
      setSelectedNFT(nft);
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
          onItemAction={onAction}
          className="nft-grid"
          renderActionButton={renderActionButton}
          selectedNFT={selectedNFT}
        />
      </NFTGridContainer>

      <FormContainer>
        {selectedNFT && (
          <SelectedNFTInfo>
            <NFTImage src={selectedNFT.image} alt={selectedNFT.name} />
            <NFTDetails>
              <NFTName>{selectedNFT.name}</NFTName>
              <NFTCollection>{selectedNFT.collection}</NFTCollection>
            </NFTDetails>
          </SelectedNFTInfo>
        )}

        <FormContent>
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

          <ButtonsContainer>
            {selectedNFT && (
              <SecondaryButton onClick={handleClear}>クリア</SecondaryButton>
            )}
            <PrimaryButton
              onClick={handleSubmit}
              disabled={!selectedNFT || !price}
            >
              マーケットに出品する
            </PrimaryButton>
          </ButtonsContainer>
        </FormContent>

        {listingStatus.show && (
          <StatusMessage
            success={listingStatus.success}
            fullWidth
            noArrow
            fadeOut={listingStatus.fadeOut}
            style={{ marginTop: "1rem", width: "100%" }}
          >
            {listingStatus.message}
          </StatusMessage>
        )}
      </FormContainer>
    </Section>
  );
};

export default ListNFTSection;
