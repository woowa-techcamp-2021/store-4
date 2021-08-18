import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import MagnifierImage from './MagnifierImage';

const Container = styled.div`
  display: flex;
`;

const ImageSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 40px;
`;

type ImageSelectorProps = { isSelected: boolean };

const ImageSelector = styled.img<ImageSelectorProps>`
  width: 80px;
  height: 80px;
  object-fit: contain;
  cursor: pointer;

  border: 2px solid ${(props) => (props.isSelected ? props.theme.color.mint2 : 'transparent')};
`;

type Props = {
  images: string[];
};

const ProductDetailImages = (props: Props): JSX.Element => {
  const { images } = props;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onImageSelectorMouseover = useCallback(
    (index: number) => () => {
      setSelectedImageIndex(index);
    },
    []
  );

  const ImageSelectors = images.map((image, index) => (
    <ImageSelector
      onMouseOver={onImageSelectorMouseover(index)}
      isSelected={selectedImageIndex === index}
      key={index}
      src={image}
    />
  ));

  return (
    <Container>
      <ImageSelectorWrapper>{ImageSelectors}</ImageSelectorWrapper>
      <MagnifierImage image={images[selectedImageIndex]} />
    </Container>
  );
};

export default ProductDetailImages;
