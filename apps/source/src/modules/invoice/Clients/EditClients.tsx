import React from 'react';
import { useRouter } from 'next/router';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { AddClient } from '@crema/modules/invoice';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { isEmptyObject } from '@crema/helpers';
import { StyledTypographyWrapper } from '../index.styled';
import { ClientType } from '@crema/models/invoice';

const EditClients = () => {
  const router = useRouter();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: selectedClient }] = useGetDataApi<ClientType>(
    '/api/clients/detail',
    {} as ClientType,
    { id: router?.query?.all?.[0] },
    true
  );
  const onSave = (client: ClientType) => {
    putDataApi('/api/invoice/clients/update', infoViewActionsContext, {
      client,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          'Client has been updated successfully!'
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice/clients');
  };

  return !isEmptyObject(selectedClient) ? (
    <StyledTypographyWrapper>
      <AddClient selectedClient={selectedClient} onSave={onSave} />
    </StyledTypographyWrapper>
  ) : null;
};

export default EditClients;
