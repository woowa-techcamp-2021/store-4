import React from 'react';
import styled from 'styled-components';
import { hide, show } from '../../styles/animation';
import { CarouselSource } from './Carousel';

const Container = styled.div`
  top: 0;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type CarouselImgProps = {
  isShow: boolean;
};

const CarouselVideo = styled.video<CarouselImgProps>`
  ${(props) => (props.isShow ? show : hide)};
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
        data-testid={`img${index}`}
        isShow={index === currentIndex}
      >
        <VideoSource src={src.webm} />
        <VideoSource src={src.mp4} />
      </CarouselVideo>
    </Container>
  );
};

export default CarouselItem;
