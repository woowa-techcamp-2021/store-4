import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CarouselController from './CarouselController';
import CarouselItem from './CarouselItem';
import generateUseInfiniteSlide from './hooks/useInfiniteSlide';

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
  interval: number;
};

const useInfiniteSlide = generateUseInfiniteSlide();

const Carousel = (props: Props): JSX.Element => {
  const { images, interval } = props;
  const [currentIndex, setIndex] = useState(0);

  const handleInfiniteSlide = useCallback(() => {
    if (images.length === currentIndex + 1) {
      setIndex(0);
      return;
    }
    setIndex(currentIndex + 1);
  }, [currentIndex, setIndex, images.length]);

  const handleDotClick = useCallback(
    (index: number) => () => {
      setIndex(index);
    },
    []
  );

  useInfiniteSlide(currentIndex, handleInfiniteSlide, interval);

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
