/**
 * @file SuccessMessage.js
 * @description 成功消息組件，用於顯示內聯的成功提示
 */

import React from "react";
import styled, { keyframes } from "styled-components";

// 淡入動畫
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 淡出動畫
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

// 成功圖標
const SuccessIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.success || "#4CAF50"};
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
  flex-shrink: 0;

  &::before {
    content: "✓";
  }
`;

// 成功消息容器
const SuccessContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: ${(props) => (props.compact ? "8px 12px" : "12px 16px")};
  margin: ${(props) => (props.noMargin ? "0" : "12px 0")};
  border-radius: ${(props) => props.theme.borderRadius.medium || "8px"};
  background: ${(props) => `rgba(76, 175, 80, 0.08)`};
  color: ${(props) => props.theme.colors.success || "#4CAF50"};
  text-align: left;
  font-size: ${(props) => (props.compact ? "0.9rem" : "1rem")};
  line-height: 1.5;
  border: 1px solid rgba(76, 175, 80, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: ${(props) => (props.fadeOut ? fadeOut : fadeIn)} 0.3s ease-out
    ${(props) => (props.fadeOut ? "forwards" : "")};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  max-width: ${(props) => props.maxWidth || "none"};
  word-break: break-word;
`;

// 成功內容
const SuccessContent = styled.div`
  flex: 1;
`;

/**
 * 成功消息組件
 * @param {Object} props - 組件屬性
 * @param {string|React.ReactNode} props.children - 成功消息內容
 * @param {boolean} [props.fadeOut=false] - 是否淡出
 * @param {boolean} [props.compact=false] - 是否使用緊湊模式
 * @param {boolean} [props.noMargin=false] - 是否移除外邊距
 * @param {boolean} [props.fullWidth=false] - 是否使用全寬
 * @param {string} [props.maxWidth] - 最大寬度
 * @param {string} [props.className] - 額外的CSS類名
 * @param {Object} [props.style] - 內聯樣式
 * @returns {JSX.Element} 成功消息組件
 */
const SuccessMessage = ({
  children,
  fadeOut = false,
  compact = false,
  noMargin = false,
  fullWidth = false,
  maxWidth,
  className,
  style,
  ...props
}) => {
  return (
    <SuccessContainer
      fadeOut={fadeOut}
      compact={compact}
      noMargin={noMargin}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      className={className}
      style={style}
      {...props}
    >
      <SuccessIcon />
      <SuccessContent>{children}</SuccessContent>
    </SuccessContainer>
  );
};

export default SuccessMessage;
