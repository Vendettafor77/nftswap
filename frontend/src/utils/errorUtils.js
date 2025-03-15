/**
 * @file errorUtils.js
 * @description 錯誤處理工具，集成契約錯誤處理和通知系統
 */

import { ErrorTypes } from "./contractUtils";

/**
 * 錯誤嚴重程度級別枚舉
 */
export const ErrorSeverity = {
  INFO: "info", // 僅提示信息
  WARNING: "warning", // 警告信息
  ERROR: "error", // 錯誤信息
  FATAL: "fatal", // 嚴重錯誤
};

/**
 * 根據合約錯誤類型獲取錯誤嚴重程度
 * @param {string} errorType - 契約錯誤類型
 * @returns {string} 錯誤嚴重程度
 */
export const getErrorSeverity = (errorType) => {
  switch (errorType) {
    case ErrorTypes.USER_REJECTED:
      return ErrorSeverity.INFO; // 用戶取消不是真正錯誤
    case ErrorTypes.WALLET_NOT_CONNECTED:
      return ErrorSeverity.WARNING;
    case ErrorTypes.NETWORK_ERROR:
      return ErrorSeverity.WARNING;
    case ErrorTypes.CONTRACT_ERROR:
      return ErrorSeverity.ERROR;
    case ErrorTypes.TRANSACTION_ERROR:
      return ErrorSeverity.ERROR;
    case ErrorTypes.UNKNOWN_ERROR:
      return ErrorSeverity.FATAL;
    default:
      return ErrorSeverity.ERROR;
  }
};

/**
 * 創建格式化的錯誤對象
 * @param {string} message - 錯誤消息
 * @param {Object} [details={}] - 錯誤詳情
 * @param {string} [severity=ErrorSeverity.ERROR] - 錯誤嚴重程度
 * @param {Error} [originalError=null] - 原始錯誤對象
 * @returns {Object} 格式化的錯誤對象
 */
export const createError = (
  message,
  details = {},
  severity = ErrorSeverity.ERROR,
  originalError = null
) => {
  return {
    message,
    details,
    severity,
    timestamp: new Date(),
    originalError,
  };
};

/**
 * 處理並格式化合約錯誤
 * @param {Object} error - 合約錯誤對象
 * @param {Function} notifyFn - 用於顯示通知的函數
 * @param {boolean} [showNotification=true] - 是否顯示通知
 * @returns {Object} 格式化的錯誤對象
 */
export const handleError = (error, notifyFn, showNotification = true) => {
  console.error("處理錯誤:", error);

  // 如果錯誤已經是我們自己格式化的錯誤對象
  if (error && error.severity) {
    if (showNotification && notifyFn) {
      notifyFn(error.message, { autoClose: true });
    }
    return error;
  }

  // 合約錯誤
  if (error && error.type) {
    const severity = getErrorSeverity(error.type);
    const formattedError = createError(
      error.message,
      { type: error.type },
      severity,
      error.originalError
    );

    if (showNotification && notifyFn) {
      // 根據嚴重程度選擇通知類型
      if (severity === ErrorSeverity.INFO) {
        // 用戶取消的情況，可以不顯示或使用info級別
        // notifyFn.showInfo(error.message);
      } else if (severity === ErrorSeverity.WARNING) {
        notifyFn(error.message, { autoClose: true });
      } else {
        notifyFn(error.message, { autoClose: false });
      }
    }

    return formattedError;
  }

  // 一般JavaScript錯誤
  const message = error?.message || "發生未知錯誤";
  const formattedError = createError(message, {}, ErrorSeverity.ERROR, error);

  if (showNotification && notifyFn) {
    notifyFn(message, { autoClose: true });
  }

  return formattedError;
};

/**
 * 嘗試執行函數並處理可能的錯誤
 * @param {Function} fn - 要執行的函數
 * @param {Function} notifyErrorFn - 錯誤通知函數
 * @param {Function} notifySuccessFn - 成功通知函數
 * @param {string} [successMessage=null] - 成功時顯示的消息
 * @returns {Promise<any>} 函數執行結果
 */
export const tryCatchFn = async (
  fn,
  notifyErrorFn,
  notifySuccessFn = null,
  successMessage = null
) => {
  try {
    const result = await fn();

    if (successMessage && notifySuccessFn) {
      notifySuccessFn(successMessage);
    }

    return { success: true, result };
  } catch (error) {
    const formattedError = handleError(error, notifyErrorFn);
    return { success: false, error: formattedError };
  }
};

export default {
  ErrorSeverity,
  getErrorSeverity,
  createError,
  handleError,
  tryCatchFn,
};
