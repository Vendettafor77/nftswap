import styled from "styled-components";

// 高级渐变色标题
const SectionTitle = styled.h2`
  text-align: center;
  margin: ${(props) => props.theme.spacing.xl} 0
    ${(props) => props.theme.spacing.lg};
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(120deg, #4776e6, #8e54e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

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

export default SectionTitle;
