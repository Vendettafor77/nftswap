import React, { useState, useCallback } from "react";
import styled from "styled-components";
import CustomSelect from "../CustomSelect/CustomSelect";

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
  box-sizing: border-box; /* 確保padding包含在寬度內 */
  box-shadow: none;
  position: relative; /* 添加相對定位 */
  z-index: 10; /* 添加z-index使其高於卡片 */

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
  width: 180px; /* 與ListNFTSection一致 */
  font-size: 0.95rem;
  flex-shrink: 0; /* 防止被擠壓 */

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
  flex-shrink: 0; /* 防止收縮，避免換行 */

  /* 稳定绘制层 */
  transform: translateZ(0);
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

  // 準備下拉選單選項
  const collectionOptions = [
    { value: "all", label: "すべてのコレクション" },
    ...collections.map((collection) => ({
      value: collection,
      label: collection,
    })),
  ];

  const sortOptions = [
    { value: "recent", label: "最新順" },
    { value: "price_low", label: "価格（安い順）" },
    { value: "price_high", label: "価格（高い順）" },
  ];

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
        <CustomSelect
          value={collectionFilter}
          options={collectionOptions}
          onChange={onCollectionChange}
        />
        <CustomSelect
          value={sortBy}
          options={sortOptions}
          onChange={onSortChange}
        />
      </FiltersGroup>
    </FiltersContainer>
  );
};

// 使用React.memo防止不必要的重渲染
export default React.memo(MarketFilters);
