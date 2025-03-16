(()=>{"use strict";var e,t,r,n,i,a={2632:(e,t,r)=>{var n=r(9950),i=r(1352),a=r(4752),o=r(2074);const l={t:{background:"#0A0F1F",i:"#1C2241",o:"#6A11CB",l:"#2575FC",p:"#8E54E9",text:{o:"#FFFFFF",l:"#B6B9C5"},h:"#4CAF50",error:"#F44336"},spacing:{m:"4px",u:"8px",v:"16px",$:"24px",k:"32px",T:"48px"},borderRadius:{small:"4px",C:"8px",N:"16px",S:"50%"},F:{small:"0 2px 4px rgba(0, 0, 0, 0.1)",C:"0 4px 8px rgba(0, 0, 0, 0.1)",N:"0 8px 16px rgba(0, 0, 0, 0.1)"}};var d=r(4414);const s={A:{name:"M PLUS Rounded 1c",label:"M PLUS Rounded 1c",R:'@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap")',family:"'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif"}},c=(0,n.j)(),p=e=>{let{children:t}=e;const[r,i]=(0,n.I)("mPlusRounded"),a={P:r,L:i,M:s,O:s[r].family};return(0,d._)(c.W,{value:a,children:t})},h=a.B`
  ${e=>e.D}

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
    background-color: ${e=>e.theme.t.background};
    /* 移除限制滾動條的設置，讓GlobalScrollbarStyle接管 */
    width: 100%;
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.5) ${e=>e.theme.t.background};
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    font-family: ${e=>e.fontFamily};
    min-height: 100vh;
    width: 100%;
    background-color: ${e=>e.theme.t.background};
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${e=>e.fontFamily} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${e=>e.theme.t.text.o};
    line-height: 1.6;
    font-feature-settings: "palt";
    background: linear-gradient(
      135deg,
      ${e=>e.theme.t.background} 0%,
      ${e=>e.theme.t.background}F2 100%
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
      ${e=>e.theme.t.background} 0%,
      ${e=>e.theme.t.background}F2 100%
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
    padding-right: calc(${e=>e.theme.spacing.v} + 6px);
  }
`,g=()=>{const{P:e,M:t}=(()=>{const e=(0,n.G)(c);if(void 0===e)throw new Error("useFont must be used within a FontProvider");return e})(),r=t[e];return(0,d._)(h,{fontFamily:r.family,D:r.R})},m=a.B`
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
`;var f=r(8429);const b=(0,n.j)({U:"pulse",q:!0,X:()=>{},H:()=>{},Y:!1,V:()=>{}}),u=e=>{let{children:t}=e;const[r,i]=(0,n.I)("pulse"),[a,o]=(0,n.I)(!0),[l,s]=(0,n.I)(!1);(0,n.K)((()=>{/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(s(!0),o(!1)),"deviceMemory"in navigator&&navigator.deviceMemory<4&&(s(!0),o(!1))}),[]);const c={U:r,X:i,q:a,H:o,Y:l,V:s};return(0,d._)(b.W,{value:c,children:t})},x=a.Z`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing.u};
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  border-radius: ${e=>e.theme.borderRadius.C};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  width: ${e=>e.J?"100%":"auto"};
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
`,w=a.ee.button`
  ${x}
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #6a11cb88, #2575fc88);
  }
`,y=(a.ee.button`
  ${x}
  background: linear-gradient(45deg, #2575fc, #6a11cb);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #2575fc88, #6a11cb88);
  }
`,a.ee.button`
  ${x}
  background: ${e=>e.te||e.re?"linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)":"prev"===e.ne?"linear-gradient(45deg, #2575fc44, #6a11cb44)":"linear-gradient(45deg, #6a11cb44, #2575fc44)"};
  color: ${e=>e.te||e.re?"white":e.theme.t.text.o};
  border: ${e=>e.te||e.re?"none":"1px solid "+("prev"===e.ne?"#2575fc33":"#6a11cb33")};

  &:hover {
    background: ${e=>e.te||e.re?"linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)":"prev"===e.ne?"linear-gradient(45deg, #2575fc66, #6a11cb66)":"linear-gradient(45deg, #6a11cb66, #2575fc66)"};
    box-shadow: ${e=>e.te||e.re?"0 5px 15px rgba(106, 17, 203, 0.3)":"none"};
  }
`),v=(a.ee.button`
  ${x}
  background: transparent;
  color: ${e=>e.theme.t.text.o};
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`,a.ee.button`
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  font-size: 1rem;
  font-weight: 600;
  color: ${e=>e.te?e.theme.t.text.o:e.theme.t.text.l};
  background: ${e=>e.te?e.theme.t.i:"transparent"};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.C};
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 ${e=>e.theme.spacing.u};

  &:hover {
    background: ${e=>e.theme.t.i};
    color: ${e=>e.theme.t.text.o};
  }
`,a.ee.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${e=>e.theme.spacing.v} 0;
  gap: ${e=>e.theme.spacing.u};
`,a.ie`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`),$=a.ie`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,k=a.ee.div`
  position: relative;
  margin-top: ${e=>{var t,r;return e.ae?"1rem":(null===(t=e.theme)||void 0===t||null===(r=t.spacing)||void 0===r?void 0:r.k)||"2rem"}};
  padding: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.spacing)||void 0===r?void 0:r.$)||"1.25rem"}};
  border-radius: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.borderRadius)||void 0===r?void 0:r.N)||"12px"}};
  background: ${e=>e.h?"linear-gradient(145deg, \n          rgba(76, 175, 80, 0.08),\n          rgba(106, 17, 203, 0.08)\n        )":"linear-gradient(145deg, \n          rgba(244, 67, 54, 0.08),\n          rgba(106, 17, 203, 0.08)\n        )"};
  color: ${e=>{var t,r,n,i;return e.h?(null===(t=e.theme)||void 0===t||null===(r=t.t)||void 0===r?void 0:r.h)||"#4CAF50":(null===(n=e.theme)||void 0===n||null===(i=n.t)||void 0===i?void 0:i.error)||"#F44336"}};
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-family: ${e=>{var t,r;return(null===(t=e.theme)||void 0===t||null===(r=t.oe)||void 0===r?void 0:r.fontFamily)||"sans-serif"}};
  border: 2px solid
    ${e=>e.h?"rgba(76, 175, 80, 0.3)":"rgba(244, 67, 54, 0.3)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${e=>e.le?$:v} 0.4s ease-out
    ${e=>e.le?"forwards":""};
  max-width: ${e=>e.ae?"100%":"90%"};
  margin-left: ${e=>e.ae?"0":"auto"};
  margin-right: ${e=>e.ae?"0":"auto"};
  transform-origin: center top;
  align-self: ${e=>e.alignSelf||"auto"};
  width: ${e=>e.de?"100%":"auto"};

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid
      ${e=>e.h?"rgba(76, 175, 80, 0.3)":"rgba(244, 67, 54, 0.3)"};
    display: ${e=>e.se?"none":"block"};
  }

  &::after {
    content: "${e=>e.h?"\u2713":"!"}";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: ${e=>e.h?"rgba(76, 175, 80, 1)":"rgba(244, 67, 54, 1)"};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`,T=e=>{let{children:t,id:r,fontSize:n="1.1rem",height:i="26",maxWidth:a="100%",ae:o=!1,ce:l="#6a11cb",pe:s="#2575fc",className:c,style:p={},letterSpacing:h="0.01em",fontWeight:g="600",marginBottom:m="0"}=e;const f=r?`gradient-${r}`:`gradient-${Math.random().toString(36).substring(7)}`;return(0,d.he)("svg",{width:"100%",height:i,style:{maxWidth:a,overflow:"visible",filter:"drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",marginBottom:m,...p},className:c,children:[(0,d._)("defs",{children:(0,d.he)("linearGradient",{id:f,x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,d._)("stop",{offset:"0%",stopColor:l}),(0,d._)("stop",{offset:"100%",stopColor:s})]})}),(0,d._)("text",{x:o?"50%":"0",y:"2.5rem"===n?"45":"1.8rem"===n?"30":"1.5rem"===n?"25":"1.2rem"===n?"20":"18",fill:`url(#${f})`,fontWeight:g,fontSize:n,fontFamily:"inherit",letterSpacing:h,textAnchor:o?"middle":"start",dominantBaseline:"middle",style:{fontFamily:"inherit",textRendering:"optimizeLegibility",shapeRendering:"geometricPrecision",opacity:"0.95"},children:t})]})};var C=r(7956);const E="/\u30b0\u30ec\u30fc\u3061\u3083\u3093.jpeg",N=a.ee.div`
  position: relative;
  width: ${e=>e.ge||"100%"};
  height: ${e=>e.me||"auto"};
  overflow: hidden;
  border-radius: ${e=>e.fe||e.theme.borderRadius.C};
  background-color: ${e=>e.be||"rgba(0, 0, 0, 0.05)"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
`,S=a.ee.ue`
  width: 100%;
  height: 100%;
  object-fit: ${e=>e.xe||"cover"};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: ${e=>e.we?1:0};
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

  ${e=>e.ye&&"\n    &:hover {\n      transform: scale(1.05);\n    }\n  "}
`,z=a.ee.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${e=>e.theme.t.text.l};
  font-size: 0.8rem;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid ${e=>e.theme.t.o};
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`,F=a.ee.div`
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
`,A=a.ee.div`
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
`,R=e=>{let{src:t,alt:r,ve:i=C.$e,width:a,height:o,objectFit:l,ke:s,borderRadius:c,className:p,backgroundColor:h,errorText:g="\u753b\u50cf\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093",Te:m=E,...f}=e;const[b,u]=(0,n.I)(!1),[x,w]=(0,n.I)(!1),[y,v]=(0,n.I)(""),[$,k]=(0,n.I)(0),[T,R]=(0,n.I)(-1),[j,I]=(0,n.I)(!1),[P,L]=(0,n.I)(!0),[M,O]=(0,n.I)(!1),[_,W]=(0,n.I)(null),B=C.Ce.length;(0,n.K)((()=>{if(!t)return w(!0),I(!0),L(!1),void setTimeout((()=>O(!0)),800);if(t===_)return;let e=!0;w(!1),k(0),R(-1),I(!1),L(!0),O(!1);const r=setTimeout((()=>{e&&!x&&P&&G()}),8e3);return D(t,i),()=>{e=!1,clearTimeout(r)}}),[t,i]);const D=(e,t)=>{try{if(!e)return void G();if(e.startsWith("http"))return void v(e);if(e.startsWith("/"))return void v(e);const r=(0,C.Ee)(e,t);if(!r)return void G();const n=`${r.includes("?")?"&":"?"}cb=${Date.now()}`,i=r+n,a=new Image;a.onload=()=>{v(i)},a.onerror=()=>{G()},a.src=i}catch(e){G()}},G=()=>{if($<2){k((e=>e+1));const e=`?cb=${Date.now()}`;v((t=>t.includes("?")?t:t+e))}else(()=>{const e=T+1;if(e<B){const r=C.Ce[e];R(e),k(0),D(t,r)}else L(!1),I(!0),w(!0),setTimeout((()=>O(!0)),800)})()};return(0,d.he)(N,{ge:a,me:o,fe:c,className:p,be:h,style:{margin:0,padding:0,border:"none",boxSizing:"border-box",overflow:"hidden",...f.style},children:[_&&!b&&!x&&(0,d._)(S,{src:_.startsWith("http")?_:(0,C.Ee)(_,i),alt:`${r} (\u524d\u56de\u306e\u30a4\u30e1\u30fc\u30b8)`,we:!0,xe:l,ye:!1,style:{opacity:.3,zIndex:1}}),!x&&!j&&(0,d._)(S,{src:y,alt:r,Ne:()=>{W(t),u(!0),L(!1),w(!1),O(!1)},Se:()=>{t.startsWith("/")?v(t):(t.includes("ipfs://"),G())},we:b,xe:l,ye:s,style:{zIndex:2,borderRadius:c||"inherit",backgroundColor:h||"inherit"}},`img-${T}-${$}`),j&&(0,d.he)(A,{children:[(0,d._)(S,{src:m,alt:`${r} (\u30d5\u30a9\u30fc\u30eb\u30d0\u30c3\u30af\u753b\u50cf)`,Ne:()=>u(!0),we:b,xe:l,ye:!1,style:{borderRadius:c||"inherit",backgroundColor:h||"inherit"}}),M&&(0,d.he)(F,{children:[g,T>=0&&` (${B}\u500b\u306e\u30b2\u30fc\u30c8\u30a6\u30a7\u30a4\u3092\u8a66\u3057\u307e\u3057\u305f)`]})]}),!b&&P&&(0,d._)(z,{children:T>=0?`\u5225\u306e\u30b2\u30fc\u30c8\u30a6\u30a7\u30a4\u3067\u8a66\u884c\u4e2d... (${T+1}/${B})`:$>0?`\u30ea\u30c8\u30e9\u30a4\u4e2d... (${$}/2)`:""}),x&&!j&&!P&&M&&(0,d.he)(F,{children:[g,T>=0&&` (${B}\u500b\u306e\u30b2\u30fc\u30c8\u30a6\u30a7\u30a4\u3092\u8a66\u3057\u307e\u3057\u305f)`]})]})},j=R,I=(a.ie`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`,a.ie`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`),P=a.ee.div`
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
    animation: ${I} 1s ease-in-out infinite;
  }
`,L=a.Z`
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
`,M=a.ee.div`
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
`,O=a.ee.div`
  background: ${e=>`linear-gradient(145deg, ${e.theme.t.i||"#1e2633"}, ${e.theme.t.i||"#1e2633"}F8)`};
  border-radius: 16px; /* 四個角都設置圓角 */
  overflow: hidden; /* 修改為hidden以確保特效不會超出容器 */
  box-shadow: ${e=>e.ze?"0 15px 30px rgba(106, 17, 203, 0.3)":"0 10px 20px rgba(0, 0, 0, 0.08)"};
  position: relative;
  border: ${e=>e.ze?`2px solid ${e.theme.t.o}`:"1px solid rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  transform: ${e=>e.ze?"translateY(-5px)":"none"};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 1 / 1.6; /* 調整卡片寬高比例，使其更高一些 */
  padding: 0; /* 確保沒有內邊距 */
  margin: 0; /* 確保沒有外邊距 */
  z-index: 1; /* 確保卡片有正確的層級 */

  ${e=>!e.ze&&L}

  ${e=>e.ze&&`\n    &::after {\n      content: "";\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 2;\n      border-radius: 16px; /* \u589e\u52a0\u5713\u89d2\u5c3a\u5bf8 */\n      box-shadow: inset 0 0 0 2px ${e.theme.t.o};\n      pointer-events: none;\n    }\n  `}
`,_=a.ee.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 保持1:1的寬高比 */
  background-color: #1e2633; /* 使用與Card一致的背景色 */
  overflow: hidden; /* 確保內容不會溢出容器 */
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
`,W=a.ee.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0; /* 只設置上方圓角 */
  overflow: hidden;
`,B=(a.ee.ue`
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
`,(0,a.ee)(M)`
  top: 10px;
  right: 10px;
  background: ${e=>e.theme.t.o}CC;
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`),D=(0,a.ee)(M)`
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`,G=a.ee.span`
  font-size: 1em;
  color: #00ff9d;
  font-weight: bold;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,U=a.ee.div`
  padding: ${e=>e.theme.spacing.v};
  padding-bottom: ${e=>e.theme.spacing.v}; /* 減少底部間距 */
  position: relative;
  z-index: 3;
  background: ${e=>e.theme.t.i}F8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 45%; /* 調整內容區域高度比例 */
  min-height: 140px; /* 增加最小高度 */
  border-radius: 0 0 16px 16px; /* 只設置下方圓角，上方與圖片容器相連 */
`,Q=a.ee.div`
  padding: 0;
  margin-bottom: 8px; /* 使用固定間距替代auto */
  flex-grow: 0;
`,q=a.ee.Fe`
  font-size: 1.1rem;
  margin: 0 0 ${e=>e.theme.spacing.m} 0;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 26px;
  padding-top: 0;
`,X=e=>{let{children:t,id:r}=e;return(0,d._)(T,{id:`nftGradient-${r}`,fontSize:"1.1rem",height:"26",letterSpacing:"0.01em",children:t})},H=a.ee.Ae`
  font-size: 0.9rem;
  color: ${e=>e.theme.t.text.l};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  padding: 0;
`,Y=a.ee.div`
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
`,V=(0,a.ee)(w)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  height: 45px; /* 調整為與ListNFTForm中的按鈕高度一致 */
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  border-radius: ${e=>e.theme.borderRadius.C};
  position: relative; /* 確保按鈕可作為錨點 */
  z-index: 5; /* 確保按鈕可點擊 */
  box-sizing: border-box; /* 確保尺寸包含padding和border */
  font-size: 0.95rem; /* 與ListNFTSection中的按鈕字體大小保持一致 */
`,K=(0,a.ee)(k)`
  width: 100%; /* 確保與按鈕寬度一致 */
  margin: 0;
  padding: ${e=>e.theme.spacing.u};
  font-size: 0.9rem;
  text-align: center; /* 確保文字居中 */
  justify-content: center; /* 確保內容居中 */
  display: flex;
  align-items: center;
`,Z=e=>{let{Re:t,je:r,Ie:i,statusMessage:a,Pe:o,ze:l,id:s}=e;const c=t,[p,h]=(0,n.I)(""),[g,m]=(0,n.I)(!0),[f,b]=(0,n.I)(!1),[u,x]=(0,n.I)(0);(0,n.K)((()=>{let e,t=!0;return(async()=>{if(u>2)t&&(m(!1),b(!0));else try{t&&(m(!0),b(!1)),e=setTimeout((()=>{t&&x((e=>e+1))}),1e3);const r=await(0,C.Le)(c);clearTimeout(e),t&&(r.error?b(!0):h(r.url),m(r.Me))}catch(r){clearTimeout(e),t&&(b(!0),m(!1),x((e=>e+1)))}})(),()=>{t=!1,clearTimeout(e)}}),[c,u]);const w="function"==typeof r?()=>r(c):()=>r||"\u64cd\u4f5c";return(0,d.he)(O,{ze:l,id:s,children:[(0,d._)(_,{children:(0,d.he)(W,{children:[(0,d._)(j,{src:null!=p?p:c.image||"",alt:c.name||`NFT #${c.Oe||"Unknown"}`,width:"100%",height:"100%",objectFit:"cover",ke:!1,errorText:"\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",backgroundColor:"#1e2633",borderRadius:"16px 16px 0 0",style:{position:"absolute",top:0,left:0,right:0,bottom:0}}),g&&(0,d.he)(P,{children:["\u8aad\u307f\u8fbc\u307f\u4e2d...",u>0?` (\u30ea\u30c8\u30e9\u30a4 ${u}/2)`:""]}),c._e&&(0,d._)(B,{children:"\u51fa\u54c1\u4e2d"}),c.We&&(0,d.he)(D,{children:[(0,d._)(G,{children:"\u039e"}),c.We]})]})}),(0,d.he)(U,{children:[(0,d.he)(Q,{children:[(0,d._)(q,{children:(0,d._)(X,{id:c.Oe,children:c.name})}),(0,d._)(H,{children:c.Be})]}),(0,d._)(Y,{children:a?(0,d._)(K,{h:a.h,le:a.le,style:a.style,ae:a.ae,se:a.se,children:a.message}):o?o():(0,d._)(V,{De:e=>{i&&i(c,e)},children:w()})})]})]})},J=a.ee.div`
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
`,ee=a.ee.div`
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
  ${e=>e.Ge?"\n      /* \u6709\u53f3\u5074\u908a\u6b04\u7684\u9801\u9762 - \u5e02\u5834\u3001\u700f\u89bd\u7b49\u9801\u9762 */\n      @media (min-width: 1800px) {\n        grid-template-columns: repeat(4, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 1400px) and (max-width: 1799px) {\n        grid-template-columns: repeat(3, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 1000px) and (max-width: 1399px) {\n        grid-template-columns: repeat(2, 1fr);\n        max-width: calc(100% - 320px);\n      }\n\n      @media (min-width: 769px) and (max-width: 999px) {\n        grid-template-columns: repeat(1, 1fr);\n        max-width: calc(100% - 320px);\n      }\n    ":"\n      /* \u6c92\u6709\u53f3\u5074\u908a\u6b04\u7684\u9801\u9762 - MyNFT\u9801\u9762 */\n      @media (min-width: 1800px) {\n        grid-template-columns: repeat(4, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 1400px) and (max-width: 1799px) {\n        grid-template-columns: repeat(3, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 1000px) and (max-width: 1399px) {\n        grid-template-columns: repeat(2, 1fr);\n        max-width: 100%;\n      }\n\n      @media (min-width: 769px) and (max-width: 999px) {\n        grid-template-columns: repeat(1, 1fr);\n        max-width: 100%;\n      }\n    "}

  /* 共用的小屏幕佈局 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
    max-width: 100%;
  }
`,te=a.ee.div`
  text-align: center;
  padding: 80px 30px;
  color: ${e=>e.theme.t.text.l};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${e=>e.theme.borderRadius.N};
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
`,re=e=>{let{items:t=[],Ue:r,je:n,Qe:i,qe:a,Xe:o,className:l,He:s="nft-",Ye:c="image",Ge:p=!0}=e;return(0,d._)(J,{children:0===t.length?(0,d.he)(te,{children:[(0,d._)("h3",{children:"NFT\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093"}),(0,d._)("p",{children:"\u691c\u7d22\u6761\u4ef6\u3092\u5909\u66f4\u3057\u3066\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002"})]}):(0,d._)(ee,{className:l,Ge:p,children:t.map((e=>{const t=o&&o.Oe===e.Oe,l=`${s}${e.Oe}`,p={...e,Ve:e[c]||e.image};return(0,d._)(Z,{id:l,Re:p,je:n,Ie:r,statusMessage:i?i(e):null,Pe:a?()=>(e=>a?a(e,(t=>{r&&r(e,t)})):null)(e):null,ze:t},e.Oe)}))})})},ne=a.ee.div`
  position: relative;
  width: 200px; /* 保持寬度為200px，避免換行 */
  height: 42px;
  flex-shrink: 0; /* 防止收縮 */
`,ie=a.ee.div`
  padding: 8px 28px 8px 12px;
  border-radius: ${e=>e.theme.borderRadius.C};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 36, 68, 0.6);
  color: ${e=>e.theme.t.text.o};
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
`,ae=a.ee.div`
  position: absolute; /* 使用絕對定位而不是固定定位 */
  top: 100%; /* 定位在按鈕下方 */
  left: 0;
  width: 100%;
  background: ${e=>e.theme.t.background};
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: ${e=>e.theme.borderRadius.C};
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
`,oe=a.ee.div`
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(106, 17, 203, 0.1);
  }

  ${e=>e.selected&&"\n    background: rgba(106, 17, 203, 0.2);\n    font-weight: bold;\n  "}
`,le=e=>{let{value:t,options:r,Ke:i,placeholder:a,className:o}=e;const[l,s]=(0,n.I)(!1),[c,p]=(0,n.I)(""),h=(0,n.Ze)(null);(0,n.K)((()=>{const e=e=>{h.Je&&!h.Je.contains(e.target)&&s(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[]),(0,n.K)((()=>{const e=r.find((e=>e.value===t));p(e?e.label:a||"\u9078\u629e")}),[t,r,a]);return(0,d.he)(ne,{className:o,et:h,children:[(0,d._)(ie,{De:()=>s(!l),children:c}),l&&(0,d._)(ae,{children:r.map(((e,r)=>(0,d._)(oe,{selected:e.value===t,De:()=>(e=>{i(e.value),s(!1)})(e),children:e.label},r)))})]})},de=a.ee.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.v};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.u};
  width: 100%;
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${e=>e.theme.borderRadius.C};
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
`,se=a.ee.input.tt({type:"text",className:"search-input"})`
  && {
    padding: 8px 12px;
    border-radius: ${e=>e.theme.borderRadius.C};
    border: 1px solid rgba(255, 255, 255, 0.05) !important; /* 使用!important確保樣式優先級 */
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.t.text.o};
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
      color: ${e=>e.theme.t.text.l}99;
    }
  }
`,ce=a.ee.div`
  display: flex;
  gap: ${e=>e.theme.spacing.u};
  align-items: center;
  flex-shrink: 0;
  transform: translateZ(0);
  min-width: 40px; /* 確保即使沒有過濾器也佔據一定空間 */
  min-height: 36px; /* 保持一致的高度 */
`,pe=e=>{let{rt:t,nt:r,it:n="\u641c\u7d22...",filters:i=[]}=e;return(0,d.he)(de,{children:[(0,d._)(se,{placeholder:n,value:t,Ke:e=>{r(e.target.value)},ot:"false",lt:"off"}),(0,d._)(ce,{children:i.length>0?i.map(((e,t)=>(0,d._)(le,{value:e.value,options:e.options,Ke:e.Ke,className:e.className},t))):(0,d._)("div",{style:{minWidth:"40px"}})})]})},he=n.dt(pe),ge=[{Oe:"0",name:"VenAPE #0",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"1",name:"VenAPE #1",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"2",name:"\u30b5\u30e0\u30e9\u30a4NFT",Be:"Samurai Collection",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"3",name:"VenAPE #3",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"221",name:"VenAPE #221",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"453",name:"VenAPE #453",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"785",name:"VenAPE #785",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"612",name:"VenAPE #612",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"}],me=[{Oe:"123",name:"VenAPE #123",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.55",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x1234567890123456789012345678901234567890",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"456",name:"VenAPE #456",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.34",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x2345678901234567890123456789012345678901",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"789",name:"VenAPE #789",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.29",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x3456789012345678901234567890123456789012",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"234",name:"VenAPE #234",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.12",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x4567890123456789012345678901234567890123",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"567",name:"VenAPE #567",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.42",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x5678901234567890123456789012345678901234",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"890",name:"VenAPE #890",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.35",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x6789012345678901234567890123456789012345",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"345",name:"VenAPE #345",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.51",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x7890123456789012345678901234567890123456",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"678",name:"VenAPE #678",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.27",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x8901234567890123456789012345678901234567",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"901",name:"VenAPE #901",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",We:"0.38",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",ht:"0x9012345678901234567890123456789012345678",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"},{Oe:"612",name:"VenAPE #612",Be:"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3",image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"}],fe=[{id:"tx1",type:"purchase",gt:"Bored Ape #123",ft:"Bored Ape Yacht Club",bt:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",Oe:"123",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:2.5,ut:"2023-03-15T14:22:30Z",from:"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",to:"0xYourAddress",st:"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"},{id:"tx2",type:"sale",gt:"Crypto Punk #456",ft:"CryptoPunks",bt:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",Oe:"456",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:3.2,ut:"2023-03-10T09:45:12Z",from:"0xYourAddress",to:"0x7AB4C5D89e6D8CA8740eA9c5F1c8d536BBBF88F3",st:"0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"},{id:"tx3",type:"mint",gt:"VenAPE #789",ft:"VenAPE",bt:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/789",Oe:"789",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:.1,ut:"2023-03-01T18:11:05Z",from:"0x0000000000000000000000000000000000000000",to:"0xYourAddress",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b"},{id:"tx4",type:"transfer",gt:"Doodle #234",ft:"Doodles",bt:"ipfs://QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/234",Oe:"234",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:0,ut:"2023-02-25T22:30:45Z",from:"0xYourAddress",to:"0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",st:"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"},{id:"tx5",type:"purchase",gt:"Azuki #567",ft:"Azuki",bt:"ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/567",Oe:"567",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:1.8,ut:"2023-02-20T10:35:22Z",from:"0x8731d54E9D02c286767d56ac03e8037C07e01e98",to:"0xYourAddress",st:"0xED5AF388653567Af2F388E6224dC7C4b3241C544"},{id:"tx6",type:"mint",gt:"VenAPE #142",ft:"VenAPE",bt:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/142",Oe:"142",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:.1,ut:"2023-02-15T10:22:33Z",from:"0x0000000000000000000000000000000000000000",to:"0xYourAddress",st:"0x23581767a106ae21c074b2276D25e5C3e136a68b"},{id:"tx7",type:"sale",gt:"Cool Cat #321",ft:"Cool Cats",bt:"ipfs://QmdTtQXUNuLYwX52r5KHUKm8taSv8eFhkj3iCmrLiUXS9k/321",Oe:"321",ct:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",We:1.2,ut:"2023-02-10T08:12:45Z",from:"0xYourAddress",to:"0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",st:"0x1A92f7381B9F03921564a437210bB9396471050C"}],be=n.xt(),ue=a.ee.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0; /* 移除边距，避免与StickySidebar的填充重叠 */
  padding: 0; /* 恢復原始設置，不再添加底部內邊距 */
`,xe=a.ee.Fe`
  color: ${e=>e.theme.t.text.o};
  margin: 0 0 ${e=>e.theme.spacing.v} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;
  font-weight: 600;
  padding-top: ${e=>e.theme.spacing.m};
  padding-bottom: ${e=>e.theme.spacing.m};
`,we=(a.ee.Fe`
  color: ${e=>e.theme.t.text.o};
  margin: 0 0 ${e=>e.theme.spacing.v} 0;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;

  font-weight: 600;
  padding-top: ${e=>e.theme.spacing.m};
  padding-bottom: ${e=>e.theme.spacing.m};
`,a.ee.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing.v};
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${e=>e.theme.borderRadius.C};
  margin-bottom: ${e=>e.theme.spacing.v}; /* 統一間距 */
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 60px;
  box-sizing: border-box;
  width: 85%; /* 統一固定寬度 */
  margin-left: auto;
  margin-right: auto;
`),ye=a.ee.div`
  width: 40px;
  height: 40px;
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-right: ${e=>e.theme.spacing.v};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,ve=a.ee.div`
  flex: 1;
`,$e=a.ee.div`
  font-weight: bold;
  font-size: 1rem;
`,ke=a.ee.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.t.text.l};
  margin-top: 2px;
`,Te=a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.v};
  padding: ${e=>e.theme.spacing.v};
  color: ${e=>e.theme.t.text.l};
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
`,Ce=a.ee.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${e=>e.theme.spacing.u};
`,Ee=a.ee.div`
  width: 85%;
  margin-bottom: ${e=>e.theme.spacing.u};
  margin-left: auto;
  margin-right: auto;
  display: block; /* 確保是塊級元素 */
  box-sizing: border-box; /* 確保寬度計算包含padding和border */
  max-width: 450px; /* 添加最大寬度限制，確保與按鈕一致 */
`,Ne=a.ee.label`
  font-size: 0.95rem;
  color: ${e=>e.theme.t.text.l};
  margin-bottom: ${e=>e.theme.spacing.u};
  display: block;
  text-align: center;
  width: 100%;
`,Se=a.ee.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 45px;
  align-items: center; /* 使用center確保垂直居中 */
  box-sizing: border-box;
  max-width: 100%; /* 確保不超過父容器 */
  gap: 4px; /* 使用gap屬性為子元素之間添加統一間隙 */
`,ze=a.ee.input.tt({className:"price-input"})`
  flex: 1;
  height: 100%;
  padding: 0;
  padding-left: 16px;
  padding-right: 16px;
  line-height: normal; /* 調整為normal避免行高影響 */
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: rgba(30, 36, 68, 0.6);
  color: ${e=>e.theme.t.text.o};
  font-size: 0.95rem;
  border-radius: ${e=>e.theme.borderRadius.C};
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
    color: ${e=>e.theme.t.text.l}99;
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
`,Fe=a.ee.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  background: rgba(106, 17, 203, 0.2);
  color: ${e=>e.theme.t.text.o};
  font-weight: bold;
  font-size: 0.95rem;
  user-select: none;
  opacity: ${e=>e.disabled?.5:1};
  min-width: 60px; /* 確保有足夠空間顯示ETH */
  border-top-right-radius: ${e=>e.theme.borderRadius.C};
  border-bottom-right-radius: ${e=>e.theme.borderRadius.C};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: none;
  box-sizing: border-box;
  line-height: 1; /* 設置為1確保文字垂直居中 */
`,Ae=a.ee.div`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
  margin-top: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`,Re=(0,a.ee)(w)`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${e=>e.theme.borderRadius.C};
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
`,je=a.ee.div`
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
`,Ie=(0,a.ee)(k)`
  width: 100%;
  padding: 12px;
  border-radius: ${e=>e.theme.borderRadius.C};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1rem;
  border: 2px solid
    ${e=>e.h?"rgba(76, 175, 80, 0.5)":"rgba(244, 67, 54, 0.5)"};
`,Pe=()=>{const[e,t]=(0,n.I)(null),[r,i]=(0,n.I)(""),[a,o]=(0,n.I)({show:!1,h:!1,le:!1,message:""}),[l,s]=(0,n.I)(null),c=(0,n.wt)((()=>{be.Je&&(t(be.Je),s(null))}),[]),p=(0,n.wt)((()=>{t(null),i(""),s(null)}),[]);(0,n.K)((()=>(be.Je&&!e&&t(be.Je),window.addEventListener("nft-selected",c),window.addEventListener("nft-cleared",p),()=>{window.removeEventListener("nft-selected",c),window.removeEventListener("nft-cleared",p)})),[c,p,e]),(0,n.K)((()=>{e&&(async()=>{if(e&&e.image)try{const t=await(0,C.Le)(e);t.url?s(t.url):s(e.image)}catch(t){s(e.image)}})()}),[e]);const h=!e||!r;return(0,d.he)(ue,{children:[(0,d._)(xe,{children:(0,d._)(T,{fontSize:"1.4rem",height:"30",ae:!0,id:`form-title-${Math.random().toString(36).substring(7)}`,children:"NFT\u3092\u51fa\u54c1\u3059\u308b"})}),e?(0,d.he)(we,{style:{width:"85%",borderRadius:"8px",marginLeft:"auto",marginRight:"auto",maxWidth:"450px"},children:[(0,d._)(ye,{children:(0,d._)(j,{src:l||e.image,alt:e.name,height:"40px",width:"40px"})}),(0,d.he)(ve,{children:[(0,d._)($e,{children:(0,d._)(T,{fontSize:"1rem",height:"24",fontWeight:"bold",id:`selected-nft-${e.Oe}`,children:e.name})}),(0,d._)(ke,{children:e.Be})]})]}):(0,d._)(Te,{style:{width:"85%",borderRadius:0,marginLeft:"auto",marginRight:"auto",maxWidth:"450px"},children:"NFT\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044"}),(0,d.he)(Ce,{children:[(0,d.he)(Ee,{children:[(0,d._)(Ne,{children:"\u8ca9\u58f2\u4fa1\u683c"}),(0,d.he)(Se,{children:[(0,d._)(ze,{type:"number",value:r,Ke:e=>i(e.target.value),placeholder:"0.00",disabled:!e,min:"0",step:"0.01",lt:"off",className:"price-input"}),(0,d._)(Fe,{disabled:!e,children:"ETH"})]})]}),(0,d._)(Ae,{children:(0,d._)(Re,{De:async()=>{if(e&&r)try{await new Promise((e=>setTimeout(e,1e3))),o({show:!0,h:!0,le:!1,message:`${e.name}\u304c${r} ETH\u3067\u51fa\u54c1\u3055\u308c\u307e\u3057\u305f\u3002`}),setTimeout((()=>{o((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{o({show:!1,h:!1,le:!1,message:""})}),3400),t(null),be.Je=null,i(""),window.dispatchEvent(new CustomEvent("nft-cleared"))}catch(e){o({show:!0,h:!1,le:!1,message:"\u51fa\u54c1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002"}),setTimeout((()=>{o((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{o({show:!1,h:!1,le:!1,message:""})}),3400)}else o({show:!0,h:!1,le:!1,message:"NFT\u3068\u4fa1\u683c\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002"})},disabled:h,children:"\u30de\u30fc\u30b1\u30c3\u30c8\u306b\u51fa\u54c1\u3059\u308b"})})]}),a.show&&(0,d._)(je,{children:(0,d._)(Ie,{h:a.h,le:a.le,ae:!0,se:!0,children:a.message})})]})},Le=a.ee.div`
  transform: translateZ(0);
  margin-top: 0; /* 確保與主頁卡片部分對齊 */
  width: 100%;
  position: relative; /* 確保內部絕對定位元素有參考點 */

  /* 只有在獨立顯示時才應用這些樣式 */
  ${e=>e.standalone&&`\n    background: rgba(28, 34, 65, 0.1);\n    border: 1px solid rgba(255, 255, 255, 0.05);\n    border-radius: ${e.theme.borderRadius.C};\n    backdrop-filter: blur(10px);\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);\n  `}
`,Me=(0,a.ee)(w)`
  background: linear-gradient(90deg, #ff0080, #7928ca);
  height: 45px; /* 確保固定高度 */
  font-size: 0.95rem;
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  border-radius: ${e=>e.theme.borderRadius.C};

  &:hover {
    background: linear-gradient(90deg, #ff0080, #7928ca);
    box-shadow: 0 6px 14px rgba(255, 0, 128, 0.4);
  }
`,Oe=(0,a.ee)(w)`
  height: 45px;
  font-size: 0.95rem;
  width: 100%; /* 修改為width: 100%確保寬度一致 */
  max-width: 100%;
  box-sizing: border-box;
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  border-radius: ${e=>e.theme.borderRadius.C};
`,_e=a.ee.div`
  width: 100%;
  padding: 0;
  margin: 0; /* 添加margin: 0确保没有外边距 */
  box-sizing: border-box;
  height: 45px; /* 確保固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
`,We=e=>{let{standalone:t=!0}=e;const[r,i]=(0,n.I)(null),[a,o]=(0,n.I)(""),l=(0,n.Ze)(null),s=ge.filter((e=>!a||e.name.toLowerCase().includes(a.toLowerCase()))),c=(0,n.wt)((e=>{o(e)}),[]);(0,n.wt)((()=>{if(r&&l.Je){const e=document.getElementById(`nft-item-${r.Oe}`);e?e.scrollIntoView({behavior:"smooth",yt:"center"}):document.querySelectorAll('[id^="nft-item-"]').forEach((e=>{}))}}),[r]);(0,n.K)((()=>{const e=()=>{i(null)};return be.Je&&!r&&(i(be.Je),setTimeout((()=>{const e=document.getElementById(`nft-item-${be.Je.Oe}`);e&&e.scrollIntoView({behavior:"auto",yt:"center"})}),100)),window.addEventListener("nft-cleared",e),()=>{window.removeEventListener("nft-cleared",e)}}),[r]);const p=(0,n.wt)(((e,t)=>{const n=(null==r?void 0:r.Oe)===e.Oe;return(0,d._)(_e,{children:n?(0,d._)(Me,{de:!0,De:t,children:"\u9078\u629e\u6e08\u307f"}):(0,d._)(Oe,{de:!0,De:t,children:"\u9078\u629e\u3059\u308b"})})}),[r]);return(0,d.he)(Le,{standalone:t,children:[(0,d._)(he,{rt:a,nt:c,it:"NFT\u3092\u691c\u7d22...",filters:[{value:"invisible1",options:[{value:"invisible1",label:" "}],Ke:()=>{},className:"invisible-filter"},{value:"invisible2",options:[{value:"invisible2",label:" "}],Ke:()=>{},className:"invisible-filter"}]}),(0,d._)("div",{et:l,children:(0,d._)(re,{items:s,je:"\u9078\u629e\u3059\u308b",qe:p,Ue:e=>{(null==r?void 0:r.Oe)===e.Oe?(i(null),be.Je=null,window.dispatchEvent(new CustomEvent("nft-cleared"))):(i(e),be.Je=e,window.dispatchEvent(new CustomEvent("nft-selected")))},Xe:r,He:"nft-item-"})})]})};We.vt=Pe;const Be=We,De=(a.ee.$t`
  text-align: center;
  margin: ${e=>e.theme.spacing.k} 0
    ${e=>e.theme.spacing.$};
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
`,a.ee.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.v} 0;
  margin-bottom: ${e=>e.theme.spacing.u};

  h1 {
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: ${e=>e.theme.spacing.m};
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
    color: ${e=>e.theme.t.text.l};
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
`),Ge=(a.ee.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing.v};
  padding: 8px;
  transform: translateZ(0);
  perspective: 1000px;
`,(0,a.ee)(y)`
  background: ${e=>e.te?`linear-gradient(120deg, \n          ${e.theme.t.o}00 0%, \n          ${e.theme.t.o} 25%, \n          ${e.theme.t.l} 75%, \n          ${e.theme.t.l}00 100%\n        )`:"transparent"};
  color: ${e=>e.te?"white":e.theme.t.text.o};
  border: 2px solid
    ${e=>e.te?"transparent":e.theme.t.o+"55"};
  box-shadow: ${e=>e.te?"0 5px 15px rgba(42, 82, 190, 0.3)":"none"};

  &:hover {
    background: ${e=>e.te?`linear-gradient(120deg, \n            ${e.theme.t.o}00 0%, \n            ${e.theme.t.o} 25%, \n            ${e.theme.t.l} 75%, \n            ${e.theme.t.l}00 100%\n          )`:"linear-gradient(120deg, transparent, rgba(106, 17, 203, 0.1), transparent)"};
    box-shadow: ${e=>e.te?"0 8px 20px rgba(42, 82, 190, 0.3)":"0 5px 15px rgba(42, 82, 190, 0.1)"};
  }
`,a.ee.div`
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
`),Ue=a.ee.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.$} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
`,Qe=a.ee.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing.v};
  margin-bottom: ${e=>e.theme.spacing.v};
`,qe=a.ee.div`
  display: flex;
  gap: 30px;
  position: relative;
  align-items: flex-start;
  margin-top: ${e=>e.theme.spacing.v};
  box-sizing: border-box;

  /* 確保在小屏幕上變為垂直排列 */
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`,Xe=a.ee.div`
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
`,He=a.ee.div`
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
`,Ye=a.ee.div`
  position: sticky;
  top: 20px;
  padding: ${e=>e.theme.spacing.v};
  background: rgba(28, 34, 65, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${e=>e.theme.borderRadius.C};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0;
`,Ve=a.ee.Fe`
  color: ${e=>e.theme.t.text.o};
  margin-top: 0;
  margin-bottom: ${e=>e.theme.spacing.v};
  font-size: 1.4rem;
  padding-top: 0;
  width: 100%; /* 確保完全填充 */
  text-align: center; /* 居中對齊 */
  font-weight: 600;
`,Ke=a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.u};
  padding: ${e=>e.theme.spacing.m} 0;
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.u}; /* 左側間距 */
  display: flex;
  justify-content: space-between; /* 標籤和值兩端對齊 */
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`,Ze=a.ee.span`
  font-size: 0.9rem;
  color: ${e=>e.theme.t.text.l};
`,Je=a.ee.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${e=>e.theme.t.text.o};
  margin-right: ${e=>e.theme.spacing.u}; /* 右側間距 */
`,et=a.ee.kt`
  font-size: 1rem;
  margin: ${e=>e.theme.spacing.v} 0
    ${e=>e.theme.spacing.u};
  color: ${e=>e.theme.t.text.o};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: ${e=>e.theme.spacing.m};
  padding-top: ${e=>e.theme.spacing.u};
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.u}; /* 左側間距 */
`,tt=a.ee.div`
  margin-top: ${e=>e.theme.spacing.u};
  margin-bottom: ${e=>e.theme.spacing.u};
  width: 100%; /* 確保完全填充 */
  padding-left: ${e=>e.theme.spacing.u}; /* 左側間距 */
`,rt=a.ee.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing.u} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: ${e=>e.theme.spacing.u};
  }
`,nt=a.ee.div`
  width: 36px;
  height: 36px;
  border-radius: ${e=>e.theme.borderRadius.small};
  overflow: hidden;
  margin-right: ${e=>e.theme.spacing.u};
`,it=a.ee.div`
  flex: 1;
`,at=a.ee.div`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ot=a.ee.div`
  font-size: 0.8rem;
  color: white;
  display: flex;
  align-items: center;
`,lt=a.ee.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #00ff9d;
  background: linear-gradient(120deg, #00ff9d, #00c9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 3px;
`,dt=a.ee.div`
  margin-top: 0; /* 移除上边距，确保搜索栏和右侧菜单对齐 */
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 移除内边距，确保搜索栏和NFT卡片网格对齐 */
`,st=()=>{const[e,t]=(0,n.I)("marketplace"),[r,i]=(0,n.I)(""),[a,o]=(0,n.I)("recent"),[l,s]=(0,n.I)("all"),[c,p]=(0,n.I)({show:!1,Tt:null,h:!1,le:!1}),h=(0,f.Ct)(),g=(0,f.Et)();(0,n.K)((()=>{const e=new URLSearchParams(h.search).get("tab");"listnft"!==e&&"marketplace"!==e||t(e)}),[h.search]);const m=e=>{t(e),g(`/?tab=${e}`,{replace:!0})},b=(0,n.Nt)((()=>[...new Set(me.map((e=>e.Be)))]),[]),u=(0,n.Nt)((()=>[...me].sort(((e,t)=>parseFloat(t.We)-parseFloat(e.We))).slice(0,3)),[]),[x,w]=(0,n.I)({});(0,n.K)((()=>{(async()=>{const e={};await Promise.all(u.map((async t=>{try{const r=await(0,C.Le)(t);r.url?e[t.Oe]=r.url:e[t.Oe]=t.image}catch(r){e[t.Oe]=t.image}}))),w(e)})()}),[u]);const v=(0,n.Nt)((()=>me.filter((e=>!(r&&!e.name.toLowerCase().includes(r.toLowerCase()))&&("all"===l||e.Be===l))).sort(((e,t)=>"price_low"===a?parseFloat(e.We)-parseFloat(t.We):"price_high"===a?parseFloat(t.We)-parseFloat(e.We):parseInt(t.Oe||"0")-parseInt(e.Oe||"0")))),[r,l,a]),$=(0,n.wt)((e=>{i(e)}),[]),k=(0,n.wt)((e=>{o(e)}),[]),E=(0,n.wt)((e=>{s(e)}),[]),N=(0,n.wt)((async e=>{try{await new Promise((e=>setTimeout(e,2e3))),p({show:!0,Tt:e.Oe,h:!0,le:!1}),setTimeout((()=>{p((e=>({...e,le:!0})))}),2e3),setTimeout((()=>{p({show:!1,Tt:null,h:!1,le:!1})}),2400)}catch(t){p({show:!0,Tt:e.Oe,h:!1,le:!1})}}),[]),S=(0,n.wt)((e=>{const t=e.Oe,r=c.Tt;return c.show&&r===t?{h:c.h,message:c.h?"\u8cfc\u5165\u6210\u529f\uff01":"\u8cfc\u5165\u5931\u6557",le:c.le,style:{width:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"},ae:!0,se:!1}:null}),[c]);return(0,d._)(Ge,{className:"content-container",children:(0,d.he)(Ue,{children:[(0,d.he)(De,{children:[(0,d._)("h1",{children:"NFT\u30de\u30fc\u30b1\u30c3\u30c8\u30d7\u30ec\u30a4\u30b9\u3078\u3088\u3046\u3053\u305d"}),(0,d._)("p",{children:"\u5b89\u5168\u304b\u3064\u7c21\u5358\u306bNFT\u3092\u58f2\u8cb7\u3067\u304d\u308b\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u3002 \u30b9\u30de\u30fc\u30c8\u30b3\u30f3\u30c8\u30e9\u30af\u30c8\u306b\u3088\u308a\u3001\u4fe1\u983c\u6027\u306e\u9ad8\u3044\u53d6\u5f15\u3092\u5b9f\u73fe\u3057\u307e\u3059\u3002"})]}),(0,d.he)(Qe,{children:[(0,d._)(y,{te:"marketplace"===e,De:()=>m("marketplace"),re:"marketplace"===e,children:"\u30de\u30fc\u30b1\u30c3\u30c8\u30d7\u30ec\u30a4\u30b9"}),(0,d._)(y,{te:"listnft"===e,De:()=>m("listnft"),re:"listnft"===e,children:"NFT\u3092\u51fa\u54c1\u3059\u308b"})]}),(0,d.he)(qe,{children:[(0,d._)(Xe,{children:"marketplace"===e?(0,d.he)(dt,{children:[(0,d._)(he,{rt:r,nt:$,it:"NFT\u3092\u691c\u7d22...",filters:[{value:l,options:[{value:"all",label:"\u3059\u3079\u3066\u306e\u30b3\u30ec\u30af\u30b7\u30e7\u30f3"},...b.map((e=>({value:e,label:e})))],Ke:E},{value:a,options:[{value:"recent",label:"\u6700\u65b0\u9806"},{value:"price_low",label:"\u4fa1\u683c\uff08\u5b89\u3044\u9806\uff09"},{value:"price_high",label:"\u4fa1\u683c\uff08\u9ad8\u3044\u9806\uff09"}],Ke:k}]}),(0,d._)(re,{items:v,je:"\u8cfc\u5165\u3059\u308b",Ue:N,Qe:S,Ge:!0})]}):(0,d._)(Be,{standalone:!1})}),(0,d._)(He,{children:(0,d._)(Ye,{children:"marketplace"===e?(0,d.he)(d.St,{children:[(0,d._)(Ve,{children:(0,d._)(T,{fontSize:"1.4rem",height:"30",ae:!0,id:"sidebar-title",children:"\u30de\u30fc\u30b1\u30c3\u30c8\u60c5\u5831"})}),(0,d.he)(Ke,{children:[(0,d._)(Ze,{children:"\u7dcf\u4e0a\u5834\u6570:"}),(0,d._)(Je,{children:me.length})]}),(0,d.he)(Ke,{children:[(0,d._)(Ze,{children:"\u5e73\u5747\u4fa1\u683c:"}),(0,d.he)(Je,{children:[(0,d._)(lt,{children:"\u039e"})," 1.25"]})]}),(0,d._)(et,{children:"\u4eba\u6c17\u306eNFT"}),(0,d._)(tt,{children:u.map((e=>(0,d.he)(rt,{children:[(0,d._)(nt,{children:(0,d._)(j,{src:x[e.Oe]||e.image,alt:e.name,width:"100%",height:"100%"})}),(0,d.he)(it,{children:[(0,d._)(at,{children:(0,d._)(T,{fontSize:"0.9rem",height:"18",fontWeight:"500",id:`nft-name-${e.Oe}`,children:e.name})}),(0,d.he)(ot,{children:[(0,d._)(lt,{children:"\u039e"}),e.We]})]})]},e.Oe)))}),(0,d.he)(Ke,{children:[(0,d._)(Ze,{children:"\u6b21\u56de\u306e\u30c9\u30ed\u30c3\u30d7:"}),(0,d._)(Je,{children:"3\u65e5\u5f8c"})]}),(0,d.he)(Ke,{children:[(0,d._)(Ze,{children:"\u53d6\u5f15\u91cf(24h):"}),(0,d.he)(Je,{children:[(0,d._)(lt,{children:"\u039e"})," 32.5"]})]})]}):(0,d._)(Pe,{})})})]})]})})},ct=ge.filter((e=>"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3"===e.Be)),pt=a.ee.div`
  width: 100%;
  min-height: auto;
  padding: ${e=>e.theme.spacing.v} 0;
  position: relative;
  overflow: hidden;
`,ht=a.ee.div`
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
`,gt=a.ee.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${e=>e.theme.spacing.v};
  display: flex;
  flex-direction: column;
  z-index: 1;
`,mt=a.ee.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.v};

  h1 {
    margin-bottom: ${e=>e.theme.spacing.u};
    font-size: 2.5rem;
    display: inline-block;
  }
`,ft=a.ee.Ae`
  color: ${e=>e.theme.t.text.l};
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: center;
`,bt=a.ee.div`
  background: rgba(18, 21, 34, 0.9);
  border-radius: ${e=>e.theme.borderRadius.N};
  /* 減少陰影強度 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 100%;
  /* 移除模糊效果 */
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`,ut=a.ee.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,xt=a.ee.div`
  padding: ${e=>e.theme.spacing.$};
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
`,wt=a.ee.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: ${e=>e.theme.spacing.v};
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
`,yt=a.ee.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.v};
  margin-bottom: ${e=>e.theme.spacing.v};
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,vt=a.ee.Fe`
  font-size: 1rem;
  margin-bottom: ${e=>e.theme.spacing.u};
  color: ${e=>e.theme.t.text.o};
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${e=>e.theme.t.o};
  }
`,$t=a.ee.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.spacing.u};
`,kt=a.ee.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.u};
  background: rgba(15, 18, 31, 0.8);
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid rgba(106, 17, 203, 0.2) !important;
`,Tt=a.ee.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>e.theme.t.text.o};
  margin-bottom: 4px;
`,Ct=a.ee.div`
  font-size: 0.8rem;
  color: ${e=>e.theme.t.text.l};
`,Et=a.ee.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${e=>e.theme.spacing.v};
  margin-top: ${e=>e.theme.spacing.u};
`,Nt=a.ee.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${e=>"prev"===e.direction?"0 8px 0 0":"0 0 0 8px"};
`,St=a.ee.div`
  padding: ${e=>e.theme.spacing.$};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,zt=a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.v};
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,Ft=a.ee.div`
  margin-top: auto;
  position: relative;
  min-height: 40px; /* 從80px減少到60px，減少空白區域 */
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,At=(a.ee.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${e=>e.theme.borderRadius.N};
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.3);
  transition: opacity 0.3s ease;
  z-index: -1;

  ${bt}:hover & {
    opacity: 1;
  }
`,a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.u};
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.v};
`),Rt=a.ee.Ae`
  color: ${e=>e.theme.t.text.l};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: ${e=>e.theme.spacing.v};
`,jt=a.ee.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.v};
  margin-bottom: ${e=>e.theme.spacing.v};
  border: 1px solid rgba(106, 17, 203, 0.2);
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,It=a.ee.Fe`
  font-size: 1rem;
  margin-bottom: ${e=>e.theme.spacing.u};
  color: ${e=>e.theme.t.text.o};
`,Pt=a.ee.zt`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.spacing.u};
`,Lt=a.ee.Ft`
  display: flex;
  flex-direction: column;
  padding: ${e=>e.theme.spacing.u};
  border-radius: ${e=>e.theme.borderRadius.small};
  background: rgba(15, 18, 31, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.2);
`,Mt=a.ee.span`
  color: ${e=>e.theme.t.text.l};
  font-size: 0.8rem;
  margin-bottom: 2px;
`,Ot=a.ee.span`
  color: ${e=>e.theme.t.text.o};
  font-weight: 500;
  font-size: 0.95rem;
`,_t=a.ee.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.v};
  margin-bottom: ${e=>e.theme.spacing.v};
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
  border: 1px solid rgba(106, 17, 203, 0.2);
  overflow: hidden;
`,Wt=a.ee.label`
  font-weight: 600;
  font-size: 1rem;
  color: ${e=>e.theme.t.text.o};
  white-space: nowrap;
`,Bt=a.ee.input.tt({type:"text",placeholder:"TokenID\u3092\u5165\u529b",className:"token-id-input"})`
  &&& {
    background: rgba(15, 18, 31, 0.8) !important;
    border: 2px solid rgba(87, 5, 175, 0.42) !important;
    border-radius: 4px !important;
    color: ${e=>e.theme.t.text.o};
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
    color: ${e=>e.theme.t.text.l}88;
    text-align: right;
    font-size: 0.95rem;
    font-weight: normal;
  }
`,Dt=a.ee.div`
  background: rgba(15, 18, 31, 0.6);
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.v};
  margin-bottom: ${e=>e.theme.spacing.v};
  border: 1px solid rgba(106, 17, 203, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 確保寬度與其他元素一致 */
  box-sizing: border-box; /* 確保尺寸計算包含padding和border */
`,Gt=a.ee.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${e=>e.theme.t.text.o};
`,Ut=a.ee.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;

  /* 移除漸變文字效果，使用純色 */
`,Qt=(0,a.ee)(k)`
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
`,qt=a.ee.div`
  margin-top: ${e=>e.theme.spacing.u};
  margin-bottom: ${e=>e.theme.spacing.u};
`,Xt=a.ee.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  span {
    font-size: 0.8rem;
    color: ${e=>e.theme.t.text.l};
  }
`,Ht=a.ee.div`
  height: 6px;
  width: 100%;
  background: rgba(15, 18, 31, 0.6);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${e=>e.At||"45%"};
    background: linear-gradient(120deg, #00ff9d, #00c9ff);
    border-radius: 3px;
  }
`,Yt=(a.ee.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 25px;
  background: ${e=>e.h?"rgba(38, 194, 129, 0.9)":"rgba(242, 38, 19, 0.9)"};
  color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: ${e=>e.le?0:1};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`,a.ee.div`
  height: 35px;
  margin-top: 1rem;
  visibility: hidden;
  opacity: 0;
`,(0,a.ee)(k)`
  position: absolute;
  z-index: 10;
  bottom: -20px;
  left: 0;
  width: 100%;
  transform: translateY(0);
  animation: ${e=>e.le?"fadeSlideOut":"fadeSlideIn"} 0.4s
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
`,()=>{const[e,t]=(0,n.I)(0),[r,i]=(0,n.I)(""),[a,o]=(0,n.I)(!1),[l,s]=(0,n.I)({visible:!1,h:!1,le:!1,message:""}),[c,p]=(0,n.I)(null),[h,g]=(0,n.I)(!0),m=1e4,f=4579,b=`${45.79.toFixed(1)}%`;(0,n.K)((()=>{""===r&&ct&&ct.length>0&&i(ct[e].Oe)}),[]),(0,n.K)((()=>{ct&&ct.length>0&&i(ct[e].Oe)}),[e]),(0,n.K)((()=>{(async()=>{try{g(!0);const t=await(0,C.Le)(ct[e]);t.url?p(t.url):p(ct[e].image)}catch(t){p(ct[e].image)}finally{g(!1)}})()}),[e]);return(0,d.he)(pt,{children:[(0,d._)(ht,{}),(0,d.he)(gt,{children:[(0,d.he)(mt,{children:[(0,d._)("h1",{children:(0,d._)(T,{fontSize:"2.5rem",height:"60",maxWidth:"600px",ae:!0,fontWeight:"700",children:"VenAPE NFT\u3092\u30df\u30f3\u30c8\u3059\u308b"})}),(0,d._)(ft,{children:"VenAPE\u306f10,000\u500b\u306e\u30e6\u30cb\u30fc\u30af\u306b\u751f\u6210\u3055\u308c\u305f\u30a2\u30fc\u30c8\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u3067\u3059\u3002\u5404VenAPE\u306f\u4e00\u610f\u3067\u3042\u308a\u3001\u7279\u5225\u306a\u5c5e\u6027\u3068\u7279\u5fb4\u3092\u6301\u3063\u3066\u3044\u307e\u3059\u3002"})]}),(0,d._)(bt,{children:(0,d.he)(ut,{children:[(0,d.he)(xt,{children:[(0,d._)(wt,{children:(0,d._)(j,{src:c||ct[e].image,alt:`VenAPE #${r||"?"}`,width:"100%",height:"100%",objectFit:"cover",errorText:"\u753b\u50cf\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093",borderRadius:"16px",backgroundColor:"rgba(15, 18, 31, 0.8)",ke:!1})}),(0,d.he)(yt,{children:[(0,d.he)(vt,{children:[(0,d._)("svg",{Rt:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,d._)("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})}),"VenAPE \u30b3\u30ec\u30af\u30b7\u30e7\u30f3"]}),(0,d.he)($t,{children:[(0,d.he)(kt,{children:[(0,d._)(Tt,{children:m.toLocaleString()}),(0,d._)(Ct,{children:"\u7dcf\u4f9b\u7d66\u91cf"})]}),(0,d.he)(kt,{children:[(0,d._)(Tt,{children:f.toLocaleString()}),(0,d._)(Ct,{children:"\u30df\u30f3\u30c8\u6e08\u307f"})]})]})]}),(0,d.he)(qt,{children:[(0,d.he)(Xt,{children:[(0,d._)("span",{children:"\u30df\u30f3\u30c8\u9032\u6357"}),(0,d.he)("span",{children:[f.toLocaleString()," /"," ",m.toLocaleString()]})]}),(0,d._)(Ht,{At:b})]}),(0,d.he)(Et,{children:[(0,d.he)(y,{direction:"prev",De:()=>{const r=e>0?e-1:ct.length-1;t(r)},children:[(0,d._)(Nt,{direction:"prev",children:(0,d._)("svg",{Rt:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:(0,d._)("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})})}),"\u524d\u306eNFT"]}),(0,d.he)(y,{De:()=>{const e=Math.floor(Math.random()*ct.length);t(e)},children:[(0,d._)("svg",{Rt:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",style:{marginRight:"8px"},children:(0,d._)("path",{d:"M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"})}),"\u30e9\u30f3\u30c0\u30e0"]}),(0,d.he)(y,{direction:"next",De:()=>{const r=(e+1)%ct.length;t(r)},children:["\u6b21\u306eNFT",(0,d._)(Nt,{children:(0,d._)("svg",{Rt:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:(0,d._)("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})})})]})]})]}),(0,d.he)(St,{children:[(0,d.he)(zt,{children:[(0,d._)(At,{children:(0,d.he)(T,{fontSize:"1.8rem",height:"40",maxWidth:"100%",fontWeight:"700",children:["VenAPE #",r||"?"]})}),(0,d._)(Rt,{children:"VenAPE\u3092\u6240\u6709\u3059\u308b\u3068\u3001\u30a2\u30fc\u30c8\u30ef\u30fc\u30af\u306e\u5b8c\u5168\u306a\u6240\u6709\u6a29\u3068\u3001\u30b3\u30df\u30e5\u30cb\u30c6\u30a3\u30a4\u30d9\u30f3\u30c8\u3084\u5c06\u6765\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30a8\u30a2\u30c9\u30ed\u30c3\u30d7\u306b\u53c2\u52a0\u3059\u308b\u7279\u6a29\u304c\u5f97\u3089\u308c\u307e\u3059\u3002"}),(0,d.he)(yt,{children:[(0,d.he)(vt,{children:[(0,d.he)("svg",{Rt:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,d._)("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),(0,d._)("circle",{cx:"9",cy:"7",r:"4"}),(0,d._)("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),(0,d._)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),"\u30b3\u30df\u30e5\u30cb\u30c6\u30a3\u60c5\u5831"]}),(0,d.he)($t,{children:[(0,d.he)(kt,{children:[(0,d._)(Tt,{children:"1.2K+"}),(0,d._)(Ct,{children:"\u30c7\u30a3\u30b9\u30b3\u30fc\u30c9\u30e1\u30f3\u30d0\u30fc"})]}),(0,d.he)(kt,{children:[(0,d._)(Tt,{children:"\u30a6\u30a3\u30fc\u30af\u30ea\u30fc"}),(0,d._)(Ct,{children:"\u30b3\u30df\u30e5\u30cb\u30c6\u30a3\u30a4\u30d9\u30f3\u30c8"})]})]})]}),(0,d.he)(jt,{children:[(0,d._)(It,{children:"\u7279\u5fb4"}),(0,d._)(Pt,{children:[{name:"\u30ec\u30a2\u5ea6",value:"\u30a8\u30d4\u30c3\u30af"},{name:"\u80cc\u666f",value:"\u30aa\u30ec\u30f3\u30b8"},{name:"\u76ae\u819a",value:"\u30b0\u30ec\u30fc"},{name:"\u76ee",value:"X\u5370"},{name:"\u670d\u88c5",value:"\u30b9\u30c8\u30e9\u30a4\u30d7"}].map(((e,t)=>(0,d.he)(Lt,{children:[(0,d._)(Mt,{children:e.name}),(0,d._)(Ot,{children:e.value})]},t)))})]}),(0,d.he)(_t,{children:[(0,d._)(Wt,{children:"Token ID:"}),(0,d._)("div",{style:{display:"flex",justifyContent:"flex-end",width:"50%",marginLeft:"auto"},children:(0,d._)(Bt,{value:r,Ke:e=>{let r=e.target.value.replace(/[^0-9]/g,"");""!==r&&parseInt(r)>9999&&(r="9999"),i(r);const n=ct.findIndex((e=>e.Oe===r));-1!==n&&t(n)},lt:"off",style:{border:"2px solid #6a11cb",background:"rgba(15, 18, 31, 0.8)",textAlign:"right",width:"100px",padding:"8px 12px",fontSize:"1.2rem",fontWeight:"700",borderRadius:"4px",color:"white"}})})]}),(0,d.he)(Dt,{children:[(0,d._)(Gt,{children:"\u4fa1\u683c:"}),(0,d.he)(Ut,{style:{paddingRight:"12px"},children:[(0,d._)(G,{style:{fontSize:"1.2rem",marginRight:"5px"},children:"\u039e"}),.18.toFixed(2)," ETH"]})]})]}),(0,d.he)(Ft,{children:[(0,d._)(w,{de:!0,disabled:a,De:async()=>{o(!0),s({visible:!1,h:!1,le:!1,message:""});try{await new Promise((e=>setTimeout(e,2e3))),s({visible:!0,h:!0,le:!1,message:`\u304a\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01TokenID: ${r}\u306eVenAPE NFT\u306e\u30df\u30f3\u30c8\u306b\u6210\u529f\u3057\u307e\u3057\u305f\u3002`}),setTimeout((()=>{s((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{s({visible:!1,h:!1,le:!1,message:""})}),3400)}catch(e){s({visible:!0,h:!1,le:!1,message:"\u30df\u30f3\u30c8\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30a6\u30a9\u30ec\u30c3\u30c8\u306e\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u518d\u8a66\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}),setTimeout((()=>{s((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{s({visible:!1,h:!1,le:!1,message:""})}),3400)}finally{o(!1)}},style:{height:"45px",fontSize:"1rem",boxShadow:"0 4px 8px rgba(106, 17, 203, 0.15)",marginTop:"auto",width:"100%",boxSizing:"border-box"},children:a?(0,d.he)(d.St,{children:[(0,d._)("svg",{Rt:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{animation:"spin 1s linear infinite",marginRight:"8px"},children:(0,d._)("path",{d:"M21 12a9 9 0 1 1-6.219-8.56"})}),"\u30df\u30f3\u30c8\u51e6\u7406\u4e2d..."]}):(0,d.he)(d.St,{children:[(0,d.he)("svg",{Rt:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:"8px"},children:[(0,d._)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,d._)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,d._)("polyline",{points:"21 15 16 10 5 21"})]}),"\u3053\u306eVenAPE\u3092\u30df\u30f3\u30c8\u3059\u308b"]})}),l.visible&&(0,d._)(Qt,{h:l.h,de:!0,se:!0,le:l.le,style:{width:"100%"},children:l.message})]})]})]})})]})]})}),Vt=a.ee.div`
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
`,Kt=a.ee.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.$} 0;
  /* 確保內容寬度一致，不受滾動條影響 */
  box-sizing: border-box;
  min-height: 70vh; /* 確保內容足夠高，保持頁面內容充實 */
  position: relative;
  padding-top: 0;
  margin-top: ${e=>e.theme.spacing.$};
`,Zt=a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.k};
  text-align: center;
  padding-top: 0;
`,Jt=a.ee.jt`
  margin-bottom: ${e=>e.theme.spacing.$};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`,er=e=>{let{children:t}=e;return(0,d._)(T,{fontSize:"2.5rem",height:"60",maxWidth:"400px",ae:!0,id:`mynft-title-${Math.random().toString(36).substring(7)}`,children:t})},tr=a.ee.Ae`
  color: ${e=>e.theme.t.text.l};
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`,rr=(a.ee.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.$};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.v};
`,a.ee.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${e=>e.theme.spacing.v};
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
`,a.ee.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.T};
  color: ${e=>e.theme.t.text.l};
`),nr=a.ee.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.T};
  color: ${e=>e.theme.t.text.l};
`,ir=a.ee.div`
  position: absolute;
  background: linear-gradient(145deg, #2a3142, #383f5e);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: ${e=>e.theme.borderRadius.C};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: ${e=>e.theme.spacing.u} 0;
  z-index: 1000;
  min-width: 150px;
  max-width: 180px;
  width: auto;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  backdrop-filter: blur(4px);
  transform-origin: ${e=>e.It?"bottom center":"top center"};
  animation: ${e=>e.It?"popUpFromBottom":"popDownFromTop"}
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
  ${e=>e.It?"\n    &::before {\n      border-top: 8px solid #383f5e;\n      border-bottom: none;\n      bottom: -8px;\n    }\n  ":"\n    &::before {\n      border-bottom: 8px solid #383f5e;\n      border-top: none;\n      top: -8px;\n    }\n  "}
`,ar=a.ee.div`
  padding: ${e=>`${e.theme.spacing.u} ${e.theme.spacing.v}`};
  color: ${e=>e.theme.t.text.o};
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
`,or=(a.ee.div`
  display: flex;
  margin-bottom: ${e=>e.theme.spacing.$};
  border-bottom: 1px solid ${e=>e.theme.t.text.l}44;
`,a.ee.button`
  padding: ${e=>e.theme.spacing.v};
  background-color: transparent;
  color: ${e=>e.active?e.theme.t.o:e.theme.t.text.o};
  border: none;
  border-bottom: 2px solid
    ${e=>e.active?e.theme.t.o:"transparent"};
  font-weight: ${e=>e.active?"bold":"normal"};
  cursor: pointer;

  &:hover {
    color: ${e=>e.theme.t.o};
  }
`,(0,a.ee)(Z)`
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: "出品中";
    position: absolute;
    top: 10px;
    left: 10px;
    background: ${e=>e.theme.t.o}CC;
    padding: 4px 12px;
    border-radius: 12px;
    color: white;
    font-size: 0.8rem;
    z-index: 5;
  }

  opacity: 0.8;
  filter: grayscale(30%);
`,a.ee.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${e=>e.theme.t.i};
  padding: ${e=>e.theme.spacing.k};
  border-radius: ${e=>e.theme.borderRadius.N};
  box-shadow: ${e=>e.theme.F.N};
  width: 95%;
  max-width: 550px;
  z-index: 1000;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${e=>e.theme.spacing.v};
    text-align: center;

    position: relative;
    display: inline-block;
    width: 100%;
  }
`),lr=(0,a.ee)(w)`
  margin-top: ${e=>e.theme.spacing.$};
  height: 54px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  border-radius: ${e=>e.theme.borderRadius.C};
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
`,dr=(a.ee.button`
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
  color: ${e=>e.theme.t.text.l};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${e=>e.theme.t.text.o};
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
`,a.ee.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  backdrop-filter: blur(4px);
`),sr=a.ee.input.tt({className:"transfer-input"})`
  && {
    width: 100%;
    padding: 12px 16px;
    margin: ${e=>e.theme.spacing.$} 0;
    border-radius: ${e=>e.theme.borderRadius.C};
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.t.text.o};
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
      color: ${e=>e.theme.t.text.l}99;
    }
  }
`,cr=a.ee.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.v};
  margin: ${e=>e.theme.spacing.$} 0;
  padding: ${e=>e.theme.spacing.$};
  background: ${e=>e.theme.t.background};
  border-radius: ${e=>e.theme.borderRadius.C};

  img {
    width: 75px;
    height: 75px;
    border-radius: ${e=>e.theme.borderRadius.small};
    object-fit: cover;
  }

  div {
    width: 100%;

    p {
      color: ${e=>e.theme.t.text.l};
    }
  }
`,pr=e=>{let{children:t}=e;return(0,d._)(T,{fontSize:"1.2rem",height:"30",marginBottom:"8px",id:`transfer-nft-${Math.random().toString(36).substring(7)}`,children:t})},hr=(a.ee.div.tt((e=>({className:"transfer-status "+(e.h?"success":"error")})))`
  opacity: ${e=>e.le?0:1};
`,(0,a.ee)(k)`
  margin-top: ${e=>e.theme.spacing.v};
  width: 100%;
`),gr=a.ee.Ae`
  color: ${e=>e.theme.t.text.l};
  margin-top: ${e=>e.theme.spacing.u};
`,mr=a.ee.button`
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
  color: ${e=>e.theme.t.text.l};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${e=>e.theme.t.text.o};
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
`,fr=()=>{const[e,t]=(0,n.I)([]),[r,i]=(0,n.I)(!0),[a,o]=(0,n.I)(""),[l,s]=(0,n.I)("all"),[c,p]=(0,n.I)("recent"),[h,g]=(0,n.I)(null),[m,b]=(0,n.I)(!1),[u,x]=(0,n.I)(!1),[w,y]=(0,n.I)(""),[v,$]=(0,n.I)({top:0,left:0}),[T,E]=(0,n.I)({show:!1,h:!1,le:!1,message:""}),N=(0,f.Et)(),S=[...new Set(e.map((e=>e.Be)))];(0,n.K)((()=>{(async()=>{try{const e=await Promise.all(ge.map((async e=>{const t=Math.random()>.7,r=await(0,C.Le)(e);return{...e,_e:t,We:t?(2*Math.random()+.1).toFixed(2):null,Pt:r.url||e.image,Lt:!1,Mt:r.error}})));t(e),i(!1)}catch(e){i(!1)}})()}),[]);const z=(0,n.wt)((e=>{o(e)}),[]),F=e.filter((e=>!(a&&!e.name.toLowerCase().includes(a.toLowerCase()))&&("all"===l||e.Be===l))).sort(((e,t)=>"name_asc"===c?e.name.localeCompare(t.name):"name_desc"===c?t.name.localeCompare(e.name):"recent"===c?parseInt(t.Oe)-parseInt(e.Oe):0)),A=()=>{x(!1)};(0,n.K)((()=>{}),[m,h]);return(0,d.he)(d.St,{children:[(0,d._)(Vt,{className:"content-container",children:(0,d.he)(Kt,{children:[(0,d.he)(Zt,{children:[(0,d._)(Jt,{children:(0,d._)(er,{children:"\u30de\u30a4NFT"})}),(0,d._)(tr,{children:"\u3042\u306a\u305f\u306e\u30a6\u30a9\u30ec\u30c3\u30c8\u306b\u3042\u308b\u3059\u3079\u3066\u306eNFT\u3092\u3053\u3053\u3067\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002"})]}),r?(0,d.he)(rr,{children:[(0,d._)("h3",{children:"NFT\u3092\u8aad\u307f\u8fbc\u307f\u4e2d..."}),(0,d._)("p",{children:"\u304a\u6301\u3061\u306eNFT\u3092\u53d6\u5f97\u3057\u3066\u3044\u307e\u3059\u3002\u3057\u3070\u3089\u304f\u304a\u5f85\u3061\u304f\u3060\u3055\u3044\u3002"})]}):(0,d.he)(d.St,{children:[(0,d._)(he,{rt:a,nt:z,it:"NFT\u3092\u691c\u7d22...",filters:[{value:l,options:[{value:"all",label:"\u3059\u3079\u3066\u306e\u30b3\u30ec\u30af\u30b7\u30e7\u30f3"},...S.map((e=>({value:e,label:e})))],Ke:s},{value:c,options:[{value:"recent",label:"\u6700\u65b0\u9806"},{value:"name_asc",label:"\u540d\u524d\uff08A-Z\uff09"},{value:"name_desc",label:"\u540d\u524d\uff08Z-A\uff09"}],Ke:p}]}),F.length>0?(0,d._)(re,{items:F,je:"\u64cd\u4f5c",Ge:!1,Ue:(e,t)=>{t&&(t.preventDefault(),t.stopPropagation(),((e,t)=>{if(t.stopPropagation(),g(e),t&&t.currentTarget){const e=t.currentTarget.getBoundingClientRect(),r=document.querySelector(".content-container").getBoundingClientRect(),n=e.left-r.left+e.width/2-75,i=window.innerHeight,a=150,o=e.bottom+a+10>i;let l;l=o?e.top-r.top-a-10:e.bottom-r.top+25,l<0&&(l=10),$({top:l,left:n,It:o})}b(!0)})(e,t))},Qe:e=>e.statusMessage?{message:e.statusMessage,h:"success"===e.Ot,le:e.le}:null,Ye:"processedImage"}):(0,d.he)(nr,{children:[(0,d._)("h3",{children:"NFT\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093"}),(0,d._)("p",{children:"NFT\u3092\u30df\u30f3\u30c8\u3059\u308b\u304b\u3001\u4ed6\u306e\u30e6\u30fc\u30b6\u30fc\u304b\u3089\u8cfc\u5165\u3057\u3066\u304f\u3060\u3055\u3044\u3002"})]}),m&&h&&(0,d.he)(d.St,{children:[(0,d._)(dr,{De:()=>b(!1)}),(0,d.he)(ir,{style:{top:`${v.top}px`,left:`${v.left}px`},It:v.It,children:[h._e?(0,d._)(ar,{De:e=>{e.stopPropagation(),alert(`\u53d6\u6d88\u51fa\u54c1\uff1a${h.name}`),b(!1)},children:"\u51fa\u54c1\u3092\u53d6\u308a\u6d88\u3059"}):(0,d.he)(d.St,{children:[(0,d._)(ar,{De:e=>{var t;e.stopPropagation(),t=h,be.Je=t,window.dispatchEvent(new CustomEvent("nft-selected")),N("/?tab=listnft"),b(!1)},children:"\u30de\u30fc\u30b1\u30c3\u30c8\u306b\u51fa\u54c1"}),(0,d._)(ar,{De:e=>{e.stopPropagation(),g(h),x(!0),b(!1)},children:"\u8ee2\u9001\u3059\u308b"})]}),(0,d._)(ar,{De:e=>{e.stopPropagation(),N(`/history?nft=${h.Oe}`)},children:"\u5c65\u6b74\u30da\u30fc\u30b8\u3078"})]})]})]})]})}),u&&h&&(0,d.he)(d.St,{children:[(0,d._)(dr,{De:A}),(0,d.he)(or,{children:[(0,d._)(mr,{De:A,children:"\xd7"}),(0,d._)("h3",{children:"NFT\u3092\u8ee2\u9001"}),(0,d.he)(cr,{children:[(0,d._)(j,{src:h.Pt||h.image,alt:h.name,width:"100%",height:"100%",objectFit:"cover"}),(0,d.he)("div",{children:[(0,d._)(pr,{children:h.name}),(0,d._)(gr,{children:h.Be})]})]}),(0,d._)(sr,{placeholder:"\u53d7\u53d6\u4eba\u306e\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b",value:w,Ke:e=>y(e.target.value)}),(0,d._)(lr,{De:()=>{if(!w.trim())return E({show:!0,h:!1,le:!1,message:"\u53d7\u53d6\u4eba\u306e\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}),setTimeout((()=>{E((e=>({...e,le:!0})))}),3e3),void setTimeout((()=>{E({show:!1,h:!1,le:!1,message:""})}),3400);try{E({show:!0,h:!0,le:!1,message:"\u8ee2\u9001\u6210\u529f\uff01"}),setTimeout((()=>{E((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{E({show:!1,h:!1,le:!1,message:""}),x(!1),y("")}),3400)}catch(e){E({show:!0,h:!1,le:!1,message:"NFT\u306e\u8ee2\u9001\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002"}),setTimeout((()=>{E((e=>({...e,le:!0})))}),3e3),setTimeout((()=>{E({show:!1,h:!1,le:!1,message:""})}),3400)}},de:!0,disabled:!w.trim(),children:"\u8ee2\u9001\u3059\u308b"}),T.show&&(0,d._)(hr,{h:T.h,le:T.le,se:!1,ae:!0,children:T.message})]})]}),T.show&&!u&&(0,d._)(k,{h:T.h,le:T.le,style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:1100,minWidth:"300px",maxWidth:"80%"},children:T.message})]})},br=a.ee.div`
  background: ${e=>`linear-gradient(145deg, ${e.theme.t.i||"#1e2633"}, ${e.theme.t.i||"#1e2633"}F8)`};
  border-radius: ${e=>e.theme.borderRadius.C};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: ${e=>e.theme.spacing.v};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`,ur=a.ee.div`
  width: 80px;
  height: 80px;
  border-radius: ${e=>e.theme.borderRadius.C};
  overflow: hidden;
  flex-shrink: 0;
  background: ${e=>e.theme.t.background};
  position: relative;
`,xr=a.ee.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* 確保flex子項可以正確縮小 */
  overflow: hidden; /* 防止內容溢出 */
`,wr=a.ee.div`
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
`,yr=a.ee.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  width: fit-content;
  min-width: 50px;
  text-align: center;
  background: ${e=>{let{type:t,theme:r}=e;switch(t){case"purchase":return"rgba(0, 255, 157, 0.15)";case"sale":return"rgba(255, 46, 99, 0.15)";case"mint":return"rgba(106, 17, 203, 0.15)";case"transfer":return"rgba(37, 117, 252, 0.15)";default:return r.t.background}}};
  color: ${e=>{let{type:t}=e;switch(t){case"purchase":return"#00ff9d";case"sale":return"#ff2e63";case"mint":return"#6a11cb";case"transfer":return"#2575fc";default:return"#ffffff"}}};
`,vr=a.ee.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.u};
  font-size: 0.9rem;
  color: ${e=>e.theme.t.text.l};
  flex-wrap: wrap; /* 允許在需要時換行 */
  overflow: hidden; /* 防止內容溢出 */
  text-overflow: ellipsis; /* 當文字太長時顯示省略號 */
  white-space: nowrap; /* 保持文字在一行 */
`,$r=a.ee.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0; /* 防止價格區域被壓縮 */
  margin-left: auto; /* 確保價格區域靠右 */
  min-width: 80px; /* 提供最小寬度 */
`,kr=a.ee.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`,Tr=a.ee.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.t.text.l};
  opacity: 0.8;
`,Cr=a.ee.span`
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
`,Er=e=>{let{transaction:t}=e;const[i,a]=(0,n.I)(t.bt),[o,l]=(0,n.I)(!0);(0,n.K)((()=>{(async()=>{try{const e={Oe:t.Oe||"",ct:t.ct||"",image:t.bt,st:t.st,Be:t.ft},n=await(0,C.Le)(e);if(n.url)a(n.url);else if(t.bt){const{Ee:e}=await Promise.resolve().then(r.bind(r,7956)),n=e(t.bt);n&&a(n)}}catch(e){}finally{l(!1)}})()}),[t.bt,t.Oe,t.ct,t.st,t.ft]);return(0,d.he)(br,{children:[(0,d._)(ur,{children:(0,d._)(j,{src:i,alt:t.gt,width:"100%",height:"100%",objectFit:"cover",errorText:"\u753b\u50cf\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093",borderRadius:"8px",backgroundColor:"rgba(0, 0, 0, 0.05)",ke:!0})}),(0,d.he)(xr,{children:[(0,d._)(yr,{type:t.type,children:(e=>{switch(e){case"purchase":return"\u8cfc\u5165";case"sale":return"\u8ca9\u58f2";case"mint":return"\u92f3\u9020";case"transfer":return"\u8ee2\u9001";default:return"\u53d6\u5f15"}})(t.type)}),(0,d._)(wr,{children:(0,d._)(T,{id:`tx-gradient-${t.id}`,fontSize:"1.1rem",height:"26",letterSpacing:"0.01em",style:{marginTop:"-2px"},children:t.gt})}),(0,d.he)(vr,{children:[(0,d._)("span",{children:t.ft}),(e=>{switch(e.type){case"purchase":return(0,d.he)(d.St,{children:["\u304b\u3089"," ",(0,d.he)(Cr,{children:[e.from.slice(0,6),"...",e.from.slice(-4)]})," ","\u8cfc\u5165"]});case"sale":return(0,d.he)(d.St,{children:["\u3092"," ",(0,d.he)(Cr,{children:[e.to.slice(0,6),"...",e.to.slice(-4)]})," ","\u306b\u8ca9\u58f2"]});case"mint":return(0,d._)(d.St,{children:"\u3092\u92f3\u9020"});case"transfer":return(0,d.he)(d.St,{children:["\u3092"," ",(0,d.he)(Cr,{children:[e.to.slice(0,6),"...",e.to.slice(-4)]})," ","\u306b\u8ee2\u9001"]});default:return null}})(t)]})]}),(0,d.he)($r,{children:[t.We>0&&(0,d.he)(kr,{children:[(0,d._)(G,{children:"\u039e"}),t.We]}),(0,d._)(Tr,{children:(s=t.ut,new Date(s).toLocaleDateString("ja-JP",{_t:"numeric",Wt:"2-digit",Bt:"2-digit",Dt:"2-digit",Gt:"2-digit"}).replace(",",""))})]})]});var s},Nr=a.ee.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.k};
  /* 確保滾動條不會導致布局偏移 */
  padding-right: calc(${e=>e.theme.spacing.k} + 6px);
  padding-top: 0; /* 移除頂部間距 */
  margin-top: ${e=>e.theme.spacing.$}; /* 添加頂部外邊距 */
`,Sr=a.ee.div`
  margin-bottom: ${e=>e.theme.spacing.k};
  text-align: center;
  padding-top: 0; /* 移除頂部間距 */
`,zr=a.ee.jt`
  margin-bottom: ${e=>e.theme.spacing.$};
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`,Fr=e=>{let{children:t}=e;return(0,d._)(T,{fontSize:"2.5rem",height:"60",maxWidth:"400px",ae:!0,id:`transaction-title-${Math.random().toString(36).substring(7)}`,children:t})},Ar=a.ee.Ae`
  color: ${e=>e.theme.t.text.l};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`,Rr=a.ee.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.v};
  margin-top: ${e=>e.theme.spacing.$};
`,jr=a.ee.div`
  text-align: center;
  padding: 80px 30px;
  color: ${e=>e.theme.t.text.l};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${e=>e.theme.borderRadius.N};
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
`,Ir=e=>{let{children:t}=e;return(0,d._)(T,{fontSize:"1.8rem",height:"40",maxWidth:"300px",ae:!0,id:`empty-title-${Math.random().toString(36).substring(7)}`,children:t})},Pr=()=>{const[e,t]=(0,n.I)(""),[r,i]=(0,n.I)("all"),[a,o]=(0,n.I)("recent"),l=(0,n.wt)((e=>{t(e)}),[]),s=(0,n.wt)((e=>{i(e)}),[]),c=(0,n.wt)((e=>{o(e)}),[]),p=(0,n.Nt)((()=>fe.filter((t=>!(e&&!t.gt.toLowerCase().includes(e.toLowerCase()))&&("all"===r||t.type===r))).sort(((e,t)=>"price_high"===a?t.We-e.We:"price_low"===a?e.We-t.We:new Date(t.ut)-new Date(e.ut)))),[e,r,a]);return(0,d.he)(Nr,{className:"content-container",children:[(0,d.he)(Sr,{children:[(0,d._)(zr,{children:(0,d._)(Fr,{children:"\u53d6\u5f15\u5c65\u6b74"})}),(0,d._)(Ar,{children:"\u3042\u306a\u305f\u306eNFT\u53d6\u5f15\u5c65\u6b74\u3092\u95b2\u89a7\u3067\u304d\u307e\u3059\u3002\u8cfc\u5165\u3001\u51fa\u54c1\u3001\u92f3\u9020\u3001\u8ee2\u9001\u306a\u3069\u306e\u3059\u3079\u3066\u306e\u6d3b\u52d5\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002"})]}),(0,d._)(he,{rt:e,nt:l,it:"NFT\u3092\u691c\u7d22...",filters:[{value:r,options:[{value:"all",label:"\u3059\u3079\u3066\u306e\u53d6\u5f15"},{value:"purchase",label:"\u8cfc\u5165"},{value:"sale",label:"\u8ca9\u58f2"},{value:"mint",label:"\u92f3\u9020"},{value:"transfer",label:"\u8ee2\u9001"}],Ke:s},{value:a,options:[{value:"recent",label:"\u6700\u65b0\u9806"},{value:"price_high",label:"\u4fa1\u683c\uff08\u9ad8\u3044\u9806\uff09"},{value:"price_low",label:"\u4fa1\u683c\uff08\u5b89\u3044\u9806\uff09"}],Ke:c}]}),(0,d._)(Rr,{children:p.length>0?p.map((e=>(0,d._)(Er,{transaction:e},e.id))):(0,d.he)(jr,{children:[(0,d._)("h3",{children:(0,d._)(Ir,{children:"\u53d6\u5f15\u8a18\u9332\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093"})}),(0,d._)("p",{children:"\u691c\u7d22\u6761\u4ef6\u3092\u5909\u66f4\u3057\u3066\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002"})]})})]})},Lr=a.ee.div`
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.t.i};
  border-radius: ${e=>e.theme.borderRadius.N};
  overflow: hidden;
  box-shadow: ${e=>e.theme.F.C};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>e.theme.F.N};
  }
`,Mr=a.ee.div`
  width: 100%;
  height: ${e=>e.imageHeight||"300px"};
  position: relative;
`,Or=a.ee.div`
  padding: ${e=>e.theme.spacing.$};
`,_r=a.ee.Fe`
  margin: 0 0 ${e=>e.theme.spacing.v};
  font-size: 1.2rem;
  color: ${e=>e.theme.t.text.o};
`,Wr=a.ee.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${e=>e.theme.spacing.u};
  margin-top: ${e=>e.theme.spacing.v};
`,Br=a.ee.div`
  background: rgba(106, 17, 203, 0.1);
  border-radius: ${e=>e.theme.borderRadius.small};
  padding: ${e=>e.theme.spacing.u};
  text-align: center;

  .trait-type {
    font-size: 0.7rem;
    color: ${e=>e.theme.t.text.l};
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .trait-value {
    font-size: 0.9rem;
    color: ${e=>e.theme.t.text.o};
    font-weight: 500;
  }
`,Dr=a.ee.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${e=>e.theme.t.text.l};
`,Gr=a.ee.div`
  padding: ${e=>e.theme.spacing.$};
  color: ${e=>e.theme.t.error};
  text-align: center;
`,Ur=e=>{let{Ut:t,Qt:r,Oe:i,metadata:a,ve:o,imageHeight:l,className:s,...c}=e;const[p,h]=(0,n.I)(a||null),[g,m]=(0,n.I)(!a),[f,b]=(0,n.I)(null);return(0,n.K)((()=>{if(a)return h(a),void m(!1);if(!(t||r&&void 0!==i))return b("\u7121\u6548\u7684\u5143\u6578\u64daURL\u6216tokenId"),void m(!1);(async()=>{try{m(!0),b(null);const e=t||(0,C.qt)(r,i,o),n=await fetch(e);if(!n.ok)throw new Error(`\u7372\u53d6\u5143\u6578\u64da\u5931\u6557: ${n.status} ${n.statusText}`);const a=await n.json();h(a)}catch(e){b(e.message||"\u7372\u53d6\u5143\u6578\u64da\u5931\u6557")}finally{m(!1)}})()}),[t,r,i,a,o]),g?(0,d._)(Dr,{children:"\u8aad\u307f\u8fbc\u307f\u4e2d..."}):f?(0,d._)(Gr,{children:f}):p?(0,d.he)(Lr,{className:s,...c,children:[(0,d._)(Mr,{imageHeight:l,children:(0,d._)(j,{src:p.image,alt:p.name||"NFT Image",ve:o,height:"100%",width:"100%",objectFit:"cover"})}),(0,d.he)(Or,{children:[(0,d._)(_r,{children:p.name||"Unnamed NFT"}),p.description&&(0,d._)("p",{children:p.description}),p.attributes&&p.attributes.length>0&&(0,d.he)(d.St,{children:[(0,d._)("h4",{children:"\u5c5e\u6027"}),(0,d._)(Wr,{children:p.attributes.map(((e,t)=>(0,d.he)(Br,{children:[(0,d._)("div",{className:"trait-type",children:e.Xt}),(0,d._)("div",{className:"trait-value",children:e.value})]},t)))})]})]})]}):(0,d._)(Gr,{children:"\u30e1\u30bf\u30c7\u30fc\u30bf\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093"})},Qr=a.ee.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.k};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.k};
`,qr=a.ee.Ht`
  background: ${e=>e.theme.t.i};
  border-radius: ${e=>e.theme.borderRadius.N};
  padding: ${e=>e.theme.spacing.$};
  box-shadow: ${e=>e.theme.F.C};
`,Xr=a.ee.$t`
  margin-bottom: ${e=>e.theme.spacing.v};
  color: ${e=>e.theme.t.text.o};
  font-size: 1.5rem;
`,Hr=a.ee.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing.v};
  margin-top: ${e=>e.theme.spacing.v};
`,Yr=a.ee.Yt`
  background: ${e=>e.theme.t.background};
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.v};
  overflow-x: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  margin: ${e=>e.theme.spacing.v} 0;
`,Vr=a.ee.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing.$};
  margin-top: ${e=>e.theme.spacing.v};
`,Kr=a.ee.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.u};
  margin-top: ${e=>e.theme.spacing.v};

  label {
    font-size: 0.9rem;
    color: ${e=>e.theme.t.text.l};
  }

  input {
    padding: ${e=>e.theme.spacing.u};
    border-radius: ${e=>e.theme.borderRadius.small};
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(30, 36, 68, 0.6);
    color: ${e=>e.theme.t.text.o};
  }
`,Zr=a.ee.button`
  background: linear-gradient(120deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.C};
  padding: ${e=>e.theme.spacing.u}
    ${e=>e.theme.spacing.$};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  margin-top: ${e=>e.theme.spacing.v};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`,Jr=a.ee.div`
  margin-top: ${e=>e.theme.spacing.v};
  padding: ${e=>e.theme.spacing.u};
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
`,en=()=>{const[e,t]=(0,n.I)("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"),[r,i]=(0,n.I)("0"),[a,o]=(0,n.I)(""),[l,s]=(0,n.I)("0"),[c,p]=(0,n.I)("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"),[h,g]=(0,n.I)(null),[m,f]=(0,n.I)(""),[b,u]=(0,n.I)(null),[x,w]=(0,n.I)("");return(0,d.he)(Qr,{children:[(0,d.he)(qr,{children:[(0,d._)(Xr,{children:"IPFS\u30a4\u30e1\u30fc\u30b8\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8"}),(0,d._)("p",{children:"\u3053\u306e\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306fIPFS\u30d7\u30ed\u30c8\u30b3\u30eb\u306e\u753b\u50cfURL\u3092\u51e6\u7406\u3057\u3001\u6b63\u3057\u304f\u8868\u793a\u3057\u307e\u3059\u3002"}),(0,d._)(Yr,{children:'import IPFSImage from \'../IPFSImage\';\n          \n// \u4f7f\u7528\u4f8b\n<IPFSImage \n  src="ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ" \n  alt="Bored Ape" \n  width="200px"\n  height="200px"\n/>'}),(0,d._)("h3",{children:"\u3055\u307e\u3056\u307e\u306aIPFS URL\u5f62\u5f0f\u306e\u30c7\u30e2:"}),(0,d._)(Hr,{children:["ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ","ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ","QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ"].map(((e,t)=>(0,d.he)("div",{children:[(0,d.he)("p",{children:["URL: ",e]}),(0,d.he)("p",{children:["\u5909\u63db\u5f8c: ",(0,C.Ee)(e)]}),(0,d._)(j,{src:e,alt:`IPFS Image ${t}`,width:"100%",height:"200px",borderRadius:"10px"})]},t)))})]}),(0,d.he)(qr,{children:[(0,d._)(Xr,{children:"NFT\u30e1\u30bf\u30c7\u30fc\u30bf\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8"}),(0,d._)("p",{children:"\u3053\u306e\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306fNFT\u306e\u30e1\u30bf\u30c7\u30fc\u30bf\u3092\u53d6\u5f97\u3057\u3001\u753b\u50cf\u3068\u5c5e\u6027\u3092\u8868\u793a\u3057\u307e\u3059\u3002"}),(0,d._)(Yr,{children:'import NFTMetadata from \'../NFTMetadata\';\n          \n// \u30e1\u30bf\u30c7\u30fc\u30bf\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u76f4\u63a5\u63d0\u4f9b\u3059\u308b\u5834\u5408\n<NFTMetadata \n  metadata={sampleMetadata} \n  imageHeight="300px"\n/>\n\n// \u30d9\u30fc\u30b9URL\u3068\u30c8\u30fc\u30af\u30f3ID\u3092\u63d0\u4f9b\u3057\u3066\u81ea\u52d5\u7684\u306b\u30e1\u30bf\u30c7\u30fc\u30bf\u3092\u53d6\u5f97\u3059\u308b\u5834\u5408\n<NFTMetadata \n  baseUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq" \n  tokenId="0"\n  imageHeight="300px"\n/>\n\n// \u30e1\u30bf\u30c7\u30fc\u30bfURL\u3092\u76f4\u63a5\u63d0\u4f9b\u3059\u308b\u5834\u5408\n<NFTMetadata \n  metadataUrl="ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0" \n  imageHeight="300px"\n/>'}),(0,d._)("h3",{children:"\u30b5\u30f3\u30d7\u30eb\u30e1\u30bf\u30c7\u30fc\u30bf\u306e\u8868\u793a:"}),(0,d.he)(Vr,{children:[(0,d._)(Ur,{metadata:{image:"ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",attributes:[{Xt:"Earring",value:"Silver Hoop"},{Xt:"Background",value:"Orange"},{Xt:"Fur",value:"Robot"},{Xt:"Clothes",value:"Striped Tee"},{Xt:"Mouth",value:"Discomfort"},{Xt:"Eyes",value:"X Eyes"}],name:"Bored Ape #0",description:"BAYC\u662f\u4e00\u500bNFT\u96c6\u5408\uff0c\u6bcf\u500b\u4ee4\u724c\u662f\u7531Boring Ape Yacht Club\u7522\u751f\u7684\u7368\u7279\u7684\u7121\u804a\u733f\u3002"},imageHeight:"300px"}),(0,d.he)("div",{children:[(0,d._)("h3",{children:"\u72ec\u81ea\u306eNFT\u30e1\u30bf\u30c7\u30fc\u30bf\u3092\u53d6\u5f97\u3059\u308b"}),(0,d.he)(Kr,{children:[(0,d._)("label",{children:"\u30d9\u30fc\u30b9URL:"}),(0,d._)("input",{type:"text",value:e,Ke:e=>t(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"})]}),(0,d.he)(Kr,{children:[(0,d._)("label",{children:"\u30c8\u30fc\u30af\u30f3ID:"}),(0,d._)("input",{type:"text",value:r,Ke:e=>i(e.target.value),placeholder:"0"})]}),(0,d._)("p",{children:"\u307e\u305f\u306f"}),(0,d.he)(Kr,{children:[(0,d._)("label",{children:"\u30e1\u30bf\u30c7\u30fc\u30bfURL (\u30aa\u30d7\u30b7\u30e7\u30f3):"}),(0,d._)("input",{type:"text",value:a,Ke:e=>o(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0"})]}),(0,d._)(Zr,{De:()=>{t(e),i(r),o(a)},children:"\u66f4\u65b0"})]})]}),a?(0,d.he)("div",{style:{marginTop:"20px"},children:[(0,d._)("h3",{children:"\u30ab\u30b9\u30bf\u30e0URL\u306e\u7d50\u679c:"}),(0,d._)(Ur,{Ut:a,imageHeight:"300px"})]}):e&&r&&(0,d.he)("div",{style:{marginTop:"20px"},children:[(0,d._)("h3",{children:"\u30d9\u30fc\u30b9URL + \u30c8\u30fc\u30af\u30f3ID\u306e\u7d50\u679c:"}),(0,d._)(Ur,{Qt:e,Oe:r,imageHeight:"300px"})]})]}),(0,d.he)(qr,{children:[(0,d._)(Xr,{children:"\u30c8\u30fc\u30af\u30f3ID\u306b\u57fa\u3065\u3044\u305fNFT\u30e1\u30bf\u30c7\u30fc\u30bf\u306e\u53d6\u5f97"}),(0,d._)("p",{children:"TokenID\u3092\u4f7f\u7528\u3057\u3066IPFS\u304b\u3089NFT\u30e1\u30bf\u30c7\u30fc\u30bf\u3068\u753b\u50cf\u3092\u52d5\u7684\u306b\u53d6\u5f97\u3059\u308b\u30c7\u30e2\u3067\u3059\u3002"}),(0,d._)(Yr,{children:'// TokenID \u306b\u57fa\u3065\u3044\u3066\u30e1\u30bf\u30c7\u30fc\u30bf\u3068\u753b\u50cf\u3092\u53d6\u5f97\nimport { fetchNFTMetadata, fetchNFTImageUrl } from "../../utils/ipfsUtils";\n\n// \u30e1\u30bf\u30c7\u30fc\u30bf\u3092\u53d6\u5f97\nconst metadata = await fetchNFTMetadata(\n  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", \n  "0"\n);\n\n// \u753b\u50cfURL\u3092\u76f4\u63a5\u53d6\u5f97\nconst imageUrl = await fetchNFTImageUrl(\n  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq", \n  "0"\n);'}),(0,d.he)(Kr,{children:[(0,d._)("label",{children:"\u30d9\u30fc\u30b9URL:"}),(0,d._)("input",{type:"text",value:c,Ke:e=>p(e.target.value),placeholder:"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq"})]}),(0,d.he)(Kr,{children:[(0,d._)("label",{children:"\u30c8\u30fc\u30af\u30f3ID:"}),(0,d._)("input",{type:"text",value:l,Ke:e=>s(e.target.value),placeholder:"0"})]}),(0,d._)(Zr,{De:async()=>{try{u("loading"),w("");const e=await(0,C.Vt)(c,l);g(e);const t=await(0,C.Kt)(c,l);f(t),u("success")}catch(e){u("error"),w(e.message||"\u7372\u53d6\u5143\u6578\u64da\u5931\u6557")}},children:"\u30e1\u30bf\u30c7\u30fc\u30bf\u3068\u30a4\u30e1\u30fc\u30b8\u3092\u53d6\u5f97"}),"loading"===b&&(0,d._)(Jr,{className:"loading",children:"\u8aad\u307f\u8fbc\u307f\u4e2d..."}),"error"===b&&(0,d._)(Jr,{className:"error",children:x}),"success"===b&&(0,d.he)("div",{children:[(0,d._)(Jr,{className:"success",children:"\u30e1\u30bf\u30c7\u30fc\u30bf\u3092\u6b63\u5e38\u306b\u53d6\u5f97\u3057\u307e\u3057\u305f\uff01"}),(0,d._)("h3",{children:"\u53d6\u5f97\u3057\u305f\u30e1\u30bf\u30c7\u30fc\u30bf:"}),(0,d._)(Yr,{children:JSON.stringify(h,null,2)}),(0,d._)("h3",{children:"\u753b\u50cfURL:"}),(0,d._)("p",{children:m}),(0,d._)("h3",{children:"\u753b\u50cf\u30d7\u30ec\u30d3\u30e5\u30fc:"}),(0,d._)(j,{src:m,alt:"Dynamic NFT Image",width:"300px",height:"300px",borderRadius:"10px"})]})]})]})},tn=()=>(0,d._)("main",{children:(0,d.he)(f.Zt,{children:[(0,d._)(f.Jt,{path:"/",element:(0,d._)(st,{})}),(0,d._)(f.Jt,{path:"/my-nfts",element:(0,d._)(fr,{})}),(0,d._)(f.Jt,{path:"/history",element:(0,d._)(Pr,{})}),(0,d._)(f.Jt,{path:"/mint-venape",element:(0,d._)(Yt,{})}),(0,d._)(f.Jt,{path:"/ipfs-example",element:(0,d._)(en,{})})]})});var rn=r(8484);const nn={tr:"production",rr:"/nftswap",nr:void 0,ir:void 0,ar:void 0,lr:!0,dr:"/nftswap"}.er||"YOUR_WALLET_CONNECT_PROJECT_ID",an=()=>"undefined"!=typeof window&&Boolean(window.ethereum),on=async e=>{let t,n,i;try{if("metamask"===e){if(!an())throw new Error("\u8acb\u5b89\u88ddMetaMask\u9322\u5305\u64f4\u5c55");const e=await window.ethereum.request({method:"eth_accounts"});e&&0!==e.length||await window.ethereum.request({method:"eth_requestAccounts"}),t=new rn.sr(window.ethereum);const r=await window.ethereum.request({method:"eth_chainId"});n=parseInt(r,16).toString();i=(await window.ethereum.request({method:"eth_accounts"}))[0]}else{if("walletconnect"!==e)throw new Error("\u4e0d\u652f\u6301\u7684\u9322\u5305\u985e\u578b");try{const{cr:e}=await Promise.all([r.e(121),r.e(455)]).then(r.bind(r,5785)),a=await e.init({pr:nn,hr:[97],gr:[1,5,11155111,31337],mr:!0,br:["eth_sendTransaction","eth_signTransaction","personal_sign","eth_sign","eth_signTypedData"],events:["chainChanged","accountsChanged"],ur:{1:"https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",5:"https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",11155111:"https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",97:"https://bsc-testnet-dataseed.bnbchain.org",31337:"http://localhost:8545"},metadata:{name:"NFT\u4ea4\u6613\u5e73\u53f0",description:"\u4f7f\u7528WalletConnect\u9023\u63a5\u5230NFT\u4ea4\u6613\u5e73\u53f0",url:window.location.origin,wr:[`${window.location.origin}/logo192.png`]}});await a.enable(),t=new rn.sr(a);n=(await t.vr()).yr.toString();const o=await t.$r();i=await o[0].kr()}catch(e){throw new Error("WalletConnect\u9023\u63a5\u5931\u6557\uff0c\u8acb\u91cd\u8a66")}}return{provider:t,address:i,yr:n}}catch(e){throw e}},ln=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4;return e?e.length<t+r?e:`${e.substring(0,t)}...${e.substring(e.length-r)}`:""};var dn=r(5575);const sn="SUCCESS",cn="ERROR",pn="WARNING",hn="INFO",gn="ADD",mn="REMOVE",fn="CLEAR_ALL",bn=(0,n.j)(),un={notifications:[]},xn=(e,t)=>{switch(t.type){case gn:return{...e,notifications:[...e.notifications,t.Tr]};case mn:return{...e,notifications:e.notifications.filter((e=>e.id!==t.Tr))};case fn:return{...e,notifications:[]};default:return e}},wn=e=>{let{children:t}=e;const[r,i]=(0,n.Cr)(xn,un),a=(0,n.wt)((e=>{const t=e.id||(0,dn.Er)(),r={id:t,type:hn,title:"",message:"",Nr:!0,duration:5e3,...e,Sr:new Date};return i({type:gn,Tr:r}),t}),[]),o=(0,n.wt)((e=>{i({type:mn,Tr:e})}),[]),l=(0,n.wt)((()=>{i({type:fn})}),[]),s=(0,n.wt)((function(e){return a({type:sn,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),c=(0,n.wt)((function(e){return a({type:cn,message:e,Nr:!1,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),p=(0,n.wt)((function(e){return a({type:pn,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),h=(0,n.wt)((function(e){return a({type:hn,message:e,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}),[a]),g={notifications:r.notifications,zr:a,Fr:o,Ar:l,Rr:s,jr:c,Ir:p,Pr:h};return(0,d._)(bn.W,{value:g,children:t})},yn=()=>{const e=(0,n.G)(bn);if(void 0===e)throw new Error("useNotification must be used within a NotificationProvider");return e},vn="97",$n="31337",kn={Lr:"\u30a6\u30a9\u30ec\u30c3\u30c8\u304c\u63a5\u7d9a\u3055\u308c\u307e\u3057\u305f",Mr:"\u63a5\u7d9a\u5b8c\u4e86",Or:"\u30a6\u30a9\u30ec\u30c3\u30c8\u304c\u518d\u63a5\u7d9a\u3055\u308c\u307e\u3057\u305f",_r:"\u518d\u63a5\u7d9a\u5b8c\u4e86",Wr:"\u30a6\u30a9\u30ec\u30c3\u30c8\u3068\u306e\u63a5\u7d9a\u304c\u5207\u65ad\u3055\u308c\u307e\u3057\u305f",Br:"\u5207\u65ad\u5b8c\u4e86",Dr:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u5207\u308a\u66ff\u3048\u3066\u6700\u9069\u306a\u4f53\u9a13\u3092\u5f97\u3066\u304f\u3060\u3055\u3044",Gr:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u4e0d\u4e00\u81f4",Ur:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u304c\u5909\u66f4\u3055\u308c\u307e\u3057\u305f",Qr:"\u30c1\u30a7\u30fc\u30f3ID",qr:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067\u306f\u5168\u3066\u306e\u6a5f\u80fd\u304c\u5229\u7528\u53ef\u80fd\u3067\u3059",Xr:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u63a5\u7d9a\u6e08\u307f",Hr:"\u3053\u306e\u30a2\u30d7\u30ea\u306f\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5411\u3051\u306b\u6700\u9069\u5316\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u4e00\u90e8\u306e\u6a5f\u80fd\u304c\u6b63\u5e38\u306b\u52d5\u4f5c\u3057\u306a\u3044\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059",Yr:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u4ee5\u5916",Vr:"BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u3067\u306f\u5168\u3066\u306e\u6a5f\u80fd\u304c\u5229\u7528\u53ef\u80fd\u3067\u3059",Kr:"BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u306b\u63a5\u7d9a\u6e08\u307f",Zr:"\u3053\u306e\u30a2\u30d7\u30ea\u306fBSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u5411\u3051\u306b\u6700\u9069\u5316\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u4e00\u90e8\u306e\u6a5f\u80fd\u304c\u6b63\u5e38\u306b\u52d5\u4f5c\u3057\u306a\u3044\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059",Jr:"BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u4ee5\u5916",en:"\u3059\u3067\u306bBSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u306b\u63a5\u7d9a\u3055\u308c\u3066\u3044\u307e\u3059",tn:"BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u63a5\u7d9a\u6e08\u307f",rn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u30a2\u30ab\u30a6\u30f3\u30c8\u304c\u5909\u66f4\u3055\u308c\u307e\u3057\u305f",nn:"\u65b0\u3057\u3044\u30a2\u30c9\u30ec\u30b9",an:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u5207\u308a\u66ff\u3048\u4e2d...",ln:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5207\u308a\u66ff\u3048\u4e2d",dn:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3078\u306e\u5207\u308a\u66ff\u3048\u304c\u6210\u529f\u3057\u307e\u3057\u305f",sn:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5207\u308a\u66ff\u3048\u5b8c\u4e86",cn:"\u3059\u3067\u306b\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u63a5\u7d9a\u3055\u308c\u3066\u3044\u307e\u3059",pn:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u63a5\u7d9a\u6e08\u307f",hn:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5207\u308a\u66ff\u3048\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u624b\u52d5\u3067\u5207\u308a\u66ff\u3048\u3066\u304f\u3060\u3055\u3044",gn:"\u5207\u308a\u66ff\u3048\u5931\u6557",mn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u8a2d\u5b9a\u3092\u78ba\u8a8d\u3057\u3066\u518d\u8a66\u884c\u3057\u3066\u304f\u3060\u3055\u3044",fn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a\u30a8\u30e9\u30fc",bn:"\u624b\u52d5\u3067\u30a6\u30a9\u30ec\u30c3\u30c8\u3092\u63a5\u7d9a\u3057\u3066\u304f\u3060\u3055\u3044",un:"\u30a6\u30a9\u30ec\u30c3\u30c8\u518d\u63a5\u7d9a\u5931\u6557",xn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u304c\u691c\u51fa\u3055\u308c\u306a\u3044\u304b\u3001\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5207\u308a\u66ff\u3048\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093",wn:"\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5207\u308a\u66ff\u3048\u4e0d\u53ef",yn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a\u4e2d\u306b\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f",vn:"\u63a5\u7d9a\u30a8\u30e9\u30fc",$n:"\u63a5\u7d9a\u3092\u518d\u8a66\u884c",kn:"\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a\u304c\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002\u518d\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",Tn:"\u63a5\u7d9a\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8"};let Tn=0;const Cn=(0,n.j)(null),En=e=>{let{children:t}=e;const{Rr:i,jr:a,Ir:o,Pr:l}=yn(),[s,c]=(0,n.I)(null),[p,h]=(0,n.I)(null),[g,m]=(0,n.I)(!1),[f,b]=(0,n.I)(null),[u,x]=(0,n.I)(null),[w,y]=(0,n.I)(0),[v,$]=(0,n.I)(null),k=(0,n.wt)((()=>{m(!1),y(0),$(null)}),[]),T=(0,n.wt)((()=>{localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.removeItem("walletDisconnected")}),[]),C=(0,n.wt)((async()=>{if(w>=3)return a(kn.yn+" - "+kn.kn,{title:kn.vn}),k(),void T();y((e=>e+1)),m(!0),T();try{if(!window.ethereum)throw new Error("MetaMask\u672a\u5b89\u88dd");await window.ethereum.request({method:"eth_requestAccounts"}),window.location.reload()}catch(e){$(e.message),a(kn.yn+": "+e.message,{title:kn.vn,actions:[{label:kn.$n,De:C}]}),k()}}),[w,k,T,a]);(0,n.K)((()=>{let e=null;return(async()=>{e=setTimeout((()=>{m(!1),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),c(null),h(null),b(null),x(null)}),5e3);try{if(window.ethereum)try{m(!0);const t=await window.ethereum.request({method:"eth_chainId"}),r=parseInt(t,16).toString(),n=await window.ethereum.request({method:"eth_accounts"});if(n&&n.length>0){const t=n[0],a=new rn.sr(window.ethereum);return h(a),c(t),b(r),x("metamask"),localStorage.setItem("walletType","metamask"),localStorage.setItem("walletLastConnected",Date.now().toString()),i(kn.Lr,{title:kn.Mr,message:`${kn.nn}: ${t.substring(0,6)}...${t.substring(t.length-4)}`}),r!==$n&&"1337"!==r&&o(kn.Dr,{title:kn.Gr}),clearTimeout(e),void m(!1)}}catch(e){}const t=localStorage.getItem("walletType"),r=localStorage.getItem("walletLastConnected");if("true"===localStorage.getItem("walletDisconnected")||r&&Date.now()-parseInt(r)>864e5)return localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.removeItem("walletDisconnected"),clearTimeout(e),void m(!1);if(t)try{const{provider:e,address:r,yr:n}=await on(t);e&&r?(h(e),c(r),b(n),x(t),localStorage.setItem("walletLastConnected",Date.now().toString()),i(kn.Or,{title:kn._r,message:`${kn.nn}: ${r.substring(0,6)}...${r.substring(r.length-4)}`}),n!==$n&&"1337"!==n&&o(kn.Dr,{title:kn.Gr})):(localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"))}catch(e){localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),a(e.message||kn.bn,{title:kn.un})}}catch(e){}finally{clearTimeout(e),m(!1)}})(),()=>{e&&clearTimeout(e)}}),[i,a,o]),(0,n.K)((()=>{if(!p)return;let e=!1;const t=t=>{if(0===t.length)e=!0,E(!0),e=!1;else{if(c(t[0]),window.ethereum){const e=new rn.sr(window.ethereum);h(e),window.ethereum.request({method:"eth_chainId"}).then((e=>{const r=parseInt(e,16).toString();b(r),"31337"!==r&&"1337"!==r||(b(r),c(t[0]),window.ethereum.request({method:"wallet_removeEthereumChain",Cn:[{yr:"0x7A69"}]}).catch((()=>{})).then((()=>window.ethereum.request({method:"wallet_addEthereumChain",Cn:[{yr:"0x7A69",En:"Hardhat Local",Nn:{name:"Ethereum",Sn:"ETH",zn:18},Fn:["http://127.0.0.1:8545","http://localhost:8545"],An:[]}]}))).then((()=>window.ethereum.request({method:"eth_requestAccounts",Cn:[]}))).then((()=>{})).catch((e=>{o("Hardhat\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3078\u306e\u63a5\u7d9a\u306b\u554f\u984c\u304c\u3042\u308a\u307e\u3059\u3002\u958b\u767c\u74b0\u5883\u3067\u52d5\u4f5c\u78ba\u8a8d\u3059\u308b\u5834\u5408\u306f\u3001MetaMask\u3067\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u300clocalhost:3000\u306b\u63a5\u7d9a\u300d\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002",{title:"Hardhat\u63a5\u7d9a\u8b66\u544a"})})))})).catch((e=>{}))}l(`${kn.nn}: ${t[0].substring(0,6)}...${t[0].substring(t[0].length-4)}`,{title:kn.rn}),f!==$n&&"1337"!==f&&o(kn.Dr,{title:kn.Gr})}},r=e=>{const t=parseInt(e,16).toString();if(b(t),l(`${kn.Qr}: ${t}`,{title:kn.Ur}),t===$n||"1337"===t?i(kn.qr,{title:kn.Xr}):o(kn.Hr,{title:kn.Yr}),window.ethereum){const e=new rn.sr(window.ethereum);h(e)}},n=()=>{e||(e=!0,E(!0),e=!1)};return"metamask"===u&&window.ethereum&&(window.ethereum.on("accountsChanged",t),window.ethereum.on("chainChanged",r),window.ethereum.on("disconnect",n)),()=>{"metamask"===u&&window.ethereum&&(window.ethereum.removeListener("accountsChanged",t),window.ethereum.removeListener("chainChanged",r),window.ethereum.removeListener("disconnect",n))}}),[p,u,l,i,o]);const E=(0,n.wt)((async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{const t=Date.now(),n=!e&&t-Tn>1e3;if(n&&(Tn=t),window.ethereum&&"metamask"===u){try{await window.ethereum.request({method:"wallet_revokePermissions",Cn:[{Rn:{}}]}).catch((e=>{}))}catch(e){}return c(null),h(null),b(null),x(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true"),void(n&&l(kn.Wr,{title:kn.Br}))}(async e=>{if("walletconnect"===e)try{const{cr:e}=await Promise.all([r.e(121),r.e(455)]).then(r.bind(r,5785)),t=await e.init({pr:nn});t.connected&&await t.disconnect()}catch(e){}})(u),c(null),h(null),b(null),x(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true"),n&&l(kn.Wr,{title:kn.Br})}catch(t){c(null),h(null),b(null),x(null),localStorage.removeItem("walletType"),localStorage.removeItem("walletLastConnected"),localStorage.setItem("walletDisconnected","true");const r=Date.now();!e&&r-Tn>1e3&&(Tn=r,l(kn.Wr,{title:kn.Br}))}}),[u,l]),N=async e=>{if(!p||!window.ethereum)return a(kn.xn,{title:kn.wn}),!1;try{const t=`0x${parseInt(e).toString(16)}`;return await window.ethereum.request({method:"wallet_switchEthereumChain",Cn:[{yr:t}]}),!0}catch(t){return 4902===t.code&&e===$n?await(async()=>{if(!window.ethereum)return!1;try{return await window.ethereum.request({method:"wallet_addEthereumChain",Cn:[{yr:"0x61",En:"BSC Testnet",Nn:{name:"tBNB",Sn:"tBNB",zn:18},Fn:["https://bsc-testnet-dataseed.bnbchain.org","https://bsc-testnet-dataseed1.bnbchain.org","https://bsc-testnet-dataseed2.bnbchain.org","https://bsc-testnet-dataseed3.bnbchain.org","https://bsc-testnet-dataseed4.bnbchain.org","https://data-seed-prebsc-1-s1.bnbchain.org:8545","https://data-seed-prebsc-2-s1.bnbchain.org:8545"],An:["https://testnet.bscscan.com"]}]}),await window.ethereum.request({method:"eth_chainId"}),!0}catch(e){return!1}})():(a(t.message||"\u8acb\u6aa2\u67e5\u60a8\u7684\u9322\u5305\u8a2d\u7f6e\u4e26\u91cd\u8a66",{title:"\u7db2\u7d61\u5207\u63db\u5931\u6557"}),!1)}},S=f===$n||"1337"===f;(0,n.K)((()=>{if(g){const e=setTimeout((()=>{o(kn.kn,{title:kn.Tn,actions:[{label:kn.$n,De:()=>{k(),T(),C()}}]}),k()}),15e3);return()=>clearTimeout(e)}}),[g,o,C,k,T]);const z={jn:s,provider:p,connect:async e=>{if(g)return;let t=null;try{if(m(!0),t=setTimeout((()=>{m(!1),a(kn.kn,{title:kn.Tn}),localStorage.setItem("walletConnectionTimeout","true"),setTimeout((()=>{localStorage.removeItem("walletConnectionTimeout")}),5e3)}),2e4),"true"===localStorage.getItem("walletConnectionTimeout"))throw new Error(kn.kn);localStorage.removeItem("walletDisconnected");const{provider:r,address:n,yr:l}=await on(e);return clearTimeout(t),localStorage.removeItem("walletConnectionTimeout"),!(!r||!n)&&(h(r),c(n),b(l),x(e),localStorage.setItem("walletType",e),localStorage.setItem("walletLastConnected",Date.now().toString()),i(`${kn.nn}: ${n.substring(0,6)}...${n.substring(n.length-4)}`,{title:kn.Mr}),l!==$n&&"1337"!==l&&o(kn.Dr,{title:kn.Gr}),!0)}catch(e){return t&&clearTimeout(t),a(e.message||kn.mn,{title:kn.fn}),!1}finally{t&&clearTimeout(t),m(!1)}},disconnect:E,In:g,yr:f,Pn:u,isConnected:Boolean(s),Ln:N,Mn:async()=>{if(f===vn)return l(kn.en,{title:kn.tn}),!0;try{l(kn.an.replace("\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af","BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8"),{title:kn.ln});const e=await N(vn);if(e&&(i(kn.dn.replace("\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af","BSC\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8"),{title:kn.sn}),b(vn),window.ethereum)){const e=new rn.sr(window.ethereum);h(e);const t=await window.ethereum.request({method:"eth_accounts"});t&&t.length>0&&c(t[0])}return e}catch(e){return a(e.message||kn.hn,{title:kn.gn}),!1}},On:f===vn,_n:async()=>{if(f===$n||"1337"===f)return l(kn.cn,{title:kn.pn}),!0;try{l(kn.an,{title:kn.ln});let e=!1;if(e=await N($n),e||(e=await N("1337")),e&&(i(kn.dn,{title:kn.sn}),b($n),window.ethereum)){const e=new rn.sr(window.ethereum);h(e);const t=await window.ethereum.request({method:"eth_accounts"});t&&t.length>0&&c(t[0])}return e}catch(e){return a(e.message||kn.hn,{title:kn.gn}),!1}},Wn:S};return(0,d._)(Cn.W,{value:z,children:t})},Nn=()=>{const e=(0,n.G)(Cn);if(null===e)throw new Error("useWallet\u5fc5\u9808\u5728WalletProvider\u5167\u4f7f\u7528");return e},Sn=a.ee.div`
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
`,zn=a.ee.div`
  background-color: #1c2241;
  border-radius: 16px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,Fn=a.ee.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,An=a.ee.Fe`
  font-size: 20px;
  color: #fff;
  margin: 0;
`,Rn=a.ee.button`
  background: transparent;
  border: none;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #fff;
  }
`,jn=a.ee.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,In=a.ee.button`
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
`,Pn=a.ee.ue`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`,Ln=a.ee.div`
  flex: 1;
  text-align: left;
`,Mn=a.ee.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`,On=a.ee.div`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`,_n=a.ee.div`
  background: rgba(0, 255, 176, 0.1);
  border: 1px solid rgba(0, 255, 176, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`,Wn=a.ee.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`,Bn=a.ee.div`
  font-family: monospace;
  font-size: 16px;
  color: #fff;
`,Dn=a.ee.button`
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
`,Gn=a.ee.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 8px;
`,Un=a.ee.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.color||"#00ffb0"};
  margin-right: 8px;
  display: inline-block;
`,Qn=a.ee.button`
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
`,qn=a.ee.div`
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
`,Xn=a.ee.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #3b99fc;
  font-size: 16px;
  text-align: center;
`,Hn=a.ee.span`
  margin-left: 8px;
`,Yn=e=>{var t;let{isOpen:r,Bn:n}=e;const{connect:i,disconnect:a,jn:o,In:l,yr:s,Pn:c,isConnected:p,_n:h,Wn:g}=Nn(),m=[{id:"metamask",name:"MetaMask",icon:"/images/wallets/metamask.svg"},{id:"walletconnect",name:"WalletConnect",icon:"/images/wallets/walletconnect.svg"}];if(!r)return null;const f=(e=>{let t=e;return"string"==typeof e&&e.startsWith("0x")&&(t=parseInt(e,16).toString()),{1:{name:"Ethereum Mainnet",color:"#627EEA"},5:{name:"Goerli Testnet",color:"#F6C343"},11155111:{name:"Sepolia Testnet",color:"#CFB5F0"},97:{name:"BSC Testnet",color:"#F3BA2F"},31337:{name:"Hardhat Local",color:"#00FFC8"},1337:{name:"Localhost Network",color:"#00FFC8"}}[t]||{name:`Unknown Network (${t})`,color:"#FF6B6B"}})(s);return(0,d._)(Sn,{De:n,children:(0,d.he)(zn,{De:e=>e.stopPropagation(),children:[(0,d.he)(Fn,{children:[(0,d._)(An,{children:p?"\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a\u6e08\u307f":"\u30a6\u30a9\u30ec\u30c3\u30c8\u3092\u63a5\u7d9a"}),(0,d._)(Rn,{De:n,children:"\xd7"})]}),p?(0,d.he)(_n,{children:[(0,d._)(Mn,{children:(null===(t=m.find((e=>e.id===c)))||void 0===t?void 0:t.name)||c}),(0,d.he)(Gn,{children:[(0,d._)(Un,{color:f.color})," ",f.name]}),(0,d.he)(Wn,{children:[(0,d._)(Bn,{children:ln(o)}),(0,d._)(Dn,{De:()=>{a(),n()},children:"\u5207\u65ad\u3059\u308b"})]}),!g&&(0,d._)(Qn,{De:async()=>{await h()&&setTimeout((()=>{window.location.reload()}),1500)},children:"\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u5207\u308a\u66ff\u3048"})]}):l?(0,d.he)(Xn,{children:[(0,d._)(qn,{}),(0,d._)(Hn,{children:"\u63a5\u7d9a\u4e2d..."})]}):(0,d.he)(jn,{children:[m.map((e=>(0,d.he)(In,{De:()=>(async e=>{try{await i(e)&&n()}catch(e){}})(e.id),disabled:l,children:[(0,d._)(Pn,{src:e.icon,alt:e.name}),(0,d.he)(Ln,{children:[(0,d._)(Mn,{children:e.name}),(0,d._)(On,{children:"metamask"===e.id?"\u6700\u3082\u4eba\u6c17\u306e\u3042\u308b\u30a4\u30fc\u30b5\u30ea\u30a2\u30e0\u30a6\u30a9\u30ec\u30c3\u30c8":"\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u308b\u4efb\u610f\u306e\u30a6\u30a9\u30ec\u30c3\u30c8\u30a2\u30d7\u30ea\u306b\u63a5\u7d9a"})]})]},e.id))),(0,d._)("div",{style:{marginTop:"16px",textAlign:"center",color:"#999",fontSize:"13px"},children:"\u3053\u306e\u30a2\u30d7\u30ea\u306f\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\uff08Chain ID: 31337\u307e\u305f\u306f1337\uff09\u5411\u3051\u306b\u6700\u9069\u5316\u3055\u308c\u3066\u3044\u307e\u3059"})]})]})})},Vn=((0,a.ee)(o.Dn)`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`,()=>{const{jn:e,isConnected:t,In:r}=Nn(),[i,a]=(0,n.I)(!1),[l,s]=(0,n.I)(!1),c=()=>{s(!1),be.Je=null,window.dispatchEvent(new CustomEvent("nft-cleared"))},p=()=>{a(!0)};return(0,d.he)("div",{className:"navbar-wrapper",children:[(0,d._)("div",{className:"navbar-container",children:(0,d.he)("div",{className:"navbar-content",children:[(0,d._)(o.Dn,{to:"/",className:"logo",De:c,children:"NFT\u30de\u30fc\u30b1\u30c3\u30c8"}),(0,d.he)("div",{className:"nav-links "+(l?"active":""),children:[(0,d._)(o.Dn,{to:"/",className:"nav-link",De:c,children:"\u30db\u30fc\u30e0"}),(0,d._)(o.Dn,{to:"/my-nfts",className:"nav-link",De:c,children:"\u30de\u30a4NFT"}),(0,d._)(o.Dn,{to:"/history",className:"nav-link",De:c,children:"\u53d6\u5f15\u5c65\u6b74"}),(0,d._)(o.Dn,{to:"/mint-venape",className:"nav-link",De:c,children:"Mint VenAPE"})]}),(0,d.he)("div",{className:"navbar-right",children:[t?(0,d._)("button",{className:"wallet-button connected",De:p,children:ln(e)}):(0,d._)("button",{className:"wallet-button",De:p,disabled:r,children:r?"\u63a5\u7d9a\u4e2d...":"\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a"}),(0,d._)("div",{className:"menu-toggle",De:()=>{s(!l)},children:(0,d.he)("div",{className:"hamburger",children:[(0,d._)("span",{}),(0,d._)("span",{}),(0,d._)("span",{})]})})]})]})}),(0,d._)(Yn,{isOpen:i,Bn:()=>{a(!1)}})]})}),Kn=a.ee.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`,Zn=a.ee.div`
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
`,Jn=a.ee.div.tt((e=>({style:{width:`${e.Gn}px`,height:`${e.Gn}px`,top:`${e.Un}%`,left:`${e.Qn}%`,background:e.re}})))`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.04;
  transition: opacity 0.5s ease;
`,ei=a.ee.div.tt((e=>({style:{top:`${e.Un}%`,left:`${e.Qn}%`,width:`${e.Gn}px`,height:`${e.Gn}px`,backgroundColor:e.qn>1.2?"rgba(255, 255, 255, 1)":`rgba(175, 175, 175, ${e.qn})`,boxShadow:e.Xn&&!e.Hn?`0 0 ${1.3*e.Gn}px rgba(255, 255, 255, 0.7)`:e.Hn?`0 0 ${1.5*e.Gn}px rgba(255, 255, 255, 0.8),\n           0 0 ${2.5*e.Gn}px rgba(255, 255, 255, 0.6),\n           0 0 ${3.5*e.Gn}px rgba(255, 255, 255, 0.4)`:"none"}})))`
  position: absolute;
  border-radius: 50%;
  z-index: 1;

  /* 使用伪元素创建径向渐变，避免直接在DOM元素上设置属性 */
  ${e=>e.Hn?`\n    &::after {\n      content: "";\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: ${4*e.Gn}px;\n      height: ${4*e.Gn}px;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        circle at center,\n        rgba(255, 255, 255, 0.8) 0%,\n        rgba(255, 255, 255, 0.3) 20%,\n        rgba(255, 255, 255, 0.1) 30%,\n        transparent 70%\n      );\n    }\n  `:""}
`,ti=a.ee.div.tt((e=>({style:{top:`${e.Un}%`,left:`${e.Qn}%`,width:10*e.Gn+"px",height:10*e.Gn+"px"}})))`
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
`,ri=()=>{const{Y:e,q:t}=(0,n.G)(b),[r,i]=(0,n.I)(!1);(0,n.K)((()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;i(e)}),[]);const a=r||!t||e,o=(0,n.Nt)((()=>a?[]:Array.from({length:1500},((e,t)=>{const r=Math.random(),n=r<.7?.6+.4*Math.random():r<.9?1.2+.5*Math.random():r<.97?1.7+.3*Math.random():1.8+.3*Math.random(),i=Math.random(),a=i<.01?2+1*Math.random():i<.05?1.3+.7*Math.random():i<.2?.9+.4*Math.random():.5*Math.random()+.1;return{id:t,size:a>2?.9+.3*Math.random():a>1.3?1+.4*Math.random():n,top:100*Math.random(),left:100*Math.random(),opacity:a,Yn:a>1.3&&a<=2,Vn:a>2}}))),[a]),l=(0,n.Nt)((()=>a?[]:[{size:500,top:5,left:-15,Kn:"linear-gradient(135deg, #1a237e 0%, #283593 100%)"},{size:350,top:80,left:80,Kn:"linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)"}]),[a]);return a?(0,d._)(Kn,{children:(0,d._)(Zn,{})}):(0,d.he)(Kn,{children:[(0,d._)(Zn,{}),l.map(((e,t)=>(0,d._)(Jn,{Gn:e.size,Un:e.top,Qn:e.left,re:e.Kn},t))),o.filter((e=>e.Vn)).map((e=>(0,d._)(ti,{Gn:e.size,Un:e.top,Qn:e.left},`rays-${e.id}`))),o.map((e=>(0,d._)(ei,{Gn:e.size,Un:e.top,Qn:e.left,qn:e.opacity,Xn:e.Yn,Hn:e.Vn},e.id)))]})};r(4110),r(8699);const ni={Zn:"PENDING",Jn:"CONFIRMING",ei:"CONFIRMED",ti:"FAILED"},ii="ADD",ai="UPDATE",oi="CLEAR",li="CLEAR_ALL",di={ri:"MINT",ni:"LIST",ii:"UNLIST",ai:"BUY",oi:"TRANSFER",li:"APPROVE",di:"OTHER"},si=(0,n.j)(),ci={transactions:[],si:null},pi=(e,t)=>{var r,n;switch(t.type){case ii:return{...e,transactions:[t.Tr,...e.transactions],si:t.Tr};case ai:return{...e,transactions:e.transactions.map((e=>e.id===t.Tr.id?{...e,...t.Tr.ci}:e)),si:(null===(r=e.si)||void 0===r?void 0:r.id)===t.Tr.id?{...e.si,...t.Tr.ci}:e.si};case oi:return{...e,transactions:e.transactions.filter((e=>e.id!==t.Tr)),si:(null===(n=e.si)||void 0===n?void 0:n.id)===t.Tr?null:e.si};case li:return{...e,transactions:[],si:null};default:return e}},hi=e=>{let{children:t}=e;const[r,i]=(0,n.Cr)(pi,ci),{Rr:a,jr:o,Pr:l}=yn(),s=(0,n.wt)((e=>{const t=e.id||(0,dn.Er)(),r={id:t,status:ni.Zn,Sr:new Date,...e};return i({type:ii,Tr:r}),t}),[]),c=(0,n.wt)(((e,t)=>{i({type:ai,Tr:{id:e,ci:t}})}),[]),p=(0,n.wt)((e=>{i({type:oi,Tr:e})}),[]),h=(0,n.wt)((()=>{i({type:li})}),[]),g=(0,n.wt)((async function(e){let{type:t=di.di,pi:r=null,description:n=null,hi:i=null,gi:d=null}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return null;const p=(e=>{switch(e){case di.ri:return"\u30df\u30f3\u30c8";case di.ni:return"\u51fa\u54c1";case di.ii:return"\u51fa\u54c1\u53d6\u6d88";case di.ai:return"\u8cfc\u5165";case di.oi:return"\u8ee2\u9001";case di.li:return"\u627f\u8a8d";default:return"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3"}})(t),h=(0,dn.Er)(),g={id:h,hash:e.hash,type:t,pi:r,description:n||`${p}\u306e\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3`};s(g),l(`${g.description}\u3092\u9001\u4fe1\u3057\u307e\u3057\u305f`,{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u9001\u4fe1",Nr:!0});try{const t=await e.wait(1);return c(h,{status:ni.Jn,mi:t}),l(`${g.description}\u304c\u78ba\u8a8d\u4e2d\u3067\u3059`,{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u78ba\u8a8d\u4e2d",Nr:!0}),c(h,{status:ni.ei}),a(`${g.description}\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f`,{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u6210\u529f",Nr:!0}),i&&i(t),{h:!0,mi:t,transaction:g}}catch(e){return c(h,{status:ni.ti,error:e}),o(`${g.description}\u304c\u5931\u6557\u3057\u307e\u3057\u305f`,{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u5931\u6557",Nr:!1}),d&&d(e),{h:!1,error:e,transaction:g}}}),[s,c,a,o,l]),m=(0,n.wt)((e=>r.transactions.filter((t=>t.type===e))),[r.transactions]),f=(0,n.wt)((e=>r.transactions.filter((t=>t.pi&&t.pi.id===e))),[r.transactions]);(0,n.K)((()=>{try{localStorage.setItem("transactionHistory",JSON.stringify(r.transactions))}catch(e){}}),[r.transactions]),(0,n.K)((()=>{try{const e=localStorage.getItem("transactionHistory");if(e){const t=JSON.parse(e);t.map((e=>({...e,Sr:new Date(e.Sr)}))).forEach((e=>{i({type:ii,Tr:e})}))}}catch(e){}}),[]);const b={transactions:r.transactions,si:r.si,fi:s,bi:c,ui:p,xi:h,wi:g,yi:m,$i:f};return(0,d._)(si.W,{value:b,children:t})},gi=a.ie`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,mi=a.ie`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,fi=e=>{switch(e){case sn:return"\u2713";case cn:return"\u2715";case pn:return"!";default:return"i"}},bi=(e,t)=>{var r,n;switch(e){case sn:return(null==t||null===(r=t.t)||void 0===r?void 0:r.h)||"#4CAF50";case cn:return(null==t||null===(n=t.t)||void 0===n?void 0:n.error)||"#F44336";case pn:return"#FFC107";default:return"#2196F3"}},ui=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.1;switch(e){case sn:return`rgba(76, 175, 80, ${t})`;case cn:return`rgba(244, 67, 54, ${t})`;case pn:return`rgba(255, 193, 7, ${t})`;default:return`rgba(33, 150, 243, ${t})`}},xi=a.ee.div`
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: ${e=>e.theme.borderRadius.C||"8px"};
  background: ${e=>e.theme.t.i||"#1C2241"};
  color: ${e=>e.theme.t.text.o||"#FFFFFF"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(8px);
  border-left: 4px solid ${e=>bi(e.type,e.theme)};
  animation: ${e=>e.ki?mi:gi} 0.3s ease
    forwards;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,wi=a.ee.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: ${e=>bi(e.type,e.theme)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px ${e=>ui(e.type,.3)};
`,yi=a.ee.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,vi=a.ee.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${e=>e.theme.t.text.o};
`,$i=a.ee.div`
  font-size: 0.9rem;
  color: ${e=>e.theme.t.text.l};
  word-break: break-word;
`,ki=a.ee.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`,Ti=a.ee.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.o?bi(e.type,e.theme):ui(e.type,.2)};
  color: ${e=>e.o?"#fff":bi(e.type,e.theme)};
  border: 1px solid ${e=>bi(e.type,e.theme)};

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,Ci=a.ee.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${e=>e.theme.t.text.l};
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
`,Ei=a.ie`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`,Ni=a.ee.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${e=>bi(e.type,e.theme)};
  animation: ${e=>e.duration&&a.Z`
      ${Ei} ${e.duration}ms linear forwards
    `};
`,Si=e=>{let{Ti:t,Bn:r,Nr:i=!0,duration:a=5e3}=e;const[o,l]=(0,n.I)(!1),s=()=>{l(!0),setTimeout((()=>{r(t.id)}),300)};return(0,n.K)((()=>{if(i){const e=setTimeout((()=>{s()}),a);return()=>clearTimeout(e)}}),[i,a]),(0,d.he)(xi,{type:t.type,ki:o,children:[(0,d._)(wi,{type:t.type,children:fi(t.type)}),(0,d.he)(yi,{children:[t.title&&(0,d._)(vi,{children:t.title}),(0,d._)($i,{children:t.message}),t.actions&&t.actions.length>0&&(0,d._)(ki,{children:t.actions.map(((e,r)=>(0,d._)(Ti,{type:t.type,o:0===r,De:()=>(e=>{"function"==typeof e.De&&e.De(),!1!==e.Ci&&s()})(e),children:e.label},r)))})]}),(0,d._)(Ci,{De:s}),i&&(0,d._)(Ni,{type:t.type,duration:a})]})},zi={Ei:"top-left",Ni:"top-right",Si:"top-center",zi:"bottom-left",Fi:"bottom-right",Ai:"bottom-center"},Fi=a.ee.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  max-width: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 10px;
  pointer-events: none;
  ${e=>(e=>{switch(e){case zi.Ei:return"\n        top: 20px;\n        left: 20px;\n        align-items: flex-start;\n      ";case zi.Ni:return"\n        top: 20px;\n        right: 20px;\n        align-items: flex-end;\n      ";case zi.Si:return"\n        top: 20px;\n        left: 50%;\n        transform: translateX(-50%);\n        align-items: center;\n      ";case zi.zi:return"\n        bottom: 20px;\n        left: 20px;\n        align-items: flex-start;\n      ";case zi.Fi:return"\n        bottom: 20px;\n        right: 20px;\n        align-items: flex-end;\n      ";case zi.Ai:return"\n        bottom: 20px;\n        left: 50%;\n        transform: translateX(-50%);\n        align-items: center;\n      ";default:return"\n        top: 20px;\n        right: 20px;\n        align-items: flex-end;\n      "}})(e.position)}

  /* 隱藏滾動條但保持功能 */
  &::-webkit-scrollbar {
    width: 0px;
  }

  /* 確保內部元素可點擊 */
  & > * {
    pointer-events: auto;
  }
`,Ai=e=>{let{position:t=zi.Ni}=e;const{notifications:r,Fr:n}=yn();return 0===r.length?null:(0,d._)(Fi,{position:t,children:r.map((e=>(0,d._)(Si,{Ti:e,Bn:n},e.id)))})},Ri=()=>(0,d._)(a.Ri,{theme:l,children:(0,d._)(p,{children:(0,d._)(u,{children:(0,d._)(wn,{children:(0,d._)(En,{children:(0,d.he)(hi,{children:[(0,d._)(g,{}),(0,d._)(m,{}),(0,d._)("div",{className:"navbar-container-wrapper",style:{width:"100%",maxWidth:"100%",position:"fixed",top:0,left:0,right:0,zIndex:999,backgroundColor:"#1c2241",boxSizing:"border-box"},children:(0,d._)(Vn,{})}),(0,d.he)("div",{className:"App",children:[(0,d._)(ri,{}),(0,d._)("div",{className:"app-content",children:(0,d._)(tn,{})})]}),(0,d._)(Ai,{position:"top-right"})]})})})})})});i.Ii(document.getElementById("root")).ji((0,d._)(a.Ri,{theme:l,children:(0,d._)(p,{children:(0,d._)(o.Pi,{children:(0,d._)(u,{children:(0,d._)(Ri,{})})})})}))},7956:(e,t,r)=>{r.d(t,{$e:()=>n,Le:()=>c,Vt:()=>d,qt:()=>l,Ce:()=>i,Ee:()=>o,Kt:()=>s});const n="https://ipfs.io/ipfs/",i=["https://dweb.link/ipfs/","https://gateway.pinata.cloud/ipfs/","https://gateway.ipfs.io/ipfs/","https://ipfs.fleek.co/ipfs/"],a="ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;if(!e)return null;try{const r=e.trim();if(r.startsWith("/"))return r;if(r.startsWith("http://")||r.startsWith("https://")){if(!r.includes("/ipfs/")&&r.includes("ipfs.io"))try{const e=new URL(r);if(!e.pathname.includes("/ipfs/"))return e.pathname=e.pathname.replace(/^\/?/,"/ipfs/"),e.toString()}catch(e){}return r}let n=t;if(!n||!n.includes("/ipfs/")){if(!(i.length>0))return null;{const e=i.find((e=>e&&e.includes("/ipfs/")));if(!e)return null;n=e}}const a=n.endsWith("/")?n:n+"/";if(r.startsWith("ipfs://ipfs/")){return a+r.substring(12)}if(r.startsWith("ipfs://")){return a+r.substring(7)}if(r.startsWith("Qm")||r.startsWith("baf"))return a+r;const o=r.match(/Qm[a-zA-Z0-9]{44}/);return o?a+o[0]:r}catch(t){return e}},l=function(e,t){const r=o(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:n);if(!r)return null;return`${r.endsWith("/")?r.slice(0,-1):r}/${t}`},d=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;try{const n=l(e,t,r);if(!n)return null;const i=new AbortController,a=setTimeout((()=>i.abort()),1e4);try{const e=await fetch(n,{signal:i.signal,headers:{Li:"no-cache",Mi:"no-cache"}});if(clearTimeout(a),!e.ok)throw new Error(`\u7372\u53d6\u5143\u6578\u64da\u5931\u6557: ${e.status} ${e.statusText}`);return await e.json()}catch(e){throw e.name,e}}catch(e){return null}},s=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;const i={url:null,Me:!1,error:null};try{i.Me=!0;const a=await d(e,t,r);if(!a)return i.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",i.Me=!1,i;const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;return e&&e.image?o(e.image,t):null}(a,r);return l?(i.url=l,i.Me=!1,i):(i.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",i.Me=!1,i)}catch(e){return i.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",i.Me=!1,i}},c=async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;const r={url:null,Me:!1,error:null};try{if(!e)return r.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",r;if(r.Me=!0,e.image&&e.image.startsWith("/"))return r.url=e.image,r.Me=!1,r;if(e.image&&e.image.startsWith("http"))return r.url=e.image,r.Me=!1,r;if(e.ct&&e.Oe)try{const n=l(e.ct,e.Oe,t);if(!n)throw new Error("\u7121\u6cd5\u751f\u6210\u6709\u6548\u7684metadata URL");const i=await fetch(n,{signal:AbortSignal.timeout(1e4)});if(!i.ok)throw new Error(`\u7372\u53d6metadata\u5931\u6557: ${i.status}`);const a=await i.json();if(a&&a.image){const e=o(a.image,t);if(e)return r.url=e,r.Me=!1,r;throw new Error("\u7121\u6cd5\u8f49\u63dbimage URL")}throw new Error("Metadata\u4e2d\u7f3a\u5c11image\u5b57\u6bb5")}catch(e){}if(e.image){const n=o(e.image,t);if(n)return r.url=n,r.Me=!1,r}if(e.image!==a){const e=o(a,t);if(e)return r.url=e,r.Me=!1,r}return r.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",r.Me=!1,r}catch(e){return r.error="\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f",r.Me=!1,r}}}},o={};function l(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={id:e,loaded:!1,exports:{}};return a[e].call(r.exports,r,r.exports,l),r.loaded=!0,r.exports}l.Oi=a,e=[],l._i=(t,r,n,i)=>{if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],n=e[c][1],i=e[c][2];for(var o=!0,d=0;d<r.length;d++)(!1&i||a>=i)&&Object.keys(l._i).every((e=>l._i[e](r[d])))?r.splice(d--,1):(o=!1,i<a&&(a=i));if(o){e.splice(c--,1);var s=n();void 0!==s&&(t=s)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,n,i]},l.n=e=>{var t=e&&e.Wi?()=>e.default:()=>e;return l.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.Bi=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.Wi)return e;if(16&n&&"function"==typeof e.then)return e}var i=Object.create(null);l.r(i);var a={};t=t||[null,r({}),r([]),r(r)];for(var o=2&n&&e;"object"==typeof o&&!~t.indexOf(o);o=r(o))Object.getOwnPropertyNames(o).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,l.d(i,a),i},l.d=(e,t)=>{for(var r in t)l.Di(t,r)&&!l.Di(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((t,r)=>(l.f[r](e,t),t)),[])),l.Gi=e=>"static/application/"+e+".bfcff850.chunk.js",l.Ui=e=>{},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.Di=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},i="nftswap:",l.Qi=(e,t,r,a)=>{if(n[e])n[e].push(t);else{var o,d;if(void 0!==r)for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++){var p=s[c];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==i+r){o=p;break}}o||(d=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,l.qi&&o.setAttribute("nonce",l.qi),o.setAttribute("data-webpack",i+r),o.src=e),n[e]=[t];var h=(t,r)=>{o.onerror=o.onload=null,clearTimeout(g);var i=n[e];if(delete n[e],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((e=>e(r))),t)return t(r)},g=setTimeout(h.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=h.bind(null,o.onerror),o.onload=h.bind(null,o.onload),d&&document.head.appendChild(o)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"Wi",{value:!0})},l.Xi=e=>(e.Hi=[],e.children||(e.children=[]),e),l.Ae="/nftswap/",(()=>{var e={792:0};l.f.Yi=(t,r)=>{var n=l.Di(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var i=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=i);var a=l.Ae+l.Gi(t),o=new Error;l.Qi(a,(r=>{if(l.Di(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",o.name="ChunkLoadError",o.type=i,o.request=a,n[1](o)}}),"chunk-"+t,t)}},l._i.Yi=t=>0===e[t];var t=(t,r)=>{var n,i,a=r[0],o=r[1],d=r[2],s=0;if(a.some((t=>0!==e[t]))){for(n in o)l.Di(o,n)&&(l.Oi[n]=o[n]);if(d)var c=d(l)}for(t&&t(r);s<a.length;s++)i=a[s],l.Di(e,i)&&e[i]&&e[i][0](),e[i]=0;return l._i(c)},r=self.webpackChunknftswap=self.webpackChunknftswap||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),l.qi=void 0;var d=l._i(void 0,[121],(()=>l(2632)));d=l._i(d)})();