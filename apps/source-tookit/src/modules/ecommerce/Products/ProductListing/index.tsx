import React, { useEffect, useState } from 'react';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import {
  StyledProductListMainContent,
  StyledProductListView,
} from './index.styled';
import { VIEW_TYPE } from '../index';
import {
  ProductGrid,
  ProductHeader,
  ProductList,
} from '@crema/modules/ecommerce/Products';
import type { ProductDataFilterType } from '@crema/models/ecommerce/EcommerceApp';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetEcommerceData } from '../../../../toolkit/actions';

type Props = {
  filterData: ProductDataFilterType;
  viewType: string;
  setViewType: (viewType: string) => void;
  setFilterData: (filterData: ProductDataFilterType) => void;
};

const ProductListing = ({
  filterData,
  viewType,
  setViewType,
  setFilterData,
}: Props) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const ecommerceList = useAppSelector(
    ({ ecommerce }) => ecommerce.ecommerceList
  );
  const loading = useAppSelector(({ common }) => common.loading);

  const searchProduct = (title: string) => {
    setFilterData({ ...filterData, title });
  };

  const onPageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(onGetEcommerceData({ filterData, page }));
  }, [dispatch, filterData, page]);

  return (
    <StyledProductListView>
      <AppsHeader>
        <ProductHeader
          viewType={viewType}
          onChange={searchProduct}
          setViewType={setViewType}
          onPageChange={onPageChange}
        />
      </AppsHeader>

      <AppsContent>
        <StyledProductListMainContent>
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={ecommerceList.list} loading={loading} />
          ) : (
            <ProductList ecommerceList={ecommerceList.list} loading={loading} />
          )}
        </StyledProductListMainContent>
      </AppsContent>
    </StyledProductListView>
  );
};

export default ProductListing;
