import React from 'react';
import styled from 'styled-components';
import { fadein, fadeout } from '../../styles/animation';
import { CarouselSource } from './Carousel';

const Container = styled.div`
  top: 0;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .hide {
    animation: ${fadeout} 1s;
  }
`;

type CarouselImgProps = {
  isShow: boolean;
};

const CarouselVideo = styled.video<CarouselImgProps>`
  visibility: ${(props) => (props.isShow ? 'visible' : 'hidden')};
  animation: ${fadein} 1s;
  transition: all 1s;
`;

const VideoSource = styled.source``;

type CarouselItemProps = {
  index: number;
  currentIndex: number;
  src: CarouselSource;
};

const CarouselItem = (props: CarouselItemProps): JSX.Element => {
  const { src, index, currentIndex } = props;

  return (
    <Container>
      <CarouselVideo
        loop
        autoPlay
        muted
        isShow={index === currentIndex}
        data-testid="carousel-item"
        className={index !== currentIndex ? 'hide' : ''}
      >
        <VideoSource src={src.webm} />
        <VideoSource src={src.mp4} />
      </CarouselVideo>
    </Container>
  );
};

export default CarouselItem;
