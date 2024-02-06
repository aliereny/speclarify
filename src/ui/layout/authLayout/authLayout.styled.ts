import styled from "styled-components";

export const StyledAuthLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  @media (min-width: 575px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  & > .ant-flex {
    padding: 1rem;
    width: 100%;
    @media (min-width: 575px) {
      width: 400px;
      padding: 1.5rem;
    }
    @media (min-width: 768px) {
      width: 500px;
      padding: 2rem;
    }
    border-radius: 10px;
    border: 1px solid #f1f2f6;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;
