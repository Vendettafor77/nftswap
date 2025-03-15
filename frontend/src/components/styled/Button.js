import styled, { css } from "styled-components";

const baseButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
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
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #6a11cb88, #2575fc88);
  }
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background: linear-gradient(45deg, #2575fc, #6a11cb);
  color: white;

  &:hover {
    box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #2575fc88, #6a11cb88);
  }
`;

export const OutlineButton = styled.button`
  ${baseButtonStyles}
  background: ${(props) =>
    props.$active || props.$gradient
      ? "linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)"
      : props.$direction === "prev"
        ? "linear-gradient(45deg, #2575fc44, #6a11cb44)"
        : "linear-gradient(45deg, #6a11cb44, #2575fc44)"};
  color: ${(props) =>
    props.$active || props.$gradient
      ? "white"
      : props.theme.colors.text.primary};
  border: ${(props) =>
    props.$active || props.$gradient
      ? "none"
      : `1px solid ${props.$direction === "prev" ? "#2575fc33" : "#6a11cb33"}`};

  &:hover {
    background: ${(props) =>
      props.$active || props.$gradient
        ? "linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)"
        : props.$direction === "prev"
          ? "linear-gradient(45deg, #2575fc66, #6a11cb66)"
          : "linear-gradient(45deg, #6a11cb66, #2575fc66)"};
    box-shadow: ${(props) =>
      props.$active || props.$gradient
        ? "0 5px 15px rgba(106, 17, 203, 0.3)"
        : "none"};
  }
`;

export const GhostButton = styled.button`
  ${baseButtonStyles}
  background: transparent;
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const TabButton = styled.button`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) =>
    props.$active
      ? props.theme.colors.text.primary
      : props.theme.colors.text.secondary};
  background: ${(props) =>
    props.$active ? props.theme.colors.surface : "transparent"};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 ${(props) => props.theme.spacing.sm};

  &:hover {
    background: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.spacing.md} 0;
  gap: ${(props) => props.theme.spacing.sm};
`;
