import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const StatusMessage = styled.div`
  position: relative;
  margin-top: ${(props) =>
    props.centered ? "1rem" : props.theme?.spacing?.xl || "2rem"};
  padding: ${(props) => props.theme?.spacing?.lg || "1.25rem"};
  border-radius: ${(props) => props.theme?.borderRadius?.large || "12px"};
  background: ${(props) =>
    props.success
      ? `linear-gradient(145deg, 
          rgba(76, 175, 80, 0.08),
          rgba(106, 17, 203, 0.08)
        )`
      : `linear-gradient(145deg, 
          rgba(244, 67, 54, 0.08),
          rgba(106, 17, 203, 0.08)
        )`};
  color: ${(props) =>
    props.success
      ? props.theme?.colors?.success || "#4CAF50"
      : props.theme?.colors?.error || "#F44336"};
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-family: ${(props) =>
    props.theme?.typography?.fontFamily || "sans-serif"};
  border: 2px solid
    ${(props) =>
      props.success ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.fadeOut ? fadeOut : fadeIn)} 0.4s ease-out
    ${(props) => (props.fadeOut ? "forwards" : "")};
  max-width: ${(props) => (props.centered ? "100%" : "90%")};
  margin-left: ${(props) => (props.centered ? "0" : "auto")};
  margin-right: ${(props) => (props.centered ? "0" : "auto")};
  transform-origin: center top;
  align-self: ${(props) => props.alignSelf || "auto"};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid
      ${(props) =>
        props.success ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"};
    display: ${(props) => (props.noArrow ? "none" : "block")};
  }

  &::after {
    content: "${(props) => (props.success ? "✓" : "!")}";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: ${(props) =>
      props.success ? "rgba(76, 175, 80, 1)" : "rgba(244, 67, 54, 1)"};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
