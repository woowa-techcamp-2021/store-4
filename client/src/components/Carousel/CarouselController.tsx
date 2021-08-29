import React from 'react';
import styled from 'styled-components';
import { CarouselImage } from './Carousel';

const Container = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
`;

type DotProps = {
  isSelected: boolean;
};

const Dot = styled.div<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 8px;
  margin: 0px 4px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.color.white1 : props.theme.color.grey4};
  bottom: 0;
  &:hover {
    cursor: pointer;
  }
`;

type Props = {
  images: CarouselImage[];
  currentIndex: number;
  onDotClick: (index: number) => React.MouseEventHandler;
};

const CarouselController = (props: Props): JSX.Element => {
  const { images, onDotClick, currentIndex } = props;

  const CarouselDots = images.map((image) => (
    <Dot
      data-testid="carousel-dot"
      key={image.index}
      isSelected={currentIndex === image.index}
      onClick={onDotClick(image.index)}
    />
  ));

  return <Container>{CarouselDots}</Container>;
};

export default CarouselController;
