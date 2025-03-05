import React, { useContext } from "react";
import styled from "styled-components";
import { AnimationContext } from "../../contexts/AnimationContext";

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  padding: 15px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );
  border-radius: ${(props) => props.theme.borderRadius.large};
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const AnimationButton = styled.button`
  background: ${(props) =>
    props.active
      ? "linear-gradient(45deg, #6a11cb, #2575fc)"
      : "rgba(106, 17, 203, 0.1)"};
  color: ${(props) =>
    props.active ? "white" : props.theme.colors.text.primary};
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const AnimationControls = () => {
  const { animationType, setAnimationType } = useContext(AnimationContext);

  return (
    <ControlsContainer>
      <span style={{ marginRight: "10px" }}>アニメーション効果:</span>
      <AnimationButton
        active={animationType === "pulse"}
        onClick={() => setAnimationType("pulse")}
      >
        光の波動
      </AnimationButton>
      <AnimationButton
        active={animationType === "float"}
        onClick={() => setAnimationType("float")}
      >
        ふわふわ
      </AnimationButton>
      <AnimationButton
        active={animationType === "flip"}
        onClick={() => setAnimationType("flip")}
      >
        3D回転
      </AnimationButton>
    </ControlsContainer>
  );
};

export default AnimationControls;
