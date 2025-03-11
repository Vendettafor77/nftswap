import React from "react";
import styled from "styled-components";
import CustomSelect from "../CustomSelect/CustomSelect";

// 通用過濾器容器樣式
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
  box-sizing: border-box;
  box-shadow: none;
  position: relative;
  z-index: 10;
  /* 確保與NFT卡片網格對齊 */
  margin-right: 0;
  margin-left: 0;
  /* 確保容器寬度固定，不受滾動條影響 */
  max-width: 100%;
  /* 確保最小高度一致，防止頁面抖動 */
  min-height: 60px;
`;

// 搜索輸入框樣式 - 增加樣式優先級
const SearchInput = styled.input.attrs({
  type: "text",
  className: "search-input",
})`
  && {
    padding: 8px 12px;
    border-radius: ${(props) => props.theme.borderRadius.medium};
    border: 1px solid rgba(255, 255, 255, 0.05) !important; /* 使用!important確保樣式優先級 */
    background: rgba(30, 36, 68, 0.6);
    color: ${(props) => props.theme.colors.text.primary};
    width: 180px;
    font-size: 0.95rem;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    -webkit-font-smoothing: antialiased;
    margin: 0; /* 覆蓋全局樣式的margin */

    &:focus {
      outline: none;
      border-color: rgba(106, 17, 203, 0.4) !important;
      box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.text.secondary}99;
    }
  }
`;

// 過濾器分組樣式
const FiltersGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;
  transform: translateZ(0);
  min-width: 40px; /* 確保即使沒有過濾器也佔據一定空間 */
  min-height: 36px; /* 保持一致的高度 */
`;

/**
 * 通用過濾器組件
 * @param {Object} props - 組件屬性
 * @param {string} props.searchTerm - 搜索詞
 * @param {Function} props.onSearchChange - 搜索變更處理函數
 * @param {string} props.searchPlaceholder - 搜索輸入框佔位文本
 * @param {Array} props.filters - 過濾器配置數組，每個過濾器包含value、options和onChange
 * @returns {JSX.Element} 過濾器組件
 */
const FilterBar = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "搜索...",
  filters = [],
}) => {
  // 處理搜索變化 - 即時更新
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <FiltersContainer>
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        spellCheck="false"
        autoComplete="off"
      />
      <FiltersGroup>
        {filters.length > 0 ? (
          filters.map((filter, index) => (
            <CustomSelect
              key={index}
              value={filter.value}
              options={filter.options}
              onChange={filter.onChange}
              className={filter.className}
            />
          ))
        ) : (
          <div style={{ minWidth: "40px" }} />
        )}
      </FiltersGroup>
    </FiltersContainer>
  );
};

export default React.memo(FilterBar);
