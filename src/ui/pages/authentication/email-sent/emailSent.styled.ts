import styled from "styled-components";
import { Result } from "antd";

export const StyledResult = styled(Result)`
  width: 100%;
  @media (min-width: 575px) {
    width: 400px;
  }

  @media (min-width: 768px) {
    width: 500px;
  }

  & div.ant-result-subtitle {
    color: #4d4c4c;
    font-weight: 500;
    font-size: 16px;
  }
`;
