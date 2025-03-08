import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// 自定義下拉選單容器
const CustomSelectContainer = styled.div`
  position: relative;
  width: 200px; /* 保持寬度為200px，避免換行 */
  height: 42px;
  flex-shrink: 0; /* 防止收縮 */
`;

// 自定義下拉選單標題
const SelectHeader = styled.div`
  padding: 8px 28px 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  height: 42px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #b6b9c5; /* 灰色箭頭 */
  }

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }
`;

// 下拉選單選項容器 - 使用絕對定位而不是固定定位
const SelectOptions = styled.div`
  position: absolute; /* 使用絕對定位而不是固定定位 */
  top: 100%; /* 定位在按鈕下方 */
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999; /* 保持高z-index */

  /* 自定義滾動條 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(30, 36, 68, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(106, 17, 203, 0.4);
    border-radius: 3px;
  }
`;

// 自定義下拉選單選項
const SelectOption = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(106, 17, 203, 0.1);
  }

  ${(props) =>
    props.selected &&
    `
    background: rgba(106, 17, 203, 0.2);
    font-weight: bold;
  `}
`;

// 自定義下拉選單組件
const CustomSelect = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const containerRef = useRef(null);

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 初始化選中標籤
  useEffect(() => {
    const option = options.find((opt) => opt.value === value);
    setSelectedLabel(option ? option.label : placeholder || "選択");
  }, [value, options, placeholder]);

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <CustomSelectContainer ref={containerRef}>
      <SelectHeader onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
      </SelectHeader>
      {isOpen && (
        <SelectOptions>
          {options.map((option, index) => (
            <SelectOption
              key={index}
              selected={option.value === value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </SelectOption>
          ))}
        </SelectOptions>
      )}
    </CustomSelectContainer>
  );
};

export default CustomSelect;
