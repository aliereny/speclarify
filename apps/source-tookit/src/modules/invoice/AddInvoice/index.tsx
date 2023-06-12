import React, { useEffect } from 'react';
import { AddInvoice } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetClientList,
  onGetInvoiceList,
  onGetInvoiceSettings,
  onAddInvoice,
} from '../../../toolkit/actions';
import { StyledTypographyWrapper } from '../index.styled';
import { InvoiceSettingType, InvoiceType } from '@crema/models/invoice';

const AddInvoicePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const invoiceSettings = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceSettings
  );
  const clientsList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.clientsList
  );
  const invoiceList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceList
  );

  useEffect(() => {
    dispatch(onGetInvoiceList({ folder: undefined, page: 0 }));
    dispatch(onGetClientList());
    dispatch(onGetInvoiceSettings());
  }, [dispatch]);

  const onSave = (invoice: InvoiceType) => {
    dispatch(onAddInvoice(invoice));

    router.push('/invoice');
  };

  return clientsList && invoiceList?.length ? (
    <StyledTypographyWrapper>
      <AddInvoice
        clientsList={clientsList}
        totalCount={invoiceList?.length || 0}
        invoiceSettings={invoiceSettings as InvoiceSettingType}
        onSave={onSave}
      />
    </StyledTypographyWrapper>
  ) : null;
};

export default AddInvoicePage;
