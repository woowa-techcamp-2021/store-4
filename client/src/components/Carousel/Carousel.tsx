import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from '../../lib/router';
import CarouselController from './CarouselController';
import CarouselItem from './CarouselItem';
import useInfiniteSlide from './hooks/useInfiniteSlide';

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
  productId: number;
  src: CarouselSource;
};

type Props = {
  images: CarouselImage[];
  interval: number;
};

const Carousel = (props: Props): JSX.Element => {
  const { images, interval } = props;
  const [currentIndex, setIndex] = useState(0);
  const [runTimer] = useInfiniteSlide();

  const handleInfiniteSlide = useCallback(() => {
    setIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length]);

  const handleRestartAnimationTimer = useCallback(() => {
    runTimer(() => {
      handleInfiniteSlide();
    }, interval);
  }, [handleInfiniteSlide, interval, runTimer]);

  const handleDotClick = useCallback(
    (index: number) => () => {
      setIndex(index);
      handleRestartAnimationTimer();
    },
    [handleRestartAnimationTimer]
  );

  useEffect(() => {
    handleRestartAnimationTimer();
  }, [handleRestartAnimationTimer]);

  const CarouselItems = images.map((data) => (
    <CarouselItem key={data.index} currentIndex={currentIndex} {...data} />
  ));

  return (
    <Container>
      <Link to={`/product/${images[currentIndex].productId}`}>{CarouselItems}</Link>
      <CarouselController images={images} currentIndex={currentIndex} onDotClick={handleDotClick} />
    </Container>
  );
};

export default Carousel;
