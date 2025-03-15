/**
 * @file NotificationContext.js
 * @description 全局通知上下文，提供統一的消息顯示和管理
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid"; // 需要安裝此依賴

// 通知類型枚舉
export const NotificationType = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
};

// 通知操作類型枚舉
const NotificationActionType = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR_ALL: "CLEAR_ALL",
};

// 通知上下文
const NotificationContext = createContext();

// 通知初始狀態
const initialState = {
  notifications: [], // 通知列表
};

// 通知reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case NotificationActionType.ADD:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case NotificationActionType.REMOVE:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case NotificationActionType.CLEAR_ALL:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

/**
 * 通知上下文提供者
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @returns {JSX.Element} 通知上下文提供者
 */
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // 添加通知
  const addNotification = useCallback((notification) => {
    const id = notification.id || uuidv4();
    const newNotification = {
      id,
      type: NotificationType.INFO,
      title: "",
      message: "",
      autoClose: true,
      duration: 5000,
      ...notification,
      createdAt: new Date(),
    };

    dispatch({
      type: NotificationActionType.ADD,
      payload: newNotification,
    });

    return id;
  }, []);

  // 移除通知
  const removeNotification = useCallback((id) => {
    dispatch({
      type: NotificationActionType.REMOVE,
      payload: id,
    });
  }, []);

  // 清除所有通知
  const clearAllNotifications = useCallback(() => {
    dispatch({
      type: NotificationActionType.CLEAR_ALL,
    });
  }, []);

  // 顯示成功通知
  const showSuccess = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NotificationType.SUCCESS,
        message,
        ...options,
      });
    },
    [addNotification]
  );

  // 顯示錯誤通知
  const showError = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NotificationType.ERROR,
        message,
        autoClose: false, // 錯誤通知默認不自動關閉
        ...options,
      });
    },
    [addNotification]
  );

  // 顯示警告通知
  const showWarning = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NotificationType.WARNING,
        message,
        ...options,
      });
    },
    [addNotification]
  );

  // 顯示信息通知
  const showInfo = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: NotificationType.INFO,
        message,
        ...options,
      });
    },
    [addNotification]
  );

  // 上下文值
  const value = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * 使用通知上下文的Hook
 * @returns {Object} 通知上下文值
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationContext;
