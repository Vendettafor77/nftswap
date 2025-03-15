/**
 * @file useTransactionStatus.js
 * @description 交易狀態Hook，用於監聽和顯示交易狀態
 */

import { useState, useCallback, useEffect } from "react";
import { useTransaction } from "../contexts/TransactionContext";
import { useNotification } from "../contexts/NotificationContext";
import { TransactionStatus } from "../utils/contractUtils";

/**
 * 交易狀態Hook
 * @param {Object} options - Hook選項
 * @param {string} [options.initialMessage=""] - 初始消息
 * @param {boolean} [options.autoHide=true] - 是否自動隱藏成功消息
 * @param {number} [options.autoHideDelay=3000] - 自動隱藏延遲（毫秒）
 * @returns {Object} 交易狀態工具集
 */
const useTransactionStatus = ({
  initialMessage = "",
  autoHide = true,
  autoHideDelay = 3000,
} = {}) => {
  // 本地狀態
  const [status, setStatus] = useState({
    active: false,
    success: false,
    message: initialMessage,
    fadeOut: false,
    show: false,
    transaction: null,
  });

  // 使用交易上下文
  const { trackTransaction, latestTransaction } = useTransaction();
  // 使用通知上下文
  const { showSuccess, showError, showInfo } = useNotification();

  // 清除狀態
  const clearStatus = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      active: false,
      show: false,
      fadeOut: false,
      transaction: null,
    }));
  }, []);

  // 設置淡出
  const fadeOutStatus = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      fadeOut: true,
    }));

    // 淡出後完全清除
    setTimeout(clearStatus, 500);
  }, [clearStatus]);

  // 開始追蹤交易
  const startTracking = useCallback(
    async (
      tx,
      {
        type,
        asset,
        description,
        onSuccess,
        onFailed,
        showNotifications = true,
      } = {}
    ) => {
      // 設置狀態為活動
      setStatus({
        active: true,
        success: false,
        message: "トランザクションを送信中...",
        fadeOut: false,
        show: true,
        transaction: null,
      });

      const result = await trackTransaction(tx, {
        type,
        asset,
        description,
        onSuccess: (receipt) => {
          // 更新組件狀態
          setStatus({
            active: false,
            success: true,
            message: "トランザクションが成功しました",
            fadeOut: false,
            show: true,
            transaction: { hash: tx.hash, receipt },
          });

          // 自動隱藏成功狀態
          if (autoHide) {
            setTimeout(fadeOutStatus, autoHideDelay);
          }

          // 執行自定義成功回調
          if (onSuccess) {
            onSuccess(receipt);
          }
        },
        onFailed: (error) => {
          // 更新組件狀態
          setStatus({
            active: false,
            success: false,
            message: "トランザクションが失敗しました",
            fadeOut: false,
            show: true,
            transaction: { hash: tx.hash, error },
          });

          // 執行自定義失敗回調
          if (onFailed) {
            onFailed(error);
          }
        },
      });

      return result;
    },
    [trackTransaction, autoHide, autoHideDelay, fadeOutStatus]
  );

  // 更新狀態消息
  const setStatusMessage = useCallback((message, success = null) => {
    setStatus((prev) => ({
      ...prev,
      message,
      success: success !== null ? success : prev.success,
      show: true,
      fadeOut: false,
    }));
  }, []);

  // 顯示狀態
  const showStatus = useCallback(
    (message, success = true) => {
      setStatus({
        active: false,
        success,
        message,
        fadeOut: false,
        show: true,
        transaction: null,
      });

      if (autoHide) {
        setTimeout(fadeOutStatus, autoHideDelay);
      }
    },
    [autoHide, autoHideDelay, fadeOutStatus]
  );

  // 隱藏狀態
  const hideStatus = useCallback(() => {
    fadeOutStatus();
  }, [fadeOutStatus]);

  // 根據交易狀態獲取本地化文本
  const getStatusText = useCallback((txStatus) => {
    switch (txStatus) {
      case TransactionStatus.PENDING:
        return "処理中";
      case TransactionStatus.CONFIRMING:
        return "確認中";
      case TransactionStatus.CONFIRMED:
        return "完了";
      case TransactionStatus.FAILED:
        return "失敗";
      default:
        return "不明";
    }
  }, []);

  // 監聽最新交易更新（可選）
  useEffect(() => {
    if (
      latestTransaction &&
      status.active &&
      latestTransaction.status !== TransactionStatus.PENDING
    ) {
      setStatusMessage(
        `トランザクションが${getStatusText(latestTransaction.status)}です`,
        latestTransaction.status === TransactionStatus.CONFIRMED
      );
    }
  }, [latestTransaction, status.active, getStatusText, setStatusMessage]);

  return {
    status,
    startTracking,
    setStatusMessage,
    showStatus,
    hideStatus,
    clearStatus,
  };
};

export default useTransactionStatus;
