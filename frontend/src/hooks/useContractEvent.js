/**
 * @file useContractEvent.js
 * @description 合約事件監聽Hook，用於監聽智能合約事件
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useNotification } from "../contexts/NotificationContext";

/**
 * 合約事件監聽Hook
 * @param {Object} contract - 合約實例
 * @param {string} eventName - 事件名稱
 * @param {Function} [callback] - 事件處理回調
 * @param {Object} [filter={}] - 事件過濾條件
 * @param {boolean} [showNotifications=false] - 是否顯示通知
 * @param {Object} [options={}] - 額外選項
 * @returns {Object} 事件監聽工具集
 */
const useContractEvent = (
  contract,
  eventName,
  callback,
  filter = {},
  showNotifications = false,
  options = {}
) => {
  // 事件歷史記錄
  const [events, setEvents] = useState([]);
  // 監聽器引用
  const listenerRef = useRef(null);
  // 是否正在監聽
  const [isListening, setIsListening] = useState(false);
  // 通知上下文
  const { showInfo, showSuccess, showError } = useNotification();

  // 獲取事件顯示名稱（日文）
  const getEventName = useCallback((event) => {
    // 根據事件類型返回日語名稱
    const eventMap = {
      Transfer: "転送",
      Approval: "承認",
      ApprovalForAll: "すべての承認",
      TokenMinted: "トークンミント",
      NFTListed: "NFT出品",
      NFTUnlisted: "NFT出品取消",
      NFTBought: "NFT購入",
    };

    return eventMap[event] || event;
  }, []);

  // 開始監聽事件
  const startListening = useCallback(() => {
    if (!contract || !eventName || isListening) return;

    try {
      const eventHandler = (...args) => {
        // 獲取事件數據（最後一個參數是事件對象）
        const eventData = args[args.length - 1];
        const params = args.slice(0, -1);

        // 創建事件記錄
        const newEvent = {
          id: `${eventData.blockNumber}-${eventData.transactionIndex}-${eventData.logIndex}`,
          eventName,
          params,
          blockNumber: eventData.blockNumber,
          transactionHash: eventData.transactionHash,
          timestamp: new Date(),
          eventData,
        };

        // 更新事件歷史
        setEvents((prevEvents) => [newEvent, ...prevEvents]);

        // 顯示通知（如果啟用）
        if (showNotifications) {
          const eventDisplayName = getEventName(eventName);
          showInfo(`${eventDisplayName}イベントが検出されました`, {
            title: "ブロックチェーンイベント",
            autoClose: true,
          });
        }

        // 執行回調（如果有）
        if (callback) {
          callback(...args);
        }
      };

      // 設置事件監聽器
      const eventFilter = contract.filters[eventName](...Object.values(filter));
      listenerRef.current = contract.on(eventFilter, eventHandler);

      setIsListening(true);
    } catch (error) {
      console.error(`事件監聽錯誤 (${eventName}):`, error);
      if (showNotifications) {
        showError(`${eventName}イベントの監視中にエラーが発生しました`, {
          title: "イベントエラー",
          autoClose: true,
        });
      }
    }
  }, [
    contract,
    eventName,
    filter,
    callback,
    isListening,
    showNotifications,
    getEventName,
    showInfo,
    showError,
  ]);

  // 停止監聽事件
  const stopListening = useCallback(() => {
    if (!contract || !isListening) return;

    try {
      // 移除事件監聽器
      if (listenerRef.current) {
        contract.off(eventName, listenerRef.current);
        listenerRef.current = null;
      }

      setIsListening(false);
    } catch (error) {
      console.error(`停止事件監聽錯誤 (${eventName}):`, error);
    }
  }, [contract, eventName, isListening]);

  // 組件卸載時停止監聽
  useEffect(() => {
    if (contract && eventName && !isListening && options.autoStart !== false) {
      startListening();
    }

    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [
    contract,
    eventName,
    isListening,
    startListening,
    stopListening,
    options.autoStart,
  ]);

  // 清除事件歷史
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    events,
    isListening,
    startListening,
    stopListening,
    clearEvents,
  };
};

export default useContractEvent;
