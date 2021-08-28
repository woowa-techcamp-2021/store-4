import React from 'react';
import Carousel from '../components/Carousel/Carousel';
import Beer from '../components/Carousel/mock/beer.gif';
import Bottle from '../components/Carousel/mock/bottle.gif';
import Pencil from '../components/Carousel/mock/pencil.gif';

const mockImages = [
  { index: 0, src: Pencil, productId: 196 },
  { index: 1, src: Bottle, productId: 162 },
  { index: 2, src: Beer, productId: 387 },
];

const CAROUSEL_INTERVAL_TIME = 4000;

const CarouselContainer = (): JSX.Element => {
  return <Carousel images={mockImages} interval={CAROUSEL_INTERVAL_TIME} />;
};

export default CarouselContainer;
