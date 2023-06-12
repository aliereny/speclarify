import React, { useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useRouter } from 'next/router';
import { StyledProductDetails } from './index.styled';
import {
  Header,
  ProductView,
  SimilarProduct,
} from '@crema/modules/ecommerce/ProductDetail';
import ProductImageSlide from './ProductImageSlide';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getProductDetail } from '../../../toolkit/actions';

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const { all } = query;

  const currentProduct = useAppSelector(
    ({ ecommerce }) => ecommerce.currentProduct
  );

  useEffect(() => {
    if (all) dispatch(getProductDetail(all[0]));
  }, [dispatch, all]);

  return (
    <StyledProductDetails>
      <AppPageMeta title="Product Details" />
      {currentProduct ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard key="product_detail">
            <Header product={currentProduct} />
            <AppRowContainer>
              <Col sm={24} lg={8}>
                <ProductImageSlide product={currentProduct} />
              </Col>
              <Col sm={24} lg={16}>
                <ProductView product={currentProduct} />
              </Col>
            </AppRowContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </StyledProductDetails>
  );
};

export default ProductDetail;
