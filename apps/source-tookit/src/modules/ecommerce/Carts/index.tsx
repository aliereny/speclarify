import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CartTable, OrderSummary } from '@crema/modules/ecommerce/Carts';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Button, Col } from 'antd';
import AppAnimate from '@crema/components/AppAnimate';
import AppPageMeta from '@crema/components/AppPageMeta';
import QueueAnim from 'rc-queue-anim';
import { StyledCartsFooter } from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  getCartItems,
  removeCartItem,
  updateCartItem,
} from '../../../toolkit/actions';
import { CartItemsType } from '@crema/models/ecommerce/EcommerceApp';

const Carts = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector(({ ecommerce }) => ecommerce.cartItems);
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const onRemoveItem = (data: CartItemsType) => {
    dispatch(removeCartItem(data));
  };

  const onDecrement = (data: CartItemsType) => {
    if (data.count > 1) {
      dispatch(updateCartItem({ ...data, count: data.count - 1 }));
    } else {
      dispatch(removeCartItem(data));
    }
  };
  const onIncrement = (data: CartItemsType) => {
    dispatch(updateCartItem({ ...data, count: data.count + 1 }));
  };

  return (
    <>
      <AppPageMeta title="Carts" />
      <QueueAnim style={{ zIndex: 3 }} type="scale">
        <h2 className="page-title" key="title">
          <IntlMessages id="sidebar.ecommerce.cart" />
        </h2>
      </QueueAnim>
      <AppRowContainer>
        <Col xs={24} lg={16}>
          <AppAnimate animation="transition.slideLeftIn" delay={200}>
            <AppCard
              key="a"
              className="no-card-space-ltr-rtl"
              actions={[
                <StyledCartsFooter key={1}>
                  <Button
                    type="primary"
                    onClick={() => {
                      router.push('/ecommerce/products');
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    className="btn-secondary"
                    onClick={() => {
                      router.push('/ecommerce/checkout');
                    }}
                  >
                    Checkout
                  </Button>
                </StyledCartsFooter>,
              ]}
            >
              <CartTable
                cartItems={cartItems}
                loading={loading}
                onRemoveItem={onRemoveItem}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            </AppCard>
          </AppAnimate>
        </Col>
        <Col xs={24} lg={8}>
          <OrderSummary cartItems={cartItems} key="b" />{' '}
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Carts;
