import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const AddClients = asyncComponent(() =>
  import('../../../modules/invoice/Clients/AddClients')
);
export default AppPage(() => <AddClients />);
