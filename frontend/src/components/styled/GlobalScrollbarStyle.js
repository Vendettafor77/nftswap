import { createGlobalStyle } from "styled-components";

/**
 * 全局滾動條樣式組件
 * 隱藏原生滾動條，但保留滾動功能
 */
const GlobalScrollbarStyle = createGlobalStyle`
  /* 隱藏原生滾動條但保留功能 */
  html {
    overflow-y: scroll !important;
    scrollbar-width: none !important; /* Firefox */
    -ms-overflow-style: none !important; /* IE and Edge */
  }
  
  body {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    padding-right: 0 !important; /* 防止內容偏移 */
    min-height: 100vh !important; /* 確保至少有視窗高度 */
  }
  
  /* 隱藏Webkit瀏覽器的滾動條但保留功能 */
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
    background: transparent !important;
  }
  
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track {
    background: transparent !important;
    display: none !important;
  }
  
  /* 確保根元素和App容器正確處理滾動 */
  #root {
    overflow-x: hidden !important;
  }
  
  .App {
    width: 100% !important;
    overflow-x: hidden !important;
    overflow-y: visible !important;
  }
`;

export default GlobalScrollbarStyle;
