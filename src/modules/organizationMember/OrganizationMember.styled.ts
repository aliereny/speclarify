import styled from 'styled-components';
import { Table } from 'antd';

export const StyledOrganizationMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  padding: 16px;
  border-radius: 1rem;
  @media screen and (min-width: 768px) {
    padding: 2rem;
    border-radius: 2rem;
  }

  & > a {
    align-self: flex-end;
    margin-bottom: 1rem;
  }
`;

export const StyledOrganizationMemberTable = styled(Table)`
  width: 100%;
`;

export const StyledAddOrganizationMemberWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;

  @media screen and (min-width: 768px) {
    padding: 2rem;
    border-radius: 2rem;
  }
`;
