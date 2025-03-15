import React from "react";
import styled from "styled-components";
import { OutlineButton } from "./Button";
import SectionTitle from "./SectionTitle";

export { SectionTitle };

export const HeroSection = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.md} 0;
  margin-bottom: ${(props) => props.theme.spacing.sm};

  h1 {
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: ${(props) => props.theme.spacing.xs};
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
    color: ${(props) => props.theme.colors.text.secondary};
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
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: 8px;
  transform: translateZ(0);
  perspective: 1000px;
`;

// 使用 OutlineButton 替代 Tab
export const StyledTab = styled(OutlineButton)`
  background: ${(props) =>
    props.$active
      ? `linear-gradient(120deg, 
          ${props.theme.colors.primary}00 0%, 
          ${props.theme.colors.primary} 25%, 
          ${props.theme.colors.secondary} 75%, 
          ${props.theme.colors.secondary}00 100%
        )`
      : "transparent"};
  color: ${(props) =>
    props.$active ? "white" : props.theme.colors.text.primary};
  border: 2px solid
    ${(props) =>
      props.$active ? "transparent" : props.theme.colors.primary + "55"};
  box-shadow: ${(props) =>
    props.$active ? "0 5px 15px rgba(42, 82, 190, 0.3)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$active
        ? `linear-gradient(120deg, 
            ${props.theme.colors.primary}00 0%, 
            ${props.theme.colors.primary} 25%, 
            ${props.theme.colors.secondary} 75%, 
            ${props.theme.colors.secondary}00 100%
          )`
        : `linear-gradient(120deg, transparent, rgba(106, 17, 203, 0.1), transparent)`};
    box-shadow: ${(props) =>
      props.$active
        ? "0 8px 20px rgba(42, 82, 190, 0.3)"
        : "0 5px 15px rgba(42, 82, 190, 0.1)"};
  }
`;

export const Tab = ({ children, ...props }) => (
  <StyledTab {...props}>{children}</StyledTab>
);
