import React, { useState } from "react";
import styled from "styled-components";
import { useFont } from "../../contexts/FontContext";

const SwitcherContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const SwitcherButton = styled.button`
  background: rgba(28, 34, 65, 0.9);
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  font-size: 0.9rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(42, 82, 190, 0.2);
    border-color: rgba(106, 17, 203, 0.4);
  }
`;

const OptionsPanel = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  background: rgba(28, 34, 65, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 8px;
  backdrop-filter: blur(12px);
  width: 220px;
`;

const FontOption = styled.button`
  width: 100%;
  padding: 8px 12px;
  background: ${(props) =>
    props.isSelected ? "rgba(106, 17, 203, 0.2)" : "transparent"};
  border: 1px solid
    ${(props) => (props.isSelected ? "rgba(106, 17, 203, 0.4)" : "transparent")};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: rgba(42, 82, 190, 0.15);
  }

  /* プレビューテキストのスタイル */
  span {
    display: block;
    font-family: ${(props) => props.fontFamily};
    margin-top: 4px;
    font-size: 0.85rem;
    opacity: 0.8;
  }
`;

const FontSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentFont, setCurrentFont, fontOptions } = useFont();

  return (
    <SwitcherContainer>
      <SwitcherButton onClick={() => setIsOpen(!isOpen)}>
        フォント切替
      </SwitcherButton>
      {isOpen && (
        <OptionsPanel>
          {Object.entries(fontOptions).map(([key, font]) => (
            <FontOption
              key={key}
              isSelected={currentFont === key}
              onClick={() => {
                setCurrentFont(key);
                setIsOpen(false);
              }}
              fontFamily={font.family}
            >
              {font.label}
              <span>あいうえお漢字</span>
            </FontOption>
          ))}
        </OptionsPanel>
      )}
    </SwitcherContainer>
  );
};

export default FontSwitcher;
