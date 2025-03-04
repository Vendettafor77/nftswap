import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import NFTCard from "../../components/NFTCard/NFTCard";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.medium};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const NFTSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
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

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
`;

const PriceInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceCurrency = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.primary}22;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 0 ${(props) => props.theme.borderRadius.medium}
    ${(props) => props.theme.borderRadius.medium} 0;
  font-weight: bold;
`;

const PriceInput = styled(Input)`
  border-radius: ${(props) => props.theme.borderRadius.medium} 0 0
    ${(props) => props.theme.borderRadius.medium};
  border-right: none;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.secondary}88;
  }
`;

// 新增的输入字段样式
const InputGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const InputRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.text.secondary}44;
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing.md};
  background-color: transparent;
  color: ${(props) => 
    props.active ? props.theme.colors.primary : props.theme.colors.text.primary};
  border: none;
  border-bottom: 2px solid ${(props) => 
    props.active ? props.theme.colors.primary : 'transparent'};
  font-weight: ${(props) => props.active ? 'bold' : 'normal'};
  
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  margin-top: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
`;

// 修改后的ListNFT组件
const ListNFT = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const contractFromParams = queryParams.get("contract") || "";
  const tokenIdFromParams = queryParams.get("tokenId") || "";

  // 添加一个标签状态来控制选择模式（我的NFT或自定义NFT）
  const [activeTab, setActiveTab] = useState(contractFromParams ? "custom" : "myNFTs");
  
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    show: false,
    success: false,
    message: "",
  });
  
  // 自定义NFT字段
  const [contractAddress, setContractAddress] = useState(contractFromParams);
  const [tokenId, setTokenId] = useState(tokenIdFromParams);
  const [customNFTInfo, setCustomNFTInfo] = useState(null);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [fetchError, setFetchError] = useState("");
  
  // 示例NFT数据
  const myNFTs = [
    {
      contractAddress: "0x123...abc",
      tokenId: "221",
      name: "WTFape #221",
      collection: "WTFape コレクション",
      image: "https://i.seadn.io/gcs/files/5660af3bbcfb3a83b981e5e56f258df5.png?auto=format&dpr=1&w=1000",
    },
    {
      contractAddress: "0x123...abc",
      tokenId: "453",
      name: "WTFape #453",
      collection: "WTFape コレクション",
      image: "https://i.seadn.io/gcs/files/697ac9124075fe018f07313739769b11.png?auto=format&dpr=1&w=1000",
    },
    {
      contractAddress: "0x456...def",
      tokenId: "001",
      name: "サムライNFT #001",
      collection: "Samurai Collection",
      image: "https://via.placeholder.com/250?text=Samurai",
    },
  ];

  // 如果URL包含合约地址和tokenId，自动尝试获取NFT信息
  useEffect(() => {
    if (contractFromParams && tokenIdFromParams) {
      fetchNFTInfo(contractFromParams, tokenIdFromParams);
    }
  }, [contractFromParams, tokenIdFromParams]);

  const fetchNFTInfo = async (contract, token) => {
    if (!contract || !token) {
      setFetchError("コントラクトアドレスとトークンIDを入力してください。");
      return;
    }
    
    setFetchingInfo(true);
    setFetchError("");
    
    try {
      // 实际应用中，这里会调用API来获取NFT元数据
      // 例如：const response = await fetch(`https://api.opensea.io/api/v1/asset/${contract}/${token}`);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟找到NFT信息
      const mockInfo = {
        name: `カスタムNFT #${token}`,
        collection: "カスタムコレクション",
        image: "https://via.placeholder.com/250?text=Custom+NFT",
        contractAddress: contract,
        tokenId: token
      };
      
      setCustomNFTInfo(mockInfo);
      setSelectedNFT(mockInfo); // 自动选择这个NFT
    } catch (error) {
      console.error("Error fetching NFT info:", error);
      setFetchError("NFT情報の取得に失敗しました。契約アドレスとトークンIDを確認してください。");
      setCustomNFTInfo(null);
    } finally {
      setFetchingInfo(false);
    }
  };

  const handleSelectNFT = (nft) => {
    setSelectedNFT(nft);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // 只允许数字和小数点
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedNFT || !price) {
      setStatusMessage({
        show: true,
        success: false,
        message: "NFTと価格を選択してください。"
      });
      return;
    }

    setLoading(true);
    setStatusMessage({ show: false, success: false, message: "" });
    
    try {
      // 这里会调用合约的上架功能
      // 根据是自定义NFT还是已知NFT调用不同的参数
      
      // 模拟上架过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatusMessage({
        show: true,
        success: true,
        message: `${selectedNFT.name}が${price} ETHで出品されました。`
      });
      
      // 成功后重置表单
      if (activeTab === "custom") {
        setContractAddress("");
        setTokenId("");
        setCustomNFTInfo(null);
      }
      setSelectedNFT(null);
      setPrice("");
    } catch (error) {
      setStatusMessage({
        show: true,
        success: false,
        message: "出品に失敗しました。ウォレットの接続を確認してください。"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>NFTを出品する</PageTitle>

      <FormContainer>
        <TabContainer>
          <Tab 
            active={activeTab === "myNFTs"} 
            onClick={() => setActiveTab("myNFTs")}
          >
            マイNFTから選択
          </Tab>
          <Tab 
            active={activeTab === "custom"} 
            onClick={() => setActiveTab("custom")}
          >
            NFTを直接指定
          </Tab>
        </TabContainer>

        {activeTab === "myNFTs" ? (
          <>
            <SectionTitle>1. NFTを選択</SectionTitle>
            <NFTSelection>
              {myNFTs.map((nft, index) => (
                <div key={index} onClick={() => handleSelectNFT(nft)}>
                  <NFTCard
                    nft={nft}
                    actionText={selectedNFT?.tokenId === nft.tokenId ? "選択済み" : "選択する"}
                    onAction={() => handleSelectNFT(nft)}
                  />
                </div>
              ))}
            </NFTSelection>
          </>
        ) : (
          <>
            <SectionTitle>1. NFTの詳細を入力</SectionTitle>
            <InputRow>
              <InputGroup>
                <Label htmlFor="contractAddress">コントラクトアドレス</Label>
                <Input
                  id="contractAddress"
                  type="text"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="tokenId">トークンID</Label>
                <Input
                  id="tokenId"
                  type="text"
                  placeholder="1234"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </InputGroup>
            </InputRow>
            
            <SubmitButton
              type="button"
              onClick={() => fetchNFTInfo(contractAddress, tokenId)}
              disabled={fetchingInfo || !contractAddress || !tokenId}
            >
              {fetchingInfo ? "NFT情報を取得中..." : "NFT情報を取得"}
            </SubmitButton>
            
            {fetchError && <ErrorMessage>{fetchError}</ErrorMessage>}
            
            {customNFTInfo && (
              <>
                <SectionTitle style={{ marginTop: '20px' }}>NFTプレビュー</SectionTitle>
                <NFTSelection>
                  <NFTCard
                    nft={customNFTInfo}
                    actionText="選択済み"
                  />
                </NFTSelection>
              </>
            )}
          </>
        )}

        <SectionTitle>2. 価格を設定</SectionTitle>
        <FormGroup>
          <Label htmlFor="price">販売価格</Label>
          <PriceInputContainer>
            <PriceInput
              id="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="0.00"
              disabled={!selectedNFT}
            />
            <PriceCurrency>ETH</PriceCurrency>
          </PriceInputContainer>
        </FormGroup>
        
        <SubmitButton
          onClick={handleSubmit}
          disabled={loading || !selectedNFT || !price}
        >
          {loading ? "処理中..." : "マーケットに出品する"}
        </SubmitButton>
        
        {statusMessage.show && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: statusMessage.success ? "#36B37E22" : "#FF5C5C22",
              color: statusMessage.success ? "#36B37E" : "#FF5C5C",
              textAlign: "center"
            }}
          >
            {statusMessage.message}
          </div>
        )}
      </FormContainer>
    </PageContainer>
  );
};

export default ListNFT;
