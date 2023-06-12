import React, { useEffect } from 'react';
import { InvoiceSettings } from '@crema/modules/invoice';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetInvoiceSettings,
  onUpdateSettings,
} from '../../../toolkit/actions';
import { StyledTypographyWrapper } from '../index.styled';
import { InvoiceSettingType, InvoiceSettingItem } from '@crema/models/invoice';

const InvoiceSettingsPage = () => {
  const dispatch = useAppDispatch();
  const invoiceSettings = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceSettings
  );

  useEffect(() => {
    dispatch(onGetInvoiceSettings());
  }, [dispatch]);

  const updateSettings = (key: string, newSettings: InvoiceSettingItem) => {
    const settings = {
      ...invoiceSettings,
      [key]: newSettings,
    };
    dispatch(onUpdateSettings(settings));
  };

  return (
    <StyledTypographyWrapper>
      <InvoiceSettings
        defaultSettings={invoiceSettings as InvoiceSettingType}
        onUpdateSettings={updateSettings}
      />
    </StyledTypographyWrapper>
  );
};

export default InvoiceSettingsPage;
