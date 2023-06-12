import React from 'react';
import AppCard from '@crema/components/AppCard';
import ProductCell from './ProductCell';
import { useIntl } from 'react-intl';
import { StyledPopularScrollbar, StyledPowerGrid } from './index.styled';
import type { PopularProductDataType } from '@crema/models/dashboards/Ecommerce';

type PopularProductsProps = {
  popularProducts: PopularProductDataType[];
};

const PopularProducts: React.FC<PopularProductsProps> = ({
  popularProducts,
}) => {
  const { messages } = useIntl();
  return (
    <AppCard
      className="no-card-space-ltr-rtl"
      title={messages['eCommerce.popularProducts'] as string}
    >
      <StyledPopularScrollbar>
        <StyledPowerGrid
          dataSource={popularProducts}
          renderItem={(data: any, index) => (
            <ProductCell key={'product-' + index} data={data} />
          )}
        />
      </StyledPopularScrollbar>
    </AppCard>
  );
};

export default PopularProducts;
