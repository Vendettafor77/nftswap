import React, { useState, useCallback } from "react";
import styled from "styled-components";

// 更为稳定的容器样式，减少重绘
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

  /* 性能优化 */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
`;

// 简化的输入框样式
const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  width: 220px;
  font-size: 0.95rem;

  /* 静态阴影，不用transition可以减少重绘 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  /* 减少抖动和闪烁 */
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}99;
  }
`;

// 静态过滤组样式
const FiltersGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;

  /* 稳定绘制层 */
  transform: translateZ(0);
`;

// 简化的下拉菜单样式
const FilterSelect = styled.select`
  padding: 8px 28px 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  background-position: calc(100% - 12px) center;
  background-size: 10px;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23B6B9C5' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  option {
    background-color: ${(props) => props.theme.colors.background.card};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

// 组件实现，使用useCallback和缓存值
const MarketFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  collectionFilter,
  onCollectionChange,
  collections,
}) => {
  // 使用本地输入状态，减少回流到父组件的频率
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // 延迟发送改变
  const handleSearchSubmit = useCallback(() => {
    if (localSearchTerm !== searchTerm) {
      onSearchChange(localSearchTerm);
    }
  }, [localSearchTerm, searchTerm, onSearchChange]);

  // 处理本地搜索变化
  const handleLocalSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  // 处理键盘按下
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // 处理失去焦点
  const handleBlur = () => {
    handleSearchSubmit();
  };

  return (
    <FiltersContainer>
      <SearchInput
        placeholder="NFTを検索..."
        value={localSearchTerm}
        onChange={handleLocalSearchChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        spellCheck="false"
        autoComplete="off"
      />
      <FiltersGroup>
        <FilterSelect
          value={collectionFilter}
          onChange={(e) => onCollectionChange(e.target.value)}
        >
          <option value="all">すべてのコレクション</option>
          {collections.map((collection, index) => (
            <option key={index} value={collection}>
              {collection}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="recent">最新順</option>
          <option value="price_low">価格（安い順）</option>
          <option value="price_high">価格（高い順）</option>
        </FilterSelect>
      </FiltersGroup>
    </FiltersContainer>
  );
};

// 使用React.memo防止不必要的重渲染
export default React.memo(MarketFilters);
