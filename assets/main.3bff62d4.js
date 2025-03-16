(()=>{"use strict";var e,t,r,i,n,a={2632:(e,t,r)=>{var i=r(9950),n=r(1352),a=r(4752),o=r(2074);const s={colors:{background:"#0A0F1F",surface:"#1C2241",primary:"#6A11CB",secondary:"#2575FC",accent:"#8E54E9",text:{primary:"#FFFFFF",secondary:"#B6B9C5"},success:"#4CAF50",error:"#F44336"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},shadows:{small:"0 2px 4px rgba(0, 0, 0, 0.1)",medium:"0 4px 8px rgba(0, 0, 0, 0.1)",large:"0 8px 16px rgba(0, 0, 0, 0.1)"}};var d=r(4414);const l={mPlusRounded:{name:"M PLUS Rounded 1c",label:"M PLUS Rounded 1c",import:'@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap")',family:"'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif"}},c=(0,i.createContext)(),m=e=>{let{children:t}=e;const[r,n]=(0,i.useState)("mPlusRounded"),a={currentFont:r,setCurrentFont:n,fontOptions:l,currentFontFamily:l[r].family};return(0,d.jsx)(c.Provider,{value:a,children:t})},p=a.DU`
  ${e=>e.fontImport}

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
    background-color: ${e=>e.theme.colors.background};
    /* 移除限制滾動條的設置，讓GlobalScrollbarStyle接管 */
    width: 100%;
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.5) ${e=>e.theme.colors.background};
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    font-family: ${e=>e.fontFamily};
    min-height: 100vh;
    width: 100%;
    background-color: ${e=>e.theme.colors.background};
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${e=>e.fontFamily} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${e=>e.theme.colors.text.primary};
    line-height: 1.6;
    font-feature-settings: "palt";
    background: linear-gradient(
      135deg,
      ${e=>e.theme.colors.background} 0%,
      ${e=>e.theme.colors.background}F2 100%
    );
    /* 允許滾動，但保留其他樣式 */
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
      ${e=>e.theme.colors.background} 0%,
      ${e=>e.theme.colors.background}F2 100%
    );
    /* 不限制垂直滾動 */
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
    /* 確保App允許內容延伸 */
    overflow-y: visible !important;
    overflow-x: hidden;
  }

  /* 移除滾動條樣式相關代碼，由GlobalScrollbarStyle處理 */

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
    font-family: ${e=>e.fontFamily} !important;
  }

  .nav-text, .hero-text, .card-text, .search-text {
    font-family: ${e=>e.fontFamily} !important;
  }

  /* 確保 Navbar 文字使用正確字體 */
  nav *, .navbar * {
    font-family: ${e=>e.fontFamily} !important;
  }

  /* 確保卡片文字使用正確字體 */
  .nft-card *, .card * {
    font-family: ${e=>e.fontFamily} !important;
  }

  /* 確保搜索欄使用正確字體 */
  input[type="search"]:not(.search-input), input[type="text"]:not(.search-input), select {
    font-family: ${e=>e.fontFamily} !important;
  }

  /* 專門為搜索輸入框設置樣式 */
  .search-input {
    font-family: ${e=>e.fontFamily} !important;
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
    padding-right: calc(${e=>e.theme.spacing.md} + 6px);
  }
`,h=()=>{const{currentFont:e,fontOptions:t}=(()=>{const e=(0,i.useContext)(c);if(void 0===e)throw new Error("useFont must be used within a FontProvider");return e})(),r=t[e];return(0,d.jsx)(p,{fontFamily:r.family,fontImport:r.import})},g=a.DU`
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
`;var x=r(8429);const u=(0,i.createContext)({animationType:"pulse",animationsEnabled:!0,setAnimationType:()=>{},setAnimationsEnabled:()=>{},performanceMode:!1,setPerformanceMode:()=>{}}),f=e=>{let{children:t}=e;const[r,n]=(0,i.useState)("pulse"),[a,o]=(0,i.useState)(!0),[s,l]=(0,i.useState)(!1);(0,i.useEffect)((()=>{/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(l(!0),o(!1)),"deviceMemory"in navigator&&navigator.deviceMemory<4&&(l(!0),o(!1))}),[]);const c={animationType:r,setAnimationType:n,animationsEnabled:a,setAnimationsEnabled:o,performanceMode:s,setPerformanceMode:l};return(0,d.jsx)(u.Provider,{value:c,children:t})},b=a.AH`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  width: ${e=>e.$fullWidth?"100%":"auto"};
  height: 45px;
  font-size: 0.95rem;
  margin: 0;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
    box-shadow: none;

    &::before {
      display: none;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,w=a.Ay.button`
  ${b}
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #6a11cb88, #2575fc88);
  }
`,y=(a.Ay.button`
  ${b}
  background: linear-gradient(45deg, #2575fc, #6a11cb);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #2575fc88, #6a11cb88);
  }
`,a.Ay.button`
  ${b}
  background: ${e=>e.$active||e.$gradient?"linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)":"prev"===e.$direction?"linear-gradient(45deg, #2575fc44, #6a11cb44)":"linear-gradient(45deg, #6a11cb44, #2575fc44)"};
  color: ${e=>e.$active||e.$gradient?"white":e.theme.colors.text.primary};
  border: ${e=>e.$active||e.$gradient?"none":"1px solid "+("prev"===e.$direction?"#2575fc33":"#6a11cb33")};

  &:hover {
    background: ${e=>e.$active||e.$gradient?"linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)":"prev"===e.$direction?"linear-gradient(45deg, #2575fc66, #6a11cb66)":"linear-gradient(45deg, #6a11cb66, #2575fc66)"};
    box-shadow: ${e=>e.$active||e.$gradient?"0 5px 15px rgba(106, 17, 203, 0.3)":"none"};
  }
`),v=(a.Ay.button`
  ${b}
  background: transparent;
  color: ${e=>e.theme.colors.text.primary};
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`,a.Ay.button`
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  font-size: 1rem;
  font-weight: 600;
  color: ${e=>e.$active?e.theme.colors.text.primary:e.theme.colors.text.secondary};
  background: ${e=>e.$active?e.theme.colors.surface:"transparent"};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 ${e=>e.theme.spacing.sm};

  &:hover {
    background: ${e=>e.theme.colors.surface};
    color: ${e=>e.theme.colors.text.primary};
  }
`,a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${e=>e.theme.spacing.md} 0;
  gap: ${e=>e.theme.spacing.sm};
`,a.i7`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`),j=a.i7`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,$=a.Ay.div`
  position: relative;
  margin-top: ${e=>{var t,r;return e.centered?"1rem":(null===(t=e.theme)||void 0===t||null===(r=t.spacing)||void 0===r?void 0:r.xl)||"2rem"}};
  padding: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.spacing)||void 0===r?void 0:r.lg)||"1.25rem"}};
  border-radius: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.borderRadius)||void 0===r?void 0:r.large)||"12px"}};
  background: ${e=>e.success?"linear-gradient(145deg, \n          rgba(76, 175, 80, 0.08),\n          rgba(106, 17, 203, 0.08)\n        )":"linear-gradient(145deg, \n          rgba(244, 67, 54, 0.08),\n          rgba(106, 17, 203, 0.08)\n        )"};
  color: ${e=>{var t,r,i,n;return e.success?(null===(t=e.theme)||void 0===t||null===(r=t.colors)||void 0===r?void 0:r.success)||"#4CAF50":(null===(i=e.theme)||void 0===i||null===(n=i.colors)||void 0===n?void 0:n.error)||"#F44336"}};
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-family: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.typography)||void 0===r?void 0:r.fontFamily)||"sans-serif"}};
  border: 2px solid
    ${e=>e.success?"rgba(76, 175, 80, 0.3)":"rgba(244, 67, 54, 0.3)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${e=>e.fadeOut?j:v} 0.4s ease-out
    ${e=>e.fadeOut?"forwards":""};
  max-width: ${e=>e.centered?"100%":"90%"};
  margin-left: ${e=>e.centered?"0":"auto"};
  margin-right: ${e=>e.centered?"0":"auto"};
  transform-origin: center top;
  align-self: ${e=>e.alignSelf||"auto"};
  width: ${e=>e.fullWidth?"100%":"auto"};

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid
      ${e=>e.success?"rgba(76, 175, 80, 0.3)":"rgba(244, 67, 54, 0.3)"};
    display: ${e=>e.noArrow?"none":"block"};
  }

  &::after {
    content: "${e=>e.success?"✓":"!"}";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: ${e=>e.success?"rgba(76, 175, 80, 1)":"rgba(244, 67, 54, 1)"};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`,T=e=>{let{children:t,id:r,fontSize:i="1.1rem",height:n="26",maxWidth:a="100%",centered:o=!1,startColor:s="#6a11cb",endColor:l="#2575fc",className:c,style:m={},letterSpacing:p="0.01em",fontWeight:h="600",marginBottom:g="0"}=e;const x=r?`gradient-${r}`:`gradient-${Math.random().toString(36).substring(7)}`;return(0,d.jsxs)("svg",{width:"100%",height:n,style:{maxWidth:a,overflow:"visible",filter:"drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",marginBottom:g,...m},className:c,children:[(0,d.jsx)("defs",{children:(0,d.jsxs)("linearGradient",{id:x,x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:s}),(0,d.jsx)("stop",{offset:"100%",stopColor:l})]})}),(0,d.jsx)("text",{x:o?"50%":"0",y:"2.5rem"===i?"45":"1.8rem"===i?"30":"1.5rem"===i?"25":"1.2rem"===i?"20":"18",fill:`url(#${x})`,fontWeight:h,fontSize:i,fontFamily:"inherit",letterSpacing:p,textAnchor:o?"middle":"start",dominantBaseline:"middle",style:{fontFamily:"inherit",textRendering:"optimizeLegibility",shapeRendering:"geometricPrecision",opacity:"0.95"},children:t})]})};var E=r(7956);const A="/グレーちゃん.jpeg",C=a.Ay.div`
  position: relative;
  width: ${e=>e.$width||"100%"};
  height: ${e=>e.$height||"auto"};
  overflow: hidden;
  border-radius: ${e=>e.$borderRadius||e.theme.borderRadius.medium};
  background-color: ${e=>e.$backgroundColor||"rgba(0, 0, 0, 0.05)"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
`,k=a.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: ${e=>e.$objectFit||"cover"};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: ${e=>e.$isLoaded?1:0};
  border-radius: inherit; /* 繼承容器的圓角 */
  display: block; /* 確保圖片是塊級元素，避免底部間隙 */
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  position: absolute; /* 確保圖片絕對定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: inherit; /* 繼承背景色 */

  ${e=>e.$hoverEffect&&"\n    &:hover {\n      transform: scale(1.05);\n    }\n  "}
`,S=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.8rem;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid ${e=>e.theme.colors.primary};
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`,N=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white; /* 文字填充顏色 */
  font-size: 1rem;
  padding: 10px;
  text-align: center;
  z-index: 3;
  font-weight: 600;
  border-radius: inherit; /* 繼承容器的圓角 */

  /* 紫色邊框（通過 text-shadow 實現） */
  text-shadow:
    -1px -1px 0 rgb(157, 96, 214),
    1px -1px 0 rgb(157, 96, 214),
    -1px 1px 0 rgb(157, 96, 214),
    1px 1px 0 rgb(157, 96, 214);

  /* 添加淡入動畫，避免閃現 */
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.5s; /* 延遲顯示錯誤信息 */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,I=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit; /* 繼承容器的圓角 */
  overflow: hidden; /* 確保內容不會溢出圓角 */
  display: flex;
  justify-content: center;
  align-items: center;
`,R=e=>{let{src:t,alt:r,gateway:n=E.El,width:a,height:o,objectFit:s,hoverEffect:l,borderRadius:c,className:m,backgroundColor:p,errorText:h="画像を読み込めません",fallbackImage:g=A,...x}=e;const[u,f]=(0,i.useState)(!1),[b,w]=(0,i.useState)(!1),[y,v]=(0,i.useState)(""),[j,$]=(0,i.useState)(0),[T,R]=(0,i.useState)(-1),[z,L]=(0,i.useState)(!1),[O,_]=(0,i.useState)(!0),[F,P]=(0,i.useState)(!1),[W,M]=(0,i.useState)(null),D=E.Uo.length;(0,i.useEffect)((()=>{if(!t)return w(!0),L(!0),_(!1),void setTimeout((()=>P(!0)),800);if(t===W)return;let e=!0;w(!1),$(0),R(-1),L(!1),_(!0),P(!1);const r=setTimeout((()=>{e&&!b&&O&&U()}),8e3);return B(t,n),()=>{e=!1,clearTimeout(r)}}),[t,n]);const B=(e,t)=>{try{if(!e)return void U();if(e.startsWith("http"))return void v(e);if(e.startsWith("/"))return void v(e);const r=(0,E.getHttpUrl)(e,t);if(!r)return void U();const i=`${r.includes("?")?"&":"?"}cb=${Date.now()}`,n=r+i,a=new Image;a.onload=()=>{v(n)},a.onerror=()=>{U()},a.src=n}catch(e){U()}},U=()=>{if(j<2){$((e=>e+1));const e=`?cb=${Date.now()}`;v((t=>t.includes("?")?t:t+e))}else(()=>{const e=T+1;if(e<D){const r=E.Uo[e];R(e),$(0),B(t,r)}else _(!1),L(!0),w(!0),setTimeout((()=>P(!0)),800)})()};return(0,d.jsxs)(C,{$width:a,$height:o,$borderRadius:c,className:m,$backgroundColor:p,style:{margin:0,padding:0,border:"none",boxSizing:"border-box",overflow:"hidden",...x.style},children:[W&&!u&&!b&&(0,d.jsx)(k,{src:W.startsWith("http")?W:(0,E.getHttpUrl)(W,n),alt:`${r} (前回のイメージ)`,$isLoaded:!0,$objectFit:s,$hoverEffect:!1,style:{opacity:.3,zIndex:1}}),!b&&!z&&(0,d.jsx)(k,{src:y,alt:r,onLoad:()=>{M(t),f(!0),_(!1),w(!1),P(!1)},onError:()=>{t.startsWith("/")?v(t):(t.includes("ipfs://"),U())},$isLoaded:u,$objectFit:s,$hoverEffect:l,style:{zIndex:2,borderRadius:c||"inherit",backgroundColor:p||"inherit"}},`img-${T}-${j}`),z&&(0,d.jsxs)(I,{children:[(0,d.jsx)(k,{src:g,alt:`${r} (フォールバック画像)`,onLoad:()=>f(!0),$isLoaded:u,$objectFit:s,$hoverEffect:!1,style:{borderRadius:c||"inherit",backgroundColor:p||"inherit"}}),F&&(0,d.jsxs)(N,{children:[h,T>=0&&` (${D}個のゲートウェイを試しました)`]})]}),!u&&O&&(0,d.jsx)(S,{children:T>=0?`別のゲートウェイで試行中... (${T+1}/${D})`:j>0?`リトライ中... (${j}/2)`:""}),b&&!z&&!O&&F&&(0,d.jsxs)(N,{children:[h,T>=0&&` (${D}個のゲートウェイを試しました)`]})]})},z=R,L=(a.i7`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`,a.i7`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`),O=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  z-index: 4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: 500;
  letter-spacing: 0.02em;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: ${L} 1s ease-in-out infinite;
  }
`,_=a.AH`
  position: relative;
  /* 減少過渡動畫時間以降低GPU消耗 */
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  /* 移除hover時的動畫效果，降低GPU消耗 */
  &:hover::after {
    opacity: 0.3;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(131, 58, 180, 0.2),
      rgba(29, 185, 253, 0.2)
    );
    border-radius: 16px; /* 使用與卡片相同的圓角 */
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    /* 移除混合模式以減少GPU渲染負擔 */
    transition: opacity 0.2s ease;
  }
`,F=a.Ay.div`
  position: absolute;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
`,P=a.Ay.div`
  background: ${e=>`linear-gradient(145deg, ${e.theme.colors.surface||"#1e2633"}, ${e.theme.colors.surface||"#1e2633"}F8)`};
  border-radius: 16px; /* 四個角都設置圓角 */
  overflow: hidden; /* 修改為hidden以確保特效不會超出容器 */
  box-shadow: ${e=>e.isSelected?"0 15px 30px rgba(106, 17, 203, 0.3)":"0 10px 20px rgba(0, 0, 0, 0.08)"};
  position: relative;
  border: ${e=>e.isSelected?`2px solid ${e.theme.colors.primary}`:"1px solid rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  transform: ${e=>e.isSelected?"translateY(-5px)":"none"};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1 / 1.6; /* 調整卡片寬高比例，使其更高一些 */
  padding: 0; /* 確保沒有內邊距 */
  margin: 0; /* 確保沒有外邊距 */
  z-index: 1; /* 確保卡片有正確的層級 */

  ${e=>!e.isSelected&&_}

  ${e=>e.isSelected&&`\n    &::after {\n      content: "";\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 2;\n      border-radius: 16px; /* 增加圓角尺寸 */\n      box-shadow: inset 0 0 0 2px ${e.theme.colors.primary};\n      pointer-events: none;\n    }\n  `}
`,W=a.Ay.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 保持1:1的寬高比 */
  background-color: #1e2633; /* 使用與Card一致的背景色 */
  overflow: hidden; /* 確保內容不會溢出容器 */
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
`,M=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
  overflow: hidden;
`,D=(a.Ay.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 減少過渡動畫時間以降低GPU消耗 */
  transition: transform 0.2s ease;
  border-radius: inherit;
  z-index: 1;
`,(0,a.Ay)(F)`
  top: 10px;
  right: 10px;
  background: ${e=>e.theme.colors.primary}CC;
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`),B=(0,a.Ay)(F)`
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`,U=a.Ay.span`
  font-size: 1em;
  color: #00ff9d;
  font-weight: bold;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,H=a.Ay.div`
  padding: ${e=>e.theme.spacing.md};
  padding-bottom: ${e=>e.theme.spacing.md}; /* 減少底部間距 */
  position: relative;
  z-index: 3;
  background: ${e=>e.theme.colors.surface}F8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 45%; /* 調整內容區域高度比例 */
  min-height: 140px; /* 增加最小高度 */
  border-radius: 0 0 16px 16px; /* 只設置下方圓角，上方與圖片容器相連 */
`,G=a.Ay.div`
  padding: 0;
  margin-bottom: 8px; /* 使用固定間距替代auto */
  flex-grow: 0;
`,q=a.Ay.h3`
  font-size: 1.1rem;
  margin: 0 0 ${e=>e.theme.spacing.xs} 0;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 26px;
  padding-top: 0;
`,Q=e=>{let{children:t,id:r}=e;return(0,d.jsx)(T,{id:`nftGradient-${r}`,fontSize:"1.1rem",height:"26",letterSpacing:"0.01em",children:t})},X=a.Ay.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  padding: 0;
`,Y=a.Ay.div`
  display: flex;
  justify-content: center; /* 修改為居中對齊 */
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 45px; /* 調整為與ListNFTForm中的按鈕高度一致 */
  position: relative; /* 確保作為絕對定位的參考點 */
  z-index: 3;
  flex-shrink: 0;
  margin-top: 0;
  box-sizing: border-box;
`,V=(0,a.Ay)(w)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  height: 45px; /* 調整為與ListNFTForm中的按鈕高度一致 */
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.medium};
  position: relative; /* 確保按鈕可作為錨點 */
  z-index: 5; /* 確保按鈕可點擊 */
  box-sizing: border-box; /* 確保尺寸包含padding和border */
  font-size: 0.95rem; /* 與ListNFTSection中的按鈕字體大小保持一致 */
`,K=(0,a.Ay)($)`
  width: 100%; /* 確保與按鈕寬度一致 */
  margin: 0;
  padding: ${e=>e.theme.spacing.sm};
  font-size: 0.9rem;
  text-align: center; /* 確保文字居中 */
  justify-content: center; /* 確保內容居中 */
  display: flex;
  align-items: center;
`,Z=e=>{let{nft:t,actionText:r,onAction:n,statusMessage:a,customActionButton:o,isSelected:s,id:l}=e;const c=t,[m,p]=(0,i.useState)(""),[h,g]=(0,i.useState)(!0),[x,u]=(0,i.useState)(!1),[f,b]=(0,i.useState)(0);(0,i.useEffect)((()=>{let e,t=!0;return(async()=>{if(f>2)t&&(g(!1),u(!0));else try{t&&(g(!0),u(!1)),e=setTimeout((()=>{t&&b((e=>e+1))}),1e3);const r=await(0,E.P_)(c);clearTimeout(e),t&&(r.error?u(!0):p(r.url),g(r.isLoading))}catch(r){clearTimeout(e),t&&(u(!0),g(!1),b((e=>e+1)))}})(),()=>{t=!1,clearTimeout(e)}}),[c,f]);const w="function"==typeof r?()=>r(c):()=>r||"操作";return(0,d.jsxs)(P,{isSelected:s,id:l,children:[(0,d.jsx)(W,{children:(0,d.jsxs)(M,{children:[(0,d.jsx)(z,{src:null!=m?m:c.image||"",alt:c.name||`NFT #${c.tokenId||"Unknown"}`,width:"100%",height:"100%",objectFit:"cover",hoverEffect:!1,errorText:"画像の読み込みに失敗しました",backgroundColor:"#1e2633",borderRadius:"16px 16px 0 0",style:{position:"absolute",top:0,left:0,right:0,bottom:0}}),h&&(0,d.jsxs)(O,{children:["読み込み中...",f>0?` (リトライ ${f}/2)`:""]}),c.isListed&&(0,d.jsx)(D,{children:"出品中"}),c.price&&(0,d.jsxs)(B,{children:[(0,d.jsx)(U,{children:"Ξ"}),c.price]})]})}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)(q,{children:(0,d.jsx)(Q,{id:c.tokenId,children:c.name})}),(0,d.jsx)(X,{children:c.collection})]}),(0,d.jsx)(Y,{children:a?(0,d.jsx)(K,{success:a.success,fadeOut:a.fadeOut,style:a.style,centered:a.centered,noArrow:a.noArrow,children:a.message}):o?o():(0,d.jsx)(V,{onClick:e=>{n&&n(c,e)},children:w()})})]})]})},J=a.Ay.div`
  min-height: 70vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  /* 確保與搜索欄對齊 */
  margin: 0;
  padding: 0;

  /* 保持頁面高度一致，防止因結果數量變化導致頁面高度變化 */
  display: flex;
  flex-direction: column;

  /* 確保與右側菜單兼容的佈局，但只對具有右側菜單的頁面 */
  @media (min-width: 769px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: visible;
  }
`,ee=a.Ay.div`
  display: grid;
  grid-gap: ${24}px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  min-height: 600px;

  /* 確保卡片最小寬度，防止擠壓變形 */
  & > div {
    min-width: ${260}px;
    height: auto;
  }

  /* 根據頁面類型應用不同的佈局規則 */
  ${e=>e.hasRightSidebar?"\n      /* 有右側邊欄的頁面 - 市場、瀏覽等頁面 */\n      @media (min-width: 1800px) {\n        grid-template-columns: repeat(4, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 1400px) and (max-width: 1799px) {\n        grid-template-columns: repeat(3, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 1000px) and (max-width: 1399px) {\n        grid-template-columns: repeat(2, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 769px) and (max-width: 999px) {\n        grid-template-columns: repeat(1, 1fr);\n        max-width: calc(100% - 320px);\n      }\n    ":"\n      /* 沒有右側邊欄的頁面 - MyNFT頁面 */\n      @media (min-width: 1800px) {\n        grid-template-columns: repeat(4, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 1400px) and (max-width: 1799px) {\n        grid-template-columns: repeat(3, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 1000px) and (max-width: 1399px) {\n        grid-template-columns: repeat(2, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 769px) and (max-width: 999px) {\n        grid-template-columns: repeat(1, 1fr);\n        max-width: 100%;\n      }\n    "}

  /* 共用的小屏幕佈局 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
    max-width: 100%;
  }
`,te=a.Ay.div`
  text-align: center;
  padding: 80px 30px;
  color: ${e=>e.theme.colors.text.secondary};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${e=>e.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 40px auto 80px;
  min-height: 400px; /* 添加最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.7;
  }
`,re=e=>{let{items:t=[],onItemAction:r,actionText:i,renderStatus:n,renderActionButton:a,selectedNFT:o,className:s,itemIdPrefix:l="nft-",imageUrlKey:c="image",hasRightSidebar:m=!0}=e;return(0,d.jsx)(J,{children:0===t.length?(0,d.jsxs)(te,{children:[(0,d.jsx)("h3",{children:"NFTが見つかりません"}),(0,d.jsx)("p",{children:"検索条件を変更してお試しください。"})]}):(0,d.jsx)(ee,{className:s,hasRightSidebar:m,children:t.map((e=>{const t=o&&o.tokenId===e.tokenId,s=`${l}${e.tokenId}`,m={...e,imageUrl:e[c]||e.image};return(0,d.jsx)(Z,{id:s,nft:m,actionText:i,onAction:r,statusMessage:n?n(e):null,customActionButton:a?()=>(e=>a?a(e,(t=>{r&&r(e,t)})):null)(e):null,isSelected:t},e.tokenId)}))})})},ie=a.Ay.div`
  position: relative;
  width: 200px; /* 保持寬度為200px，避免換行 */
  height: 42px;
  flex-shrink: 0; /* 防止收縮 */
`,ne=a.Ay.div`
  padding: 8px 28px 8px 12px;
  border-radius: ${e=>e.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  height: 42px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #b6b9c5; /* 灰色箭頭 */
  }

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }
`,ae=a.Ay.div`
  position: absolute; /* 使用絕對定位而不是固定定位 */
  top: 100%; /* 定位在按鈕下方 */
  left: 0;
  width: 100%;
  background: ${e=>e.theme.colors.background};
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: ${e=>e.theme.borderRadius.medium};
  margin-top: 4px;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999; /* 保持高z-index */

  /* 自定義滾動條 */
  &::-webkit-scrollbar {
    width: 6px;
    display: block;
  }

  &::-webkit-scrollbar-track {
    background: rgba(30, 36, 68, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(106, 17, 203, 0.15);
    border-radius: 3px;
    min-height: 30px;
    visibility: visible;
    display: block;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(106, 17, 203, 0.3);
  }
`,oe=a.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(106, 17, 203, 0.1);
  }

  ${e=>e.selected&&"\n    background: rgba(106, 17, 203, 0.2);\n    font-weight: bold;\n  "}
`,se=e=>{let{value:t,options:r,onChange:n,placeholder:a,className:o}=e;const[s,l]=(0,i.useState)(!1),[c,m]=(0,i.useState)(""),p=(0,i.useRef)(null);(0,i.useEffect)((()=>{const e=e=>{p.current&&!p.current.contains(e.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[]),(0,i.useEffect)((()=>{const e=r.find((e=>e.value===t));m(e?e.label:a||"選択")}),[t,r,a]);return(0,d.jsxs)(ie,{className:o,ref:p,children:[(0,d.jsx)(ne,{onClick:()=>l(!s),children:c}),s&&(0,d.jsx)(ae,{children:r.map(((e,r)=>(0,d.jsx)(oe,{selected:e.value===t,onClick:()=>(e=>{n(e.value),l(!1)})(e),children:e.label},r)))})]})},de=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.md};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.sm};
  width: 100%;
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: 12px 16px;
  box-sizing: border-box;
  box-shadow: none;
  position: relative;
  z-index: 10;
  /* 確保與NFT卡片網格對齊 */
  margin-right: 0;
  margin-left: 0;
  /* 確保容器寬度固定，不受滾動條影響 */
  max-width: 100%;
  /* 確保最小高度一致，防止頁面抖動 */
  min-height: 60px;
`,le=a.Ay.input.attrs({type:"text",className:"search-input"})`
  && {
    padding: 8px 12px;
    border-radius: ${e=>e.theme.borderRadius.medium};
    border: 1px solid rgba(255, 255, 255, 0.05) !important; /* 使用!important確保樣式優先級 */
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.colors.text.primary};
    width: 180px;
    font-size: 0.95rem;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    -webkit-font-smoothing: antialiased;
    margin: 0; /* 覆蓋全局樣式的margin */

    &:focus {
      outline: none;
      border-color: rgba(106, 17, 203, 0.4) !important;
      box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
    }

    &::placeholder {
      color: ${e=>e.theme.colors.text.secondary}99;
    }
  }
`,ce=a.Ay.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;
  transform: translateZ(0);
  min-width: 40px; /* 確保即使沒有過濾器也佔據一定空間 */
  min-height: 36px; /* 保持一致的高度 */
`,me=e=>{let{searchTerm:t,onSearchChange:r,searchPlaceholder:i="搜索...",filters:n=[]}=e;return(0,d.jsxs)(de,{children:[(0,d.jsx)(le,{placeholder:i,value:t,onChange:e=>{r(e.target.value)},spellCheck:"false",autoComplete:"off"}),(0,d.jsx)(ce,{children:n.length>0?n.map(((e,t)=>(0,d.jsx)(se,{value:e.value,options:e.options,onChange:e.onChange,className:e.className},t))):(0,d.jsx)("div",{style:{minWidth:"40px"}})})]})},pe=i.memo(me),he=[{tokenId:"0",name:"VenAPE #0",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"1",name:"VenAPE #1",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"2",name:"サムライNFT",collection:"Samurai Collection",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"3",name:"VenAPE #3",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"221",name:"VenAPE #221",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"453",name:"VenAPE #453",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"785",name:"VenAPE #785",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"612",name:"VenAPE #612",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"}],ge=[{tokenId:"123",name:"VenAPE #123",collection:"VenAPE コレクション",price:"0.55",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x1234567890123456789012345678901234567890",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"456",name:"VenAPE #456",collection:"VenAPE コレクション",price:"0.34",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x2345678901234567890123456789012345678901",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"789",name:"VenAPE #789",collection:"VenAPE コレクション",price:"0.29",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x3456789012345678901234567890123456789012",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"234",name:"VenAPE #234",collection:"VenAPE コレクション",price:"0.12",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x4567890123456789012345678901234567890123",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"567",name:"VenAPE #567",collection:"VenAPE コレクション",price:"0.42",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x5678901234567890123456789012345678901234",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"890",name:"VenAPE #890",collection:"VenAPE コレクション",price:"0.35",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x6789012345678901234567890123456789012345",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"345",name:"VenAPE #345",collection:"VenAPE コレクション",price:"0.51",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x7890123456789012345678901234567890123456",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"678",name:"VenAPE #678",collection:"VenAPE コレクション",price:"0.27",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x8901234567890123456789012345678901234567",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"901",name:"VenAPE #901",collection:"VenAPE コレクション",price:"0.38",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",seller:"0x9012345678901234567890123456789012345678",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{tokenId:"612",name:"VenAPE #612",collection:"VenAPE コレクション",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"}],xe=[{id:"tx1",type:"purchase",nftName:"Bored Ape #123",nftCollection:"Bored Ape Yacht Club",nftImage:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",tokenId:"123",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:2.5,date:"2023-03-15T14:22:30Z",from:"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",to:"0xYourAddress",contractAddress:"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"},{id:"tx2",type:"sale",nftName:"Crypto Punk #456",nftCollection:"CryptoPunks",nftImage:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",tokenId:"456",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:3.2,date:"2023-03-10T09:45:12Z",from:"0xYourAddress",to:"0x7AB4C5D89e6D8CA8740eA9c5F1c8d536BBBF88F3",contractAddress:"0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"},{id:"tx3",type:"mint",nftName:"VenAPE #789",nftCollection:"VenAPE",nftImage:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/789",tokenId:"789",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:.1,date:"2023-03-01T18:11:05Z",from:"0x0000000000000000000000000000000000000000",to:"0xYourAddress",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b"},{id:"tx4",type:"transfer",nftName:"Doodle #234",nftCollection:"Doodles",nftImage:"ipfs://QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/234",tokenId:"234",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:0,date:"2023-02-25T22:30:45Z",from:"0xYourAddress",to:"0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",contractAddress:"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"},{id:"tx5",type:"purchase",nftName:"Azuki #567",nftCollection:"Azuki",nftImage:"ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/567",tokenId:"567",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:1.8,date:"2023-02-20T10:35:22Z",from:"0x8731d54E9D02c286767d56ac03e8037C07e01e98",to:"0xYourAddress",contractAddress:"0xED5AF388653567Af2F388E6224dC7C4b3241C544"},{id:"tx6",type:"mint",nftName:"VenAPE #142",nftCollection:"VenAPE",nftImage:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/142",tokenId:"142",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:.1,date:"2023-02-15T10:22:33Z",from:"0x0000000000000000000000000000000000000000",to:"0xYourAddress",contractAddress:"0x23581767a106ae21c074b2276D25e5C3e136a68b"},{id:"tx7",type:"sale",nftName:"Cool Cat #321",nftCollection:"Cool Cats",nftImage:"ipfs://QmdTtQXUNuLYwX52r5KHUKm8taSv8eFhkj3iCmrLiUXS9k/321",tokenId:"321",metadataBaseUrl:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",price:1.2,date:"2023-02-10T08:12:45Z",from:"0xYourAddress",to:"0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",contractAddress:"0x1A92f7381B9F03921564a437210bB9396471050C"}],ue=i.createRef(),fe=a.Ay.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0; /* 移除边距，避免与StickySidebar的填充重叠 */
  padding: 0; /* 恢復原始設置，不再添加底部內邊距 */
`,be=a.Ay.h3`
  color: ${e=>e.theme.colors.text.primary};
  margin: 0 0 ${e=>e.theme.spacing.md} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;
  font-weight: 600;
  padding-top: ${e=>e.theme.spacing.xs};
  padding-bottom: ${e=>e.theme.spacing.xs};
`,we=(a.Ay.h3`
  color: ${e=>e.theme.colors.text.primary};
  margin: 0 0 ${e=>e.theme.spacing.md} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;

  font-weight: 600;
  padding-top: ${e=>e.theme.spacing.xs};
  padding-bottom: ${e=>e.theme.spacing.xs};
`,a.Ay.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing.md};
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${e=>e.theme.borderRadius.medium};
  margin-bottom: ${e=>e.theme.spacing.md}; /* 統一間距 */
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 60px;
  box-sizing: border-box;
  width: 85%; /* 統一固定寬度 */
  margin-left: auto;
  margin-right: auto;
`),ye=a.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-right: ${e=>e.theme.spacing.md};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,ve=a.Ay.div`
  flex: 1;
`,je=a.Ay.div`
  font-weight: bold;
  font-size: 1rem;
`,$e=a.Ay.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-top: 2px;
`,Te=a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.md};
  color: ${e=>e.theme.colors.text.secondary};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  background: rgba(13, 15, 30, 0.3);
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 重要：完全重置所有邊框和圓角相關屬性 */
  border: none;
  border-radius: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  /* 修改渲染方式，防止繼承任何邊框效果 */
  position: static;

  /* 移除所有裝飾性元素 */
  &::before,
  &::after {
    display: none;
  }

  /* 確保四個角都是直角 */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,Ee=a.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${e=>e.theme.spacing.sm};
`,Ae=a.Ay.div`
  width: 85%;
  margin-bottom: ${e=>e.theme.spacing.sm};
  margin-left: auto;
  margin-right: auto;
  display: block; /* 確保是塊級元素 */
  box-sizing: border-box; /* 確保寬度計算包含padding和border */
  max-width: 450px; /* 添加最大寬度限制，確保與按鈕一致 */
`,Ce=a.Ay.label`
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing.sm};
  display: block;
  text-align: center;
  width: 100%;
`,ke=a.Ay.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 45px;
  align-items: center; /* 使用center確保垂直居中 */
  box-sizing: border-box;
  max-width: 100%; /* 確保不超過父容器 */
  gap: 4px; /* 使用gap屬性為子元素之間添加統一間隙 */
`,Se=a.Ay.input.attrs({className:"price-input"})`
  flex: 1;
  height: 100%;
  padding: 0;
  padding-left: 16px;
  padding-right: 16px;
  line-height: normal; /* 調整為normal避免行高影響 */
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: rgba(30, 36, 68, 0.6);
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.95rem;
  border-radius: ${e=>e.theme.borderRadius.medium};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100% !important; /* 使用!important確保覆蓋全局樣式 */
  margin: 0 !important; /* 重置全局邊距 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    border-color: rgba(106, 17, 203, 0.4) !important;
    box-shadow: 0 0 0 1px rgba(42, 82, 190, 0.2);
  }

  &::placeholder {
    color: ${e=>e.theme.colors.text.secondary}99;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 移除數字輸入框的上下箭頭 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`,Ne=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  background: rgba(106, 17, 203, 0.2);
  color: ${e=>e.theme.colors.text.primary};
  font-weight: bold;
  font-size: 0.95rem;
  user-select: none;
  opacity: ${e=>e.disabled?.5:1};
  min-width: 60px; /* 確保有足夠空間顯示ETH */
  border-top-right-radius: ${e=>e.theme.borderRadius.medium};
  border-bottom-right-radius: ${e=>e.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: none;
  box-sizing: border-box;
  line-height: 1; /* 設置為1確保文字垂直居中 */
`,Ie=a.Ay.div`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
  margin-top: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`,Re=(0,a.Ay)(w)`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${e=>e.theme.borderRadius.medium};
  height: 45px; /* 確保與輸入框高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0; /* 重置margin确保不会影响对齐 */
  box-sizing: border-box; /* 确保盒模型计算正确 */

  &:hover {
    background: linear-gradient(120deg, #5b0fb1, #1f65dd);
    transform: translateY(-2px);
  }
`,ze=a.Ay.div`
  position: absolute;
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 確保完全居中 */
  bottom: -120px; /* 顯示在表單下方 */
  width: 90%; /* 與表單寬度相近 */
  max-width: 450px; /* 限制最大寬度 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`,Le=(0,a.Ay)($)`
  width: 100%;
  padding: 12px;
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1rem;
  border: 2px solid
    ${e=>e.success?"rgba(76, 175, 80, 0.5)":"rgba(244, 67, 54, 0.5)"};
`,Oe=()=>{const[e,t]=(0,i.useState)(null),[r,n]=(0,i.useState)(""),[a,o]=(0,i.useState)({show:!1,success:!1,fadeOut:!1,message:""}),[s,l]=(0,i.useState)(null),c=(0,i.useCallback)((()=>{ue.current&&(t(ue.current),l(null))}),[]),m=(0,i.useCallback)((()=>{t(null),n(""),l(null)}),[]);(0,i.useEffect)((()=>(ue.current&&!e&&t(ue.current),window.addEventListener("nft-selected",c),window.addEventListener("nft-cleared",m),()=>{window.removeEventListener("nft-selected",c),window.removeEventListener("nft-cleared",m)})),[c,m,e]),(0,i.useEffect)((()=>{e&&(async()=>{if(e&&e.image)try{const t=await(0,E.P_)(e);t.url?l(t.url):l(e.image)}catch(t){l(e.image)}})()}),[e]);const p=!e||!r;return(0,d.jsxs)(fe,{children:[(0,d.jsx)(be,{children:(0,d.jsx)(T,{fontSize:"1.4rem",height:"30",centered:!0,id:`form-title-${Math.random().toString(36).substring(7)}`,children:"NFTを出品する"})}),e?(0,d.jsxs)(we,{style:{width:"85%",borderRadius:"8px",marginLeft:"auto",marginRight:"auto",maxWidth:"450px"},children:[(0,d.jsx)(ye,{children:(0,d.jsx)(z,{src:s||e.image,alt:e.name,height:"40px",width:"40px"})}),(0,d.jsxs)(ve,{children:[(0,d.jsx)(je,{children:(0,d.jsx)(T,{fontSize:"1rem",height:"24",fontWeight:"bold",id:`selected-nft-${e.tokenId}`,children:e.name})}),(0,d.jsx)($e,{children:e.collection})]})]}):(0,d.jsx)(Te,{style:{width:"85%",borderRadius:0,marginLeft:"auto",marginRight:"auto",maxWidth:"450px"},children:"NFTを選択してください"}),(0,d.jsxs)(Ee,{children:[(0,d.jsxs)(Ae,{children:[(0,d.jsx)(Ce,{children:"販売価格"}),(0,d.jsxs)(ke,{children:[(0,d.jsx)(Se,{type:"number",value:r,onChange:e=>n(e.target.value),placeholder:"0.00",disabled:!e,min:"0",step:"0.01",autoComplete:"off",className:"price-input"}),(0,d.jsx)(Ne,{disabled:!e,children:"ETH"})]})]}),(0,d.jsx)(Ie,{children:(0,d.jsx)(Re,{onClick:async()=>{if(e&&r)try{await new Promise((e=>setTimeout(e,1e3))),o({show:!0,success:!0,fadeOut:!1,message:`${e.name}が${r} ETHで出品されました。`}),setTimeout((()=>{o((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{o({show:!1,success:!1,fadeOut:!1,message:""})}),3400),t(null),ue.current=null,n(""),window.dispatchEvent(new CustomEvent("nft-cleared"))}catch(e){o({show:!0,success:!1,fadeOut:!1,message:"出品に失敗しました。"}),setTimeout((()=>{o((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{o({show:!1,success:!1,fadeOut:!1,message:""})}),3400)}else o({show:!0,success:!1,fadeOut:!1,message:"NFTと価格を選択してください。"})},disabled:p,children:"マーケットに出品する"})})]}),a.show&&(0,d.jsx)(ze,{children:(0,d.jsx)(Le,{success:a.success,fadeOut:a.fadeOut,centered:!0,noArrow:!0,children:a.message})})]})},_e=a.Ay.div`
  transform: translateZ(0);
  margin-top: 0; /* 確保與主頁卡片部分對齊 */
  width: 100%;
  position: relative; /* 確保內部絕對定位元素有參考點 */

  /* 只有在獨立顯示時才應用這些樣式 */
  ${e=>e.standalone&&`\n    background: rgba(28, 34, 65, 0.1);\n    border: 1px solid rgba(255, 255, 255, 0.05);\n    border-radius: ${e.theme.borderRadius.medium};\n    backdrop-filter: blur(10px);\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\n  `}
`,Fe=(0,a.Ay)(w)`
  background: linear-gradient(90deg, #ff0080, #7928ca);
  height: 45px; /* 確保固定高度 */
  font-size: 0.95rem;
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.medium};

  &:hover {
    background: linear-gradient(90deg, #ff0080, #7928ca);
    box-shadow: 0 6px 14px rgba(255, 0, 128, 0.4);
  }
`,Pe=(0,a.Ay)(w)`
  height: 45px;
  font-size: 0.95rem;
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.medium};
`,We=a.Ay.div`
  width: 100%;
  padding: 0;
  margin: 0; /* 添加margin: 0确保没有外边距 */
  box-sizing: border-box;
  height: 45px; /* 確保固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
`,Me=e=>{let{standalone:t=!0}=e;const[r,n]=(0,i.useState)(null),[a,o]=(0,i.useState)(""),s=(0,i.useRef)(null),l=he.filter((e=>!a||e.name.toLowerCase().includes(a.toLowerCase()))),c=(0,i.useCallback)((e=>{o(e)}),[]);(0,i.useCallback)((()=>{if(r&&s.current){const e=document.getElementById(`nft-item-${r.tokenId}`);e?e.scrollIntoView({behavior:"smooth",block:"center"}):document.querySelectorAll('[id^="nft-item-"]').forEach((e=>{}))}}),[r]);(0,i.useEffect)((()=>{const e=()=>{n(null)};return ue.current&&!r&&(n(ue.current),setTimeout((()=>{const e=document.getElementById(`nft-item-${ue.current.tokenId}`);e&&e.scrollIntoView({behavior:"auto",block:"center"})}),100)),window.addEventListener("nft-cleared",e),()=>{window.removeEventListener("nft-cleared",e)}}),[r]);const m=(0,i.useCallback)(((e,t)=>{const i=(null==r?void 0:r.tokenId)===e.tokenId;return(0,d.jsx)(We,{children:i?(0,d.jsx)(Fe,{fullWidth:!0,onClick:t,children:"選択済み"}):(0,d.jsx)(Pe,{fullWidth:!0,onClick:t,children:"選択する"})})}),[r]);return(0,d.jsxs)(_e,{standalone:t,children:[(0,d.jsx)(pe,{searchTerm:a,onSearchChange:c,searchPlaceholder:"NFTを検索...",filters:[{value:"invisible1",options:[{value:"invisible1",label:" "}],onChange:()=>{},className:"invisible-filter"},{value:"invisible2",options:[{value:"invisible2",label:" "}],onChange:()=>{},className:"invisible-filter"}]}),(0,d.jsx)("div",{ref:s,children:(0,d.jsx)(re,{items:l,actionText:"選択する",renderActionButton:m,onItemAction:e=>{(null==r?void 0:r.tokenId)===e.tokenId?(n(null),ue.current=null,window.dispatchEvent(new CustomEvent("nft-cleared"))):(n(e),ue.current=e,window.dispatchEvent(new CustomEvent("nft-selected")))},selectedNFT:r,itemIdPrefix:"nft-item-"})})]})};Me.Form=Oe;const De=Me,Be=(a.Ay.h2`
  text-align: center;
  margin: ${e=>e.theme.spacing.xl} 0
    ${e=>e.theme.spacing.lg};
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.2rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(120deg, #4776e6, #8e54e9);
    border-radius: 3px;
  }
`,a.Ay.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.md} 0;
  margin-bottom: ${e=>e.theme.spacing.sm};

  h1 {
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: ${e=>e.theme.spacing.xs};
    background: linear-gradient(
      120deg,
      rgba(106, 17, 203, 1),
      /* 紫色 */ rgba(142, 84, 233, 1),
      /* 淺紫色 */ rgba(56, 239, 125, 1),
      /* 綠色 */ rgba(37, 117, 252, 1),
      /* 藍色 */ rgba(106, 17, 203, 1) /* 紫色 */
    );
    background-size: 400% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 15s linear infinite;
    text-shadow: 0 0 20px rgba(106, 17, 203, 0.3);
  }

  p {
    font-size: 0.95rem;
    color: ${e=>e.theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.4;
  }

  @keyframes shine {
    0% {
      background-position: 0% center;
    }
    50% {
      background-position: 200% center;
    }
    100% {
      background-position: 0% center;
    }
  }
`),Ue=(a.Ay.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing.md};
  padding: 8px;
  transform: translateZ(0);
  perspective: 1000px;
`,(0,a.Ay)(y)`
  background: ${e=>e.$active?`linear-gradient(120deg, \n          ${e.theme.colors.primary}00 0%, \n          ${e.theme.colors.primary} 25%, \n          ${e.theme.colors.secondary} 75%, \n          ${e.theme.colors.secondary}00 100%\n        )`:"transparent"};
  color: ${e=>e.$active?"white":e.theme.colors.text.primary};
  border: 2px solid
    ${e=>e.$active?"transparent":e.theme.colors.primary+"55"};
  box-shadow: ${e=>e.$active?"0 5px 15px rgba(42, 82, 190, 0.3)":"none"};

  &:hover {
    background: ${e=>e.$active?`linear-gradient(120deg, \n            ${e.theme.colors.primary}00 0%, \n            ${e.theme.colors.primary} 25%, \n            ${e.theme.colors.secondary} 75%, \n            ${e.theme.colors.secondary}00 100%\n          )`:"linear-gradient(120deg, transparent, rgba(106, 17, 203, 0.1), transparent)"};
    box-shadow: ${e=>e.$active?"0 8px 20px rgba(42, 82, 190, 0.3)":"0 5px 15px rgba(42, 82, 190, 0.1)"};
  }
`,a.Ay.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  /* 應用全局樣式 */
  &.content-container {
    /* 補償滾動條寬度 */
    width: 100%;
    padding-right: calc(20px + 6px); /* 原始padding + 滾動條寬度 */
    box-sizing: border-box;
  }
`),He=a.Ay.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.lg} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
`,Ge=a.Ay.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.md};
`,qe=a.Ay.div`
  display: flex;
  gap: 30px;
  position: relative;
  align-items: flex-start;
  margin-top: ${e=>e.theme.spacing.md};
  box-sizing: border-box;

  /* 確保在小屏幕上變為垂直排列 */
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`,Qe=a.Ay.div`
  flex: 1;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 移除内边距，确保搜索栏和NFT卡片网格对齐 */
  margin: 0; /* 移除外边距，确保搜索栏和NFT卡片网格对齐 */
  /* 確保內容區高度一致 */
  min-height: 70vh;

  @media (max-width: 1100px) {
    order: 2;
  }
`,Xe=a.Ay.div`
  width: 300px; /* 減少寬度 */
  flex-shrink: 0;
  position: relative;
  margin-top: 0;
  padding-top: 0;
  box-sizing: border-box;
  height: 100%;

  @media (max-width: 1100px) {
    width: 100%;
    order: 1;
  }
`,Ye=a.Ay.div`
  position: sticky;
  top: 20px;
  padding: ${e=>e.theme.spacing.md};
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${e=>e.theme.borderRadius.medium};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0;
`,Ve=a.Ay.h3`
  color: ${e=>e.theme.colors.text.primary};
  margin-top: 0;
  margin-bottom: ${e=>e.theme.spacing.md};
  font-size: 1.4rem;
  padding-top: 0;
  width: 100%; /* 確保完全填充 */
  text-align: center; /* 居中對齊 */
  font-weight: 600;
`,Ke=a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.xs} 0;
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.sm}; /* 左側間距 */
  display: flex;
  justify-content: space-between; /* 標籤和值兩端對齊 */
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`,Ze=a.Ay.span`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,Je=a.Ay.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};
  margin-right: ${e=>e.theme.spacing.sm}; /* 右側間距 */
`,et=a.Ay.h4`
  font-size: 1rem;
  margin: ${e=>e.theme.spacing.md} 0
    ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.text.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: ${e=>e.theme.spacing.xs};
  padding-top: ${e=>e.theme.spacing.sm};
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.sm}; /* 左側間距 */
`,tt=a.Ay.div`
  margin-top: ${e=>e.theme.spacing.sm};
  margin-bottom: ${e=>e.theme.spacing.sm};
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.sm}; /* 左側間距 */
`,rt=a.Ay.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing.sm} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: ${e=>e.theme.spacing.sm};
  }
`,it=a.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: ${e=>e.theme.borderRadius.small};
  overflow: hidden;
  margin-right: ${e=>e.theme.spacing.sm};
`,nt=a.Ay.div`
  flex: 1;
`,at=a.Ay.div`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ot=a.Ay.div`
  font-size: 0.8rem;
  color: white;
  display: flex;
  align-items: center;
`,st=a.Ay.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #00ff9d;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 3px;
`,dt=a.Ay.div`
  margin-top: 0; /* 移除上边距，确保搜索栏和右侧菜单对齐 */
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 移除内边距，确保搜索栏和NFT卡片网格对齐 */
`,lt=()=>{const[e,t]=(0,i.useState)("marketplace"),[r,n]=(0,i.useState)(""),[a,o]=(0,i.useState)("recent"),[s,l]=(0,i.useState)("all"),[c,m]=(0,i.useState)({show:!1,nftId:null,success:!1,fadeOut:!1}),p=(0,x.zy)(),h=(0,x.Zp)();(0,i.useEffect)((()=>{const e=new URLSearchParams(p.search).get("tab");"listnft"!==e&&"marketplace"!==e||t(e)}),[p.search]);const g=e=>{t(e),h(`/?tab=${e}`,{replace:!0})},u=(0,i.useMemo)((()=>[...new Set(ge.map((e=>e.collection)))]),[]),f=(0,i.useMemo)((()=>[...ge].sort(((e,t)=>parseFloat(t.price)-parseFloat(e.price))).slice(0,3)),[]),[b,w]=(0,i.useState)({});(0,i.useEffect)((()=>{(async()=>{const e={};await Promise.all(f.map((async t=>{try{const r=await(0,E.P_)(t);r.url?e[t.tokenId]=r.url:e[t.tokenId]=t.image}catch(r){e[t.tokenId]=t.image}}))),w(e)})()}),[f]);const v=(0,i.useMemo)((()=>ge.filter((e=>!(r&&!e.name.toLowerCase().includes(r.toLowerCase()))&&("all"===s||e.collection===s))).sort(((e,t)=>"price_low"===a?parseFloat(e.price)-parseFloat(t.price):"price_high"===a?parseFloat(t.price)-parseFloat(e.price):parseInt(t.tokenId||"0")-parseInt(e.tokenId||"0")))),[r,s,a]),j=(0,i.useCallback)((e=>{n(e)}),[]),$=(0,i.useCallback)((e=>{o(e)}),[]),A=(0,i.useCallback)((e=>{l(e)}),[]),C=(0,i.useCallback)((async e=>{try{await new Promise((e=>setTimeout(e,2e3))),m({show:!0,nftId:e.tokenId,success:!0,fadeOut:!1}),setTimeout((()=>{m((e=>({...e,fadeOut:!0})))}),2e3),setTimeout((()=>{m({show:!1,nftId:null,success:!1,fadeOut:!1})}),2400)}catch(t){m({show:!0,nftId:e.tokenId,success:!1,fadeOut:!1})}}),[]),k=(0,i.useCallback)((e=>{const t=e.tokenId,r=c.nftId;return c.show&&r===t?{success:c.success,message:c.success?"購入成功！":"購入失敗",fadeOut:c.fadeOut,style:{width:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"},centered:!0,noArrow:!1}:null}),[c]);return(0,d.jsx)(Ue,{className:"content-container",children:(0,d.jsxs)(He,{children:[(0,d.jsxs)(Be,{children:[(0,d.jsx)("h1",{children:"NFTマーケットプレイスへようこそ"}),(0,d.jsx)("p",{children:"安全かつ簡単にNFTを売買できるプラットフォーム。 スマートコントラクトにより、信頼性の高い取引を実現します。"})]}),(0,d.jsxs)(Ge,{children:[(0,d.jsx)(y,{$active:"marketplace"===e,onClick:()=>g("marketplace"),$gradient:"marketplace"===e,children:"マーケットプレイス"}),(0,d.jsx)(y,{$active:"listnft"===e,onClick:()=>g("listnft"),$gradient:"listnft"===e,children:"NFTを出品する"})]}),(0,d.jsxs)(qe,{children:[(0,d.jsx)(Qe,{children:"marketplace"===e?(0,d.jsxs)(dt,{children:[(0,d.jsx)(pe,{searchTerm:r,onSearchChange:j,searchPlaceholder:"NFTを検索...",filters:[{value:s,options:[{value:"all",label:"すべてのコレクション"},...u.map((e=>({value:e,label:e})))],onChange:A},{value:a,options:[{value:"recent",label:"最新順"},{value:"price_low",label:"価格（安い順）"},{value:"price_high",label:"価格（高い順）"}],onChange:$}]}),(0,d.jsx)(re,{items:v,actionText:"購入する",onItemAction:C,renderStatus:k,hasRightSidebar:!0})]}):(0,d.jsx)(De,{standalone:!1})}),(0,d.jsx)(Xe,{children:(0,d.jsx)(Ye,{children:"marketplace"===e?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Ve,{children:(0,d.jsx)(T,{fontSize:"1.4rem",height:"30",centered:!0,id:"sidebar-title",children:"マーケット情報"})}),(0,d.jsxs)(Ke,{children:[(0,d.jsx)(Ze,{children:"総上場数:"}),(0,d.jsx)(Je,{children:ge.length})]}),(0,d.jsxs)(Ke,{children:[(0,d.jsx)(Ze,{children:"平均価格:"}),(0,d.jsxs)(Je,{children:[(0,d.jsx)(st,{children:"Ξ"})," 1.25"]})]}),(0,d.jsx)(et,{children:"人気のNFT"}),(0,d.jsx)(tt,{children:f.map((e=>(0,d.jsxs)(rt,{children:[(0,d.jsx)(it,{children:(0,d.jsx)(z,{src:b[e.tokenId]||e.image,alt:e.name,width:"100%",height:"100%"})}),(0,d.jsxs)(nt,{children:[(0,d.jsx)(at,{children:(0,d.jsx)(T,{fontSize:"0.9rem",height:"18",fontWeight:"500",id:`nft-name-${e.tokenId}`,children:e.name})}),(0,d.jsxs)(ot,{children:[(0,d.jsx)(st,{children:"Ξ"}),e.price]})]})]},e.tokenId)))}),(0,d.jsxs)(Ke,{children:[(0,d.jsx)(Ze,{children:"次回のドロップ:"}),(0,d.jsx)(Je,{children:"3日後"})]}),(0,d.jsxs)(Ke,{children:[(0,d.jsx)(Ze,{children:"取引量(24h):"}),(0,d.jsxs)(Je,{children:[(0,d.jsx)(st,{children:"Ξ"})," 32.5"]})]})]}):(0,d.jsx)(Oe,{})})})]})]})})},ct=he.filter((e=>"VenAPE コレクション"===e.collection)),mt=a.Ay.div`
  width: 100%;
  min-height: auto;
  padding: ${e=>e.theme.spacing.md} 0;
  position: relative;
  overflow: hidden;
`,pt=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: 0.2;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    /* 移除模糊效果 */
  }

  &::before {
    top: -100px;
    left: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(106, 17, 203, 0.15),
      transparent 70%
    );
    /* 移除動畫 */
  }

  &::after {
    bottom: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(37, 117, 252, 0.1),
      transparent 70%
    );
    /* 移除動畫 */
  }
`,ht=a.Ay.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${e=>e.theme.spacing.md};
  display: flex;
  flex-direction: column;
  z-index: 1;
`,gt=a.Ay.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.md};

  h1 {
    margin-bottom: ${e=>e.theme.spacing.sm};
    font-size: 2.5rem;
    display: inline-block;
  }
`,xt=a.Ay.p`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: center;
`,ut=a.Ay.div`
  background: rgba(18, 21, 34, 0.9);
  border-radius: ${e=>e.theme.borderRadius.large};
  /* 減少陰影強度 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 100%;
  /* 移除模糊效果 */
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`,ft=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,bt=a.Ay.div`
  padding: ${e=>e.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    right: 0;
    height: 80%;
    width: 1px;
    background: rgba(106, 17, 203, 0.3);
    /* 簡化漸變為純色 */

    @media (max-width: 900px) {
      display: none;
    }
  }
`,wt=a.Ay.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: ${e=>e.theme.spacing.md};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  /* 降低陰影複雜度 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 18, 31, 0.8);
  /* 移除漸變背景 */

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    z-index: -1;
    border-radius: 17px;
    border: 1px solid rgba(106, 17, 203, 0.2);
    /* 移除動畫和漸變，改用純色邊框 */
  }
`,yt=a.Ay.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,vt=a.Ay.h3`
  font-size: 1rem;
  margin-bottom: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.text.primary};
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${e=>e.theme.colors.primary};
  }
`,jt=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.spacing.sm};
`,$t=a.Ay.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.sm};
  background: rgba(15, 18, 31, 0.8);
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid rgba(106, 17, 203, 0.2) !important;
`,Tt=a.Ay.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: 4px;
`,Et=a.Ay.div`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.text.secondary};
`,At=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${e=>e.theme.spacing.md};
  margin-top: ${e=>e.theme.spacing.sm};
`,Ct=a.Ay.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${e=>"prev"===e.direction?"0 8px 0 0":"0 0 0 8px"};
`,kt=a.Ay.div`
  padding: ${e=>e.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,St=a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.md};
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,Nt=a.Ay.div`
  margin-top: auto;
  position: relative;
  min-height: 40px; /* 從80px減少到60px，減少空白區域 */
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,It=(a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${e=>e.theme.borderRadius.large};
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.3);
  transition: opacity 0.3s ease;
  z-index: -1;

  ${ut}:hover & {
    opacity: 1;
  }
`,a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.sm};
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.md};
`),Rt=a.Ay.p`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: ${e=>e.theme.spacing.md};
`,zt=a.Ay.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.md};
  border: 1px solid rgba(106, 17, 203, 0.2);
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,Lt=a.Ay.h3`
  font-size: 1rem;
  margin-bottom: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.text.primary};
`,Ot=a.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.spacing.sm};
`,_t=a.Ay.li`
  display: flex;
  flex-direction: column;
  padding: ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.small};
  background: rgba(15, 18, 31, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.2);
`,Ft=a.Ay.span`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.8rem;
  margin-bottom: 2px;
`,Pt=a.Ay.span`
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.95rem;
`,Wt=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.md};
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
  border: 1px solid rgba(106, 17, 203, 0.2);
  overflow: hidden;
`,Mt=a.Ay.label`
  font-weight: 600;
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
  white-space: nowrap;
`,Dt=a.Ay.input.attrs({type:"text",placeholder:"TokenIDを入力",className:"token-id-input"})`
  &&& {
    background: rgba(15, 18, 31, 0.8) !important;
    border: 2px solid rgba(87, 5, 175, 0.42) !important;
    border-radius: 4px !important;
    color: ${e=>e.theme.colors.text.primary};
    padding: 8px 12px;
    width: 100px;
    min-width: 100px;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: right;
    margin-left: auto;
    box-shadow: none !important;
  }

  &&&:focus {
    outline: none;
    border: 2px solid rgba(27, 151, 185, 0.72) !important;
    box-shadow: 0 0 0 1px rgba(0, 201, 255, 0.3) !important;
  }

  &&&::placeholder {
    color: ${e=>e.theme.colors.text.secondary}88;
    text-align: right;
    font-size: 0.95rem;
    font-weight: normal;
  }
`,Bt=a.Ay.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.md};
  border: 1px solid rgba(106, 17, 203, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,Ut=a.Ay.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
`,Ht=a.Ay.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;

  /* 移除漸變文字效果，使用純色 */
`,Gt=(0,a.Ay)($)`
  position: absolute;
  bottom: -25px; 
    padding: 20px; /* 直接覆盖原组件的padding */

  left: 50%;
  transform: translateX(-50%);
  width: 90%;、
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.3s forwards;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`,qt=a.Ay.div`
  margin-top: ${e=>e.theme.spacing.sm};
  margin-bottom: ${e=>e.theme.spacing.sm};
`,Qt=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  span {
    font-size: 0.8rem;
    color: ${e=>e.theme.colors.text.secondary};
  }
`,Xt=a.Ay.div`
  height: 6px;
  width: 100%;
  background: rgba(15, 18, 31, 0.6);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${e=>e.progress||"45%"};
    background: linear-gradient(120deg, #00ff9d, #00c9ff);
    border-radius: 3px;
  }
`,Yt=(a.Ay.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 25px;
  background: ${e=>e.success?"rgba(38, 194, 129, 0.9)":"rgba(242, 38, 19, 0.9)"};
  color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: ${e=>e.fadeOut?0:1};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`,a.Ay.div`
  height: 35px;
  margin-top: 1rem;
  visibility: hidden;
  opacity: 0;
`,(0,a.Ay)($)`
  position: absolute;
  z-index: 10;
  bottom: -20px;
  left: 0;
  width: 100%;
  transform: translateY(0);
  animation: ${e=>e.fadeOut?"fadeSlideOut":"fadeSlideIn"} 0.4s
    ease forwards;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`,()=>{const[e,t]=(0,i.useState)(0),[r,n]=(0,i.useState)(""),[a,o]=(0,i.useState)(!1),[s,l]=(0,i.useState)({visible:!1,success:!1,fadeOut:!1,message:""}),[c,m]=(0,i.useState)(null),[p,h]=(0,i.useState)(!0),g=1e4,x=4579,u=`${45.79.toFixed(1)}%`;(0,i.useEffect)((()=>{""===r&&ct&&ct.length>0&&n(ct[e].tokenId)}),[]),(0,i.useEffect)((()=>{ct&&ct.length>0&&n(ct[e].tokenId)}),[e]),(0,i.useEffect)((()=>{(async()=>{try{h(!0);const t=await(0,E.P_)(ct[e]);t.url?m(t.url):m(ct[e].image)}catch(t){m(ct[e].image)}finally{h(!1)}})()}),[e]);return(0,d.jsxs)(mt,{children:[(0,d.jsx)(pt,{}),(0,d.jsxs)(ht,{children:[(0,d.jsxs)(gt,{children:[(0,d.jsx)("h1",{children:(0,d.jsx)(T,{fontSize:"2.5rem",height:"60",maxWidth:"600px",centered:!0,fontWeight:"700",children:"VenAPE NFTをミントする"})}),(0,d.jsx)(xt,{children:"VenAPEは10,000個のユニークに生成されたアートコレクションです。各VenAPEは一意であり、特別な属性と特徴を持っています。"})]}),(0,d.jsx)(ut,{children:(0,d.jsxs)(ft,{children:[(0,d.jsxs)(bt,{children:[(0,d.jsx)(wt,{children:(0,d.jsx)(z,{src:c||ct[e].image,alt:`VenAPE #${r||"?"}`,width:"100%",height:"100%",objectFit:"cover",errorText:"画像を読み込めません",borderRadius:"16px",backgroundColor:"rgba(15, 18, 31, 0.8)",hoverEffect:!1})}),(0,d.jsxs)(yt,{children:[(0,d.jsxs)(vt,{children:[(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,d.jsx)("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})}),"VenAPE コレクション"]}),(0,d.jsxs)(jt,{children:[(0,d.jsxs)($t,{children:[(0,d.jsx)(Tt,{children:g.toLocaleString()}),(0,d.jsx)(Et,{children:"総供給量"})]}),(0,d.jsxs)($t,{children:[(0,d.jsx)(Tt,{children:x.toLocaleString()}),(0,d.jsx)(Et,{children:"ミント済み"})]})]})]}),(0,d.jsxs)(qt,{children:[(0,d.jsxs)(Qt,{children:[(0,d.jsx)("span",{children:"ミント進捗"}),(0,d.jsxs)("span",{children:[x.toLocaleString()," /"," ",g.toLocaleString()]})]}),(0,d.jsx)(Xt,{progress:u})]}),(0,d.jsxs)(At,{children:[(0,d.jsxs)(y,{direction:"prev",onClick:()=>{const r=e>0?e-1:ct.length-1;t(r)},children:[(0,d.jsx)(Ct,{direction:"prev",children:(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:(0,d.jsx)("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})})}),"前のNFT"]}),(0,d.jsxs)(y,{onClick:()=>{const e=Math.floor(Math.random()*ct.length);t(e)},children:[(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",style:{marginRight:"8px"},children:(0,d.jsx)("path",{d:"M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"})}),"ランダム"]}),(0,d.jsxs)(y,{direction:"next",onClick:()=>{const r=(e+1)%ct.length;t(r)},children:["次のNFT",(0,d.jsx)(Ct,{children:(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:(0,d.jsx)("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})})})]})]})]}),(0,d.jsxs)(kt,{children:[(0,d.jsxs)(St,{children:[(0,d.jsx)(It,{children:(0,d.jsxs)(T,{fontSize:"1.8rem",height:"40",maxWidth:"100%",fontWeight:"700",children:["VenAPE #",r||"?"]})}),(0,d.jsx)(Rt,{children:"VenAPEを所有すると、アートワークの完全な所有権と、コミュニティイベントや将来のプロジェクトエアドロップに参加する特権が得られます。"}),(0,d.jsxs)(yt,{children:[(0,d.jsxs)(vt,{children:[(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,d.jsx)("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),(0,d.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,d.jsx)("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),(0,d.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),"コミュニティ情報"]}),(0,d.jsxs)(jt,{children:[(0,d.jsxs)($t,{children:[(0,d.jsx)(Tt,{children:"1.2K+"}),(0,d.jsx)(Et,{children:"ディスコードメンバー"})]}),(0,d.jsxs)($t,{children:[(0,d.jsx)(Tt,{children:"ウィークリー"}),(0,d.jsx)(Et,{children:"コミュニティイベント"})]})]})]}),(0,d.jsxs)(zt,{children:[(0,d.jsx)(Lt,{children:"特徴"}),(0,d.jsx)(Ot,{children:[{name:"レア度",value:"エピック"},{name:"背景",value:"オレンジ"},{name:"皮膚",value:"グレー"},{name:"目",value:"X印"},{name:"服装",value:"ストライプ"}].map(((e,t)=>(0,d.jsxs)(_t,{children:[(0,d.jsx)(Ft,{children:e.name}),(0,d.jsx)(Pt,{children:e.value})]},t)))})]}),(0,d.jsxs)(Wt,{children:[(0,d.jsx)(Mt,{children:"Token ID:"}),(0,d.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",width:"50%",marginLeft:"auto"},children:(0,d.jsx)(Dt,{value:r,onChange:e=>{let r=e.target.value.replace(/[^0-9]/g,"");""!==r&&parseInt(r)>9999&&(r="9999"),n(r);const i=ct.findIndex((e=>e.tokenId===r));-1!==i&&t(i)},autoComplete:"off",style:{border:"2px solid #6a11cb",background:"rgba(15, 18, 31, 0.8)",textAlign:"right",width:"100px",padding:"8px 12px",fontSize:"1.2rem",fontWeight:"700",borderRadius:"4px",color:"white"}})})]}),(0,d.jsxs)(Bt,{children:[(0,d.jsx)(Ut,{children:"価格:"}),(0,d.jsxs)(Ht,{style:{paddingRight:"12px"},children:[(0,d.jsx)(U,{style:{fontSize:"1.2rem",marginRight:"5px"},children:"Ξ"}),.18.toFixed(2)," ETH"]})]})]}),(0,d.jsxs)(Nt,{children:[(0,d.jsx)(w,{fullWidth:!0,disabled:a,onClick:async()=>{o(!0),l({visible:!1,success:!1,fadeOut:!1,message:""});try{await new Promise((e=>setTimeout(e,2e3))),l({visible:!0,success:!0,fadeOut:!1,message:`おめでとうございます！TokenID: ${r}のVenAPE NFTのミントに成功しました。`}),setTimeout((()=>{l((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{l({visible:!1,success:!1,fadeOut:!1,message:""})}),3400)}catch(e){l({visible:!0,success:!1,fadeOut:!1,message:"ミントに失敗しました。ウォレットの接続を確認して再試行してください。"}),setTimeout((()=>{l((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{l({visible:!1,success:!1,fadeOut:!1,message:""})}),3400)}finally{o(!1)}},style:{height:"45px",fontSize:"1rem",boxShadow:"0 4px 8px rgba(106, 17, 203, 0.15)",marginTop:"auto",width:"100%",boxSizing:"border-box"},children:a?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{animation:"spin 1s linear infinite",marginRight:"8px"},children:(0,d.jsx)("path",{d:"M21 12a9 9 0 1 1-6.219-8.56"})}),"ミント処理中..."]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:"8px"},children:[(0,d.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,d.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,d.jsx)("polyline",{points:"21 15 16 10 5 21"})]}),"このVenAPEをミントする"]})}),s.visible&&(0,d.jsx)(Gt,{success:s.success,fullWidth:!0,noArrow:!0,fadeOut:s.fadeOut,style:{width:"100%"},children:s.message})]})]})]})})]})]})}),Vt=a.Ay.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  /* 應用全局樣式 */
  &.content-container {
    /* 補償滾動條寬度 */
    width: 100%;
    padding-right: calc(20px + 6px); /* 原始padding + 滾動條寬度 */
    box-sizing: border-box;
  }
`,Kt=a.Ay.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.lg} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
  padding-top: 0;
  margin-top: ${e=>e.theme.spacing.lg};
`,Zt=a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.xl};
  text-align: center;
  padding-top: 0;
`,Jt=a.Ay.h1`
  margin-bottom: ${e=>e.theme.spacing.lg};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`,er=e=>{let{children:t}=e;return(0,d.jsx)(T,{fontSize:"2.5rem",height:"60",maxWidth:"400px",centered:!0,id:`mynft-title-${Math.random().toString(36).substring(7)}`,children:t})},tr=a.Ay.p`
  color: ${e=>e.theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`,rr=(a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.md};
`,a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${e=>e.theme.spacing.md};
  position: relative;

  /* 確保與Home頁面的MarketContainer一致 */
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0;

  > div {
    height: 100%;
    display: flex;
  }
`,a.Ay.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xxl};
  color: ${e=>e.theme.colors.text.secondary};
`),ir=a.Ay.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xxl};
  color: ${e=>e.theme.colors.text.secondary};
`,nr=a.Ay.div`
  position: absolute;
  background: linear-gradient(145deg, #2a3142, #383f5e);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: ${e=>e.theme.spacing.sm} 0;
  z-index: 1000;
  min-width: 150px;
  max-width: 180px;
  width: auto;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  backdrop-filter: blur(4px);
  transform-origin: ${e=>e.flipUp?"bottom center":"top center"};
  animation: ${e=>e.flipUp?"popUpFromBottom":"popDownFromTop"}
    0.3s ease forwards;

  @keyframes popDownFromTop {
    0% {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes popUpFromBottom {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 確保菜單在頁面底部也能完整顯示 */
  max-height: calc(90vh - 20px);
  overflow-y: auto;
  overflow-x: hidden;

  /* 添加三角形指示器 */
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s ease;
  }

  /* 根據 flipUp 屬性決定三角形位置 */
  ${e=>e.flipUp?"\n    &::before {\n      border-top: 8px solid #383f5e;\n      border-bottom: none;\n      bottom: -8px;\n    }\n  ":"\n    &::before {\n      border-bottom: 8px solid #383f5e;\n      border-top: none;\n      top: -8px;\n    }\n  "}
`,ar=a.Ay.div`
  padding: ${e=>`${e.theme.spacing.sm} ${e.theme.spacing.md}`};
  color: ${e=>e.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: rgba(101, 14, 145, 0.55);
    color: white;
  }

  &:active {
    background-color: rgba(101, 14, 145, 0.75);
    transform: scale(0.98);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  &:last-child::after {
    display: none;
  }
`,or=(a.Ay.div`
  display: flex;
  margin-bottom: ${e=>e.theme.spacing.lg};
  border-bottom: 1px solid ${e=>e.theme.colors.text.secondary}44;
`,a.Ay.button`
  padding: ${e=>e.theme.spacing.md};
  background-color: transparent;
  color: ${e=>e.active?e.theme.colors.primary:e.theme.colors.text.primary};
  border: none;
  border-bottom: 2px solid
    ${e=>e.active?e.theme.colors.primary:"transparent"};
  font-weight: ${e=>e.active?"bold":"normal"};
  cursor: pointer;

  &:hover {
    color: ${e=>e.theme.colors.primary};
  }
`,(0,a.Ay)(Z)`
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: "出品中";
    position: absolute;
    top: 10px;
    left: 10px;
    background: ${e=>e.theme.colors.primary}CC;
    padding: 4px 12px;
    border-radius: 12px;
    color: white;
    font-size: 0.8rem;
    z-index: 5;
  }

  opacity: 0.8;
  filter: grayscale(30%);
`,a.Ay.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${e=>e.theme.colors.surface};
  padding: ${e=>e.theme.spacing.xl};
  border-radius: ${e=>e.theme.borderRadius.large};
  box-shadow: ${e=>e.theme.shadows.large};
  width: 95%;
  max-width: 550px;
  z-index: 1000;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${e=>e.theme.spacing.md};
    text-align: center;

    position: relative;
    display: inline-block;
    width: 100%;
  }
`),sr=(0,a.Ay)(w)`
  margin-top: ${e=>e.theme.spacing.lg};
  height: 54px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(106, 17, 203, 0.25);

  &:hover {
    box-shadow: 0 6px 16px rgba(106, 17, 203, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: linear-gradient(120deg, #6a11cb88, #2575fc88);
    box-shadow: none;
    cursor: not-allowed;
  }
`,dr=(a.Ay.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${e=>e.theme.colors.text.primary};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`,a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  backdrop-filter: blur(4px);
`),lr=a.Ay.input.attrs({className:"transfer-input"})`
  && {
    width: 100%;
    padding: 12px 16px;
    margin: ${e=>e.theme.spacing.lg} 0;
    border-radius: ${e=>e.theme.borderRadius.medium};
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.colors.text.primary};
    font-size: 1.1rem;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    -webkit-font-smoothing: antialiased;
    height: 50px;

    &:focus {
      outline: none;
      border-color: rgba(106, 17, 203, 0.5) !important;
      box-shadow: 0 0 0 2px rgba(42, 82, 190, 0.3);
    }

    &::placeholder {
      color: ${e=>e.theme.colors.text.secondary}99;
    }
  }
`,cr=a.Ay.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  margin: ${e=>e.theme.spacing.lg} 0;
  padding: ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.medium};

  img {
    width: 75px;
    height: 75px;
    border-radius: ${e=>e.theme.borderRadius.small};
    object-fit: cover;
  }

  div {
    width: 100%;

    p {
      color: ${e=>e.theme.colors.text.secondary};
    }
  }
`,mr=e=>{let{children:t}=e;return(0,d.jsx)(T,{fontSize:"1.2rem",height:"30",marginBottom:"8px",id:`transfer-nft-${Math.random().toString(36).substring(7)}`,children:t})},pr=(a.Ay.div.attrs((e=>({className:"transfer-status "+(e.success?"success":"error")})))`
  opacity: ${e=>e.fadeOut?0:1};
`,(0,a.Ay)($)`
  margin-top: ${e=>e.theme.spacing.md};
  width: 100%;
`),hr=a.Ay.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-top: ${e=>e.theme.spacing.sm};
`,gr=a.Ay.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${e=>e.theme.colors.text.primary};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`,xr=()=>{const[e,t]=(0,i.useState)([]),[r,n]=(0,i.useState)(!0),[a,o]=(0,i.useState)(""),[s,l]=(0,i.useState)("all"),[c,m]=(0,i.useState)("recent"),[p,h]=(0,i.useState)(null),[g,u]=(0,i.useState)(!1),[f,b]=(0,i.useState)(!1),[w,y]=(0,i.useState)(""),[v,j]=(0,i.useState)({top:0,left:0}),[T,A]=(0,i.useState)({show:!1,success:!1,fadeOut:!1,message:""}),C=(0,x.Zp)(),k=[...new Set(e.map((e=>e.collection)))];(0,i.useEffect)((()=>{(async()=>{try{const e=await Promise.all(he.map((async e=>{const t=Math.random()>.7,r=await(0,E.P_)(e);return{...e,isListed:t,price:t?(2*Math.random()+.1).toFixed(2):null,processedImage:r.url||e.image,imageLoading:!1,imageError:r.error}})));t(e),n(!1)}catch(e){n(!1)}})()}),[]);const S=(0,i.useCallback)((e=>{o(e)}),[]),N=e.filter((e=>!(a&&!e.name.toLowerCase().includes(a.toLowerCase()))&&("all"===s||e.collection===s))).sort(((e,t)=>"name_asc"===c?e.name.localeCompare(t.name):"name_desc"===c?t.name.localeCompare(e.name):"recent"===c?parseInt(t.tokenId)-parseInt(e.tokenId):0)),I=()=>{b(!1)};(0,i.useEffect)((()=>{}),[g,p]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Vt,{className:"content-container",children:(0,d.jsxs)(Kt,{children:[(0,d.jsxs)(Zt,{children:[(0,d.jsx)(Jt,{children:(0,d.jsx)(er,{children:"マイNFT"})}),(0,d.jsx)(tr,{children:"あなたのウォレットにあるすべてのNFTをここで確認できます。"})]}),r?(0,d.jsxs)(rr,{children:[(0,d.jsx)("h3",{children:"NFTを読み込み中..."}),(0,d.jsx)("p",{children:"お持ちのNFTを取得しています。しばらくお待ちください。"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{searchTerm:a,onSearchChange:S,searchPlaceholder:"NFTを検索...",filters:[{value:s,options:[{value:"all",label:"すべてのコレクション"},...k.map((e=>({value:e,label:e})))],onChange:l},{value:c,options:[{value:"recent",label:"最新順"},{value:"name_asc",label:"名前（A-Z）"},{value:"name_desc",label:"名前（Z-A）"}],onChange:m}]}),N.length>0?(0,d.jsx)(re,{items:N,actionText:"操作",hasRightSidebar:!1,onItemAction:(e,t)=>{t&&(t.preventDefault(),t.stopPropagation(),((e,t)=>{if(t.stopPropagation(),h(e),t&&t.currentTarget){const e=t.currentTarget.getBoundingClientRect(),r=document.querySelector(".content-container").getBoundingClientRect(),i=e.left-r.left+e.width/2-75,n=window.innerHeight,a=150,o=e.bottom+a+10>n;let s;s=o?e.top-r.top-a-10:e.bottom-r.top+25,s<0&&(s=10),j({top:s,left:i,flipUp:o})}u(!0)})(e,t))},renderStatus:e=>e.statusMessage?{message:e.statusMessage,success:"success"===e.statusType,fadeOut:e.fadeOut}:null,imageUrlKey:"processedImage"}):(0,d.jsxs)(ir,{children:[(0,d.jsx)("h3",{children:"NFTが見つかりません"}),(0,d.jsx)("p",{children:"NFTをミントするか、他のユーザーから購入してください。"})]}),g&&p&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(dr,{onClick:()=>u(!1)}),(0,d.jsxs)(nr,{style:{top:`${v.top}px`,left:`${v.left}px`},flipUp:v.flipUp,children:[p.isListed?(0,d.jsx)(ar,{onClick:e=>{e.stopPropagation(),alert(`取消出品：${p.name}`),u(!1)},children:"出品を取り消す"}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(ar,{onClick:e=>{var t;e.stopPropagation(),t=p,ue.current=t,window.dispatchEvent(new CustomEvent("nft-selected")),C("/?tab=listnft"),u(!1)},children:"マーケットに出品"}),(0,d.jsx)(ar,{onClick:e=>{e.stopPropagation(),h(p),b(!0),u(!1)},children:"転送する"})]}),(0,d.jsx)(ar,{onClick:e=>{e.stopPropagation(),C(`/history?nft=${p.tokenId}`)},children:"履歴ページへ"})]})]})]})]})}),f&&p&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(dr,{onClick:I}),(0,d.jsxs)(or,{children:[(0,d.jsx)(gr,{onClick:I,children:"×"}),(0,d.jsx)("h3",{children:"NFTを転送"}),(0,d.jsxs)(cr,{children:[(0,d.jsx)(z,{src:p.processedImage||p.image,alt:p.name,width:"100%",height:"100%",objectFit:"cover"}),(0,d.jsxs)("div",{children:[(0,d.jsx)(mr,{children:p.name}),(0,d.jsx)(hr,{children:p.collection})]})]}),(0,d.jsx)(lr,{placeholder:"受取人のアドレスを入力",value:w,onChange:e=>y(e.target.value)}),(0,d.jsx)(sr,{onClick:()=>{if(!w.trim())return A({show:!0,success:!1,fadeOut:!1,message:"受取人のアドレスを入力してください。"}),setTimeout((()=>{A((e=>({...e,fadeOut:!0})))}),3e3),void setTimeout((()=>{A({show:!1,success:!1,fadeOut:!1,message:""})}),3400);try{A({show:!0,success:!0,fadeOut:!1,message:"転送成功！"}),setTimeout((()=>{A((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{A({show:!1,success:!1,fadeOut:!1,message:""}),b(!1),y("")}),3400)}catch(e){A({show:!0,success:!1,fadeOut:!1,message:"NFTの転送に失敗しました。"}),setTimeout((()=>{A((e=>({...e,fadeOut:!0})))}),3e3),setTimeout((()=>{A({show:!1,success:!1,fadeOut:!1,message:""})}),3400)}},fullWidth:!0,disabled:!w.trim(),children:"転送する"}),T.show&&(0,d.jsx)(pr,{success:T.success,fadeOut:T.fadeOut,noArrow:!1,centered:!0,children:T.message})]})]}),T.show&&!f&&(0,d.jsx)($,{success:T.success,fadeOut:T.fadeOut,style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:1100,minWidth:"300px",maxWidth:"80%"},children:T.message})]})},ur=a.Ay.div`
  background: ${e=>`linear-gradient(145deg, ${e.theme.colors.surface||"#1e2633"}, ${e.theme.colors.surface||"#1e2633"}F8)`};
  border-radius: ${e=>e.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: ${e=>e.theme.spacing.md};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`,fr=a.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: ${e=>e.theme.borderRadius.medium};
  overflow: hidden;
  flex-shrink: 0;
  background: ${e=>e.theme.colors.background};
  position: relative;
`,br=a.Ay.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* 確保flex子項可以正確縮小 */
  overflow: hidden; /* 防止內容溢出 */
`,wr=a.Ay.div`
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0 0 4px 0; /* 添加底部間距與NFTCard一致 */
  padding: 0;
  line-height: 1.5;
  height: 26px; /* 稍微調整高度 */
  position: relative; /* 與NFTCard一致 */
  z-index: 1; /* 與NFTCard一致 */
`,yr=a.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  width: fit-content;
  min-width: 50px;
  text-align: center;
  background: ${e=>{let{type:t,theme:r}=e;switch(t){case"purchase":return"rgba(0, 255, 157, 0.15)";case"sale":return"rgba(255, 46, 99, 0.15)";case"mint":return"rgba(106, 17, 203, 0.15)";case"transfer":return"rgba(37, 117, 252, 0.15)";default:return r.colors.background}}};
  color: ${e=>{let{type:t}=e;switch(t){case"purchase":return"#00ff9d";case"sale":return"#ff2e63";case"mint":return"#6a11cb";case"transfer":return"#2575fc";default:return"#ffffff"}}};
`,vr=a.Ay.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  flex-wrap: wrap; /* 允許在需要時換行 */
  overflow: hidden; /* 防止內容溢出 */
  text-overflow: ellipsis; /* 當文字太長時顯示省略號 */
  white-space: nowrap; /* 保持文字在一行 */
`,jr=a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0; /* 防止價格區域被壓縮 */
  margin-left: auto; /* 確保價格區域靠右 */
  min-width: 80px; /* 提供最小寬度 */
`,$r=a.Ay.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`,Tr=a.Ay.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.text.secondary};
  opacity: 0.8;
`,Er=a.Ay.span`
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
`,Ar=e=>{let{transaction:t}=e;const[n,a]=(0,i.useState)(t.nftImage),[o,s]=(0,i.useState)(!0);(0,i.useEffect)((()=>{(async()=>{try{const e={tokenId:t.tokenId||"",metadataBaseUrl:t.metadataBaseUrl||"",image:t.nftImage,contractAddress:t.contractAddress,collection:t.nftCollection},i=await(0,E.P_)(e);if(i.url)a(i.url);else if(t.nftImage){const{getHttpUrl:e}=await Promise.resolve().then(r.bind(r,7956)),i=e(t.nftImage);i&&a(i)}}catch(e){}finally{s(!1)}})()}),[t.nftImage,t.tokenId,t.metadataBaseUrl,t.contractAddress,t.nftCollection]);return(0,d.jsxs)(ur,{children:[(0,d.jsx)(fr,{children:(0,d.jsx)(z,{src:n,alt:t.nftName,width:"100%",height:"100%",objectFit:"cover",errorText:"画像を読み込めません",borderRadius:"8px",backgroundColor:"rgba(0, 0, 0, 0.05)",hoverEffect:!0})}),(0,d.jsxs)(br,{children:[(0,d.jsx)(yr,{type:t.type,children:(e=>{switch(e){case"purchase":return"購入";case"sale":return"販売";case"mint":return"鋳造";case"transfer":return"転送";default:return"取引"}})(t.type)}),(0,d.jsx)(wr,{children:(0,d.jsx)(T,{id:`tx-gradient-${t.id}`,fontSize:"1.1rem",height:"26",letterSpacing:"0.01em",style:{marginTop:"-2px"},children:t.nftName})}),(0,d.jsxs)(vr,{children:[(0,d.jsx)("span",{children:t.nftCollection}),(e=>{switch(e.type){case"purchase":return(0,d.jsxs)(d.Fragment,{children:["から"," ",(0,d.jsxs)(Er,{children:[e.from.slice(0,6),"...",e.from.slice(-4)]})," ","購入"]});case"sale":return(0,d.jsxs)(d.Fragment,{children:["を"," ",(0,d.jsxs)(Er,{children:[e.to.slice(0,6),"...",e.to.slice(-4)]})," ","に販売"]});case"mint":return(0,d.jsx)(d.Fragment,{children:"を鋳造"});case"transfer":return(0,d.jsxs)(d.Fragment,{children:["を"," ",(0,d.jsxs)(Er,{children:[e.to.slice(0,6),"...",e.to.slice(-4)]})," ","に転送"]});default:return null}})(t)]})]}),(0,d.jsxs)(jr,{children:[t.price>0&&(0,d.jsxs)($r,{children:[(0,d.jsx)(U,{children:"Ξ"}),t.price]}),(0,d.jsx)(Tr,{children:(l=t.date,new Date(l).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).replace(",",""))})]})]});var l},Cr=a.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.xl};
  /* 確保滾動條不會導致布局偏移 */
  padding-right: calc(${e=>e.theme.spacing.xl} + 6px);
  padding-top: 0; /* 移除頂部間距 */
  margin-top: ${e=>e.theme.spacing.lg}; /* 添加頂部外邊距 */
`,kr=a.Ay.div`
  margin-bottom: ${e=>e.theme.spacing.xl};
  text-align: center;
  padding-top: 0; /* 移除頂部間距 */
`,Sr=a.Ay.h1`
  margin-bottom: ${e=>e.theme.spacing.lg};
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`,Nr=e=>{let{children:t}=e;return(0,d.jsx)(T,{fontSize:"2.5rem",height:"60",maxWidth:"400px",centered:!0,id:`transaction-title-${Math.random().toString(36).substring(7)}`,children:t})},Ir=a.Ay.p`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`,Rr=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
  margin-top: ${e=>e.theme.spacing.lg};
`,zr=a.Ay.div`
  text-align: center;
  padding: 80px 30px;
  color: ${e=>e.theme.colors.text.secondary};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${e=>e.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.7;
  }
`,Lr=e=>{let{children:t}=e;return(0,d.jsx)(T,{fontSize:"1.8rem",height:"40",maxWidth:"300px",centered:!0,id:`empty-title-${Math.random().toString(36).substring(7)}`,children:t})},Or=()=>{const[e,t]=(0,i.useState)(""),[r,n]=(0,i.useState)("all"),[a,o]=(0,i.useState)("recent"),s=(0,i.useCallback)((e=>{t(e)}),[]),l=(0,i.useCallback)((e=>{n(e)}),[]),c=(0,i.useCallback)((e=>{o(e)}),[]),m=(0,i.useMemo)((()=>xe.filter((t=>!(e&&!t.nftName.toLowerCase().includes(e.toLowerCase()))&&("all"===r||t.type===r))).sort(((e,t)=>"price_high"===a?t.price-e.price:"price_low"===a?e.price-t.price:new Date(t.date)-new Date(e.date)))),[e,r,a]);return(0,d.jsxs)(Cr,{className:"content-container",children:[(0,d.jsxs)(kr,{children:[(0,d.jsx)(Sr,{children:(0,d.jsx)(Nr,{children:"取引履歴"})}),(0,d.jsx)(Ir,{children:"あなたのNFT取引履歴を閲覧できます。購入、出品、鋳造、転送などのすべての活動を確認してください。"})]}),(0,d.jsx)(pe,{searchTerm:e,onSearchChange:s,searchPlaceholder:"NFTを検索...",filters:[{value:r,options:[{value:"all",label:"すべての取引"},{value:"purchase",label:"購入"},{value:"sale",label:"販売"},{value:"mint",label:"鋳造"},{value:"transfer",label:"転送"}],onChange:l},{value:a,options:[{value:"recent",label:"最新順"},{value:"price_high",label:"価格（高い順）"},{value:"price_low",label:"価格（安い順）"}],onChange:c}]}),(0,d.jsx)(Rr,{children:m.length>0?m.map((e=>(0,d.jsx)(Ar,{transaction:e},e.id))):(0,d.jsxs)(zr,{children:[(0,d.jsx)("h3",{children:(0,d.jsx)(Lr,{children:"取引記録が見つかりません"})}),(0,d.jsx)("p",{children:"検索条件を変更してお試しください。"})]})})]})},_r=a.Ay.div`
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${e=>e.theme.shadows.medium};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>e.theme.shadows.large};
  }
`,Fr=a.Ay.div`
  width: 100%;
  height: ${e=>e.imageHeight||"300px"};
  position: relative;
`,Pr=a.Ay.div`
  padding: ${e=>e.theme.spacing.lg};
`,Wr=a.Ay.h3`
  margin: 0 0 ${e=>e.theme.spacing.md};
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.primary};
`,Mr=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.md};
`,Dr=a.Ay.div`
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${e=>e.theme.borderRadius.small};
  padding: ${e=>e.theme.spacing.sm};
  text-align: center;

  .trait-type {
    font-size: 0.7rem;
    color: ${e=>e.theme.colors.text.secondary};
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .trait-value {
    font-size: 0.9rem;
    color: ${e=>e.theme.colors.text.primary};
    font-weight: 500;
  }
`,Br=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${e=>e.theme.colors.text.secondary};
`,Ur=a.Ay.div`
  padding: ${e=>e.theme.spacing.lg};
  color: ${e=>e.theme.colors.error};
  text-align: center;
`,Hr=e=>{let{metadataUrl:t,baseUrl:r,tokenId:n,metadata:a,gateway:o,imageHeight:s,className:l,...c}=e;const[m,p]=(0,i.useState)(a||null),[h,g]=(0,i.useState)(!a),[x,u]=(0,i.useState)(null);return(0,i.useEffect)((()=>{if(a)return p(a),void g(!1);if(!(t||r&&void 0!==n))return u("無效的元數據URL或tokenId"),void g(!1);(async()=>{try{g(!0),u(null);const e=t||(0,E.Tc)(r,n,o),i=await fetch(e);if(!i.ok)throw new Error(`獲取元數據失敗: ${i.status} ${i.statusText}`);const a=await i.json();p(a)}catch(e){u(e.message||"獲取元數據失敗")}finally{g(!1)}})()}),[t,r,n,a,o]),h?(0,d.jsx)(Br,{children:"読み込み中..."}):x?(0,d.jsx)(Ur,{children:x}):m?(0,d.jsxs)(_r,{className:l,...c,children:[(0,d.jsx)(Fr,{imageHeight:s,children:(0,d.jsx)(z,{src:m.image,alt:m.name||"NFT Image",gateway:o,height:"100%",width:"100%",objectFit:"cover"})}),(0,d.jsxs)(Pr,{children:[(0,d.jsx)(Wr,{children:m.name||"Unnamed NFT"}),m.description&&(0,d.jsx)("p",{children:m.description}),m.attributes&&m.attributes.length>0&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h4",{children:"属性"}),(0,d.jsx)(Mr,{children:m.attributes.map(((e,t)=>(0,d.jsxs)(Dr,{children:[(0,d.jsx)("div",{className:"trait-type",children:e.trait_type}),(0,d.jsx)("div",{className:"trait-value",children:e.value})]},t)))})]})]})]}):(0,d.jsx)(Ur,{children:"メタデータが見つかりません"})},Gr=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.xl};
`,qr=a.Ay.section`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.large};
  padding: ${e=>e.theme.spacing.lg};
  box-shadow: ${e=>e.theme.shadows.medium};
`,Qr=a.Ay.h2`
  margin-bottom: ${e=>e.theme.spacing.md};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1.5rem;
`,Xr=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing.md};
  margin-top: ${e=>e.theme.spacing.md};
`,Yr=a.Ay.pre`
  background: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.md};
  overflow-x: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  margin: ${e=>e.theme.spacing.md} 0;
`,Vr=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing.lg};
  margin-top: ${e=>e.theme.spacing.md};
`,Kr=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.md};

  label {
    font-size: 0.9rem;
    color: ${e=>e.theme.colors.text.secondary};
  }

  input {
    padding: ${e=>e.theme.spacing.sm};
    border-radius: ${e=>e.theme.borderRadius.small};
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.colors.text.primary};
  }
`,Zr=a.Ay.button`
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.sm}
    ${e=>e.theme.spacing.lg};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  margin-top: ${e=>e.theme.spacing.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`,Jr=a.Ay.div`
  margin-top: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.9rem;

  &.success {
    background-color: rgba(0, 200, 83, 0.1);
    color: #00c853;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff0000;
  }

  &.loading {
    background-color: rgba(33, 150, 243, 0.1);
    color: #2196f3;
  }
`,ei=()=>{const[e,t]=(0,i.useState)("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"),[r,n]=(0,i.useState)("0"),[a,o]=(0,i.useState)(""),[s,l]=(0,i.useState)("0"),[c,m]=(0,i.useState)("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"),[p,h]=(0,i.useState)(null),[g,x]=(0,i.useState)(""),[u,f]=(0,i.useState)(null),[b,w]=(0,i.useState)("");return(0,d.jsxs)(Gr,{children:[(0,d.jsxs)(qr,{children:[(0,d.jsx)(Qr,{children:"IPFSイメージコンポーネント"}),(0,d.jsx)("p",{children:"このコンポーネントはIPFSプロトコルの画像URLを処理し、正しく表示します。"}),(0,d.jsx)(Yr,{children:'import IPFSImage from \'../IPFSImage\';\n          \n// 使用例\n<IPFSImage \n  src="ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ" \n  alt="Bored Ape" \n  width="200px"\n  height="200px"\n/>'}),(0,d.jsx)("h3",{children:"さまざまなIPFS URL形式のデモ:"}),(0,d.jsx)(Xr,{children:["ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ","ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ","QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ"].map(((e,t)=>(0,d.jsxs)("div",{children:[(0,d.jsxs)("p",{children:["URL: ",e]}),(0,d.jsxs)("p",{children:["変換後: ",(0,E.getHttpUrl)(e)]}),(0,d.jsx)(z,{src:e,alt:`IPFS Image ${t}`,width:"100%",height:"200px",borderRadius:"10px"})]},t)))})]}),(0,d.jsxs)(qr,{children:[(0,d.jsx)(Qr,{children:"NFTメタデータコンポーネント"}),(0,d.jsx)("p",{children:"このコンポーネントはNFTのメタデータを取得し、画像と属性を表示します。"}),(0,d.jsx)(Yr,{children:'import NFTMetadata from \'../NFTMetadata\';\n          \n// メタデータオブジェクトを直接提供する場合\n<NFTMetadata \n  metadata={sampleMetadata} \n  imageHeight="300px"\n/>\n\n// ベースURLとトークンIDを提供して自動的にメタデータを取得する場合\n<NFTMetadata \n  baseUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq" \n  tokenId="0"\n  imageHeight="300px"\n/>\n\n// メタデータURLを直接提供する場合\n<NFTMetadata \n  metadataUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0" \n  imageHeight="300px"\n/>'}),(0,d.jsx)("h3",{children:"サンプルメタデータの表示:"}),(0,d.jsxs)(Vr,{children:[(0,d.jsx)(Hr,{metadata:{image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",attributes:[{trait_type:"Earring",value:"Silver Hoop"},{trait_type:"Background",value:"Orange"},{trait_type:"Fur",value:"Robot"},{trait_type:"Clothes",value:"Striped Tee"},{trait_type:"Mouth",value:"Discomfort"},{trait_type:"Eyes",value:"X Eyes"}],name:"Bored Ape #0",description:"BAYC是一個NFT集合，每個令牌是由Boring Ape Yacht Club產生的獨特的無聊猿。"},imageHeight:"300px"}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{children:"独自のNFTメタデータを取得する"}),(0,d.jsxs)(Kr,{children:[(0,d.jsx)("label",{children:"ベースURL:"}),(0,d.jsx)("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"})]}),(0,d.jsxs)(Kr,{children:[(0,d.jsx)("label",{children:"トークンID:"}),(0,d.jsx)("input",{type:"text",value:r,onChange:e=>n(e.target.value),placeholder:"0"})]}),(0,d.jsx)("p",{children:"または"}),(0,d.jsxs)(Kr,{children:[(0,d.jsx)("label",{children:"メタデータURL (オプション):"}),(0,d.jsx)("input",{type:"text",value:a,onChange:e=>o(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0"})]}),(0,d.jsx)(Zr,{onClick:()=>{t(e),n(r),o(a)},children:"更新"})]})]}),a?(0,d.jsxs)("div",{style:{marginTop:"20px"},children:[(0,d.jsx)("h3",{children:"カスタムURLの結果:"}),(0,d.jsx)(Hr,{metadataUrl:a,imageHeight:"300px"})]}):e&&r&&(0,d.jsxs)("div",{style:{marginTop:"20px"},children:[(0,d.jsx)("h3",{children:"ベースURL + トークンIDの結果:"}),(0,d.jsx)(Hr,{baseUrl:e,tokenId:r,imageHeight:"300px"})]})]}),(0,d.jsxs)(qr,{children:[(0,d.jsx)(Qr,{children:"トークンIDに基づいたNFTメタデータの取得"}),(0,d.jsx)("p",{children:"TokenIDを使用してIPFSからNFTメタデータと画像を動的に取得するデモです。"}),(0,d.jsx)(Yr,{children:'// TokenID に基づいてメタデータと画像を取得\nimport { fetchNFTMetadata, fetchNFTImageUrl } from "../../utils/ipfsUtils";\n\n// メタデータを取得\nconst metadata = await fetchNFTMetadata(\n  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", \n  "0"\n);\n\n// 画像URLを直接取得\nconst imageUrl = await fetchNFTImageUrl(\n  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", \n  "0"\n);'}),(0,d.jsxs)(Kr,{children:[(0,d.jsx)("label",{children:"ベースURL:"}),(0,d.jsx)("input",{type:"text",value:c,onChange:e=>m(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"})]}),(0,d.jsxs)(Kr,{children:[(0,d.jsx)("label",{children:"トークンID:"}),(0,d.jsx)("input",{type:"text",value:s,onChange:e=>l(e.target.value),placeholder:"0"})]}),(0,d.jsx)(Zr,{onClick:async()=>{try{f("loading"),w("");const e=await(0,E.SU)(c,s);h(e);const t=await(0,E.nI)(c,s);x(t),f("success")}catch(e){f("error"),w(e.message||"獲取元數據失敗")}},children:"メタデータとイメージを取得"}),"loading"===u&&(0,d.jsx)(Jr,{className:"loading",children:"読み込み中..."}),"error"===u&&(0,d.jsx)(Jr,{className:"error",children:b}),"success"===u&&(0,d.jsxs)("div",{children:[(0,d.jsx)(Jr,{className:"success",children:"メタデータを正常に取得しました！"}),(0,d.jsx)("h3",{children:"取得したメタデータ:"}),(0,d.jsx)(Yr,{children:JSON.stringify(p,null,2)}),(0,d.jsx)("h3",{children:"画像URL:"}),(0,d.jsx)("p",{children:g}),(0,d.jsx)("h3",{children:"画像プレビュー:"}),(0,d.jsx)(z,{src:g,alt:"Dynamic NFT Image",width:"300px",height:"300px",borderRadius:"10px"})]})]})]})},ti=()=>(0,d.jsx)("main",{children:(0,d.jsxs)(x.BV,{children:[(0,d.jsx)(x.qh,{path:"/",element:(0,d.jsx)(lt,{})}),(0,d.jsx)(x.qh,{path:"/my-nfts",element:(0,d.jsx)(xr,{})}),(0,d.jsx)(x.qh,{path:"/history",element:(0,d.jsx)(Or,{})}),(0,d.jsx)(x.qh,{path:"/mint-venape",element:(0,d.jsx)(Yt,{})}),(0,d.jsx)(x.qh,{path:"/ipfs-example",element:(0,d.jsx)(ei,{})})]})});var ri=r(8484);const ii={NODE_ENV:"production",PUBLIC_URL:"/nftswap",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_PUBLIC_URL:"/nftswap"}.REACT_APP_WALLET_CONNECT_PROJECT_ID||"YOUR_WALLET_CONNECT_PROJECT_ID",ni=()=>"undefined"!=typeof window&&Boolean(window.ethereum),ai=async e=>{let t,i,n;try{if("metamask"===e){if(!ni())throw new Error("請安裝MetaMask錢包擴展");const e=await window.ethereum.request({method:"eth_accounts"});e&&0!==e.length||await window.ethereum.request({method:"eth_requestAccounts"}),t=new ri.k(window.ethereum);const r=await window.ethereum.request({method:"eth_chainId"});i=parseInt(r,16).toString();n=(await window.ethereum.request({method:"eth_accounts"}))[0]}else{if("walletconnect"!==e)throw new Error("不支持的錢包類型");try{const{EthereumProvider:e}=await Promise.all([r.e(326),r.e(455)]).then(r.bind(r,5785)),a=await e.init({projectId:ii,chains:[97],optionalChains:[1,5,11155111,31337],showQrModal:!0,methods:["eth_sendTransaction","eth_signTransaction","personal_sign","eth_sign","eth_signTypedData"],events:["chainChanged","accountsChanged"],rpcMap:{1:"https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",5:"https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",11155111:"https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",97:"https://bsc-testnet-dataseed.bnbchain.org",31337:"http://localhost:8545"},metadata:{name:"NFT交易平台",description:"使用WalletConnect連接到NFT交易平台",url:window.location.origin,icons:[`${window.location.origin}/logo192.png`]}});await a.enable(),t=new ri.k(a);i=(await t.getNetwork()).chainId.toString();const o=await t.listAccounts();n=await o[0].getAddress()}catch(e){throw new Error("WalletConnect連接失敗，請重試")}}return{provider:t,address:n,chainId:i}}catch(e){throw e}},oi=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4;return e?e.length<t+r?e:`${e.substring(0,t)}...${e.substring(e.length-r)}`:""};var si=r(5575);const di="SUCCESS",li="ERROR",ci="WARNING",mi="INFO",pi="ADD",hi="REMOVE",gi="CLEAR_ALL",xi=(0,i.createContext)(),ui={notifications:[]},fi=(e,t)=>{switch(t.type){case pi:return{...e,notifications:[...e.notifications,t.payload]};case hi:return{...e,notifications:e.notifications.filter((e=>e.id!==t.payload))};case gi:return{...e,notifications:[]};default:return e}},bi=e=>{let{children:t}=e;const[r,n]=(0,i.useReducer)(fi,ui),a=(0,i.useCallback)((e=>{const t=e.id||(0,si.A)(),r={id:t,type:mi,title:"",message:"",autoClose:!0,duration:5e3,...e,createdAt:new Date};return n({type:pi,payload:r}),t}),[]),o=(0,i.useCallback)((e=>{n({type:hi,payload:e})}),[]),s=(0,i.useCallback)((()=>{n({type:gi})}),[]),l=(0,i.useCallback)((function(e){return a({type:di,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),c=(0,i.useCallback)((function(e){return a({type:li,message:e,autoClose:!1,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),m=(0,i.useCallback)((function(e){return a({type:ci,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),p=(0,i.useCallback)((function(e){return a({type:mi,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),h={notifications:r.notifications,addNotification:a,removeNotification:o,clearAllNotifications:s,showSuccess:l,showError:c,showWarning:m,showInfo:p};return(0,d.jsx)(xi.Provider,{value:h,children:t})},wi=()=>{const e=(0,i.useContext)(xi);if(void 0===e)throw new Error("useNotification must be used within a NotificationProvider");return e},yi="97",vi="31337",ji={WALLET_CONNECTED:"ウォレットが接続されました",WALLET_CONNECTED_TITLE:"接続完了",WALLET_RECONNECTED:"ウォレットが再接続されました",WALLET_RECONNECTED_TITLE:"再接続完了",WALLET_DISCONNECT:"ウォレットとの接続が切断されました",WALLET_DISCONNECT_TITLE:"切断完了",NETWORK_MISMATCH:"ローカルネットワークに切り替えて最適な体験を得てください",NETWORK_MISMATCH_TITLE:"ネットワーク不一致",NETWORK_CHANGED:"ネットワークが変更されました",CHAIN_ID:"チェーンID",LOCALHOST_CONNECTED:"ローカルネットワークでは全ての機能が利用可能です",LOCALHOST_CONNECTED_TITLE:"ローカルネットワークに接続済み",NON_LOCALHOST:"このアプリはローカルネットワーク向けに最適化されています。一部の機能が正常に動作しない可能性があります",NON_LOCALHOST_TITLE:"ローカルネットワーク以外",BSC_CONNECTED:"BSCテストネットでは全ての機能が利用可能です",BSC_CONNECTED_TITLE:"BSCテストネットに接続済み",NON_BSC:"このアプリはBSCテストネット向けに最適化されています。一部の機能が正常に動作しない可能性があります",NON_BSC_TITLE:"BSCテストネット以外",ALREADY_ON_BSC:"すでにBSCテストネットに接続されています",ALREADY_ON_BSC_TITLE:"BSCテストネット接続済み",ACCOUNT_CHANGED:"ウォレットアカウントが変更されました",NEW_ADDRESS:"新しいアドレス",SWITCHING_NETWORK:"ローカルネットワークに切り替え中...",SWITCHING_NETWORK_TITLE:"ネットワーク切り替え中",NETWORK_SWITCHED:"ローカルネットワークへの切り替えが成功しました",NETWORK_SWITCHED_TITLE:"ネットワーク切り替え完了",ALREADY_ON_LOCALHOST:"すでにローカルネットワークに接続されています",ALREADY_ON_LOCALHOST_TITLE:"ローカルネットワーク接続済み",SWITCH_FAILED:"ネットワーク切り替えに失敗しました。手動で切り替えてください",SWITCH_FAILED_TITLE:"切り替え失敗",WALLET_ERROR:"ウォレット設定を確認して再試行してください",WALLET_ERROR_TITLE:"ウォレット接続エラー",WALLET_RECONNECT_ERROR:"手動でウォレットを接続してください",WALLET_RECONNECT_ERROR_TITLE:"ウォレット再接続失敗",NO_WALLET:"ウォレットが検出されないか、ネットワーク切り替えをサポートしていません",NO_WALLET_TITLE:"ネットワーク切り替え不可",CONNECTION_ERROR:"ウォレット接続中にエラーが発生しました",CONNECTION_ERROR_TITLE:"接続エラー",RETRY_CONNECTION:"接続を再試行",CONNECTION_TIMEOUT:"ウォレット接続がタイムアウトしました。再度お試しください。",CONNECTION_TIMEOUT_TITLE:"接続タイムアウト"};let $i=0;const Ti=(0,i.createContext)(null),Ei=e=>{let{children:t}=e;const{showSuccess:n,showError:a,showWarning:o,showInfo:s}=wi(),[l,c]=(0,i.useState)(null),[m,p]=(0,i.useState)(null),[h,g]=(0,i.useState)(!1),[x,u]=(0,i.useState)(null),[f,b]=(0,i.useState)(null),[w,y]=(0,i.useState)(0),[v,j]=(0,i.useState)(null),$=(0,i.useCallback)((()=>{g(!1),y(0),j(null)}),[]),T=(0,i.useCallback)((()=>{localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.removeItem("walletDisconnected")}),[]),E=(0,i.useCallback)((async()=>{if(w>=3)return a(ji.CONNECTION_ERROR+" - "+ji.CONNECTION_TIMEOUT,{title:ji.CONNECTION_ERROR_TITLE}),$(),void T();y((e=>e+1)),g(!0),T();try{if(!window.ethereum)throw new Error("MetaMask未安裝");await window.ethereum.request({method:"eth_requestAccounts"}),window.location.reload()}catch(e){j(e.message),a(ji.CONNECTION_ERROR+": "+e.message,{title:ji.CONNECTION_ERROR_TITLE,actions:[{label:ji.RETRY_CONNECTION,onClick:E}]}),$()}}),[w,$,T,a]);(0,i.useEffect)((()=>{let e=null;return(async()=>{e=setTimeout((()=>{g(!1),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),c(null),p(null),u(null),b(null)}),5e3);try{if(window.ethereum)try{g(!0);const t=await window.ethereum.request({method:"eth_chainId"}),r=parseInt(t,16).toString(),i=await window.ethereum.request({method:"eth_accounts"});if(i&&i.length>0){const t=i[0],a=new ri.k(window.ethereum);return p(a),c(t),u(r),b("metamask"),localStorage.setItem("walletType","metamask"),localStorage.setItem("walletLastConnected",Date.now().toString()),n(ji.WALLET_CONNECTED,{title:ji.WALLET_CONNECTED_TITLE,message:`${ji.NEW_ADDRESS}: ${t.substring(0,6)}...${t.substring(t.length-4)}`}),r!==vi&&"1337"!==r&&o(ji.NETWORK_MISMATCH,{title:ji.NETWORK_MISMATCH_TITLE}),clearTimeout(e),void g(!1)}}catch(e){}const t=localStorage.getItem("walletType"),r=localStorage.getItem("walletLastConnected");if("true"===localStorage.getItem("walletDisconnected")||r&&Date.now()-parseInt(r)>864e5)return localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.removeItem("walletDisconnected"),clearTimeout(e),void g(!1);if(t)try{const{provider:e,address:r,chainId:i}=await ai(t);e&&r?(p(e),c(r),u(i),b(t),localStorage.setItem("walletLastConnected",Date.now().toString()),n(ji.WALLET_RECONNECTED,{title:ji.WALLET_RECONNECTED_TITLE,message:`${ji.NEW_ADDRESS}: ${r.substring(0,6)}...${r.substring(r.length-4)}`}),i!==vi&&"1337"!==i&&o(ji.NETWORK_MISMATCH,{title:ji.NETWORK_MISMATCH_TITLE})):(localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"))}catch(e){localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),a(e.message||ji.WALLET_RECONNECT_ERROR,{title:ji.WALLET_RECONNECT_ERROR_TITLE})}}catch(e){}finally{clearTimeout(e),g(!1)}})(),()=>{e&&clearTimeout(e)}}),[n,a,o]),(0,i.useEffect)((()=>{if(!m)return;let e=!1;const t=t=>{if(0===t.length)e=!0,A(!0),e=!1;else{if(c(t[0]),window.ethereum){const e=new ri.k(window.ethereum);p(e),window.ethereum.request({method:"eth_chainId"}).then((e=>{const r=parseInt(e,16).toString();u(r),"31337"!==r&&"1337"!==r||(u(r),c(t[0]),window.ethereum.request({method:"wallet_removeEthereumChain",params:[{chainId:"0x7A69"}]}).catch((()=>{})).then((()=>window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:"0x7A69",chainName:"Hardhat Local",nativeCurrency:{name:"Ethereum",symbol:"ETH",decimals:18},rpcUrls:["http://127.0.0.1:8545","http://localhost:8545"],blockExplorerUrls:[]}]}))).then((()=>window.ethereum.request({method:"eth_requestAccounts",params:[]}))).then((()=>{})).catch((e=>{o("Hardhatネットワークへの接続に問題があります。開發環境で動作確認する場合は、MetaMaskでアカウントをクリックして「localhost:3000に接続」を選択してください。",{title:"Hardhat接続警告"})})))})).catch((e=>{}))}s(`${ji.NEW_ADDRESS}: ${t[0].substring(0,6)}...${t[0].substring(t[0].length-4)}`,{title:ji.ACCOUNT_CHANGED}),x!==vi&&"1337"!==x&&o(ji.NETWORK_MISMATCH,{title:ji.NETWORK_MISMATCH_TITLE})}},r=e=>{const t=parseInt(e,16).toString();if(u(t),s(`${ji.CHAIN_ID}: ${t}`,{title:ji.NETWORK_CHANGED}),t===vi||"1337"===t?n(ji.LOCALHOST_CONNECTED,{title:ji.LOCALHOST_CONNECTED_TITLE}):o(ji.NON_LOCALHOST,{title:ji.NON_LOCALHOST_TITLE}),window.ethereum){const e=new ri.k(window.ethereum);p(e)}},i=()=>{e||(e=!0,A(!0),e=!1)};return"metamask"===f&&window.ethereum&&(window.ethereum.on("accountsChanged",t),window.ethereum.on("chainChanged",r),window.ethereum.on("disconnect",i)),()=>{"metamask"===f&&window.ethereum&&(window.ethereum.removeListener("accountsChanged",t),window.ethereum.removeListener("chainChanged",r),window.ethereum.removeListener("disconnect",i))}}),[m,f,s,n,o]);const A=(0,i.useCallback)((async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{const t=Date.now(),i=!e&&t-$i>1e3;if(i&&($i=t),window.ethereum&&"metamask"===f){try{await window.ethereum.request({method:"wallet_revokePermissions",params:[{eth_accounts:{}}]}).catch((e=>{}))}catch(e){}return c(null),p(null),u(null),b(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true"),void(i&&s(ji.WALLET_DISCONNECT,{title:ji.WALLET_DISCONNECT_TITLE}))}(async e=>{if("walletconnect"===e)try{const{EthereumProvider:e}=await Promise.all([r.e(326),r.e(455)]).then(r.bind(r,5785)),t=await e.init({projectId:ii});t.connected&&await t.disconnect()}catch(e){}})(f),c(null),p(null),u(null),b(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true"),i&&s(ji.WALLET_DISCONNECT,{title:ji.WALLET_DISCONNECT_TITLE})}catch(t){c(null),p(null),u(null),b(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true");const r=Date.now();!e&&r-$i>1e3&&($i=r,s(ji.WALLET_DISCONNECT,{title:ji.WALLET_DISCONNECT_TITLE}))}}),[f,s]),C=async e=>{if(!m||!window.ethereum)return a(ji.NO_WALLET,{title:ji.NO_WALLET_TITLE}),!1;try{const t=`0x${parseInt(e).toString(16)}`;return await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:t}]}),!0}catch(t){return 4902===t.code&&e===vi?await(async()=>{if(!window.ethereum)return!1;try{return await window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:"0x61",chainName:"BSC Testnet",nativeCurrency:{name:"tBNB",symbol:"tBNB",decimals:18},rpcUrls:["https://bsc-testnet-dataseed.bnbchain.org","https://bsc-testnet-dataseed1.bnbchain.org","https://bsc-testnet-dataseed2.bnbchain.org","https://bsc-testnet-dataseed3.bnbchain.org","https://bsc-testnet-dataseed4.bnbchain.org","https://data-seed-prebsc-1-s1.bnbchain.org:8545","https://data-seed-prebsc-2-s1.bnbchain.org:8545"],blockExplorerUrls:["https://testnet.bscscan.com"]}]}),await window.ethereum.request({method:"eth_chainId"}),!0}catch(e){return!1}})():(a(t.message||"請檢查您的錢包設置並重試",{title:"網絡切換失敗"}),!1)}},k=x===vi||"1337"===x;(0,i.useEffect)((()=>{if(h){const e=setTimeout((()=>{o(ji.CONNECTION_TIMEOUT,{title:ji.CONNECTION_TIMEOUT_TITLE,actions:[{label:ji.RETRY_CONNECTION,onClick:()=>{$(),T(),E()}}]}),$()}),15e3);return()=>clearTimeout(e)}}),[h,o,E,$,T]);const S={account:l,provider:m,connect:async e=>{if(h)return;let t=null;try{if(g(!0),t=setTimeout((()=>{g(!1),a(ji.CONNECTION_TIMEOUT,{title:ji.CONNECTION_TIMEOUT_TITLE}),localStorage.setItem("walletConnectionTimeout","true"),setTimeout((()=>{localStorage.removeItem("walletConnectionTimeout")}),5e3)}),2e4),"true"===localStorage.getItem("walletConnectionTimeout"))throw new Error(ji.CONNECTION_TIMEOUT);localStorage.removeItem("walletDisconnected");const{provider:r,address:i,chainId:s}=await ai(e);return clearTimeout(t),localStorage.removeItem("walletConnectionTimeout"),!(!r||!i)&&(p(r),c(i),u(s),b(e),localStorage.setItem("walletType",e),localStorage.setItem("walletLastConnected",Date.now().toString()),n(`${ji.NEW_ADDRESS}: ${i.substring(0,6)}...${i.substring(i.length-4)}`,{title:ji.WALLET_CONNECTED_TITLE}),s!==vi&&"1337"!==s&&o(ji.NETWORK_MISMATCH,{title:ji.NETWORK_MISMATCH_TITLE}),!0)}catch(e){return t&&clearTimeout(t),a(e.message||ji.WALLET_ERROR,{title:ji.WALLET_ERROR_TITLE}),!1}finally{t&&clearTimeout(t),g(!1)}},disconnect:A,isConnecting:h,chainId:x,walletType:f,isConnected:Boolean(l),switchChain:C,switchToBscTestnet:async()=>{if(x===yi)return s(ji.ALREADY_ON_BSC,{title:ji.ALREADY_ON_BSC_TITLE}),!0;try{s(ji.SWITCHING_NETWORK.replace("ローカルネットワーク","BSCテストネット"),{title:ji.SWITCHING_NETWORK_TITLE});const e=await C(yi);if(e&&(n(ji.NETWORK_SWITCHED.replace("ローカルネットワーク","BSCテストネット"),{title:ji.NETWORK_SWITCHED_TITLE}),u(yi),window.ethereum)){const e=new ri.k(window.ethereum);p(e);const t=await window.ethereum.request({method:"eth_accounts"});t&&t.length>0&&c(t[0])}return e}catch(e){return a(e.message||ji.SWITCH_FAILED,{title:ji.SWITCH_FAILED_TITLE}),!1}},isBscTestnet:x===yi,switchToLocalhost:async()=>{if(x===vi||"1337"===x)return s(ji.ALREADY_ON_LOCALHOST,{title:ji.ALREADY_ON_LOCALHOST_TITLE}),!0;try{s(ji.SWITCHING_NETWORK,{title:ji.SWITCHING_NETWORK_TITLE});let e=!1;if(e=await C(vi),e||(e=await C("1337")),e&&(n(ji.NETWORK_SWITCHED,{title:ji.NETWORK_SWITCHED_TITLE}),u(vi),window.ethereum)){const e=new ri.k(window.ethereum);p(e);const t=await window.ethereum.request({method:"eth_accounts"});t&&t.length>0&&c(t[0])}return e}catch(e){return a(e.message||ji.SWITCH_FAILED,{title:ji.SWITCH_FAILED_TITLE}),!1}},isLocalhost:k};return(0,d.jsx)(Ti.Provider,{value:S,children:t})},Ai=()=>{const e=(0,i.useContext)(Ti);if(null===e)throw new Error("useWallet必須在WalletProvider內使用");return e},Ci=a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`,ki=a.Ay.div`
  background-color: #1c2241;
  border-radius: 16px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,Si=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,Ni=a.Ay.h3`
  font-size: 20px;
  color: #fff;
  margin: 0;
`,Ii=a.Ay.button`
  background: transparent;
  border: none;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #fff;
  }
`,Ri=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,zi=a.Ay.button`
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"rgba(255, 255, 255, 0.05)":"rgba(255, 255, 255, 0.1)"};
    transform: ${e=>e.disabled?"none":"translateY(-2px)"};
  }

  &:active {
    transform: ${e=>e.disabled?"none":"translateY(0)"};
  }
`,Li=a.Ay.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`,Oi=a.Ay.div`
  flex: 1;
  text-align: left;
`,_i=a.Ay.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`,Fi=a.Ay.div`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`,Pi=a.Ay.div`
  background: rgba(0, 255, 176, 0.1);
  border: 1px solid rgba(0, 255, 176, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`,Wi=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`,Mi=a.Ay.div`
  font-family: monospace;
  font-size: 16px;
  color: #fff;
`,Di=a.Ay.button`
  background: rgba(255, 100, 100, 0.1);
  color: #ff6464;
  border: 1px solid rgba(255, 100, 100, 0.3);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 100, 100, 0.2);
  }
`,Bi=a.Ay.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 8px;
`,Ui=a.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.color||"#00ffb0"};
  margin-right: 8px;
  display: inline-block;
`,Hi=a.Ay.button`
  display: block;
  width: 100%;
  background: rgba(59, 153, 252, 0.1);
  color: #3b99fc;
  border: 1px solid rgba(59, 153, 252, 0.3);
  border-radius: 8px;
  padding: 10px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(59, 153, 252, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Gi=a.Ay.div`
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #3b99fc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,qi=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #3b99fc;
  font-size: 16px;
  text-align: center;
`,Qi=a.Ay.span`
  margin-left: 8px;
`,Xi=e=>{var t;let{isOpen:r,onClose:i}=e;const{connect:n,disconnect:a,account:o,isConnecting:s,chainId:l,walletType:c,isConnected:m,switchToLocalhost:p,isLocalhost:h}=Ai(),g=[{id:"metamask",name:"MetaMask",icon:"/images/wallets/metamask.svg"},{id:"walletconnect",name:"WalletConnect",icon:"/images/wallets/walletconnect.svg"}];if(!r)return null;const x=(e=>{let t=e;return"string"==typeof e&&e.startsWith("0x")&&(t=parseInt(e,16).toString()),{1:{name:"Ethereum Mainnet",color:"#627EEA"},5:{name:"Goerli Testnet",color:"#F6C343"},11155111:{name:"Sepolia Testnet",color:"#CFB5F0"},97:{name:"BSC Testnet",color:"#F3BA2F"},31337:{name:"Hardhat Local",color:"#00FFC8"},1337:{name:"Localhost Network",color:"#00FFC8"}}[t]||{name:`Unknown Network (${t})`,color:"#FF6B6B"}})(l);return(0,d.jsx)(Ci,{onClick:i,children:(0,d.jsxs)(ki,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(Si,{children:[(0,d.jsx)(Ni,{children:m?"ウォレット接続済み":"ウォレットを接続"}),(0,d.jsx)(Ii,{onClick:i,children:"×"})]}),m?(0,d.jsxs)(Pi,{children:[(0,d.jsx)(_i,{children:(null===(t=g.find((e=>e.id===c)))||void 0===t?void 0:t.name)||c}),(0,d.jsxs)(Bi,{children:[(0,d.jsx)(Ui,{color:x.color})," ",x.name]}),(0,d.jsxs)(Wi,{children:[(0,d.jsx)(Mi,{children:oi(o)}),(0,d.jsx)(Di,{onClick:()=>{a(),i()},children:"切断する"})]}),!h&&(0,d.jsx)(Hi,{onClick:async()=>{await p()&&setTimeout((()=>{window.location.reload()}),1500)},children:"ローカルネットワークに切り替え"})]}):s?(0,d.jsxs)(qi,{children:[(0,d.jsx)(Gi,{}),(0,d.jsx)(Qi,{children:"接続中..."})]}):(0,d.jsxs)(Ri,{children:[g.map((e=>(0,d.jsxs)(zi,{onClick:()=>(async e=>{try{await n(e)&&i()}catch(e){}})(e.id),disabled:s,children:[(0,d.jsx)(Li,{src:e.icon,alt:e.name}),(0,d.jsxs)(Oi,{children:[(0,d.jsx)(_i,{children:e.name}),(0,d.jsx)(Fi,{children:"metamask"===e.id?"最も人気のあるイーサリアムウォレット":"サポートされている任意のウォレットアプリに接続"})]})]},e.id))),(0,d.jsx)("div",{style:{marginTop:"16px",textAlign:"center",color:"#999",fontSize:"13px"},children:"このアプリはローカルネットワーク（Chain ID: 31337または1337）向けに最適化されています"})]})]})})},Yi=((0,a.Ay)(o.N_)`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`,()=>{const{account:e,isConnected:t,isConnecting:r}=Ai(),[n,a]=(0,i.useState)(!1),[s,l]=(0,i.useState)(!1),c=()=>{l(!1),ue.current=null,window.dispatchEvent(new CustomEvent("nft-cleared"))},m=()=>{a(!0)};return(0,d.jsxs)("div",{className:"navbar-wrapper",children:[(0,d.jsx)("div",{className:"navbar-container",children:(0,d.jsxs)("div",{className:"navbar-content",children:[(0,d.jsx)(o.N_,{to:"/",className:"logo",onClick:c,children:"NFTマーケット"}),(0,d.jsxs)("div",{className:"nav-links "+(s?"active":""),children:[(0,d.jsx)(o.N_,{to:"/",className:"nav-link",onClick:c,children:"ホーム"}),(0,d.jsx)(o.N_,{to:"/my-nfts",className:"nav-link",onClick:c,children:"マイNFT"}),(0,d.jsx)(o.N_,{to:"/history",className:"nav-link",onClick:c,children:"取引履歴"}),(0,d.jsx)(o.N_,{to:"/mint-venape",className:"nav-link",onClick:c,children:"Mint VenAPE"})]}),(0,d.jsxs)("div",{className:"navbar-right",children:[t?(0,d.jsx)("button",{className:"wallet-button connected",onClick:m,children:oi(e)}):(0,d.jsx)("button",{className:"wallet-button",onClick:m,disabled:r,children:r?"接続中...":"ウォレット接続"}),(0,d.jsx)("div",{className:"menu-toggle",onClick:()=>{l(!s)},children:(0,d.jsxs)("div",{className:"hamburger",children:[(0,d.jsx)("span",{}),(0,d.jsx)("span",{}),(0,d.jsx)("span",{})]})})]})]})}),(0,d.jsx)(Xi,{isOpen:n,onClose:()=>{a(!1)}})]})}),Vi=a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`,Ki=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(227, 229, 248, 0.05) 0%,
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(234, 237, 240, 0.05) 0%,
      transparent 60%
    );
`,Zi=a.Ay.div.attrs((e=>({style:{width:`${e.$size}px`,height:`${e.$size}px`,top:`${e.$top}%`,left:`${e.$left}%`,background:e.$gradient}})))`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.04;
  transition: opacity 0.5s ease;
`,Ji=a.Ay.div.attrs((e=>({style:{top:`${e.$top}%`,left:`${e.$left}%`,width:`${e.$size}px`,height:`${e.$size}px`,backgroundColor:e.$opacity>1.2?"rgba(255, 255, 255, 1)":`rgba(175, 175, 175, ${e.$opacity})`,boxShadow:e.$isBright&&!e.$isUltraBright?`0 0 ${1.3*e.$size}px rgba(255, 255, 255, 0.7)`:e.$isUltraBright?`0 0 ${1.5*e.$size}px rgba(255, 255, 255, 0.8),\n           0 0 ${2.5*e.$size}px rgba(255, 255, 255, 0.6),\n           0 0 ${3.5*e.$size}px rgba(255, 255, 255, 0.4)`:"none"}})))`
  position: absolute;
  border-radius: 50%;
  z-index: 1;

  /* 使用伪元素创建径向渐变，避免直接在DOM元素上设置属性 */
  ${e=>e.$isUltraBright?`\n    &::after {\n      content: "";\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: ${4*e.$size}px;\n      height: ${4*e.$size}px;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        circle at center,\n        rgba(255, 255, 255, 0.8) 0%,\n        rgba(255, 255, 255, 0.3) 20%,\n        rgba(255, 255, 255, 0.1) 30%,\n        transparent 70%\n      );\n    }\n  `:""}
`,en=a.Ay.div.attrs((e=>({style:{top:`${e.$top}%`,left:`${e.$left}%`,width:10*e.$size+"px",height:10*e.$size+"px"}})))`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 0;

  /* 提取共用的背景样式 */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='white' opacity='0.7' d='M50 0 L52 48 L100 50 L52 52 L50 100 L48 52 L0 50 L48 48 Z' /%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &::before {
    transform: translate(-50%, -50%);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(22.5deg);
    opacity: 0.5;
  }
`,tn=()=>{const{performanceMode:e,animationsEnabled:t}=(0,i.useContext)(u),[r,n]=(0,i.useState)(!1);(0,i.useEffect)((()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n(e)}),[]);const a=r||!t||e,o=(0,i.useMemo)((()=>a?[]:Array.from({length:1500},((e,t)=>{const r=Math.random(),i=r<.7?.6+.4*Math.random():r<.9?1.2+.5*Math.random():r<.97?1.7+.3*Math.random():1.8+.3*Math.random(),n=Math.random(),a=n<.01?2+1*Math.random():n<.05?1.3+.7*Math.random():n<.2?.9+.4*Math.random():.5*Math.random()+.1;return{id:t,size:a>2?.9+.3*Math.random():a>1.3?1+.4*Math.random():i,top:100*Math.random(),left:100*Math.random(),opacity:a,isBright:a>1.3&&a<=2,isUltraBright:a>2}}))),[a]),s=(0,i.useMemo)((()=>a?[]:[{size:500,top:5,left:-15,gradient:"linear-gradient(135deg, #1a237e 0%, #283593 100%)"},{size:350,top:80,left:80,gradient:"linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)"}]),[a]);return a?(0,d.jsx)(Vi,{children:(0,d.jsx)(Ki,{})}):(0,d.jsxs)(Vi,{children:[(0,d.jsx)(Ki,{}),s.map(((e,t)=>(0,d.jsx)(Zi,{$size:e.size,$top:e.top,$left:e.left,$gradient:e.gradient},t))),o.filter((e=>e.isUltraBright)).map((e=>(0,d.jsx)(en,{$size:e.size,$top:e.top,$left:e.left},`rays-${e.id}`))),o.map((e=>(0,d.jsx)(Ji,{$size:e.size,$top:e.top,$left:e.left,$opacity:e.opacity,$isBright:e.isBright,$isUltraBright:e.isUltraBright},e.id)))]})};r(4110),r(8699);const rn={PENDING:"PENDING",CONFIRMING:"CONFIRMING",CONFIRMED:"CONFIRMED",FAILED:"FAILED"},nn="ADD",an="UPDATE",on="CLEAR",sn="CLEAR_ALL",dn={MINT:"MINT",LIST:"LIST",UNLIST:"UNLIST",BUY:"BUY",TRANSFER:"TRANSFER",APPROVE:"APPROVE",OTHER:"OTHER"},ln=(0,i.createContext)(),cn={transactions:[],latestTransaction:null},mn=(e,t)=>{var r,i;switch(t.type){case nn:return{...e,transactions:[t.payload,...e.transactions],latestTransaction:t.payload};case an:return{...e,transactions:e.transactions.map((e=>e.id===t.payload.id?{...e,...t.payload.updates}:e)),latestTransaction:(null===(r=e.latestTransaction)||void 0===r?void 0:r.id)===t.payload.id?{...e.latestTransaction,...t.payload.updates}:e.latestTransaction};case on:return{...e,transactions:e.transactions.filter((e=>e.id!==t.payload)),latestTransaction:(null===(i=e.latestTransaction)||void 0===i?void 0:i.id)===t.payload?null:e.latestTransaction};case sn:return{...e,transactions:[],latestTransaction:null};default:return e}},pn=e=>{let{children:t}=e;const[r,n]=(0,i.useReducer)(mn,cn),{showSuccess:a,showError:o,showInfo:s}=wi(),l=(0,i.useCallback)((e=>{const t=e.id||(0,si.A)(),r={id:t,status:rn.PENDING,createdAt:new Date,...e};return n({type:nn,payload:r}),t}),[]),c=(0,i.useCallback)(((e,t)=>{n({type:an,payload:{id:e,updates:t}})}),[]),m=(0,i.useCallback)((e=>{n({type:on,payload:e})}),[]),p=(0,i.useCallback)((()=>{n({type:sn})}),[]),h=(0,i.useCallback)((async function(e){let{type:t=dn.OTHER,asset:r=null,description:i=null,onSuccess:n=null,onFailed:d=null}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return null;const m=(e=>{switch(e){case dn.MINT:return"ミント";case dn.LIST:return"出品";case dn.UNLIST:return"出品取消";case dn.BUY:return"購入";case dn.TRANSFER:return"転送";case dn.APPROVE:return"承認";default:return"トランザクション"}})(t),p=(0,si.A)(),h={id:p,hash:e.hash,type:t,asset:r,description:i||`${m}のトランザクション`};l(h),s(`${h.description}を送信しました`,{title:"トランザクション送信",autoClose:!0});try{const t=await e.wait(1);return c(p,{status:rn.CONFIRMING,receipt:t}),s(`${h.description}が確認中です`,{title:"トランザクション確認中",autoClose:!0}),c(p,{status:rn.CONFIRMED}),a(`${h.description}が完了しました`,{title:"トランザクション成功",autoClose:!0}),n&&n(t),{success:!0,receipt:t,transaction:h}}catch(e){return c(p,{status:rn.FAILED,error:e}),o(`${h.description}が失敗しました`,{title:"トランザクション失敗",autoClose:!1}),d&&d(e),{success:!1,error:e,transaction:h}}}),[l,c,a,o,s]),g=(0,i.useCallback)((e=>r.transactions.filter((t=>t.type===e))),[r.transactions]),x=(0,i.useCallback)((e=>r.transactions.filter((t=>t.asset&&t.asset.id===e))),[r.transactions]);(0,i.useEffect)((()=>{try{localStorage.setItem("transactionHistory",JSON.stringify(r.transactions))}catch(e){}}),[r.transactions]),(0,i.useEffect)((()=>{try{const e=localStorage.getItem("transactionHistory");if(e){const t=JSON.parse(e);t.map((e=>({...e,createdAt:new Date(e.createdAt)}))).forEach((e=>{n({type:nn,payload:e})}))}}catch(e){}}),[]);const u={transactions:r.transactions,latestTransaction:r.latestTransaction,addTransaction:l,updateTransaction:c,clearTransaction:m,clearAllTransactions:p,trackTransaction:h,getTransactionsByType:g,getTransactionsByAsset:x};return(0,d.jsx)(ln.Provider,{value:u,children:t})},hn=a.i7`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,gn=a.i7`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,xn=e=>{switch(e){case di:return"✓";case li:return"✕";case ci:return"!";default:return"i"}},un=(e,t)=>{var r,i;switch(e){case di:return(null==t||null===(r=t.colors)||void 0===r?void 0:r.success)||"#4CAF50";case li:return(null==t||null===(i=t.colors)||void 0===i?void 0:i.error)||"#F44336";case ci:return"#FFC107";default:return"#2196F3"}},fn=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.1;switch(e){case di:return`rgba(76, 175, 80, ${t})`;case li:return`rgba(244, 67, 54, ${t})`;case ci:return`rgba(255, 193, 7, ${t})`;default:return`rgba(33, 150, 243, ${t})`}},bn=a.Ay.div`
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: ${e=>e.theme.borderRadius.medium||"8px"};
  background: ${e=>e.theme.colors.surface||"#1C2241"};
  color: ${e=>e.theme.colors.text.primary||"#FFFFFF"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(8px);
  border-left: 4px solid ${e=>un(e.type,e.theme)};
  animation: ${e=>e.isExiting?gn:hn} 0.3s ease
    forwards;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,wn=a.Ay.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: ${e=>un(e.type,e.theme)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px ${e=>fn(e.type,.3)};
`,yn=a.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,vn=a.Ay.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${e=>e.theme.colors.text.primary};
`,jn=a.Ay.div`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  word-break: break-word;
`,$n=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`,Tn=a.Ay.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.primary?un(e.type,e.theme):fn(e.type,.2)};
  color: ${e=>e.primary?"#fff":un(e.type,e.theme)};
  border: 1px solid ${e=>un(e.type,e.theme)};

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,En=a.Ay.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`,An=a.i7`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`,Cn=a.Ay.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${e=>un(e.type,e.theme)};
  animation: ${e=>e.duration&&a.AH`
      ${An} ${e.duration}ms linear forwards
    `};
`,kn=e=>{let{notification:t,onClose:r,autoClose:n=!0,duration:a=5e3}=e;const[o,s]=(0,i.useState)(!1),l=()=>{s(!0),setTimeout((()=>{r(t.id)}),300)};return(0,i.useEffect)((()=>{if(n){const e=setTimeout((()=>{l()}),a);return()=>clearTimeout(e)}}),[n,a]),(0,d.jsxs)(bn,{type:t.type,isExiting:o,children:[(0,d.jsx)(wn,{type:t.type,children:xn(t.type)}),(0,d.jsxs)(yn,{children:[t.title&&(0,d.jsx)(vn,{children:t.title}),(0,d.jsx)(jn,{children:t.message}),t.actions&&t.actions.length>0&&(0,d.jsx)($n,{children:t.actions.map(((e,r)=>(0,d.jsx)(Tn,{type:t.type,primary:0===r,onClick:()=>(e=>{"function"==typeof e.onClick&&e.onClick(),!1!==e.closeOnClick&&l()})(e),children:e.label},r)))})]}),(0,d.jsx)(En,{onClick:l}),n&&(0,d.jsx)(Cn,{type:t.type,duration:a})]})},Sn={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},Nn=a.Ay.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  max-width: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 10px;
  pointer-events: none;
  ${e=>(e=>{switch(e){case Sn.TOP_LEFT:return"\n        top: 20px;\n        left: 20px;\n        align-items: flex-start;\n      ";case Sn.TOP_RIGHT:return"\n        top: 20px;\n        right: 20px;\n        align-items: flex-end;\n      ";case Sn.TOP_CENTER:return"\n        top: 20px;\n        left: 50%;\n        transform: translateX(-50%);\n        align-items: center;\n      ";case Sn.BOTTOM_LEFT:return"\n        bottom: 20px;\n        left: 20px;\n        align-items: flex-start;\n      ";case Sn.BOTTOM_RIGHT:return"\n        bottom: 20px;\n        right: 20px;\n        align-items: flex-end;\n      ";case Sn.BOTTOM_CENTER:return"\n        bottom: 20px;\n        left: 50%;\n        transform: translateX(-50%);\n        align-items: center;\n      ";default:return"\n        top: 20px;\n        right: 20px;\n        align-items: flex-end;\n      "}})(e.position)}

  /* 隱藏滾動條但保持功能 */
  &::-webkit-scrollbar {
    width: 0px;
  }

  /* 確保內部元素可點擊 */
  & > * {
    pointer-events: auto;
  }
`,In=e=>{let{position:t=Sn.TOP_RIGHT}=e;const{notifications:r,removeNotification:i}=wi();return 0===r.length?null:(0,d.jsx)(Nn,{position:t,children:r.map((e=>(0,d.jsx)(kn,{notification:e,onClose:i},e.id)))})},Rn=()=>(0,d.jsx)(a.NP,{theme:s,children:(0,d.jsx)(m,{children:(0,d.jsx)(f,{children:(0,d.jsx)(bi,{children:(0,d.jsx)(Ei,{children:(0,d.jsxs)(pn,{children:[(0,d.jsx)(h,{}),(0,d.jsx)(g,{}),(0,d.jsx)("div",{className:"navbar-container-wrapper",style:{width:"100%",maxWidth:"100%",position:"fixed",top:0,left:0,right:0,zIndex:999,backgroundColor:"#1c2241",boxSizing:"border-box"},children:(0,d.jsx)(Yi,{})}),(0,d.jsxs)("div",{className:"App",children:[(0,d.jsx)(tn,{}),(0,d.jsx)("div",{className:"app-content",children:(0,d.jsx)(ti,{})})]}),(0,d.jsx)(In,{position:"top-right"})]})})})})})});n.createRoot(document.getElementById("root")).render((0,d.jsx)(a.NP,{theme:s,children:(0,d.jsx)(m,{children:(0,d.jsx)(o.I9,{children:(0,d.jsx)(f,{children:(0,d.jsx)(Rn,{})})})})}))},7956:(e,t,r)=>{r.d(t,{El:()=>i,P_:()=>c,SU:()=>d,Tc:()=>s,Uo:()=>n,getHttpUrl:()=>o,nI:()=>l});const i="https://ipfs.io/ipfs/",n=["https://dweb.link/ipfs/","https://gateway.pinata.cloud/ipfs/","https://gateway.ipfs.io/ipfs/","https://ipfs.fleek.co/ipfs/"],a="ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;if(!e)return null;try{const r=e.trim();if(r.startsWith("/"))return r;if(r.startsWith("http://")||r.startsWith("https://")){if(!r.includes("/ipfs/")&&r.includes("ipfs.io"))try{const e=new URL(r);if(!e.pathname.includes("/ipfs/"))return e.pathname=e.pathname.replace(/^\/?/,"/ipfs/"),e.toString()}catch(e){}return r}let i=t;if(!i||!i.includes("/ipfs/")){if(!(n.length>0))return null;{const e=n.find((e=>e&&e.includes("/ipfs/")));if(!e)return null;i=e}}const a=i.endsWith("/")?i:i+"/";if(r.startsWith("ipfs://ipfs/")){return a+r.substring(12)}if(r.startsWith("ipfs://")){return a+r.substring(7)}if(r.startsWith("Qm")||r.startsWith("baf"))return a+r;const o=r.match(/Qm[a-zA-Z0-9]{44}/);return o?a+o[0]:r}catch(t){return e}},s=function(e,t){const r=o(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:i);if(!r)return null;return`${r.endsWith("/")?r.slice(0,-1):r}/${t}`},d=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;try{const i=s(e,t,r);if(!i)return null;const n=new AbortController,a=setTimeout((()=>n.abort()),1e4);try{const e=await fetch(i,{signal:n.signal,headers:{"Cache-Control":"no-cache",Pragma:"no-cache"}});if(clearTimeout(a),!e.ok)throw new Error(`獲取元數據失敗: ${e.status} ${e.statusText}`);return await e.json()}catch(e){throw e.name,e}}catch(e){return null}},l=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;const n={url:null,isLoading:!1,error:null};try{n.isLoading=!0;const a=await d(e,t,r);if(!a)return n.error="画像の読み込みに失敗しました",n.isLoading=!1,n;const s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;return e&&e.image?o(e.image,t):null}(a,r);return s?(n.url=s,n.isLoading=!1,n):(n.error="画像の読み込みに失敗しました",n.isLoading=!1,n)}catch(e){return n.error="画像の読み込みに失敗しました",n.isLoading=!1,n}},c=async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;const r={url:null,isLoading:!1,error:null};try{if(!e)return r.error="画像の読み込みに失敗しました",r;if(r.isLoading=!0,e.image&&e.image.startsWith("/"))return r.url=e.image,r.isLoading=!1,r;if(e.image&&e.image.startsWith("http"))return r.url=e.image,r.isLoading=!1,r;if(e.metadataBaseUrl&&e.tokenId)try{const i=s(e.metadataBaseUrl,e.tokenId,t);if(!i)throw new Error("無法生成有效的metadata URL");const n=await fetch(i,{signal:AbortSignal.timeout(1e4)});if(!n.ok)throw new Error(`獲取metadata失敗: ${n.status}`);const a=await n.json();if(a&&a.image){const e=o(a.image,t);if(e)return r.url=e,r.isLoading=!1,r;throw new Error("無法轉換image URL")}throw new Error("Metadata中缺少image字段")}catch(e){}if(e.image){const i=o(e.image,t);if(i)return r.url=i,r.isLoading=!1,r}if(e.image!==a){const e=o(a,t);if(e)return r.url=e,r.isLoading=!1,r}return r.error="画像の読み込みに失敗しました",r.isLoading=!1,r}catch(e){return r.error="画像の読み込みに失敗しました",r.isLoading=!1,r}}}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={id:e,loaded:!1,exports:{}};return a[e].call(r.exports,r,r.exports,s),r.loaded=!0,r.exports}s.m=a,e=[],s.O=(t,r,i,n)=>{if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],i=e[c][1],n=e[c][2];for(var o=!0,d=0;d<r.length;d++)(!1&n||a>=n)&&Object.keys(s.O).every((e=>s.O[e](r[d])))?r.splice(d--,1):(o=!1,n<a&&(a=n));if(o){e.splice(c--,1);var l=i();void 0!==l&&(t=l)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[r,i,n]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,s.t=function(e,i){if(1&i&&(e=this(e)),8&i)return e;if("object"==typeof e&&e){if(4&i&&e.__esModule)return e;if(16&i&&"function"==typeof e.then)return e}var n=Object.create(null);s.r(n);var a={};t=t||[null,r({}),r([]),r(r)];for(var o=2&i&&e;"object"==typeof o&&!~t.indexOf(o);o=r(o))Object.getOwnPropertyNames(o).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,s.d(n,a),n},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,r)=>(s.f[r](e,t),t)),[])),s.u=e=>"static/application/"+e+".bfcff850.chunk.js",s.miniCssF=e=>{},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i={},n="nftswap:",s.l=(e,t,r,a)=>{if(i[e])i[e].push(t);else{var o,d;if(void 0!==r)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var m=l[c];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==n+r){o=m;break}}o||(d=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,s.nc&&o.setAttribute("nonce",s.nc),o.setAttribute("data-webpack",n+r),o.src=e),i[e]=[t];var p=(t,r)=>{o.onerror=o.onload=null,clearTimeout(h);var n=i[e];if(delete i[e],o.parentNode&&o.parentNode.removeChild(o),n&&n.forEach((e=>e(r))),t)return t(r)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=p.bind(null,o.onerror),o.onload=p.bind(null,o.onload),d&&document.head.appendChild(o)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),s.p="/nftswap/",(()=>{var e={792:0};s.f.j=(t,r)=>{var i=s.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var n=new Promise(((r,n)=>i=e[t]=[r,n]));r.push(i[2]=n);var a=s.p+s.u(t),o=new Error;s.l(a,(r=>{if(s.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",o.name="ChunkLoadError",o.type=n,o.request=a,i[1](o)}}),"chunk-"+t,t)}},s.O.j=t=>0===e[t];var t=(t,r)=>{var i,n,a=r[0],o=r[1],d=r[2],l=0;if(a.some((t=>0!==e[t]))){for(i in o)s.o(o,i)&&(s.m[i]=o[i]);if(d)var c=d(s)}for(t&&t(r);l<a.length;l++)n=a[l],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(c)},r=self.webpackChunknftswap=self.webpackChunknftswap||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),s.nc=void 0;var d=s.O(void 0,[326],(()=>s(2632)));d=s.O(d)})();