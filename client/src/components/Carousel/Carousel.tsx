import React, { useState, useCallback } from 'react';
import useInfiniteSlide from './hooks/useInfiniteSlide';
import styled from 'styled-components';
import CarouselController from './CarouselController';
import CarouselItem from './CarouselItem';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
`;

export type CarouselImage = {
  index: number;
  src: string;
};

type Props = {
  images: CarouselImage[];
};

const Carousel = (props: Props): JSX.Element => {
  const { images } = props;
  const [currentIndex, setIndex] = useState(0);
  const handleInfiniteSlide = useCallback(() => {
    if (images.length === currentIndex + 1) {
      setIndex(0);
      return;
    }
    setIndex(currentIndex + 1);
  }, [currentIndex, setIndex, images.length]);

  useInfiniteSlide(currentIndex, handleInfiniteSlide, 2000);

  const handleDotClick = useCallback(
    (index: number) => () => {
      setIndex(index);
    },
    []
  );

  const CarouselItems = images.map((data) => (
    <CarouselItem key={data.index} currentIndex={currentIndex} {...data} />
  ));

  return (
    <Container>
      {CarouselItems}
      <CarouselController images={images} currentIndex={currentIndex} onDotClick={handleDotClick} />
    </Container>
  );
};

export default Carousel;
