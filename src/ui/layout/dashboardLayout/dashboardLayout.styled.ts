import styled from "styled-components";

export const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const StyledDashboardContentWrapper = styled.div`
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
