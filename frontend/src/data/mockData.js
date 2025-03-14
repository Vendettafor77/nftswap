/**
 * @file mockData.js
 * @description 此文件包含整個應用程序使用的所有模擬數據。
 * 集中管理模擬數據可確保不同組件之間的數據一致性。
 */

// NFT集合列表 - 用於下拉選擇
export const NFT_COLLECTIONS = [
  "すべて", // 全部
  "WTFape コレクション",
  "Doodles Collection",
  "Azuki",
  "Cool Cats",
  "Samurai Collection",
  "CryptoPunks",
];

/**
 * 用户擁有的NFT列表
 * @type {Array<Object>}
 */
export const myNFTs = [
  {
    tokenId: "0",
    name: "WTFape #0",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "1",
    name: "WTFape #1",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "2",
    name: "サムライNFT",
    collection: "Samurai Collection",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "3",
    name: "WTFape #3",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "785",
    name: "WTFape #785",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "612",
    name: "WTFape #612",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
];

/**
 * 市場中的 NFT 列表
 * @type {Array<Object>}
 */
export const marketNFTs = [
  {
    tokenId: "123",
    name: "WTFape #123",
    collection: "WTFape コレクション",
    price: "0.55",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x1234567890123456789012345678901234567890",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "456",
    name: "WTFape #456",
    collection: "WTFape コレクション",
    price: "0.34",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x2345678901234567890123456789012345678901",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "789",
    name: "WTFape #789",
    collection: "WTFape コレクション",
    price: "0.29",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x3456789012345678901234567890123456789012",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "234",
    name: "WTFape #234",
    collection: "WTFape コレクション",
    price: "0.12",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x4567890123456789012345678901234567890123",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "567",
    name: "WTFape #567",
    collection: "WTFape コレクション",
    price: "0.42",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x5678901234567890123456789012345678901234",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "890",
    name: "WTFape #890",
    collection: "WTFape コレクション",
    price: "0.35",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x6789012345678901234567890123456789012345",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "345",
    name: "WTFape #345",
    collection: "WTFape コレクション",
    price: "0.51",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x7890123456789012345678901234567890123456",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "678",
    name: "WTFape #678",
    collection: "WTFape コレクション",
    price: "0.27",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x8901234567890123456789012345678901234567",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "901",
    name: "WTFape #901",
    collection: "WTFape コレクション",
    price: "0.38",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x9012345678901234567890123456789012345678",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
  {
    tokenId: "612",
    name: "WTFape #612",
    collection: "WTFape コレクション",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  },
];

/**
 * 交易歷史記錄列表
 * @type {Array<Object>}
 */
export const mockTransactions = [
  {
    id: "tx1",
    type: "purchase",
    nftName: "Bored Ape #123",
    nftCollection: "Bored Ape Yacht Club",
    nftImage: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    tokenId: "123",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 2.5,
    date: "2023-03-15T14:22:30Z",
    from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    to: "0xYourAddress", // 當前用戶地址
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "tx2",
    type: "sale",
    nftName: "Crypto Punk #456",
    nftCollection: "CryptoPunks",
    nftImage: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    tokenId: "456",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 3.2,
    date: "2023-03-10T09:45:12Z",
    from: "0xYourAddress", // 當前用戶地址
    to: "0x7AB4C5D89e6D8CA8740eA9c5F1c8d536BBBF88F3",
    contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  },
  {
    id: "tx3",
    type: "mint",
    nftName: "WTFApe #789",
    nftCollection: "WTFApe",
    nftImage: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/789",
    tokenId: "789",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 0.1, // 鑄造費用
    date: "2023-03-01T18:11:05Z",
    from: "0x0000000000000000000000000000000000000000", // 零地址表示鑄造
    to: "0xYourAddress", // 當前用戶地址
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "tx4",
    type: "transfer",
    nftName: "Doodle #234",
    nftCollection: "Doodles",
    nftImage: "ipfs://QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/234",
    tokenId: "234",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 0, // 轉移沒有價格
    date: "2023-02-25T22:30:45Z",
    from: "0xYourAddress", // 當前用戶地址
    to: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF", // 接收方地址
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "tx5",
    type: "purchase",
    nftName: "Azuki #567",
    nftCollection: "Azuki",
    nftImage: "ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/567",
    tokenId: "567",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 1.8,
    date: "2023-02-20T10:35:22Z",
    from: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
    to: "0xYourAddress",
    contractAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  },
  {
    id: "tx6",
    type: "mint",
    nftName: "WTFApe #142",
    nftCollection: "WTFApe",
    nftImage: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/142",
    tokenId: "142",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 0.1,
    date: "2023-02-15T16:28:30Z",
    from: "0x0000000000000000000000000000000000000000",
    to: "0xYourAddress",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "tx7",
    type: "sale",
    nftName: "Cool Cat #321",
    nftCollection: "Cool Cats",
    nftImage: "ipfs://QmdTtQXUNuLYwX52r5KHUKm8taSv8eFhkj3iCmrLiUXS9k/321",
    tokenId: "321",
    metadataBaseUrl: "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 1.2,
    date: "2023-02-10T08:12:45Z",
    from: "0xYourAddress",
    to: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    contractAddress: "0x1A92f7381B9F03921564a437210bB9396471050C",
  },
];

/**
 * 查找NFT函數 - 用於在不同數組中查找NFT
 * @param {string} tokenId - NFT的tokenId
 * @param {string} collectionName - 可選的收藏名稱
 * @returns {Object|null} - 找到的NFT對象或null
 */
export const findNFTByTokenId = (tokenId, collectionName = null) => {
  // 首先在我的NFT中查找
  let foundNFT = myNFTs.find(
    (nft) =>
      nft.tokenId === tokenId &&
      (collectionName ? nft.collection === collectionName : true)
  );

  // 如果在我的NFT中未找到，則在市場NFT中查找
  if (!foundNFT) {
    foundNFT = marketNFTs.find(
      (nft) =>
        nft.tokenId === tokenId &&
        (collectionName ? nft.collection === collectionName : true)
    );
  }

  return foundNFT || null;
};

/**
 * 獲取所有可用的NFT收藏
 * @returns {Array<string>} 收藏名稱數組
 */
export const getAvailableCollections = () => {
  // 從我的NFT和市場NFT中提取所有唯一的收藏名稱
  const collections = new Set([
    ...myNFTs.map((nft) => nft.collection),
    ...marketNFTs.map((nft) => nft.collection),
  ]);

  return ["すべて", ...Array.from(collections)];
};

// 市场上列出的NFT
export const listedNFTs = [
  {
    tokenId: "123",
    name: "WTFape #123",
    collection: "WTFape コレクション",
    price: "0.55",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x1234567890123456789012345678901234567890",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    description: "A rare WTFape from the collection.",
    attributes: [
      { trait_type: "Background", value: "Blue" },
      { trait_type: "Eyes", value: "Laser" },
      { trait_type: "Mouth", value: "Grin" },
    ],
  },
];

// 交易记录数据
export const transactionHistory = [
  {
    id: "tx1",
    type: "purchase",
    nftName: "WTFape #123",
    collection: "WTFape コレクション",
    price: "0.55",
    date: "2023-12-15T08:30:00Z",
    from: "0x1234...7890",
    to: "0x9876...5432",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    txHash: "0xabcd...ef01",
  },
  {
    id: "tx2",
    type: "sale",
    nftName: "Doodle #567",
    collection: "Doodles Collection",
    price: "2.1",
    date: "2023-12-14T15:45:00Z",
    from: "0x9876...5432",
    to: "0x2468...1357",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    txHash: "0x2345...6789",
  },
  {
    id: "tx3",
    type: "mint",
    nftName: "WTFape #785",
    collection: "WTFape コレクション",
    price: "0.1",
    date: "2023-12-13T10:20:00Z",
    from: "0x0000...0000",
    to: "0x9876...5432",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    txHash: "0x3456...7890",
  },
  {
    id: "tx4",
    type: "transfer",
    nftName: "Cool Cat #789",
    collection: "Cool Cats",
    price: "0",
    date: "2023-12-12T18:05:00Z",
    from: "0x9876...5432",
    to: "0x5678...1234",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    txHash: "0x4567...8901",
  },
  {
    id: "tx5",
    type: "purchase",
    nftName: "Azuki #234",
    collection: "Azuki",
    price: "3.2",
    date: "2023-12-11T09:15:00Z",
    from: "0x1357...2468",
    to: "0x9876...5432",
    image: "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    txHash: "0x5678...9012",
  },
];
