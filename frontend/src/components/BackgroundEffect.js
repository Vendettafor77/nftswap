import React from "react";
import styled from "styled-components";

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

const GradientOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.06;
  background: ${(props) => props.gradient};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: floatAnimation ${(props) => props.index}
    ${(props) => props.duration}s ease-in-out infinite alternate;

  @keyframes floatAnimation${(props) => props.index} {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(
          ${(props) => props.moveX}px,
          ${(props) => props.moveY}px
        )
        scale(${(props) => props.scale});
    }
  }
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(71, 85, 165, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71, 85, 165, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: -1px -1px;
`;

// 星星背景
const StarryBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Star = styled.div`
  position: absolute;
  background-color: white;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  opacity: ${(props) => props.opacity};
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: twinkle ${(props) => props.index} ${(props) => props.duration}s
    ease-in-out infinite alternate;

  @keyframes twinkle${(props) => props.index} {
    0% {
      opacity: ${(props) => props.opacity};
      transform: scale(1);
    }
    100% {
      opacity: ${(props) => props.opacity * 0.3};
      transform: scale(0.8);
    }
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Particle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  box-shadow: 0 0 ${(props) => props.glow}px ${(props) => props.color + "80"};
  animation: float ${(props) => props.index} ${(props) => props.duration}s
    ease-in-out infinite;

  @keyframes float${(props) => props.index} {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(${(props) => props.moveY}px)
        translateX(${(props) => props.moveX}px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
`;

export const BackgroundDecoration = () => {
  // 定义渐变色球体
  const orbs = [
    {
      size: 600,
      top: 5,
      left: -20,
      gradient: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
      duration: 15,
      moveX: 30,
      moveY: 40,
      scale: 1.1,
      index: 1,
    },
    {
      size: 400,
      top: 80,
      left: 80,
      gradient: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
      duration: 18,
      moveX: -40,
      moveY: -30,
      scale: 0.9,
      index: 2,
    },
    {
      size: 350,
      top: 30,
      left: 75,
      gradient: "linear-gradient(135deg, #283593 0%, #5c6bc0 100%)",
      duration: 20,
      moveX: -20,
      moveY: 20,
      scale: 1.2,
      index: 3,
    },
  ];

  // 生成30个随机星星
  const stars = Array(30)
    .fill(0)
    .map((_, i) => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 5 + 3,
      index: i,
    }));

  // 生成15个浮动粒子
  const particles = Array(15)
    .fill(0)
    .map((_, i) => ({
      size: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.2 + 0.1,
      duration: Math.random() * 10 + 15,
      moveX: Math.random() * 40 - 20,
      moveY: Math.random() * 40 - 20,
      color: ["#4fc3f7", "#2196f3", "#1565c0", "#6a11cb"][
        Math.floor(Math.random() * 4)
      ],
      glow: Math.random() * 10 + 5,
      index: i,
    }));

  return (
    <BackgroundWrapper>
      <GridLines />
      {orbs.map((orb, i) => (
        <GradientOrb
          key={i}
          size={orb.size}
          top={orb.top}
          left={orb.left}
          gradient={orb.gradient}
          duration={orb.duration}
          moveX={orb.moveX}
          moveY={orb.moveY}
          scale={orb.scale}
          index={orb.index}
        />
      ))}
      <StarryBackground>
        {stars.map((star, i) => (
          <Star
            key={i}
            size={star.size}
            top={star.top}
            left={star.left}
            opacity={star.opacity}
            duration={star.duration}
            index={i}
          />
        ))}
      </StarryBackground>
      <ParticleContainer>
        {particles.map((particle, i) => (
          <Particle
            key={i}
            size={particle.size}
            top={particle.top}
            left={particle.left}
            opacity={particle.opacity}
            duration={particle.duration}
            moveX={particle.moveX}
            moveY={particle.moveY}
            color={particle.color}
            glow={particle.glow}
            index={i}
          />
        ))}
      </ParticleContainer>
    </BackgroundWrapper>
  );
};
