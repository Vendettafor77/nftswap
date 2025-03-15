import React, { useState, useEffect, useContext, useMemo } from "react";
import styled from "styled-components";
import { AnimationContext } from "../contexts/AnimationContext";

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

// 简化的静态背景
const StaticBackground = styled.div`
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
`;

// 修复GradientOrb组件使用$前缀避免属性传递到DOM
const GradientOrb = styled.div.attrs((props) => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    top: `${props.$top}%`,
    left: `${props.$left}%`,
    background: props.$gradient,
  },
}))`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.04;
  transition: opacity 0.5s ease;
`;

// 使用$前缀标记transient props（不会传递到DOM）
// 并使用attrs最大化减少生成的样式类
const Star = styled.div.attrs((props) => ({
  style: {
    top: `${props.$top}%`,
    left: `${props.$left}%`,
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    backgroundColor:
      props.$opacity > 1.2
        ? "rgba(255, 255, 255, 1)"
        : `rgba(175, 175, 175, ${props.$opacity})`,
    boxShadow:
      props.$isBright && !props.$isUltraBright
        ? `0 0 ${props.$size * 1.3}px rgba(255, 255, 255, 0.7)`
        : props.$isUltraBright
          ? `0 0 ${props.$size * 1.5}px rgba(255, 255, 255, 0.8),
           0 0 ${props.$size * 2.5}px rgba(255, 255, 255, 0.6),
           0 0 ${props.$size * 3.5}px rgba(255, 255, 255, 0.4)`
          : "none",
  },
}))`
  position: absolute;
  border-radius: 50%;
  z-index: 1;

  /* 使用伪元素创建径向渐变，避免直接在DOM元素上设置属性 */
  ${(props) =>
    props.$isUltraBright
      ? `
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${props.$size * 4}px;
      height: ${props.$size * 4}px;
      transform: translate(-50%, -50%);
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.3) 20%,
        rgba(255, 255, 255, 0.1) 30%,
        transparent 70%
      );
    }
  `
      : ""}
`;

// 修改星芒光线效果，避免样式类过多
const StarRays = styled.div.attrs((props) => ({
  style: {
    top: `${props.$top}%`,
    left: `${props.$left}%`,
    width: `${props.$size * 10}px`,
    height: `${props.$size * 10}px`,
  },
}))`
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
`;

export const BackgroundDecoration = () => {
  const { performanceMode, animationsEnabled } = useContext(AnimationContext);
  const [reduced, setReduced] = useState(false);

  // 检测用户是否启用了减少动画选项
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReducedMotion);
  }, []);

  // 如果用户选择了减少动画或性能模式，则禁用视觉效果
  const disableEffects = reduced || !animationsEnabled || performanceMode;

  // 优化星星生成，并增加数量
  const stars = useMemo(() => {
    if (disableEffects) return []; // 性能模式下不生成星星

    return Array.from({ length: 1500 }, (_, i) => {
      // 调整星星大小分布
      const sizeRandom = Math.random();
      // 基础星星大小保持不变
      const baseSize =
        sizeRandom < 0.7
          ? 0.6 + Math.random() * 0.4 // 小星星 (0.6-1.0px)
          : sizeRandom < 0.9
            ? 1.2 + Math.random() * 0.5 // 中星星 (1.2-1.7px)
            : sizeRandom < 0.97
              ? 1.7 + Math.random() * 0.3 // 较大星星 (1.7-2.0px)
              : 1.8 + Math.random() * 0.3; // 最大星星 (1.8-2.1px)

      const opacityRandom = Math.random();
      const opacity =
        opacityRandom < 0.01
          ? 2.0 + Math.random() * 1.0
          : opacityRandom < 0.05
            ? 1.3 + Math.random() * 0.7
            : opacityRandom < 0.2
              ? 0.9 + Math.random() * 0.4
              : Math.random() * 0.5 + 0.1;

      // 光晕星星尺寸计算：考虑光晕效果，使实际星星更小
      // 基于光晕的整体视觉效果计算星星本体大小
      const finalSize =
        opacity > 2.0
          ? 0.9 + Math.random() * 0.3 // 超亮星星尺寸固定为较小值(0.9-1.2px)
          : opacity > 1.3
            ? 1.0 + Math.random() * 0.4 // 亮星星(1.0-1.4px)
            : baseSize;

      return {
        id: i,
        size: finalSize,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity,
        isBright: opacity > 1.3 && opacity <= 2.0,
        isUltraBright: opacity > 2.0,
      };
    });
  }, [disableEffects]);

  // 使用useMemo缓存orbs配置，避免重复计算
  const orbs = useMemo(() => {
    if (disableEffects) return [];

    return [
      {
        size: 500,
        top: 5,
        left: -15,
        gradient: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
      },
      {
        size: 350,
        top: 80,
        left: 80,
        gradient: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
      },
    ];
  }, [disableEffects]);

  // 完全禁用动画，只使用静态背景
  if (disableEffects) {
    return (
      <BackgroundWrapper>
        <StaticBackground />
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <StaticBackground />
      {orbs.map((orb, i) => (
        <GradientOrb
          key={i}
          $size={orb.size}
          $top={orb.top}
          $left={orb.left}
          $gradient={orb.gradient}
        />
      ))}

      {/* 为超亮星星添加星芒效果 */}
      {stars
        .filter((star) => star.isUltraBright)
        .map((star) => (
          <StarRays
            key={`rays-${star.id}`}
            $size={star.size}
            $top={star.top}
            $left={star.left}
          />
        ))}

      {/* 渲染所有星星 - 使用$前缀标记transient props */}
      {stars.map((star) => (
        <Star
          key={star.id}
          $size={star.size}
          $top={star.top}
          $left={star.left}
          $opacity={star.opacity}
          $isBright={star.isBright}
          $isUltraBright={star.isUltraBright}
        />
      ))}
    </BackgroundWrapper>
  );
};
