import styled from "styled-components";

export const StyledOrganizationCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 0.5rem;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }

  & > h3 {
    margin: 0;
  }

  & > h3,
  span {
    margin-left: auto;
    margin-right: auto;
  }
`;
