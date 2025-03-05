import { createGlobalStyle } from "styled-components";
import { useFont } from "../../contexts/FontContext";

const BaseStyle = createGlobalStyle`
  ${(props) => props.fontImport}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    background-color: ${(props) => props.theme.colors.background};
  }

  html, body, #root, .App {
    font-family: ${(props) => props.fontFamily};
    min-height: 100vh;
    background-color: ${(props) => props.theme.colors.background};
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
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.background} 0%,
      ${(props) => props.theme.colors.background}F2 100%
    );
  }

  .App {
    flex: 1;
    position: relative;
    z-index: 1;
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
  input[type="search"], input[type="text"], select {
    font-family: ${(props) => props.fontFamily} !important;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const GlobalStyle = () => {
  const { currentFont, fontOptions } = useFont();
  const font = fontOptions[currentFont];

  return <BaseStyle fontFamily={font.family} fontImport={font.import} />;
};

export default GlobalStyle;
