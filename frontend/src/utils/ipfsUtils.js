/**
 * IPFS工具函數 - 用於處理IPFS地址轉換
 * @module ipfsUtils
 */

/**
 * 默認的IPFS網關
 * @constant
 * @type {string}
 * @default
 */
export const DEFAULT_IPFS_GATEWAY = "https://ipfs.io/ipfs/";

/**
 * 備選IPFS網關列表 - 當默認網關響應慢時可切換使用
 * @constant
 * @type {Array<string>}
 */
export const ALTERNATE_IPFS_GATEWAYS = [
  "https://dweb.link/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://gateway.ipfs.io/ipfs/",
  "https://ipfs.fleek.co/ipfs/",
];

/**
 * 預設圖片 - 當無法獲取NFT圖片時使用
 * @constant
 * @type {string}
 */
export const DEFAULT_IMAGE =
  "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ";

/**
 * 將IPFS URL轉換為HTTP URL
 * @function
 * @param {string} ipfsUrl - IPFS URL，可以是ipfs://hash格式或已經是http網關格式
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {string|null} 可訪問的HTTP URL，如果無法轉換則返回null
 * @example
 * // 返回 https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ
 * getHttpUrl('ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ');
 */
export const getHttpUrl = (ipfsUrl, gateway = DEFAULT_IPFS_GATEWAY) => {
  if (!ipfsUrl) return null;

  // 已經是HTTP URL
  if (ipfsUrl.startsWith("http")) {
    return ipfsUrl;
  }

  // 檢查網關是否有效（必須包含ipfs/）
  let effectiveGateway = gateway;
  if (!effectiveGateway || !effectiveGateway.includes("/ipfs/")) {
    console.warn(`網關 "${effectiveGateway}" 無效`);

    // 檢查備用網關
    if (ALTERNATE_IPFS_GATEWAYS.length > 0) {
      // 嘗試找到一個有效的備用網關
      const validGateway = ALTERNATE_IPFS_GATEWAYS.find(
        (g) => g && g.includes("/ipfs/")
      );
      if (validGateway) {
        console.log(`使用備用網關: ${validGateway}`);
        effectiveGateway = validGateway;
      } else {
        console.error("所有網關都無效，無法加載IPFS資源");
        return null; // 返回null表示無法轉換URL
      }
    } else {
      console.error("沒有可用的備用網關，無法加載IPFS資源");
      return null; // 返回null表示無法轉換URL
    }
  }

  // IPFS協議URL
  if (ipfsUrl.startsWith("ipfs://")) {
    // 提取CID
    const cid = ipfsUrl.substring(7);

    // 確保網關URL末尾有斜線
    const normalizedGateway = effectiveGateway.endsWith("/")
      ? effectiveGateway
      : effectiveGateway + "/";

    return normalizedGateway + cid;
  }

  // 直接是CID或路徑
  if (ipfsUrl.startsWith("Qm") || ipfsUrl.startsWith("baf")) {
    // 確保網關URL末尾有斜線
    const normalizedGateway = effectiveGateway.endsWith("/")
      ? effectiveGateway
      : effectiveGateway + "/";

    return normalizedGateway + ipfsUrl;
  }

  // 返回原始URL
  return ipfsUrl;
};

/**
 * 從NFT元數據中提取圖片URL並轉換為HTTP URL
 * @function
 * @param {Object} metadata - NFT元數據對象
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {string|null} 可訪問的圖片HTTP URL，如果無法轉換則返回null
 * @example
 * // 返回 https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ
 * getImageFromMetadata({
 *   image: 'ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ',
 *   attributes: [...]
 * });
 */
export const getImageFromMetadata = (
  metadata,
  gateway = DEFAULT_IPFS_GATEWAY
) => {
  if (!metadata || !metadata.image) return null;

  return getHttpUrl(metadata.image, gateway);
};

/**
 * 獲取NFT元數據URL
 * @function
 * @param {string} baseUrl - 基礎URL（集合地址）
 * @param {string|number} tokenId - 代幣ID
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {string|null} 元數據的HTTP URL，如果無法轉換則返回null
 * @example
 * // 返回 https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0
 * getMetadataUrl('ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq', 0);
 */
export const getMetadataUrl = (
  baseUrl,
  tokenId,
  gateway = DEFAULT_IPFS_GATEWAY
) => {
  const baseHttpUrl = getHttpUrl(baseUrl, gateway);

  // 如果無法轉換基礎URL，則返回null
  if (!baseHttpUrl) {
    return null;
  }

  // 確保URL末尾沒有多餘的斜線
  const normalizedBaseUrl = baseHttpUrl.endsWith("/")
    ? baseHttpUrl.slice(0, -1)
    : baseHttpUrl;
  return `${normalizedBaseUrl}/${tokenId}`;
};

/**
 * 根據tokenId獲取NFT元數據
 * @function
 * @param {string} baseUrl - 集合基礎URL (IPFS格式或HTTP格式)
 * @param {string|number} tokenId - 代幣ID
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {Promise<Object|null>} NFT元數據對象，如果獲取失敗則返回null
 * @throws {Error} 如果獲取失敗
 * @example
 * // 獲取元數據並提取圖片URL
 * const metadata = await fetchNFTMetadata('ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq', 0);
 * const imageUrl = getImageFromMetadata(metadata);
 */
export const fetchNFTMetadata = async (
  baseUrl,
  tokenId,
  gateway = DEFAULT_IPFS_GATEWAY
) => {
  try {
    // 獲取元數據URL
    const metadataUrl = getMetadataUrl(baseUrl, tokenId, gateway);

    // 如果無法生成有效的元數據URL，則返回null
    if (!metadataUrl) {
      console.error(
        `無法生成有效的元數據URL: baseUrl=${baseUrl}, tokenId=${tokenId}`
      );
      return null;
    }

    // 獲取元數據
    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error(
        `獲取元數據失敗: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`獲取NFT #${tokenId}元數據失敗:`, error);
    return null;
  }
};

/**
 * 一站式函數：根據tokenId獲取NFT圖片URL
 * @function
 * @param {string} baseUrl - 集合基礎URL (IPFS格式或HTTP格式)
 * @param {string|number} tokenId - 代幣ID
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {Promise<Object>} 包含圖片URL和加載狀態的對象 {url: string|null, isLoading: boolean, error: string|null}
 * @example
 * // 一站式獲取圖片URL
 * const {url, isLoading, error} = await fetchNFTImageUrl('ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq', 0);
 */
export const fetchNFTImageUrl = async (
  baseUrl,
  tokenId,
  gateway = DEFAULT_IPFS_GATEWAY
) => {
  // 返回結果對象
  const result = {
    url: null,
    isLoading: false,
    error: null,
  };

  try {
    result.isLoading = true;

    const metadata = await fetchNFTMetadata(baseUrl, tokenId, gateway);
    if (!metadata) {
      result.error = "画像の読み込みに失敗しました";
      result.isLoading = false;
      return result;
    }

    const imageUrl = getImageFromMetadata(metadata, gateway);
    if (!imageUrl) {
      result.error = "画像の読み込みに失敗しました";
      result.isLoading = false;
      return result;
    }

    result.url = imageUrl;
    result.isLoading = false;
    return result;
  } catch (error) {
    console.error(`獲取NFT #${tokenId}圖片失敗:`, error);
    result.error = "画像の読み込みに失敗しました";
    result.isLoading = false;
    return result;
  }
};

/**
 * 從NFT數據中獲取圖片URL（優先使用metadata）
 * @function
 * @param {Object} nft - NFT數據對象
 * @param {string} [gateway=DEFAULT_IPFS_GATEWAY] - 可選的IPFS網關URL
 * @returns {Promise<Object>} 包含圖片URL和加載狀態的對象 {url: string|null, isLoading: boolean, error: string|null}
 * @example
 * // 如果NFT包含metadataBaseUrl和tokenId，則先獲取metadata再提取圖片
 * // 否則直接使用nft.image
 * const {url, isLoading, error} = await getNFTImageUrl(nft);
 */
export const getNFTImageUrl = async (nft, gateway = DEFAULT_IPFS_GATEWAY) => {
  // 返回結果對象
  const result = {
    url: null,
    isLoading: false,
    error: null,
  };

  try {
    if (!nft) {
      console.warn("NFT數據為空");
      result.error = "画像の読み込みに失敗しました";
      return result;
    }

    console.log(`正在獲取NFT #${nft.tokenId}的圖片`, nft);
    result.isLoading = true;

    // 如果NFT有metadataBaseUrl和tokenId，優先從metadata獲取圖片
    if (nft.metadataBaseUrl && nft.tokenId) {
      try {
        console.log(`從metadata獲取NFT #${nft.tokenId}的圖片...`);

        // 步驟1-2：獲取metadata URL
        const metadataUrl = getMetadataUrl(
          nft.metadataBaseUrl,
          nft.tokenId,
          gateway
        );

        if (!metadataUrl) {
          throw new Error("無法生成有效的metadata URL");
        }

        console.log(`Metadata URL: ${metadataUrl}`);

        // 步驟3：獲取metadata
        const response = await fetch(metadataUrl);
        if (!response.ok) {
          throw new Error(`獲取metadata失敗: ${response.status}`);
        }

        const metadata = await response.json();
        console.log(`獲取到的metadata:`, metadata);

        // 步驟4-5：從metadata中提取image URL並轉換
        if (metadata && metadata.image) {
          const imageUrl = getHttpUrl(metadata.image, gateway);
          if (imageUrl) {
            console.log(`從metadata獲取圖片URL成功: ${imageUrl}`);
            result.url = imageUrl;
            result.isLoading = false;
            return result;
          } else {
            console.warn(`無法轉換image URL: ${metadata.image}`);
            throw new Error("無法轉換image URL");
          }
        } else {
          console.warn(`Metadata中缺少image字段`);
          throw new Error("Metadata中缺少image字段");
        }
      } catch (metadataError) {
        console.warn(
          `從metadata獲取圖片失敗，將使用fallback: ${metadataError.message}`
        );
      }
    } else {
      console.log("NFT缺少metadataBaseUrl或tokenId，將使用image字段");
    }

    // Fallback：如果有nft.image，則使用它
    if (nft.image) {
      const imageUrl = getHttpUrl(nft.image, gateway);
      if (imageUrl) {
        console.log(`使用NFT.image作為fallback: ${imageUrl}`);
        result.url = imageUrl;
        result.isLoading = false;
        return result;
      } else {
        console.warn(`無法轉換NFT.image URL: ${nft.image}`);
      }
    }

    // 所有方法都失敗，設置錯誤信息
    console.error(`無法獲取NFT #${nft.tokenId}的圖片，所有方法都失敗`);
    result.error = "画像の読み込みに失敗しました";
    result.isLoading = false;
    return result;
  } catch (error) {
    console.error(`獲取NFT圖片失敗: ${error.message}`);
    result.error = "画像の読み込みに失敗しました";
    result.isLoading = false;
    return result;
  }
};
