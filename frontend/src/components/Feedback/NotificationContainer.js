/**
 * @file NotificationContainer.js
 * @description 通知容器組件，用於顯示多個通知
 */

import React from "react";
import styled from "styled-components";
import { useNotification } from "../../contexts/NotificationContext";
import NotificationToast from "./NotificationToast";

// 容器位置枚舉
export const PositionType = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
};

// 獲取容器位置樣式
const getPositionStyle = (position) => {
  switch (position) {
    case PositionType.TOP_LEFT:
      return `
        top: 20px;
        left: 20px;
        align-items: flex-start;
      `;
    case PositionType.TOP_RIGHT:
      return `
        top: 20px;
        right: 20px;
        align-items: flex-end;
      `;
    case PositionType.TOP_CENTER:
      return `
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
      `;
    case PositionType.BOTTOM_LEFT:
      return `
        bottom: 20px;
        left: 20px;
        align-items: flex-start;
      `;
    case PositionType.BOTTOM_RIGHT:
      return `
        bottom: 20px;
        right: 20px;
        align-items: flex-end;
      `;
    case PositionType.BOTTOM_CENTER:
      return `
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
      `;
    default:
      return `
        top: 20px;
        right: 20px;
        align-items: flex-end;
      `;
  }
};

// 通知容器樣式
const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  max-width: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 10px;
  pointer-events: none;
  ${(props) => getPositionStyle(props.position)}

  /* 隱藏滾動條但保持功能 */
  &::-webkit-scrollbar {
    width: 0px;
  }

  /* 確保內部元素可點擊 */
  & > * {
    pointer-events: auto;
  }
`;

/**
 * 通知容器組件
 * @param {Object} props - 組件屬性
 * @param {string} [props.position="top-right"] - 通知顯示位置
 * @returns {JSX.Element} 通知容器組件
 */
const NotificationContainer = ({ position = PositionType.TOP_RIGHT }) => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Container position={position}>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </Container>
  );
};

export default NotificationContainer;
