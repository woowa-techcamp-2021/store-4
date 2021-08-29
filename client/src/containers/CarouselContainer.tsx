import React from 'react';
import Carousel, { CarouselImage } from '../components/Carousel/Carousel';
import BEER_MP4 from '../components/Carousel/mock/beer.mp4';
import BOTTLE_MP4 from '../components/Carousel/mock/bottle.mp4';
import PENCIL_MP4 from '../components/Carousel/mock/pencil.mp4';
import BEER_WEBM from '../components/Carousel/mock/beer.webm';
import BOTTLE_WEBM from '../components/Carousel/mock/bottle.webm';
import PENCIL_WEBM from '../components/Carousel/mock/pencil.webm';

const mockImages: CarouselImage[] = [
  {
    index: 0,
    src: {
      mp4: PENCIL_MP4,
      webm: PENCIL_WEBM,
    },
  },
  {
    index: 1,
    src: {
      mp4: BOTTLE_MP4,
      webm: BOTTLE_WEBM,
    },
  },
  {
    index: 2,
    src: {
      mp4: BEER_MP4,
      webm: BEER_WEBM,
    },
  },
];

const CAROUSEL_INTERVAL_TIME = 4000;

const CarouselContainer = (): JSX.Element => {
  return <Carousel images={mockImages} interval={CAROUSEL_INTERVAL_TIME} />;
};

export default CarouselContainer;
