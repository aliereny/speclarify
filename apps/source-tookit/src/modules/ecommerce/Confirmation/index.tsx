import React from 'react';
import { addresses } from '@crema/fakedb/ecommerceData';
import AppPageMeta from '@crema/components/AppPageMeta';
import { StyledConfirmationView } from './index.styled';
import {
  AddressInfo,
  ItemsList,
  OrderPlaced,
} from '@crema/modules/ecommerce/Confirmation';
import { useAppSelector } from '../../../toolkit/hooks';

const Confirmation = () => {
  const cartItems = useAppSelector(({ ecommerce }) => ecommerce.cartItems);
  return (
    <>
      <AppPageMeta title="Order Confirmation" />
      <StyledConfirmationView key={'wrap'}>
        <OrderPlaced cartItems={cartItems} />
        <AddressInfo address={addresses[0]} />
        <ItemsList cartItems={cartItems} />
      </StyledConfirmationView>
    </>
  );
};

export default Confirmation;
