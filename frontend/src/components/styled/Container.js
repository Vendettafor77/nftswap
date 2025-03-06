import styled from "styled-components";

export const NFTGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.sm};

  @media (min-width: 1920px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

export const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  width: 100%;
`;
