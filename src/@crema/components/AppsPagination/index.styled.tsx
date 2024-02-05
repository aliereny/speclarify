import styled from 'styled-components';
import {Pagination} from 'antd';

export const StyledPagination = styled(Pagination)`
    margin-top: 20px;

    & .ant-pagination-item-link,
    & .ant-pagination-item > a {
        background-color: ${({ theme }) => theme.palette.background.paper};
        color: ${({ theme }) => theme.palette.text.primary};
    }
`;
