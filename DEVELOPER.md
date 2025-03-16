# NFT交易平台

一個基於以太坊區塊鏈的NFT（非同質化代幣）交易平台，支持NFT的鑄造、上架、購買、撤回和轉移等功能。

## 當前開發狀態

**重要說明：** 本項目目前處於開發階段，主要進展如下：

- ✅ **合約開發**：智能合約已完成開發和測試
- ✅ **中間層構建**：ethers v6中間層、合約函數封裝和IPFS集成已完成
- ✅ **消息系統**：交易監聽與通知系統架構已完成
- ⏳ **前端整合**：正在進行前端UI與中間層的整合工作
- ⏳ **新功能開發**：批量操作、高級篩選等功能待開發

**注意**：目前前端UI大部分使用模擬數據進行展示，尚未與實際區塊鏈交互。後續開發將專注於將中間層功能整合到前端UI組件中。

詳細的開發計劃和進度請參見[任務清單](TASKS.md)。

## 目錄 

- [用戶操作指南](#用戶操作指南)
  - [連接錢包](#連接錢包)
  - [瀏覽和購買NFT](#瀏覽和購買nft)
  - [搜索和過濾NFT](#搜索和過濾nft)
  - [鑄造VenAPE NFT](#鑄造venape-nft)
  - [管理我的NFT](#管理我的nft)
  - [上架NFT出售](#上架nft出售)
  - [撤回上架的NFT](#撤回上架的nft)
  - [轉移NFT](#轉移nft)
  - [查看交易記錄](#查看交易記錄)
- [開發者文檔](#開發者文檔)
  - [項目結構](#項目結構)
  - [前端組件](#前端組件)
  - [主要頁面](#主要頁面)
  - [合約交互中間層](#合約交互中間層)
  - [狀態管理與Hooks](#狀態管理與hooks)
  - [工具函數](#工具函數)
  - [智能合約](#智能合約)
  - [樣式系統](#樣式系統)
  - [開發和部署](#開發和部署)
  - [下一步開發計劃](#下一步開發計劃)

---

# 用戶操作指南

## 連接錢包

1. 進入網站後，點擊右上角的「錢包連接」按鈕
2. 選擇您喜歡的錢包提供商（如MetaMask、WalletConnect）
3. 按照錢包提示完成授權連接
4. 連接成功後，右上角會顯示您的錢包地址簡寫和ETH餘額

## 瀏覽和購買NFT

1. 在主頁的「NFTを閲覧・購入」標籤可以瀏覽所有上架的NFT
2. 每個NFT卡片顯示圖片、名稱、收藏集名稱和價格
3. 點擊NFT卡片上的「購入する」按鈕可以購買該NFT
4. 確認交易信息，包括支付的ETH數量
5. 在錢包中核對交易詳情並確認
6. 交易提交後會顯示處理狀態（待處理→確認中→購入成功/失敗）
7. 購買成功後，NFT將顯示在「我的NFT」頁面中

## 搜索和過濾NFT

1. 在頁面頂部的搜索欄輸入關鍵詞可即時搜索NFT名稱
2. 使用「すべてのコレクション」下拉菜單選擇特定的NFT收藏集
3. 使用排序選項「最新順」、「価格（安い順）」、「価格（高い順）」對NFT進行排序
4. 使用價格範圍選擇器設置最低和最高價格過濾
5. 根據NFT屬性進行高級篩選
6. 搜索和過濾選項會即時更新顯示結果

## 鑄造VenAPE NFT

1. 點擊導航欄中的"Mint VenAPE"
2. 在鑄造頁面中，輸入您想鑄造的VenAPE ID（0-9999）
3. 點擊"ミント"按鈕
4. 確認交易詳情
5. 在您的錢包中確認交易
6. 等待交易確認
7. 交易確認後，您將看到成功消息
8. 鑄造完成後，新的VenAPE NFT將添加到您的NFT列表中

## 管理我的NFT

1. 點擊頂部導航欄的「我的NFT」進入管理頁面
2. 查看您擁有的所有NFT，包括已購買和已鑄造的
3. 使用搜索框和過濾器找到特定NFT
4. 每個NFT卡片底部的操作按鈕提供管理選項（上架、轉移等）
5. 使用批量選擇功能，同時管理多個NFT

## 上架NFT出售

1. 在主頁切換到「NFTを出品する」標籤
2. 從您的NFT列表中選擇要出售的NFT（點擊「選択する」按鈕）
3. 在右側表單中設置出售價格（以ETH為單位）
4. 點擊「マーケットに出品する」（上架到市場）按鈕
5. 首次上架需要先授權合約操作您的NFT，確認授權交易
6. 然後確認上架交易
7. 系統會顯示上架狀態（處理中→確認中→上架成功/失敗）
8. 交易確認後，您的NFT將顯示在市場上

## 撤回上架的NFT

1. 在「我的NFT」頁面找到已上架的NFT
2. 點擊操作按鈕，選擇「撤回」選項
3. 確認撤回交易
4. 系統會顯示撤回狀態（處理中→確認中→撤回成功/失敗）
5. 交易確認後，NFT將從市場撤回並返回您的NFT列表

## 轉移NFT

1. 在「我的NFT」頁面找到要轉移的NFT
2. 點擊操作按鈕，選擇「轉移」選項
3. 在彈出的轉移窗口中，輸入接收者的以太坊地址
4. 確認轉移操作
5. 在錢包中確認交易
6. 系統會顯示轉移狀態（處理中→確認中→轉移成功/失敗）
7. 交易確認後，NFT將從您的列表中移除並轉移給接收者

## 查看交易記錄

1. 點擊頂部導航欄的「取引履歴」進入交易記錄頁面
2. 查看您的所有NFT交易歷史，包括購買、銷售、鑄造和轉移記錄
3. 每條交易記錄顯示NFT圖片、名稱、交易類型、價格和日期
4. 使用搜索欄根據NFT名稱搜索特定交易
5. 使用交易類型過濾器（すべての取引、購入、販売、鋳造、転送）篩選特定類型的交易
6. 使用排序選項（最新順、価格（高い順）、価格（安い順））對交易記錄進行排序
7. 點擊交易記錄可查看詳細信息，包括區塊鏈瀏覽器鏈接

---

# 開發者文檔

## 項目結構

```
frontend/
├── public/           # 靜態資源
├── src/              # 源代碼
│   ├── abis/         # 合約ABI文件
│   ├── components/   # 可復用組件
│   ├── contexts/     # React上下文
│   ├── hooks/        # 自定義hooks
│   ├── data/         # 模擬數據
│   ├── pages/        # 頁面組件
│   │   ├── Home/     # 主頁（市場和出品）
│   │   ├── MyNFTs/   # 我的NFT頁面
│   │   ├── MintVenAPE/ # 鑄造頁面
│   │   └── TransactionHistory/ # 交易記錄頁面
│   ├── styles/       # 全局樣式
│   ├── theme/        # 主題配置
│   ├── utils/        # 工具函數
│   │   ├── contractUtils.js     # 合約通用工具
│   │   ├── nftSwap.js           # NFTSwap合約中間層
│   │   ├── nftSwapFunctions.js  # NFTSwap函數封裝
│   │   ├── venApeFunctions.js   # VenAPE函數封裝
│   │   ├── ipfsUtils.js         # IPFS交互工具
│   │   └── ipfsUploadUtils.js   # IPFS上傳工具
│   ├── App.js        # 應用主組件
│   ├── index.js      # 入口文件
│   └── routes.js     # 路由配置
contracts/            # 智能合約
├── NFTSwap.sol       # 交易合約
├── VenAPE.sol        # NFT合約
└── ...               # 其他輔助合約
```

## 前端組件

### 核心組件

- **NFTCard** (`components/NFTCard/NFTCard.js`): 顯示NFT信息的卡片組件，支持狀態顯示和自定義操作按鈕
- **NFTGrid** (`components/NFTGrid/NFTGrid.js`): 以響應式網格布局展示NFT卡片的組件，支持空狀態顯示
- **FilterBar** (`components/Filters/FilterBar.js`): 通用過濾和搜索組件，支持自定義過濾器配置
- **StatusMessage** (`components/styled/StatusMessage.js`): 狀態信息提示組件，用於顯示操作成功或失敗
- **Button** (`components/styled/Button.js`): 包含主要按鈕(PrimaryButton)、輪廓按鈕(OutlineButton)和次要按鈕(SecondaryButton)樣式
- **TransactionCard** (`pages/TransactionHistory/components/TransactionCard.js`): 顯示交易記錄的卡片組件
- **IPFSImage** (`components/IPFSImage/IPFSImage.js`): 專門用於顯示IPFS圖片的組件，支持多種IPFS URL格式，自動轉換為HTTP URL並處理加載狀態
- **NFTMetadata** (`components/NFTMetadata/NFTMetadata.js`): 顯示NFT元數據的組件，包括圖片和屬性，支持從IPFS URL獲取元數據
- **BatchOperationsBar** (`components/BatchOperations/BatchOperationsBar.js`): 批量操作工具欄，用於多選NFT進行批量操作

### 樣式組件

- **GlobalStyle** (`components/styled/GlobalStyle.js`): 全局樣式設置
- **HeroSection** (`components/styled/index.js`): 頁面主要區塊樣式
- **SectionTitle** (`components/styled/SectionTitle.js`): 標題樣式組件
- **CustomSelect** (`components/CustomSelect/CustomSelect.js`): 自定義下拉選擇器組件

## 主要頁面

### Home.js (`pages/Home/Home.js`)

主頁面，包含兩個標籤：

- **NFTを閲覧・購入**: 展示所有上架的NFT，支持搜索、過濾和排序
- **NFTを出品する**: 上架自己的NFT

**主要函數**:

- `renderSidebarContent()`: 根據當前標籤渲染側邊欄內容
- `handleBuy(nft)`: 處理NFT購買流程及狀態更新
- `filteredNFTs`: 基於搜索、過濾和排序條件處理NFT顯示

### MyNFTs.js (`pages/MyNFTs/MyNFTs.js`)

用戶NFT管理頁面，展示用戶所有NFT並提供操作選項。

**主要函數**:

- `fetchUserNFTs()`: 獲取用戶擁有的NFT
- `handleNFTAction(nft)`: 處理NFT操作選擇
- `handleListNFT(nft)`: 處理NFT上架
- `handleTransfer(nft)`: 處理NFT轉移
- `handleSendNFT(nft)`: 處理NFT發送
- `handleBatchOperation(operation)`: 處理批量NFT操作

### MintVenAPE.js (`pages/MintVenAPE/MintVenAPE.js`)

VenAPE NFT鑄造頁面，允許用戶選擇ID並鑄造NFT。

**主要函數**:

- `handleTokenIdChange(e)`: 處理代幣ID輸入變更
- `handleMint()`: 處理NFT鑄造邏輯
- `handleRandomPreview()`: 生成隨機ID預覽
- `handlePrevious()/handleNext()`: 切換ID上一個/下一個

### TransactionHistory.js (`pages/TransactionHistory/TransactionHistory.js`)

交易記錄頁面，展示用戶所有NFT相關交易。

**主要函數**:

- `updateSearchTerm()`: 處理搜索詞變更
- `updateTypeFilter()`: 處理交易類型過濾變更
- `updateSortBy()`: 處理排序變更
- `filteredTransactions`: 基於搜索、過濾和排序條件處理交易記錄

## 合約交互中間層

### contractUtils.js (`utils/contractUtils.js`)

合約交互基礎工具，提供共用功能。

**主要函數**:

- `getProvider()`: 獲取ethers v6 Provider實例
- `getSigner()`: 獲取當前連接錢包的Signer實例
- `getContract(address, abi)`: 獲取指定合約實例
- `handleContractError(error)`: 統一處理合約交互錯誤
- `formatContractAmount(amount)`: 格式化合約金額（wei與eth的轉換）
- `listenForTransaction(tx)`: 監聽交易狀態並提供回調
- `listenForContractEvent(contract, eventName, callback)`: 監聽合約事件

### nftSwap.js (`utils/nftSwap.js`)

NFTSwap 合約的中間層，提供與合約交互的函數。

**主要函數**:

- `getNFTSwapContract()`: 獲取NFTSwap合約實例
- `getVenApeContract()`: 獲取VenAPE合約實例
- `mintVenApe(to, tokenId, options = {})`: 鑄造VenAPE NFT

### nftSwapFunctions.js (`utils/nftSwapFunctions.js`)

NFTSwap合約函數的高級封裝，提供更豐富的功能。

**主要函數**:

- `listNFTWithMetadata(nftAddr, tokenId, price, metadata)`: 上架NFT並關聯元數據
- `getNFTDetails(nftAddr, tokenId)`: 獲取NFT詳細信息
- `getUserListedNFTs(userAddress)`: 獲取用戶上架的NFT
- `getUserPurchasedNFTs(userAddress)`: 獲取用戶購買的NFT
- `getUserTransactions(userAddress, type)`: 獲取用戶交易記錄

### venApeFunctions.js (`utils/venApeFunctions.js`)

VenAPE函數封裝。

**主要函數**:

- `getVenApeContract()`: 獲取VenAPE合約實例
- `mintVenApe(to, tokenId, options = {})`: 鑄造VenAPE NFT

## 狀態管理與Hooks

### WalletContext (`contexts/WalletContext.js`)

管理錢包連接狀態和用戶信息。

**主要函數和狀態**:

- `account`: 當前連接的錢包地址
- `balance`: 當前錢包ETH餘額
- `connectWallet()`: 連接錢包
- `disconnectWallet()`: 斷開錢包連接
- `isConnected`: 錢包連接狀態

### TransactionContext (`contexts/TransactionContext.js`)

管理交易狀態和歷史。

**主要函數和狀態**:

- `addTransaction(tx)`: 添加新交易到跟蹤列表
- `transactions`: 所有交易記錄
- `isPending(txHash)`: 檢查交易是否待處理
- `getTransactionStatus(txHash)`: 獲取交易狀態

### useContract (`hooks/useContract.js`)

合約交互Hook。

**主要函數**:

- `useNftSwapContract()`: 使用NFTSwap合約
- `useVenApeContract()`: 使用VenAPE合約
- `useContractFunction(contract, functionName)`: 創建合約函數調用包裝

### useTransactionStatus (`hooks/useTransactionStatus.js`)

交易狀態跟蹤Hook。

**主要函數**:

- `useTransactionStatus(txHash)`: 跟蹤交易狀態
- `usePendingTransactions()`: 獲取所有待處理交易

### useContractEvent (`hooks/useContractEvent.js`)

合約事件監聽Hook。

**主要函數**:

- `useContractEvent(contract, eventName, callback)`: 監聽合約事件

## 工具函數

### ipfsUtils.js (`utils/ipfsUtils.js`)

IPFS相關工具函數，用於處理IPFS地址和元數據。

**主要函數**:

- `getHttpUrl(ipfsUrl, gateway)`: 將IPFS URL轉換為HTTP URL
- `getImageFromMetadata(metadata, gateway)`: 從NFT元數據中提取圖片URL並轉換為HTTP URL
- `getMetadataUrl(baseUrl, tokenId, gateway)`: 獲取NFT元數據URL
- `fetchMetadata(url)`: 獲取NFT元數據內容

### ipfsUploadUtils.js (`utils/ipfsUploadUtils.js`)

IPFS文件上傳工具。

**主要函數**:

- `uploadFile(file)`: 上傳文件到IPFS
- `uploadJSON(json)`: 上傳JSON數據到IPFS
- `uploadImage(image)`: 上傳圖片到IPFS
- `generateMetadata(name, description, image, attributes)`: 生成NFT元數據
- `uploadMetadata(metadata)`: 上傳元數據到IPFS

### dateUtils.js (`utils/dateUtils.js`)

日期處理工具函數。

**主要函數**:

- `formatDate(dateString)`: 將ISO日期字符串格式化為可讀形式（日本格式）
- `formatTransactionDate(timestamp)`: 格式化交易時間戳
- `getRelativeTime(timestamp)`: 獲取相對時間（如"5分鐘前"）

## 智能合約

### NFTSwap.sol

NFT交易市場合約，處理NFT的上架、購買、撤回和價格更新。

**主要函數**:

- `list(address _nftAddr, uint256 _tokenId, uint256 _price)`: 上架NFT，將NFT轉入合約
- `purchase(address _nftAddr, uint256 _tokenId)`: 購買NFT，支付ETH並將NFT轉移給買家
- `revoke(address _nftAddr, uint256 _tokenId)`: 撤回上架的NFT，將NFT歸還賣家
- `update(address _nftAddr, uint256 _tokenId, uint256 _newPrice)`: 更新NFT價格
- `getListedNFTs(address _nftAddr)`: 獲取指定合約地址上架的所有NFT

**主要事件**:

- `List(address indexed seller, address indexed nftAddr, uint256 tokenId, uint256 price)`: NFT上架事件
- `Purchase(address indexed buyer, address indexed seller, address indexed nftAddr, uint256 tokenId, uint256 price)`: NFT購買事件
- `Revoke(address indexed seller, address indexed nftAddr, uint256 tokenId)`: NFT撤回事件
- `Update(address indexed seller, address indexed nftAddr, uint256 tokenId, uint256 newPrice)`: NFT價格更新事件

### VenAPE.sol

VenAPE NFT合約，繼承自ERC721標準，允許鑄造和管理VenAPE NFT。

**主要功能**：

- `mint(address to, uint256 tokenId)`: 鑄造新的VenAPE NFT，tokenId範圍為0-9999

## 樣式系統

使用styled-components實現，主題配置在`theme.js`中定義。包括：

- 顏色系統（主色、背景色、表面色、文本色）
- 間距規範（xs、sm、md、lg、xl）
- 陰影效果（small、medium、large）
- 邊框半徑（small、medium、large）
- 響應式斷點（針對不同屏幕尺寸優化）

## 開發和部署

### 本地開發

1. 安裝依賴: `npm install`
2. 啟動前端: `npm start`
3. 編譯合約: `npx hardhat compile`
4. 測試合約: `npx hardhat test`

### 部署

1. **合約部署**

   - 使用Hardhat部署合約：`npx hardhat run scripts/deploy.js --network <network>`
   - 記錄部署的合約地址

2. **前端配置**

   - 在`frontend/.env`文件中設置合約地址
   - 在`utils/nftSwap.js`中更新nftSwapAddress和venApeAddress
   - 確保ABI文件與合約匹配

3. **前端部署**
   - 運行`npm run build`生成靜態文件
   - 將生成的`build`文件夾部署到您的Web服務器

### 環境配置

配置文件位於:

- `.env.development`: 開發環境配置
- `.env.production`: 生產環境配置

主要配置項:

- `REACT_APP_NFT_SWAP_ADDRESS`: NFTSwap合約地址
- `REACT_APP_VEN_APE_ADDRESS`: VenAPE合約地址
- `REACT_APP_IPFS_GATEWAY`: 首選IPFS網關URL
- `REACT_APP_CHAIN_ID`: 目標區塊鏈網絡ID

## 下一步開發計劃

### 前端整合方案

我們即將進行的主要工作是將已完成的中間層功能整合到前端UI組件中。整合將按照以下步驟進行：

1. **NFT瀏覽與購買功能**

   - 在`Home.js`中整合`useNFTSwapContract`和`nftSwapFunctions`
   - 替換模擬的購買邏輯，實現真實的區塊鏈交互

   ```jsx
   // 示例代碼
   import { useNFTSwapContract } from "../hooks/useContract";

   const Home = () => {
     const { contract, purchaseNFT } = useNFTSwapContract();

     const handleBuy = async (nft) => {
       try {
         const result = await purchaseNFT(
           nft.contractAddress,
           nft.tokenId,
           nft.price
         );
         // 處理交易結果...
       } catch (error) {
         // 錯誤處理...
       }
     };

     // 組件其餘部分...
   };
   ```

2. **NFT上架功能**

   - 整合`ListNFTForm.js`中的上架邏輯
   - 添加NFT授權檢查和處理
   - 完整的上架狀態顯示

3. **我的NFT管理功能**
   - 從區塊鏈獲取用戶NFT數據
   - 實現NFT撤回、轉移和價格更新等功能

### 代碼貢獻指南

如果您想參與開發，請按照以下步驟：

1. Fork 此倉庫
2. 創建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打開一個 Pull Request

請確保您的代碼遵循項目的代碼風格，並且所有測試都能通過。

### 整合測試計劃

在完成每個功能的整合後，我們將進行以下測試：

1. **功能測試**：確保每個功能按預期工作
2. **UI交互測試**：確保用戶體驗流暢
3. **錯誤處理測試**：測試各種錯誤情況的處理
4. **性能測試**：確保應用在各種條件下都能維持良好性能

測試將在本地環境和測試網絡上進行，以確保功能在部署前的穩定性。

## 開發者信息

如有任何問題或建議，請通過以下方式聯繫我們：

- Email: example@example.com
- GitHub: [項目問題頁面](https://github.com/yourusername/nftSwap/issues)

## 授權許可

本項目基於MIT許可證開源。
