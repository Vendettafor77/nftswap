import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../../components/styled/Button";
import { StatusMessage } from "../../../components/styled/StatusMessage";
import { selectedNFTRef } from "./ListNFTSection";

// 表單容器 - 美化版
const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.md};
`;

// 表單標題 - 居中顯示
const FormTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  font-size: 1.25rem;
  text-align: center;
  width: 100%;
`;

// 選中NFT信息顯示組件 - 美化版
const SelectedNFTInfo = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 60px;
  box-sizing: border-box;
  width: 100%;
`;

// NFT圖片 - 稍微放大
const NFTImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-right: ${(props) => props.theme.spacing.md};
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// NFT詳情 - 改進樣式
const NFTDetails = styled.div`
  flex: 1;
`;

// NFT名稱 - 漸變效果
const NFTName = styled.div`
  font-weight: bold;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1rem;
`;

// NFT收藏集 - 改進樣式
const NFTCollection = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: 2px;
`;

// 提示信息 - 美化版
const NFTSelectPrompt = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.secondary};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 0.95rem;
`;

// 表單內容容器 - 美化版
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

// 表單組 - 改進樣式
const FormGroup = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

// 標籤 - 居中顯示
const Label = styled.label`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  display: block;
  text-align: center;
  width: 100%;
`;

// 價格輸入容器 - 美化版
const PriceInputContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

// 價格輸入框 - 美化版
const PriceInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(106, 17, 203, 0.2);
  background: rgba(30, 36, 68, 0.3);
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  border-right: none;
  border-radius: ${(props) => props.theme.borderRadius.medium} 0 0
    ${(props) => props.theme.borderRadius.medium};
  text-align: center;

  &:focus {
    outline: none;
    background: rgba(30, 36, 68, 0.4);
    border-color: rgba(106, 17, 203, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 移除數字輸入框的上下箭頭 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

// 價格單位 - 美化版
const PriceCurrency = styled.div`
  padding: 12px 20px;
  background: rgba(106, 17, 203, 0.2);
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 1rem;
  user-select: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border: 1px solid rgba(106, 17, 203, 0.2);
  border-left: none;
  border-radius: 0 ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
`;

// 按鈕容器 - 美化版
const ButtonsContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

// 自定義主按鈕 - 漸變效果
const ListButton = styled(PrimaryButton)`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(120deg, #5b0fb1, #1f65dd);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(106, 17, 203, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`;

// 添加狀態消息容器樣式 - 美化版
const StatusMessageContainer = styled.div`
  position: absolute;
  bottom: -80px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

// 自定義狀態消息 - 美化版
const CustomStatusMessage = styled(StatusMessage)`
  width: 90%;
  padding: 14px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

/**
 * 表單組件，可以單獨使用
 * @returns {JSX.Element} 表單組件
 */
const ListNFTForm = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [listingStatus, setListingStatus] = useState({
    show: false,
    success: false,
    fadeOut: false,
    message: "",
  });

  // 使用更可靠的方式監控外部NFT選擇變化
  const updateSelectedNFT = useCallback(() => {
    if (selectedNFTRef.current) {
      setSelectedNFT(selectedNFTRef.current);
    }
  }, []);

  // 處理NFT清除的回調函數
  const clearSelectedNFT = useCallback(() => {
    setSelectedNFT(null);
    setPrice("");
  }, []);

  // 組件掛載和更新時同步選中狀態
  useEffect(() => {
    // 初始載入時同步狀態
    if (selectedNFTRef.current && !selectedNFT) {
      setSelectedNFT(selectedNFTRef.current);
    }

    // 添加自定義事件監聽器
    window.addEventListener("nft-selected", updateSelectedNFT);
    window.addEventListener("nft-cleared", clearSelectedNFT);

    return () => {
      window.removeEventListener("nft-selected", updateSelectedNFT);
      window.removeEventListener("nft-cleared", clearSelectedNFT);
    };
  }, [updateSelectedNFT, clearSelectedNFT, selectedNFT]);

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
      selectedNFTRef.current = null;
      setPrice("");

      // 觸發自定義事件通知其他組件
      window.dispatchEvent(new CustomEvent("nft-cleared"));
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

  const isSubmitDisabled = !selectedNFT || !price;

  return (
    <FormWrapper>
      <FormTitle>NFTを出品する</FormTitle>

      {selectedNFT ? (
        <SelectedNFTInfo>
          <NFTImage src={selectedNFT.image} alt={selectedNFT.name} />
          <NFTDetails>
            <NFTName>{selectedNFT.name}</NFTName>
            <NFTCollection>{selectedNFT.collection}</NFTCollection>
          </NFTDetails>
        </SelectedNFTInfo>
      ) : (
        <NFTSelectPrompt>NFTを選択してください</NFTSelectPrompt>
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
            <PriceCurrency disabled={!selectedNFT}>ETH</PriceCurrency>
          </PriceInputContainer>
        </FormGroup>

        <ButtonsContainer>
          <ListButton onClick={handleSubmit} disabled={isSubmitDisabled}>
            マーケットに出品する
          </ListButton>
        </ButtonsContainer>
      </FormContent>

      {/* 狀態消息容器 */}
      <StatusMessageContainer>
        {listingStatus.show && (
          <CustomStatusMessage
            success={listingStatus.success}
            fadeOut={listingStatus.fadeOut}
          >
            {listingStatus.message}
          </CustomStatusMessage>
        )}
      </StatusMessageContainer>
    </FormWrapper>
  );
};

export default ListNFTForm;
