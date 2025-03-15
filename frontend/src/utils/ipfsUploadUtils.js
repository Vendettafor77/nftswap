/**
 * @file ipfsUploadUtils.js
 * @description IPFS上傳工具函數，提供元數據和文件上傳功能
 */

import { create } from "ipfs-http-client";
import { DEFAULT_IPFS_GATEWAY, getHttpUrl } from "./ipfsUtils";

// IPFS配置（默認使用Infura）
const IPFS_PROJECT_ID = "YOUR_INFURA_PROJECT_ID"; // 替換為實際項目ID
const IPFS_PROJECT_SECRET = "YOUR_INFURA_PROJECT_SECRET"; // 替換為實際密鑰

// 認證信息
const auth =
  "Basic " +
  Buffer.from(IPFS_PROJECT_ID + ":" + IPFS_PROJECT_SECRET).toString("base64");

/**
 * 創建IPFS客戶端
 * @returns {Object|null} IPFS客戶端或null（如果創建失敗）
 */
export const createIpfsClient = () => {
  try {
    // 連接到Infura IPFS節點
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    return client;
  } catch (error) {
    console.error("創建IPFS客戶端失敗:", error);
    return null;
  }
};

/**
 * 上傳文件到IPFS
 * @param {File} file - 要上傳的文件
 * @param {Function} [onProgress] - 上傳進度回調
 * @returns {Promise<{success: boolean, cid: string, url: string, error: Error|null}>} 上傳結果
 */
export const uploadFileToIPFS = async (file, onProgress) => {
  try {
    const client = createIpfsClient();
    if (!client) {
      throw new Error("無法創建IPFS客戶端");
    }

    // 讀取文件
    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);

    // 上傳到IPFS（目前Infura不支持進度回調）
    const { cid } = await client.add(buffer, {
      progress: (bytes) => {
        if (onProgress) {
          const percentage = Math.round((bytes / file.size) * 100);
          onProgress(percentage);
        }
      },
    });

    // 生成IPFS URL
    const ipfsUrl = `ipfs://${cid.toString()}`;
    const httpUrl = getHttpUrl(ipfsUrl);

    return {
      success: true,
      cid: cid.toString(),
      url: ipfsUrl,
      httpUrl,
      error: null,
    };
  } catch (error) {
    console.error("上傳文件到IPFS失敗:", error);
    return {
      success: false,
      cid: null,
      url: null,
      httpUrl: null,
      error,
    };
  }
};

/**
 * 生成NFT元數據
 * @param {Object} data - NFT元數據
 * @param {string} data.name - NFT名稱
 * @param {string} data.description - NFT描述
 * @param {string} data.image - 圖片IPFS URL
 * @param {Array} [data.attributes] - NFT屬性
 * @returns {Object} NFT元數據對象
 */
export const generateNFTMetadata = (data) => {
  const { name, description, image, attributes = [] } = data;

  return {
    name,
    description,
    image,
    attributes,
    // 添加時間戳和其他可能需要的字段
    created_at: new Date().toISOString(),
  };
};

/**
 * 上傳元數據到IPFS
 * @param {Object} metadata - NFT元數據對象
 * @param {Function} [onProgress] - 上傳進度回調
 * @returns {Promise<{success: boolean, cid: string, url: string, error: Error|null}>} 上傳結果
 */
export const uploadMetadataToIPFS = async (metadata, onProgress) => {
  try {
    const client = createIpfsClient();
    if (!client) {
      throw new Error("無法創建IPFS客戶端");
    }

    // 轉換為JSON字符串
    const metadataString = JSON.stringify(metadata);
    const buffer = Buffer.from(metadataString);

    // 上傳到IPFS
    const { cid } = await client.add(buffer);

    // 生成IPFS URL
    const ipfsUrl = `ipfs://${cid.toString()}`;
    const httpUrl = getHttpUrl(ipfsUrl);

    return {
      success: true,
      cid: cid.toString(),
      url: ipfsUrl,
      httpUrl,
      error: null,
    };
  } catch (error) {
    console.error("上傳元數據到IPFS失敗:", error);
    return {
      success: false,
      cid: null,
      url: null,
      httpUrl: null,
      error,
    };
  }
};

/**
 * 完整的NFT創建流程（上傳圖片和元數據）
 * @param {File} imageFile - 圖片文件
 * @param {Object} metadataInfo - 元數據信息
 * @param {string} metadataInfo.name - NFT名稱
 * @param {string} metadataInfo.description - NFT描述
 * @param {Array} [metadataInfo.attributes] - NFT屬性
 * @param {Object} [options] - 選項
 * @param {Function} [options.onImageProgress] - 圖片上傳進度回調
 * @param {Function} [options.onMetadataProgress] - 元數據上傳進度回調
 * @param {Function} [options.onStatusChange] - 狀態變更回調
 * @returns {Promise<{success: boolean, metadata: Object, metadataUrl: string, imageUrl: string, error: Error|null}>} 創建結果
 */
export const createNFTWithIPFS = async (
  imageFile,
  metadataInfo,
  options = {}
) => {
  const { onImageProgress, onMetadataProgress, onStatusChange } = options;

  try {
    // 步驟1: 上傳圖片
    if (onStatusChange)
      onStatusChange("UPLOADING_IMAGE", "画像をアップロード中...");

    const imageResult = await uploadFileToIPFS(imageFile, onImageProgress);
    if (!imageResult.success) {
      throw new Error(
        `圖片上傳失敗: ${imageResult.error?.message || "未知錯誤"}`
      );
    }

    // 步驟2: 生成並上傳元數據
    if (onStatusChange)
      onStatusChange("GENERATING_METADATA", "メタデータを生成中...");

    const metadata = generateNFTMetadata({
      ...metadataInfo,
      image: imageResult.url, // 使用IPFS URL
    });

    if (onStatusChange)
      onStatusChange("UPLOADING_METADATA", "メタデータをアップロード中...");

    const metadataResult = await uploadMetadataToIPFS(
      metadata,
      onMetadataProgress
    );
    if (!metadataResult.success) {
      throw new Error(
        `元數據上傳失敗: ${metadataResult.error?.message || "未知錯誤"}`
      );
    }

    // 返回成功結果
    return {
      success: true,
      metadata,
      metadataUrl: metadataResult.url,
      metadataHttpUrl: metadataResult.httpUrl,
      imageUrl: imageResult.url,
      imageHttpUrl: imageResult.httpUrl,
      error: null,
    };
  } catch (error) {
    console.error("創建NFT失敗:", error);
    if (onStatusChange)
      onStatusChange("ERROR", `エラーが発生しました: ${error.message}`);

    return {
      success: false,
      metadata: null,
      metadataUrl: null,
      metadataHttpUrl: null,
      imageUrl: null,
      imageHttpUrl: null,
      error,
    };
  }
};

/**
 * 創建NFT集合元數據
 * @param {Object} data - 集合元數據
 * @param {string} data.name - 集合名稱
 * @param {string} data.description - 集合描述
 * @param {string} [data.image] - 集合圖片IPFS URL
 * @param {string} [data.external_link] - 外部鏈接
 * @param {Array} [data.sellers_fee_basis_points] - 版稅（10000表示100%）
 * @param {string} [data.fee_recipient] - 版稅接收地址
 * @returns {Promise<{success: boolean, url: string, error: Error|null}>} 上傳結果
 */
export const createCollectionMetadata = async (data, options = {}) => {
  try {
    const { onProgress, onStatusChange } = options;

    // 生成集合元數據
    const collectionMetadata = {
      name: data.name,
      description: data.description,
      image: data.image || "",
      external_link: data.external_link || "",
      seller_fee_basis_points: data.seller_fee_basis_points || 0,
      fee_recipient: data.fee_recipient || "",
      created_at: new Date().toISOString(),
    };

    if (onStatusChange)
      onStatusChange(
        "UPLOADING_COLLECTION",
        "コレクションメタデータをアップロード中..."
      );

    // 上傳到IPFS
    const result = await uploadMetadataToIPFS(collectionMetadata, onProgress);

    return {
      success: result.success,
      metadata: collectionMetadata,
      url: result.url,
      httpUrl: result.httpUrl,
      error: result.error,
    };
  } catch (error) {
    console.error("創建集合元數據失敗:", error);
    return {
      success: false,
      metadata: null,
      url: null,
      httpUrl: null,
      error,
    };
  }
};

// 導出所有功能
export default {
  uploadFileToIPFS,
  uploadMetadataToIPFS,
  createNFTWithIPFS,
  generateNFTMetadata,
  createCollectionMetadata,
};
