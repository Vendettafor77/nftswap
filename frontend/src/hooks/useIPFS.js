/**
 * @file useIPFS.js
 * @description IPFS操作的React Hook
 */

import { useState, useCallback } from "react";
import {
  uploadFileToIPFS,
  uploadMetadataToIPFS,
  createNFTWithIPFS,
  createCollectionMetadata,
} from "../utils/ipfsUploadUtils";
import { getHttpUrl } from "../utils/ipfsUtils";
import { useNotification } from "../contexts/NotificationContext";

/**
 * IPFS操作的React Hook
 * @returns {Object} IPFS相關操作和狀態
 */
const useIPFS = () => {
  // 上傳狀態
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  // 使用通知系統
  const { showSuccess, showError, showInfo } = useNotification();

  /**
   * 上傳文件到IPFS
   * @param {File} file - 要上傳的文件
   * @param {Object} [options] - 選項
   * @returns {Promise<Object>} 上傳結果
   */
  const uploadFile = useCallback(
    async (file, options = {}) => {
      if (!file) {
        showError("ファイルが選択されていません", {
          title: "アップロードエラー",
        });
        return { success: false };
      }

      setUploading(true);
      setUploadProgress(0);
      setUploadStatus("UPLOADING");

      try {
        showInfo("ファイルをIPFSにアップロード中...", {
          title: "アップロード中",
          autoClose: true,
        });

        const result = await uploadFileToIPFS(file, (progress) => {
          setUploadProgress(progress);
        });

        setUploadStatus(result.success ? "SUCCESS" : "ERROR");

        if (result.success) {
          showSuccess("ファイルのアップロードが完了しました", {
            title: "アップロード成功",
            autoClose: true,
          });
        } else {
          showError("ファイルのアップロードに失敗しました", {
            title: "アップロードエラー",
          });
        }

        return result;
      } catch (error) {
        setUploadStatus("ERROR");
        showError(`アップロードエラー: ${error.message}`, {
          title: "アップロードエラー",
        });
        return { success: false, error };
      } finally {
        setUploading(false);
      }
    },
    [showSuccess, showError, showInfo]
  );

  /**
   * 上傳元數據到IPFS
   * @param {Object} metadata - 元數據對象
   * @param {Object} [options] - 選項
   * @returns {Promise<Object>} 上傳結果
   */
  const uploadMetadata = useCallback(
    async (metadata, options = {}) => {
      if (!metadata) {
        showError("メタデータが提供されていません", {
          title: "アップロードエラー",
        });
        return { success: false };
      }

      setUploading(true);
      setUploadStatus("UPLOADING_METADATA");

      try {
        showInfo("メタデータをIPFSにアップロード中...", {
          title: "アップロード中",
          autoClose: true,
        });

        const result = await uploadMetadataToIPFS(metadata, (progress) => {
          setUploadProgress(progress);
        });

        setUploadStatus(result.success ? "SUCCESS" : "ERROR");

        if (result.success) {
          showSuccess("メタデータのアップロードが完了しました", {
            title: "アップロード成功",
            autoClose: true,
          });
        } else {
          showError("メタデータのアップロードに失敗しました", {
            title: "アップロードエラー",
          });
        }

        return result;
      } catch (error) {
        setUploadStatus("ERROR");
        showError(`アップロードエラー: ${error.message}`, {
          title: "アップロードエラー",
        });
        return { success: false, error };
      } finally {
        setUploading(false);
      }
    },
    [showSuccess, showError, showInfo]
  );

  /**
   * 創建NFT（上傳圖片和元數據）
   * @param {File} imageFile - 圖片文件
   * @param {Object} metadataInfo - 元數據信息
   * @param {Object} [options] - 選項
   * @returns {Promise<Object>} 創建結果
   */
  const createNFT = useCallback(
    async (imageFile, metadataInfo, options = {}) => {
      if (!imageFile || !metadataInfo) {
        showError("画像またはメタデータ情報が不足しています", {
          title: "NFT作成エラー",
        });
        return { success: false };
      }

      setUploading(true);
      setUploadProgress(0);
      setUploadStatus("STARTING");

      try {
        showInfo("NFTの作成を開始します。しばらくお待ちください...", {
          title: "NFT作成中",
          autoClose: true,
        });

        const result = await createNFTWithIPFS(imageFile, metadataInfo, {
          onImageProgress: (progress) => {
            setUploadProgress(progress / 2); // 圖片上傳占進度的一半
          },
          onMetadataProgress: (progress) => {
            setUploadProgress(50 + progress / 2); // 元數據上傳占進度的另一半
          },
          onStatusChange: (status, message) => {
            setUploadStatus(status);
            if (message) {
              showInfo(message, {
                title: "NFT作成中",
                autoClose: true,
              });
            }
          },
        });

        setUploadStatus(result.success ? "SUCCESS" : "ERROR");

        if (result.success) {
          showSuccess("NFTの作成が完了しました", {
            title: "NFT作成成功",
            autoClose: true,
          });
        } else {
          showError(`NFTの作成に失敗しました: ${result.error?.message || ""}`, {
            title: "NFT作成エラー",
          });
        }

        return result;
      } catch (error) {
        setUploadStatus("ERROR");
        showError(`NFT作成エラー: ${error.message}`, {
          title: "NFT作成エラー",
        });
        return { success: false, error };
      } finally {
        setUploading(false);
      }
    },
    [showSuccess, showError, showInfo]
  );

  /**
   * 創建NFT集合
   * @param {Object} collectionData - 集合數據
   * @param {File} [coverImage] - 封面圖片
   * @param {Object} [options] - 選項
   * @returns {Promise<Object>} 創建結果
   */
  const createCollection = useCallback(
    async (collectionData, coverImage, options = {}) => {
      if (!collectionData || !collectionData.name) {
        showError("コレクション情報が不足しています", {
          title: "コレクション作成エラー",
        });
        return { success: false };
      }

      setUploading(true);
      setUploadStatus("CREATING_COLLECTION");

      try {
        showInfo("NFTコレクションを作成中...", {
          title: "コレクション作成中",
          autoClose: true,
        });

        // 如果有封面圖片，先上傳圖片
        let imageUrl = "";
        if (coverImage) {
          setUploadStatus("UPLOADING_COLLECTION_IMAGE");
          const imageResult = await uploadFileToIPFS(coverImage, (progress) => {
            setUploadProgress(progress / 2);
          });

          if (!imageResult.success) {
            throw new Error("コレクション画像のアップロードに失敗しました");
          }

          imageUrl = imageResult.url;
        }

        // 創建並上傳集合元數據
        setUploadStatus("UPLOADING_COLLECTION_METADATA");
        const result = await createCollectionMetadata(
          {
            ...collectionData,
            image: imageUrl,
          },
          {
            onProgress: (progress) => {
              setUploadProgress(coverImage ? 50 + progress / 2 : progress);
            },
            onStatusChange: (status, message) => {
              setUploadStatus(status);
              if (message) {
                showInfo(message, {
                  title: "コレクション作成中",
                  autoClose: true,
                });
              }
            },
          }
        );

        setUploadStatus(result.success ? "SUCCESS" : "ERROR");

        if (result.success) {
          showSuccess("NFTコレクションの作成が完了しました", {
            title: "コレクション作成成功",
            autoClose: true,
          });
        } else {
          showError("NFTコレクションの作成に失敗しました", {
            title: "コレクション作成エラー",
          });
        }

        return result;
      } catch (error) {
        setUploadStatus("ERROR");
        showError(`コレクション作成エラー: ${error.message}`, {
          title: "コレクション作成エラー",
        });
        return { success: false, error };
      } finally {
        setUploading(false);
      }
    },
    [showSuccess, showError, showInfo]
  );

  /**
   * 獲取IPFS文件的HTTP URL
   * @param {string} ipfsUrl - IPFS URL
   * @returns {string} HTTP URL
   */
  const getFileHttpUrl = useCallback((ipfsUrl) => {
    return getHttpUrl(ipfsUrl);
  }, []);

  /**
   * 重置上傳狀態
   */
  const resetUploadState = useCallback(() => {
    setUploading(false);
    setUploadProgress(0);
    setUploadStatus(null);
  }, []);

  return {
    // 狀態
    uploading,
    uploadProgress,
    uploadStatus,

    // 操作
    uploadFile,
    uploadMetadata,
    createNFT,
    createCollection,
    getFileHttpUrl,
    resetUploadState,
  };
};

export default useIPFS;
