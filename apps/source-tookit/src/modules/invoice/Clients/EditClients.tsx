import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AddClient } from '@crema/modules/invoice';
import { useAppDispatch, useAppSelector } from '../../../toolkit/hooks';
import { onGetClientDetail, onUpdateClient } from '../../../toolkit/actions';
import { isEmptyObject } from '@crema/helpers';
import { StyledTypographyWrapper } from '../index.styled';
import { ClientType } from '@crema/models/invoice';

const EditClients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedClient = useAppSelector(
    ({ invoiceApp }) => invoiceApp.selectedClient
  );

  useEffect(() => {
    if (router.query?.all?.[0])
      dispatch(onGetClientDetail(router.query?.all?.[0]));
  }, [dispatch, router.query.all]);

  const onSave = (client: ClientType) => {
    dispatch(onUpdateClient(client));

    router.push('/invoice/clients');
  };

  return !isEmptyObject(selectedClient as ClientType) ? (
    <StyledTypographyWrapper>
      <AddClient
        selectedClient={selectedClient as ClientType}
        onSave={onSave}
      />
    </StyledTypographyWrapper>
  ) : null;
};

export default EditClients;
