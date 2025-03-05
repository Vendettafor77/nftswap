import React from "react";
import styled from "styled-components";

export const HeroSection = styled.section`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl} 0;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    background: linear-gradient(120deg, #11998e, #38ef7d, #6a11cb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${(props) => props.theme.spacing.md};
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 4px;
      background: linear-gradient(120deg, #11998e, #38ef7d);
      border-radius: 2px;
      opacity: 0.7;
    }
  }

  p {
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.text.secondary};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
    margin-top: 30px;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding: 10px;
  transform: translateZ(0); // 强制GPU加速
  perspective: 1000px; // 优化3D效果
`;

export const Tab = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background: ${(props) =>
    props.active ? "linear-gradient(120deg, #6a11cb, #2575fc)" : "transparent"};
  color: ${(props) =>
    props.active ? "white" : props.theme.colors.text.primary};
  border: 2px solid ${(props) => (props.active ? "transparent" : "#6a11cb55")};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin: 0 ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.active ? "0 5px 15px rgba(42, 82, 190, 0.3)" : "none"};
  will-change: transform, background, box-shadow; // 提高性能
  backface-visibility: hidden; // 减少闪动

  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.active
        ? "linear-gradient(120deg, #6a11cb, #2575fc)"
        : "rgba(106, 17, 203, 0.1)"};
    box-shadow: ${(props) =>
      props.active
        ? "0 8px 20px rgba(42, 82, 190, 0.3)"
        : "0 5px 15px rgba(42, 82, 190, 0.1)"};
  }

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s ease;
    pointer-events: none; // 防止事件干扰
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(1px);
  }
`;
