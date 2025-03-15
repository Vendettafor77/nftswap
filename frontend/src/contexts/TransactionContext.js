/**
 * @file TransactionContext.js
 * @description 交易上下文，提供交易狀態管理和監聽
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "./NotificationContext";
import { TransactionStatus } from "../utils/contractUtils";

// 交易操作類型枚舉
const TransactionActionType = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  CLEAR: "CLEAR",
  CLEAR_ALL: "CLEAR_ALL",
};

// 交易類型枚舉
export const TransactionType = {
  MINT: "MINT",
  LIST: "LIST",
  UNLIST: "UNLIST",
  BUY: "BUY",
  TRANSFER: "TRANSFER",
  APPROVE: "APPROVE",
  OTHER: "OTHER",
};

// 獲取交易類型顯示名稱（日文）
export const getTransactionTypeName = (type) => {
  switch (type) {
    case TransactionType.MINT:
      return "ミント";
    case TransactionType.LIST:
      return "出品";
    case TransactionType.UNLIST:
      return "出品取消";
    case TransactionType.BUY:
      return "購入";
    case TransactionType.TRANSFER:
      return "転送";
    case TransactionType.APPROVE:
      return "承認";
    default:
      return "トランザクション";
  }
};

// 交易上下文
const TransactionContext = createContext();

// 初始狀態
const initialState = {
  transactions: [],
  latestTransaction: null,
};

// 交易Reducer
const transactionReducer = (state, action) => {
  switch (action.type) {
    case TransactionActionType.ADD:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        latestTransaction: action.payload,
      };
    case TransactionActionType.UPDATE:
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id
            ? { ...tx, ...action.payload.updates }
            : tx
        ),
        latestTransaction:
          state.latestTransaction?.id === action.payload.id
            ? { ...state.latestTransaction, ...action.payload.updates }
            : state.latestTransaction,
      };
    case TransactionActionType.CLEAR:
      return {
        ...state,
        transactions: state.transactions.filter(
          (tx) => tx.id !== action.payload
        ),
        latestTransaction:
          state.latestTransaction?.id === action.payload
            ? null
            : state.latestTransaction,
      };
    case TransactionActionType.CLEAR_ALL:
      return {
        ...state,
        transactions: [],
        latestTransaction: null,
      };
    default:
      return state;
  }
};

/**
 * 交易上下文提供者
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @returns {JSX.Element} 交易上下文提供者
 */
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const { showSuccess, showError, showInfo } = useNotification();

  // 添加交易
  const addTransaction = useCallback((transactionData) => {
    const id = transactionData.id || uuidv4();
    const transaction = {
      id,
      status: TransactionStatus.PENDING,
      createdAt: new Date(),
      ...transactionData,
    };

    dispatch({
      type: TransactionActionType.ADD,
      payload: transaction,
    });

    return id;
  }, []);

  // 更新交易
  const updateTransaction = useCallback((id, updates) => {
    dispatch({
      type: TransactionActionType.UPDATE,
      payload: { id, updates },
    });
  }, []);

  // 清除交易
  const clearTransaction = useCallback((id) => {
    dispatch({
      type: TransactionActionType.CLEAR,
      payload: id,
    });
  }, []);

  // 清除所有交易
  const clearAllTransactions = useCallback(() => {
    dispatch({
      type: TransactionActionType.CLEAR_ALL,
    });
  }, []);

  // 開始監聽交易
  const trackTransaction = useCallback(
    async (
      tx,
      {
        type = TransactionType.OTHER,
        asset = null,
        description = null,
        onSuccess = null,
        onFailed = null,
      } = {}
    ) => {
      if (!tx) return null;

      const txType = getTransactionTypeName(type);
      const txId = uuidv4();
      const txData = {
        id: txId,
        hash: tx.hash,
        type,
        asset,
        description: description || `${txType}のトランザクション`,
      };

      // 添加交易記錄
      addTransaction(txData);

      // 顯示待處理通知
      showInfo(`${txData.description}を送信しました`, {
        title: "トランザクション送信",
        autoClose: true,
      });

      try {
        // 等待交易被挖掘（至少1個確認）
        const receipt = await tx.wait(1);

        // 更新交易狀態為確認中
        updateTransaction(txId, {
          status: TransactionStatus.CONFIRMING,
          receipt,
        });

        // 顯示確認中通知
        showInfo(`${txData.description}が確認中です`, {
          title: "トランザクション確認中",
          autoClose: true,
        });

        // 等待更多確認（可選）
        //const finalReceipt = await tx.wait(3);

        // 更新交易狀態為已確認
        updateTransaction(txId, {
          status: TransactionStatus.CONFIRMED,
        });

        // 顯示成功通知
        showSuccess(`${txData.description}が完了しました`, {
          title: "トランザクション成功",
          autoClose: true,
        });

        // 調用成功回調
        if (onSuccess) {
          onSuccess(receipt);
        }

        return { success: true, receipt, transaction: txData };
      } catch (error) {
        // 更新交易狀態為失敗
        updateTransaction(txId, {
          status: TransactionStatus.FAILED,
          error,
        });

        // 顯示失敗通知
        showError(`${txData.description}が失敗しました`, {
          title: "トランザクション失敗",
          autoClose: false,
        });

        // 調用失敗回調
        if (onFailed) {
          onFailed(error);
        }

        return { success: false, error, transaction: txData };
      }
    },
    [addTransaction, updateTransaction, showSuccess, showError, showInfo]
  );

  // 獲取特定類型的交易
  const getTransactionsByType = useCallback(
    (type) => {
      return state.transactions.filter((tx) => tx.type === type);
    },
    [state.transactions]
  );

  // 獲取特定資產的交易
  const getTransactionsByAsset = useCallback(
    (assetId) => {
      return state.transactions.filter(
        (tx) => tx.asset && tx.asset.id === assetId
      );
    },
    [state.transactions]
  );

  // 持久化交易歷史到本地存儲
  useEffect(() => {
    // 保存到localStorage（可選）
    try {
      localStorage.setItem(
        "transactionHistory",
        JSON.stringify(state.transactions)
      );
    } catch (error) {
      console.error("保存交易歷史失敗:", error);
    }
  }, [state.transactions]);

  // 初始化時從localStorage加載交易歷史（可選）
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem("transactionHistory");
      if (savedTransactions) {
        const parsed = JSON.parse(savedTransactions);

        // 將日期字符串轉換回Date對象
        const transactions = parsed.map((tx) => ({
          ...tx,
          createdAt: new Date(tx.createdAt),
        }));

        // 批量加載交易
        transactions.forEach((tx) => {
          dispatch({
            type: TransactionActionType.ADD,
            payload: tx,
          });
        });
      }
    } catch (error) {
      console.error("加載交易歷史失敗:", error);
    }
  }, []);

  // 提供給子組件的上下文值
  const contextValue = {
    transactions: state.transactions,
    latestTransaction: state.latestTransaction,
    addTransaction,
    updateTransaction,
    clearTransaction,
    clearAllTransactions,
    trackTransaction,
    getTransactionsByType,
    getTransactionsByAsset,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

/**
 * 使用交易上下文的Hook
 * @returns {Object} 交易上下文值
 */
export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

// 最後添加自定義hook導出
/**
 * 使用交易上下文的Hook
 * @returns {Object} 交易上下文值
 */
export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export default TransactionContext;
