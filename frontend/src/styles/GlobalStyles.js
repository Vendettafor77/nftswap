import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.background.main};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
  }
  
  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 15% 50%, rgba(42, 54, 95, 0.08) 0%, transparent 45%),
                radial-gradient(circle at 85% 30%, rgba(41, 51, 92, 0.08) 0%, transparent 45%);
    pointer-events: none;
    z-index: -1;
  }
  
  body::after {
    content: "";
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50%, rgba(25, 30, 58, 0.03) 0%, transparent 70%);
    opacity: 0.6;
    animation: gradientShift 20s linear infinite;
    pointer-events: none;
    z-index: -2;
  }
  
  @keyframes gradientShift {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-5%, 5%) scale(1.05);
    }
    100% {
      transform: translate(0, 0) scale(1);
    }
  }
  
  .particles-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
  }
  
  button, input, select, textarea {
    font-family: ${({ theme }) => theme.fonts.primary};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: ${({ theme }) => theme.animations.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  // 简化滚动条样式
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.light};
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(100, 116, 139, 0.5);
    border-radius: 3px;
    &:hover {
      background: rgba(100, 116, 139, 0.7);
    }
  }
  
  // 动态页面背景
  .App {
    position: relative;
    min-height: 100vh;
  }
  
  .page-transition-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .page-transition-exit {
    opacity: 1;
    transform: translateY(0);
  }
  
  .page-transition-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s, transform 0.3s;
  }
`;

export default GlobalStyles;
