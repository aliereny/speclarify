import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Input, Modal } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import {
  StyledCustomerFooterPagination,
  StyledCustomerHeader,
  StyledCustomerHeaderPagination,
  StyledCustomerHeaderRight,
  StyledCustomerInputView,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getCustomers } from '../../../toolkit/actions';
import {
  CustomerTable,
  EditCustomer,
} from '@crema/modules/ecommerce/Customers';

const Customers = () => {
  const { messages } = useIntl();
  const dispatch = useAppDispatch();
  const customers = useAppSelector(({ ecommerce }) => ecommerce.customers);
  const customerCount = useAppSelector(
    ({ ecommerce }) => ecommerce.customerCount
  );
  const loading = useAppSelector(({ common }) => common.loading);

  const [page, setPage] = useState<number>(1);
  const [search, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    dispatch(getCustomers(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AppPageMeta title="Customers" />
      <AppsContainer
        title={messages['sidebar.ecommerce.customers'] as string}
        fullView
        type="bottom"
      >
        <AppsHeader key={'wrap'}>
          <StyledCustomerHeader>
            <StyledCustomerInputView>
              <Input
                id="user-name"
                placeholder="Search"
                type="search"
                onChange={onSearchOrder}
              />
            </StyledCustomerInputView>
            <StyledCustomerHeaderRight>
              <StyledCustomerHeaderPagination
                pageSize={10}
                count={customerCount || 0}
                page={page}
                onChange={onChange}
              />
            </StyledCustomerHeaderRight>
          </StyledCustomerHeader>
        </AppsHeader>

        {customers && (
          <AppsContent
            key={'wrap1'}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <CustomerTable loading={loading} customers={customers} />
          </AppsContent>
        )}

        <StyledCustomerFooterPagination
          key={'wrap2'}
          pageSize={10}
          count={customerCount || 0}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>

      <Modal
        title={messages['ecommerce.addCustomer'] as string}
        open={isModalVisible}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <EditCustomer />
      </Modal>

      <AppInfoView />
    </>
  );
};

export default Customers;
