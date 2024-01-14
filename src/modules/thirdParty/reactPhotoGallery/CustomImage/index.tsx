import React, { useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';
import AppInfoView from '@crema/components/AppInfoView';
import { StyledReactGalleryPhoto } from '../index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';

type Props = {
  index: number;
  left: number;
  top: number;
  key: any;
  photo: {
    width: number;
    height: number;
    title: string;
    src: string;
  };
};

const CustomImage = () => {
  const [{ apiData: photos, loading }] = useGetDataApi('/gallery', []);

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }: Props) => (
      <SelectedImage
        key={key}
        margin={'2px'}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [],
  );

  if (loading) {
    return <AppLoader />;
  }
  return (
    <StyledReactGalleryPhoto>
      <Gallery photos={photos} renderImage={imageRenderer as any} />
      <AppInfoView />
    </StyledReactGalleryPhoto>
  );
};
export default CustomImage;
