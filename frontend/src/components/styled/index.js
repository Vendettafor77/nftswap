import React from "react";
import styled from "styled-components";
import { OutlineButton } from "./Button";

export const HeroSection = styled.section`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl} 0;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  h1 {
    font-size: 4.2rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(
      120deg,
      rgba(106, 17, 203, 0.9) 0%,
      rgba(142, 84, 233, 0.85) 25%,
      rgba(37, 117, 252, 0.8) 50%,
      rgba(106, 17, 203, 0.9) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${(props) => props.theme.spacing.xl};
    position: relative;
    display: inline-block;
    animation: shine 4s linear infinite;

    @keyframes shine {
      to {
        background-position: 200% center;
      }
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
  transform: translateZ(0);
  perspective: 1000px;
`;

// 使用 OutlineButton 替代 Tab
export const StyledTab = styled(OutlineButton)`
  background: ${(props) =>
    props.active
      ? `linear-gradient(120deg, 
          ${props.theme.colors.primary}00 0%, 
          ${props.theme.colors.primary} 25%, 
          ${props.theme.colors.secondary} 75%, 
          ${props.theme.colors.secondary}00 100%
        )`
      : "transparent"};
  color: ${(props) =>
    props.active ? "white" : props.theme.colors.text.primary};
  border: 2px solid
    ${(props) =>
      props.active ? "transparent" : props.theme.colors.primary + "55"};
  box-shadow: ${(props) =>
    props.active ? "0 5px 15px rgba(42, 82, 190, 0.3)" : "none"};

  &:hover {
    background: ${(props) =>
      props.active
        ? `linear-gradient(120deg, 
            ${props.theme.colors.primary}00 0%, 
            ${props.theme.colors.primary} 25%, 
            ${props.theme.colors.secondary} 75%, 
            ${props.theme.colors.secondary}00 100%
          )`
        : `linear-gradient(120deg, transparent, rgba(106, 17, 203, 0.1), transparent)`};
    box-shadow: ${(props) =>
      props.active
        ? "0 8px 20px rgba(42, 82, 190, 0.3)"
        : "0 5px 15px rgba(42, 82, 190, 0.1)"};
  }
`;

export const Tab = ({ children, ...props }) => (
  <StyledTab {...props}>{children}</StyledTab>
);
