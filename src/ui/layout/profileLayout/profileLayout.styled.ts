import styled from "styled-components";

export const StyledProfileLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StyledProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem 1rem;
  width: 100%;
  overflow: auto;
  @media (min-width: 575px) {
    padding: 2rem 2rem;
  }
`;
