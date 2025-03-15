/**
 * @file NotificationToast.js
 * @description 通知Toast組件，用於顯示不同類型的通知
 */

import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { NotificationType } from "../../contexts/NotificationContext";

// 淡入動畫
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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
    transform: translateY(-20px);
  }
`;

// 獲取通知類型對應的圖標
const getTypeIcon = (type) => {
  switch (type) {
    case NotificationType.SUCCESS:
      return "✓"; // 成功圖標
    case NotificationType.ERROR:
      return "✕"; // 錯誤圖標
    case NotificationType.WARNING:
      return "!"; // 警告圖標
    case NotificationType.INFO:
      return "i"; // 信息圖標
    default:
      return "i";
  }
};

// 獲取通知類型對應的顏色
const getTypeColor = (type, theme) => {
  switch (type) {
    case NotificationType.SUCCESS:
      return theme?.colors?.success || "#4CAF50";
    case NotificationType.ERROR:
      return theme?.colors?.error || "#F44336";
    case NotificationType.WARNING:
      return "#FFC107";
    case NotificationType.INFO:
      return "#2196F3";
    default:
      return "#2196F3";
  }
};

// 獲取通知類型對應的背景色
const getTypeBgColor = (type, opacity = 0.1) => {
  switch (type) {
    case NotificationType.SUCCESS:
      return `rgba(76, 175, 80, ${opacity})`;
    case NotificationType.ERROR:
      return `rgba(244, 67, 54, ${opacity})`;
    case NotificationType.WARNING:
      return `rgba(255, 193, 7, ${opacity})`;
    case NotificationType.INFO:
      return `rgba(33, 150, 243, ${opacity})`;
    default:
      return `rgba(33, 150, 243, ${opacity})`;
  }
};

// Toast容器樣式
const ToastContainer = styled.div`
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: ${(props) => props.theme.borderRadius.medium || "8px"};
  background: ${(props) => props.theme.colors.surface || "#1C2241"};
  color: ${(props) => props.theme.colors.text.primary || "#FFFFFF"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(8px);
  border-left: 4px solid ${(props) => getTypeColor(props.type, props.theme)};
  animation: ${(props) => (props.isExiting ? fadeOut : fadeIn)} 0.3s ease
    forwards;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

// 圖標容器樣式
const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: ${(props) => getTypeColor(props.type, props.theme)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px ${(props) => getTypeBgColor(props.type, 0.3)};
`;

// 內容容器樣式
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 標題樣式
const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${(props) => props.theme.colors.text.primary};
`;

// 消息樣式
const Message = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  word-break: break-word;
`;

// 關閉按鈕樣式
const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

// 進度條動畫
const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

// 進度條樣式
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${(props) => getTypeColor(props.type, props.theme)};
  animation: ${(props) =>
    props.duration &&
    css`
      ${progressAnimation} ${props.duration}ms linear forwards
    `};
`;

/**
 * 通知Toast組件
 * @param {Object} props - 組件屬性
 * @param {Object} props.notification - 通知對象
 * @param {Function} props.onClose - 關閉回調
 * @param {number} [props.duration=5000] - 自動關閉時間（毫秒）
 * @returns {JSX.Element} 通知Toast組件
 */
const NotificationToast = ({
  notification,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  // 處理關閉
  const handleClose = () => {
    setIsExiting(true);
    // 添加退出動畫時間
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  // 自動關閉
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  return (
    <ToastContainer type={notification.type} isExiting={isExiting}>
      <IconContainer type={notification.type}>
        {getTypeIcon(notification.type)}
      </IconContainer>

      <ContentContainer>
        {notification.title && <Title>{notification.title}</Title>}
        <Message>{notification.message}</Message>
      </ContentContainer>

      <CloseButton onClick={handleClose} />

      {autoClose && (
        <ProgressBar type={notification.type} duration={duration} />
      )}
    </ToastContainer>
  );
};

export default NotificationToast;
