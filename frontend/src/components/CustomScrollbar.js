import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

/**
 * 自定義滾動條組件
 * 使用絕對定位元素覆蓋在原生滾動條上
 * 不依賴於瀏覽器滾動條實現，而是創建一個視覺上的滾動條
 */

// 滾動條容器
const ScrollbarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 12px;
  height: 100vh;
  z-index: 9999;
  pointer-events: none; /* 不攔截點擊事件，允許滑鼠滾輪和其他滾動事件通過 */
`;

// 滾動條軌道
const ScrollbarTrack = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(28, 34, 65, 0.9);
`;

// 滾動條滑塊
const ScrollbarThumb = styled.div`
  position: absolute;
  top: ${({ position }) => position};
  right: 0;
  width: 80%;
  height: ${({ height }) => height};
  background-color: rgba(180, 180, 180, 0.2);
  border-radius: 10px;
  transition: top 50ms linear; /* 控制變化速率，減少 GPU 負載 */

  &:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

const CustomScrollbar = () => {
  // 滾動條狀態
  const [thumbHeight, setThumbHeight] = useState("100%");
  const [thumbPosition, setThumbPosition] = useState("0px");

  // 用於節流的引用
  const lastUpdateTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const observerRef = useRef(null);

  /**
   * 更新滾動條大小和位置
   * 限制更新頻率，避免 GPU 過載
   */
  const updateScrollbar = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 50) return; // 限制每 50ms 更新一次
    lastUpdateTimeRef.current = now;

    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    // 如果內容不需要滾動，設置固定滑塊高度
    if (docHeight <= windowHeight) {
      setThumbHeight("66%");
      setThumbPosition("0px");
      return;
    }

    // 計算滑塊高度百分比 (視窗高度與文檔高度的比例)
    const heightPercentage = (windowHeight / docHeight) * 100;
    const calculatedHeight = Math.max(heightPercentage, 10);
    setThumbHeight(`${calculatedHeight}%`);

    // 計算滑塊位置
    const scrollRatio = scrollTop / (docHeight - windowHeight);
    const maxScrollDistance =
      windowHeight - (windowHeight * calculatedHeight) / 100;
    setThumbPosition(`${scrollRatio * maxScrollDistance}px`);
  }, []);

  /**
   * 監聽滾動事件，使用 requestAnimationFrame 減少性能開銷
   */
  let scrollTimeout;
  const handleScroll = () => {
      updateScrollbar();  // 正常更新
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
          updateScrollbar(); // 滑動結束後強制執行一次
      }, 50);  // 設定短暫延遲，確保滾動停止後再更新一次
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  

  useEffect(() => {
    // 初始化滾動條
    updateScrollbar();

    // 添加滾動和視窗大小改變事件監聽
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollbar, { passive: true });

    // 監聽 DOM 變化，優化 MutationObserver 減少不必要的監聽範圍
    observerRef.current = new MutationObserver(() => {
      updateScrollbar();
    });

    observerRef.current.observe(document.body, {
      childList: true, // 只監聽子元素變化
      subtree: false, // 不監聽整個 DOM，減少計算負擔
    });

    return () => {
      // 移除監聽事件
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollbar);
      if (observerRef.current) observerRef.current.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateScrollbar]);

  return (
    <ScrollbarContainer>
      <ScrollbarTrack />
      <ScrollbarThumb height={thumbHeight} position={thumbPosition} />
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
