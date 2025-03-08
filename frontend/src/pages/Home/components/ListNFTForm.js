import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../../components/styled/Button";
import { StatusMessage } from "../../../components/styled/StatusMessage";
import { selectedNFTRef } from "./ListNFTSection";

// 表單容器
const FormWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 表單標題
const FormTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: 1.2rem;
  padding-top: 0;
  padding-left: ${(props) => props.theme.spacing.sm}; /* 統一左側間距 */
`;

// 選中NFT信息顯示組件 - 確保固定高度
const SelectedNFTInfo = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.primary}11;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  height: 50px; /* 固定高度 */
  box-sizing: border-box;
  width: calc(
    100% - ${(props) => props.theme.spacing.sm} * 2
  ); /* 扣除左右間距 */
  margin-left: ${(props) => props.theme.spacing.sm}; /* 統一左側間距 */
  margin-right: ${(props) => props.theme.spacing.sm}; /* 統一右側間距 */
`;

// NFT圖片
const NFTImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-right: ${(props) => props.theme.spacing.sm};
  object-fit: cover;
`;

// NFT詳情
const NFTDetails = styled.div`
  flex: 1;
`;

// NFT名稱
const NFTName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
`;

// NFT收藏集
const NFTCollection = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// 提示信息 - 確保與選中NFT信息顯示組件高度一致
const NFTSelectPrompt = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  height: 50px; /* 固定高度與SelectedNFTInfo一致 */
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: calc(
    100% - ${(props) => props.theme.spacing.sm} * 2
  ); /* 與SelectedNFTInfo一致 */
  margin-left: ${(props) => props.theme.spacing.sm}; /* 統一左側間距 */
  margin-right: ${(props) => props.theme.spacing.sm}; /* 統一右側間距 */
`;

// 表單內容容器
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding-left: ${(props) => props.theme.spacing.sm}; /* 統一左側間距 */
  padding-right: ${(props) => props.theme.spacing.sm}; /* 統一右側間距 */
  box-sizing: border-box;
`;

// 表單組 - 調整左對齊
const FormGroup = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 標籤
const Label = styled.label`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  padding-left: 0; /* 確保無內邊距，完全對齊 */
`;

// 價格輸入容器 - 調整寬度確保左對齊
const PriceInputContainer = styled.div`
  display: flex;
  align-items: stretch; /* 確保子元素等高 */
  width: 80%; /* 減短寬度 */
  margin-left: 0; /* 確保左對齊 */
  position: relative; /* 確保子元素可以定位 */
`;

// 價格輸入框
const PriceInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
  border-radius: ${(props) => props.theme.borderRadius.medium} 0 0
    ${(props) => props.theme.borderRadius.medium};
  border-right: none; /* 確保與貨幣單位無縫連接 */

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: inset 0 0 0 1px rgba(42, 82, 190, 0.2);
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

// 價格單位
const PriceCurrency = styled.div`
  padding: 8px 12px;
  background: rgba(30, 36, 68, 0.4);
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  user-select: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none; /* 確保與輸入框無縫連接 */
  border-radius: 0 ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0;
  display: flex;
  align-items: center;
  min-width: 50px; /* 確保ETH有足夠空間顯示 */
  justify-content: center; /* 居中ETH文字 */
`;

// 按鈕容器 - 控制上下間距
const ButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: stretch;
  width: 100%;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: 0; /* 減少底部間距 */

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// 添加狀態消息容器樣式，改為外部定位
const StatusMessageContainer = styled.div`
  position: absolute;
  bottom: -100px; /* 定位在容器下方 */
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 50; /* 確保在其他元素上方 */
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
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            style={{ opacity: isSubmitDisabled ? 0.6 : 1 }}
          >
            マーケットに出品する
          </PrimaryButton>
        </ButtonsContainer>
      </FormContent>

      {/* 狀態消息容器，改為外部顯示 */}
      <StatusMessageContainer>
        {listingStatus.show && (
          <StatusMessage
            success={listingStatus.success}
            fadeOut={listingStatus.fadeOut}
            style={{ width: "90%" }} /* 控制提示寬度 */
          >
            {listingStatus.message}
          </StatusMessage>
        )}
      </StatusMessageContainer>
    </FormWrapper>
  );
};

export default ListNFTForm;
