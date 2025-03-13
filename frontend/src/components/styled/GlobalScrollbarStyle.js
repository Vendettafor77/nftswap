import { createGlobalStyle } from "styled-components";

/**
 * 全局滾動條樣式組件
 * 自定義原生滾動條，使其美觀且一致
 * 此組件已被設置為項目唯一的滾動條樣式定義源
 * @returns {React.Component} 全局樣式組件
 */
const GlobalScrollbarStyle = createGlobalStyle`
  /* 重置所有元素的滾動行為，確保只有 html 有滾動條 */
  * {
    scrollbar-width: none !important; /* 隱藏所有元素的Firefox滾動條 */
    -ms-overflow-style: none !important; /* 隱藏所有元素的IE滾動條 */
  }
  
  /* 隱藏所有元素的Webkit滾動條 */
  *::-webkit-scrollbar {
    display: none !important;
  }
  
  /* 只為 html 元素設置滾動條樣式 */
  html {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    scrollbar-width: thin !important; /* Firefox */
    scroll-behavior: smooth !important;
    scrollbar-color: rgba(100, 116, 139, 0.5) #1c2241 !important; /* Firefox滾動條顏色 */
  }
  
  body {
    overflow-x: hidden !important;
    min-height: 100vh !important; /* 確保至少有視窗高度 */
    padding-right: 0 !important; /* 防止內容偏移 */
    margin-right: 0 !important; /* 防止內容偏移 */
  }
  
  /* 只為 html 元素設置Webkit滾動條樣式 */
  html::-webkit-scrollbar {
    display: block !important;
    width: 6px !important;
    height: 6px !important;
    background-color: #1c2241 !important;
  }
  
  html::-webkit-scrollbar-track {
    background: #1c2241 !important;
    border-radius: 0 !important;
  }
  
  html::-webkit-scrollbar-thumb {
    background: rgba(100, 116, 139, 0.5) !important;
    border-radius: 3px !important;
  }
  
  html::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 116, 139, 0.7) !important;
  }
  
  /* 確保根元素和App容器正確處理滾動 */
  #root {
    overflow-x: hidden !important;
    overflow-y: hidden !important; /* 避免根元素出現滾動條 */
  }
  
  .App {
    width: 100% !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important; /* 避免App容器出現滾動條 */
  }
  
  /* 內容溢出時顯示省略號，而不是滾動條 */
  .content-container {
    width: 100% !important; /* 確保寬度佔滿 */
    box-sizing: border-box !important;
  }
`;

export default GlobalScrollbarStyle;
