import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div``;

const ImageSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

type ImageSelectorProps = { isSelected: boolean };

const ImageSelector = styled.img<ImageSelectorProps>`
  width: 80px;
  height: 80px;
  object-fit: contain;

  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid ${props.theme.color.mint2};
    `}
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
    </Container>
  );
};

export default ProductDetailImages;
