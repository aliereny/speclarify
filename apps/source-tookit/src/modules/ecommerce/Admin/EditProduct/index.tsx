import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers';
import AddEditProduct from '../AddEditProduct';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { getProductDetail } from '../../../../toolkit/actions';

const ProductEditPage = () => {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const currentProduct = useAppSelector(
    ({ ecommerce }) => ecommerce.currentProduct
  );
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    if (query?.all?.[0]) dispatch(getProductDetail(query?.all?.[0]));
  }, [dispatch, query?.all]);

  return loading ? (
    <AppLoader />
  ) : currentProduct && !isEmptyObject(currentProduct) ? (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AddEditProduct selectedProd={currentProduct} />
    </AppAnimate>
  ) : null;
};
export default ProductEditPage;
