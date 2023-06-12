import React, { useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import {
  StyledProductFav,
  StyledProductImageSlide,
  StyledProductImageSlideAction,
  StyledProductImageSlideRoot,
} from './index.styled';
import { useAppDispatch } from '../../../../toolkit/hooks';
import { addItemToCart } from '../../../../toolkit/actions';
import type {
  ProductCartItemsType,
  ProductDataType,
} from '@crema/models/ecommerce/EcommerceApp';

type Props = {
  product: ProductDataType;
};
const ProductImageSlide = ({ product }: Props) => {
  const [value, setValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const slides = product.image.map((data, index) => (
    <img key={index} src={data.src} alt="" />
  ));
  const onChange = (value: number) => {
    setValue(value);
  };

  const onAddToCard = () => {
    const updatedProduct: ProductCartItemsType = {
      ...product,
      image: product.image[value].src as string,
      count: 1,
    };

    dispatch(addItemToCart(updatedProduct));
  };

  const onButNowToCard = () => {
    onAddToCard();
    router.push('/ecommerce/cart');
  };

  const OnFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <StyledProductImageSlide>
      <StyledProductImageSlideRoot>
        <Dots
          rtl={false}
          thumbnails={slides}
          value={value}
          onChange={onChange}
          number={slides.length}
        />
        <Carousel
          // position='left'
          value={value}
          slides={slides}
          onChange={onChange}
        />

        <StyledProductFav onClick={OnFavorite}>
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </StyledProductFav>
      </StyledProductImageSlideRoot>
      <StyledProductImageSlideAction>
        <Button
          type="primary"
          onClick={onAddToCard}
          style={{ marginRight: 20, width: 140 }}
        >
          Add to cart
        </Button>
        <Button
          style={{ width: 140 }}
          className="btn-secondary"
          onClick={onButNowToCard}
        >
          Buy now
        </Button>
      </StyledProductImageSlideAction>
    </StyledProductImageSlide>
  );
};

export default ProductImageSlide;
