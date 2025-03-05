import React, { useState } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard/NFTCard";
import { PrimaryButton } from "../../components/styled/Button";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
`;

const Header = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const SearchInput = styled.input`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  color: ${(props) => props.theme.colors.text.primary};
  width: 300px;
  max-width: 100%;
`;

const FilterSelect = styled.select`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.text.secondary}44;
  color: ${(props) => props.theme.colors.text.primary};
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl} 0;
  color: ${(props) => props.theme.colors.text.secondary};
  grid-column: 1 / -1;
`;

const MyWTFapes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [myNfts, setMyNfts] = useState(mockWTFapes);

  // 根据搜索词和过滤选项筛选NFT
  const filteredNfts = myNfts.filter((nft) => {
    // 搜索词过滤
    if (
      searchTerm &&
      !nft.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // 特征过滤
    if (filterOption !== "all") {
      // 假设filterOption格式为 "背景:ブルー" 或 "帽子:クラウン" 等
      if (filterOption.includes(":")) {
        const [trait, value] = filterOption.split(":");
        const matchingAttr = nft.attributes.find(
          (attr) => attr.trait_type === trait && attr.value === value
        );
        if (!matchingAttr) return false;
      }
    }

    return true;
  });

  // 从所有NFT中提取特征选项
  const getTraitOptions = () => {
    const traits = {};

    myNfts.forEach((nft) => {
      nft.attributes.forEach((attr) => {
        if (!traits[attr.trait_type]) {
          traits[attr.trait_type] = new Set();
        }
        traits[attr.trait_type].add(attr.value);
      });
    });

    const options = [];
    for (const trait in traits) {
      traits[trait].forEach((value) => {
        options.push(`${trait}:${value}`);
      });
    }

    return options;
  };

  const handleNFTAction = (nft) => {
    console.log("NFT操作", nft);
    // 为NFT管理功能提供更丰富的选项，将实现一个包含以下功能的下拉菜单或模态窗口：
    // 1. NFTの転送（他のウォレットに送信）
    // 2. マーケットプレイスに出品
    // 3. スワップに提案
    // 4. NFT詳細の表示
    // 5. 履歴の確認
  };

  return (
    <Container>
      <Header>
        <Title>マイ WTFape コレクション</Title>
        <Subtitle>
          ここであなたの WTFape NFT コレクションを閲覧・管理できます。
        </Subtitle>
      </Header>

      <ControlsBar>
        <SearchInput
          placeholder="WTFapeを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">すべての特性</option>
          {getTraitOptions().map((option, index) => (
            <option key={index} value={option}>
              {option.replace(":", ": ")}
            </option>
          ))}
        </FilterSelect>
      </ControlsBar>

      <NFTGrid>
        {filteredNfts.length > 0 ? (
          filteredNfts.map((nft, index) => (
            <NFTCard
              key={index}
              nft={nft}
              actionText="管理"
              onAction={() => handleNFTAction(nft)}
            />
          ))
        ) : (
          <EmptyState>
            <h3>WTFapeが見つかりません</h3>
            <p>現在の検索条件に一致するWTFape NFTはありません。</p>
            <PrimaryButton
              onClick={() => (window.location.href = "/mint-wtfape")}
            >
              新しい WTFapeをミントする
            </PrimaryButton>
          </EmptyState>
        )}
      </NFTGrid>
    </Container>
  );
};

export default MyWTFapes;
