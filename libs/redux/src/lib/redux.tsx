import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ReduxProps {}

const StyledRedux = styled.div`
  color: pink;
`;

export function Redux(props: ReduxProps) {
  return (
    <StyledRedux>
      <h1>Welcome to Redux!</h1>
    </StyledRedux>
  );
}

export default Redux;
