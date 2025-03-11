import { createGlobalStyle } from "styled-components";
import { useFont } from "../../contexts/FontContext";

const BaseStyle = createGlobalStyle`
  ${(props) => props.fontImport}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    /* 計算滾動條寬度的CSS變量 */
    --scrollbar-width: calc(100vw - 100%);
    --scrollbar-compensation: calc(0px - var(--scrollbar-width));
  }

  html {
    background-color: ${(props) => props.theme.colors.background};
    /* 確保滾動條僅在需要時顯示 */
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.5) ${(props) => props.theme.colors.background};
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    font-family: ${(props) => props.fontFamily};
    min-height: 100vh;
    width: 100%;
    background-color: ${(props) => props.theme.colors.background};
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${(props) => props.fontFamily} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.theme.colors.text.primary};
    line-height: 1.6;
    font-feature-settings: "palt";
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.background} 0%,
      ${(props) => props.theme.colors.background}F2 100%
    );
    /* 確保滾動條只在頂層顯示 */
    overflow-x: hidden;
    width: 100%;
    padding: 0 !important;
    margin: 0 !important;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.background} 0%,
      ${(props) => props.theme.colors.background}F2 100%
    );
    /* 確保內部元素不產生額外滾動條 */
    overflow-y: visible;
    overflow-x: hidden;
    position: relative;
  }

  .App {
    flex: 1;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0 !important;
    margin: 0 !important;
    /* 保證內部元素不產生滾動條 */
    overflow-y: visible;
    overflow-x: hidden;
  }

  /* 滾動條只設置在頂層元素 */
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    display: block !important;
    background-color: #1c2241; /* 與導航欄背景一致 */
  }

  html::-webkit-scrollbar-track,
  body::-webkit-scrollbar-track {
    background: #1c2241; /* 與導航欄背景一致 */
    border-radius: 0;
  }

  html::-webkit-scrollbar-thumb,
  body::-webkit-scrollbar-thumb {
    background: rgba(100, 116, 139, 0.5);
    border-radius: 3px;
  }

  html::-webkit-scrollbar-thumb:hover,
  body::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 116, 139, 0.7);
  }

  /* 確保導航欄樣式正確 */
  .navbar-wrapper {
    width: 100% !important; /* 全寬 */
    left: 0;
    right: 0; /* 延伸到最右側 */
    top: 0;
    position: fixed;
    z-index: 999;
  }

  /* 確保全寬容器樣式正確 */
  .full-width-container {
    width: 100vw !important; /* 使用視口寬度確保覆蓋滾動條 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    padding: 0;
    z-index: 1000;
    overflow-x: hidden;
    box-sizing: border-box; /* 確保盒模型計算正確 */
  }

  h1, h2, h3, h4, h5, h6, p, span, div, button, input, select, textarea, a, label {
    font-family: ${(props) => props.fontFamily} !important;
  }

  .nav-text, .hero-text, .card-text, .search-text {
    font-family: ${(props) => props.fontFamily} !important;
  }

  /* 確保 Navbar 文字使用正確字體 */
  nav *, .navbar * {
    font-family: ${(props) => props.fontFamily} !important;
  }

  /* 確保卡片文字使用正確字體 */
  .nft-card *, .card * {
    font-family: ${(props) => props.fontFamily} !important;
  }

  /* 確保搜索欄使用正確字體 */
  input[type="search"]:not(.search-input), input[type="text"]:not(.search-input), select {
    font-family: ${(props) => props.fontFamily} !important;
  }

  /* 專門為搜索輸入框設置樣式 */
  .search-input {
    font-family: ${(props) => props.fontFamily} !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    background: rgba(30, 36, 68, 0.6) !important;
  }

  button, input:not(.search-input), select, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* 內容容器全局樣式 */
  .content-container {
    width: 100%;
    box-sizing: border-box;
    padding-right: calc(${(props) => props.theme.spacing.md} + 6px);
  }
`;

const GlobalStyle = () => {
  const { currentFont, fontOptions } = useFont();
  const font = fontOptions[currentFont];

  return <BaseStyle fontFamily={font.family} fontImport={font.import} />;
};

export default GlobalStyle;
