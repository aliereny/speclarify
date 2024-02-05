import styled from 'styled-components';
import { Empty } from 'antd';
import { Avatar } from 'antd';

export const StyledTypographyWrapper = styled.div`
    h3 {
        font-size: 20px !important;
    }

    h4 {
        font-size: 16px !important;
    }

    h5 {
        font-size: 14px !important;
    }
`;

export const StyledEmpty = styled(Empty)`
    background-color: #fff;
    padding: 4rem;
    .ant-empty-description {
        font-size: 16px;
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`;


export const StyledSecondaryText = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const StyledFormWrapper = styled.div`
  .ant-select,
  .ant-input-number,
  .ant-input-number-group-wrapper {
    width: 100%;
  }

  .notification {
    margin-left: 10px;
  }

  .ant-card,
  .mb-20,
  .ant-select {
    margin-bottom: 20px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  display: block;
  margin: 0 auto;
  img {
    object-fit: contain;
  }
`;


