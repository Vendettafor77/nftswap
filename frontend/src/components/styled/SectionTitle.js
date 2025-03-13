import React from "react";
import styled from "styled-components";
import GradientText from "./GradientText";

// 包裝容器，用於處理定位和底部線條
const TitleWrapper = styled.h2`
  text-align: center;
  margin: ${(props) => props.theme.spacing.xl} 0
    ${(props) => props.theme.spacing.lg};
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
`;

// 使用新的 GradientText 組件的 SectionTitle
const SectionTitle = ({ children }) => {
  return (
    <TitleWrapper>
      <GradientText
        fontSize="2.2rem"
        height="40"
        centered={true}
        fontWeight="600"
        startColor="#4776e6"
        endColor="#8e54e9"
        letterSpacing="0.5px"
        id={`section-title-${Math.random().toString(36).substring(7)}`}
      >
        {children}
      </GradientText>
    </TitleWrapper>
  );
};

export default SectionTitle;
