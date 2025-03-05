import React, { createContext, useState, useEffect } from "react";

// 创建动画上下文
export const AnimationContext = createContext({
  animationType: "pulse",
  animationsEnabled: true,
  setAnimationType: () => {},
  setAnimationsEnabled: () => {},
  performanceMode: false,
  setPerformanceMode: () => {},
});

// 动画提供者组件
export const AnimationProvider = ({ children }) => {
  // 动画类型：pulse, float, flip
  const [animationType, setAnimationType] = useState("pulse");
  // 是否启用动画效果
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  // 性能模式（减少动画）
  const [performanceMode, setPerformanceMode] = useState(false);

  // 检测设备性能，自动切换到性能模式
  useEffect(() => {
    const checkPerformance = () => {
      // 简单检测移动设备
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // 如果是移动设备，启用性能模式
      if (isMobile) {
        setPerformanceMode(true);
        setAnimationsEnabled(false);
      }

      // 如果浏览器性能API可用，可以进一步检测
      if ("deviceMemory" in navigator) {
        // 如果设备内存低于4GB，启用性能模式
        if (navigator.deviceMemory < 4) {
          setPerformanceMode(true);
          setAnimationsEnabled(false);
        }
      }
    };

    checkPerformance();
  }, []);

  const contextValue = {
    animationType,
    setAnimationType,
    animationsEnabled,
    setAnimationsEnabled,
    performanceMode,
    setPerformanceMode,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};
