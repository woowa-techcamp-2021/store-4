import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import CarouselController from './CarouselController';
import CarouselItem from './CarouselItem';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
`;

export type CarouselSource = {
  mp4: string;
  webm: string;
};

export type CarouselImage = {
  index: number;
  src: CarouselSource;
};

type Props = {
  images: CarouselImage[];
  interval: number;
};

const Carousel = (props: Props): JSX.Element => {
  const { images, interval } = props;
  const [currentIndex, setIndex] = useState(0);

  const handleInfiniteSlide = useCallback(() => {
    setIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length]);

  const handleDotClick = useCallback(
    (index: number) => () => {
      setIndex(index);
    },
    []
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      handleInfiniteSlide();
    }, interval);

    return () => clearInterval(timerId);
  }, [handleInfiniteSlide, interval]);

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
