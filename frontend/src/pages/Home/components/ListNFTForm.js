import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../../components/styled/Button";
import { StatusMessage } from "../../../components/styled/StatusMessage";
import { selectedNFTRef } from "./sharedState";
import GradientText from "../../../components/styled/GradientText";
import IPFSImage from "../../../components/IPFSImage";
import { getNFTImageUrl } from "../../../utils/ipfsUtils";

// 表單容器 - 美化版
const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0; /* 移除边距，避免与StickySidebar的填充重叠 */
  padding: 0; /* 恢復原始設置，不再添加底部內邊距 */
`;

// 表單標題 - 居中顯示並增加顯眼度
const FormTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;
  font-weight: 600;
  padding-top: ${(props) => props.theme.spacing.xs};
  padding-bottom: ${(props) => props.theme.spacing.xs};
`;

// 表單標題 - 居中顯示並增加顯眼度
const FormTitleOld = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;

  font-weight: 600;
  padding-top: ${(props) => props.theme.spacing.xs};
  padding-bottom: ${(props) => props.theme.spacing.xs};
`;

// 選中NFT信息顯示組件 - 美化版
const SelectedNFTInfo = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-bottom: ${(props) => props.theme.spacing.md}; /* 統一間距 */
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 60px;
  box-sizing: border-box;
  width: 85%; /* 統一固定寬度 */
  margin-left: auto;
  margin-right: auto;
`;

// NFT圖片 - 稍微放大
const NFTImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-right: ${(props) => props.theme.spacing.md};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// NFT詳情 - 改進樣式
const NFTDetails = styled.div`
  flex: 1;
`;

// NFT名稱 - 漸變效果
const NFTName = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

// NFT收藏集 - 改進樣式
const NFTCollection = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: 2px;
`;

// 提示信息 - 完全重構確保無圓角
const NFTSelectPrompt = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.secondary};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  background: rgba(13, 15, 30, 0.3);
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 重要：完全重置所有邊框和圓角相關屬性 */
  border: none;
  border-radius: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  /* 修改渲染方式，防止繼承任何邊框效果 */
  position: static;

  /* 移除所有裝飾性元素 */
  &::before,
  &::after {
    display: none;
  }

  /* 確保四個角都是直角 */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

// 表單內容容器 - 強化對齊效果
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

// 表單組 - 強化寬度控制
const FormGroup = styled.div`
  width: 85%;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  margin-left: auto;
  margin-right: auto;
  display: block; /* 確保是塊級元素 */
  box-sizing: border-box; /* 確保寬度計算包含padding和border */
  max-width: 450px; /* 添加最大寬度限制，確保與按鈕一致 */
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

// 價格輸入容器 - 增強寬度控制
const PriceInputContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 45px;
  align-items: center; /* 使用center確保垂直居中 */
  box-sizing: border-box;
  max-width: 100%; /* 確保不超過父容器 */
  gap: 4px; /* 使用gap屬性為子元素之間添加統一間隙 */
`;

// 價格輸入框 - 增加優先級，覆蓋全局樣式
const PriceInput = styled.input.attrs({ className: "price-input" })`
  flex: 1;
  height: 100%;
  padding: 0;
  padding-left: 16px;
  padding-right: 16px;
  line-height: normal; /* 調整為normal避免行高影響 */
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100% !important; /* 使用!important確保覆蓋全局樣式 */
  margin: 0 !important; /* 重置全局邊距 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4) !important;
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}99;
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

// 價格單位 - 完全重構以確保對齊
const PriceCurrency = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  background: rgba(106, 17, 203, 0.2);
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 0.95rem;
  user-select: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  min-width: 60px; /* 確保有足夠空間顯示ETH */
  border-top-right-radius: ${(props) => props.theme.borderRadius.medium};
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: none;
  box-sizing: border-box;
  line-height: 1; /* 設置為1確保文字垂直居中 */
`;

// 按鈕容器 - 與FormGroup保持一致
const ButtonContainer = styled.div`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
  margin-top: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

// 自定義主按鈕 - 確保寬度統一
const ListButton = styled(PrimaryButton)`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  height: 45px; /* 確保與輸入框高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0; /* 重置margin确保不会影响对齐 */
  box-sizing: border-box; /* 确保盒模型计算正确 */

  &:hover {
    background: linear-gradient(120deg, #5b0fb1, #1f65dd);
    transform: translateY(-2px);
  }
`;

// 添加狀態消息容器樣式 - 絕對定位版本
const StatusMessageContainer = styled.div`
  position: absolute;
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 確保完全居中 */
  bottom: -120px; /* 顯示在表單下方 */
  width: 90%; /* 與表單寬度相近 */
  max-width: 450px; /* 限制最大寬度 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

// 自定義狀態消息 - 美化版
const CustomStatusMessage = styled(StatusMessage)`
  width: 100%;
  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1rem;
  border: 2px solid
    ${(props) =>
      props.success ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)"};
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
  // 添加處理後的圖片URL狀態
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  // 使用更可靠的方式監控外部NFT選擇變化
  const updateSelectedNFT = useCallback(() => {
    if (selectedNFTRef.current) {
      setSelectedNFT(selectedNFTRef.current);
      // 重置處理後的圖片URL
      setProcessedImageUrl(null);
    }
  }, []);

  // 處理NFT清除的回調函數
  const clearSelectedNFT = useCallback(() => {
    setSelectedNFT(null);
    setPrice("");
    setProcessedImageUrl(null);
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

  // 當選中的NFT變化時，處理圖片URL
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (selectedNFT && selectedNFT.image) {
        try {
          console.log(
            `正在處理ListNFTForm中選中的NFT圖片: ${selectedNFT.image}`
          );
          // 使用getNFTImageUrl函數獲取可訪問的HTTP URL
          const imageResult = await getNFTImageUrl(selectedNFT);
          if (imageResult.url) {
            console.log(`成功獲取處理後的圖片URL: ${imageResult.url}`);
            setProcessedImageUrl(imageResult.url);
          } else {
            console.warn(`獲取圖片URL失敗，使用原始URL: ${selectedNFT.image}`);
            // 如果無法獲取處理後的URL，則使用原始URL
            setProcessedImageUrl(selectedNFT.image);
          }
        } catch (error) {
          console.error(`獲取NFT圖片失敗: ${error.message}`);
          // 如果出現錯誤，則使用原始URL
          setProcessedImageUrl(selectedNFT.image);
        }
      }
    };

    if (selectedNFT) {
      fetchImageUrl();
    }
  }, [selectedNFT]);

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
      <FormTitle>
        <GradientText
          fontSize="1.4rem"
          height="30"
          centered={true}
          id={`form-title-${Math.random().toString(36).substring(7)}`}
        >
          NFTを出品する
        </GradientText>
      </FormTitle>

      {selectedNFT ? (
        <SelectedNFTInfo
          // 統一使用85%寬度
          style={{
            width: "85%",
            borderRadius: "8px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "450px",
          }}
        >
          <NFTImageContainer>
            <IPFSImage
              src={processedImageUrl || selectedNFT.image}
              alt={selectedNFT.name}
              height="40px"
              width="40px"
            />
          </NFTImageContainer>
          <NFTDetails>
            <NFTName>
              <GradientText
                fontSize="1rem"
                height="24"
                fontWeight="bold"
                id={`selected-nft-${selectedNFT.tokenId}`}
              >
                {selectedNFT.name}
              </GradientText>
            </NFTName>
            <NFTCollection>{selectedNFT.collection}</NFTCollection>
          </NFTDetails>
        </SelectedNFTInfo>
      ) : (
        <NFTSelectPrompt
          // 統一使用85%寬度
          style={{
            width: "85%",
            borderRadius: 0,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "450px",
          }}
        >
          NFTを選択してください
        </NFTSelectPrompt>
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
              className="price-input"
            />
            <PriceCurrency disabled={!selectedNFT}>ETH</PriceCurrency>
          </PriceInputContainer>
        </FormGroup>

        <ButtonContainer>
          <ListButton onClick={handleSubmit} disabled={isSubmitDisabled}>
            マーケットに出品する
          </ListButton>
        </ButtonContainer>
      </FormContent>

      {/* 使用絕對定位的狀態消息容器 */}
      {listingStatus.show && (
        <StatusMessageContainer>
          <CustomStatusMessage
            success={listingStatus.success}
            fadeOut={listingStatus.fadeOut}
            centered={true}
            noArrow={true}
          >
            {listingStatus.message}
          </CustomStatusMessage>
        </StatusMessageContainer>
      )}
    </FormWrapper>
  );
};

export default ListNFTForm;
