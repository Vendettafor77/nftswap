import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${(props) => props.theme.typography.fontFamily};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text.primary};
    line-height: ${(props) => props.theme.typography.body.lineHeight};
    font-weight: ${(props) => props.theme.typography.body.fontWeight};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${(props) => props.theme.typography.heading.fontWeight};
    line-height: ${(props) => props.theme.typography.heading.lineHeight};
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: ${(props) => props.theme.borderRadius.medium};
    padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
    font-weight: 500;
    font-family: ${(props) => props.theme.typography.fontFamily};
    transition: all 0.2s ease;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  a {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  input, select, textarea {
    border-radius: ${(props) => props.theme.borderRadius.medium};
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.text.secondary};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text.primary};
    outline: none;
    font-family: ${(props) => props.theme.typography.fontFamily};
    
    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default GlobalStyles;
