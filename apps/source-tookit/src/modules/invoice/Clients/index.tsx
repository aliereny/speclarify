import AppGrid from '@crema/components/AppGrid';
import AppLoader from '@crema/components/AppLoader';
import { isEmptyObject } from '@crema/helpers';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { onGetClientList } from '../../../toolkit/actions';
import { ClientItem } from '@crema/modules/invoice';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { StyledTypographyWrapper } from '../index.styled';

const Clients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientsList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.clientsList
  );
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetClientList());
  }, [dispatch]);

  return !isEmptyObject(clientsList) ? (
    <StyledTypographyWrapper>
      <div>
        <Button
          type="primary"
          style={{ display: 'block', marginLeft: 'auto', marginBottom: 12 }}
          onClick={() => router.push('/invoice/clients/add')}
        >
          Add Clients
        </Button>
      </div>
      <AppGrid
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        loading={loading}
        data={clientsList}
        renderItem={(client) => <ClientItem client={client} />}
      />
    </StyledTypographyWrapper>
  ) : (
    <AppLoader />
  );
};

export default Clients;
