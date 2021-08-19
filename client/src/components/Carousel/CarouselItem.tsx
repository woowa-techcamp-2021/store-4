import React from 'react';
import styled from 'styled-components';
import { hide, show } from '../../styles/animation';

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

const CarouselImg = styled.img<CarouselImgProps>`
  ${(props) => (props.isShow ? show : hide)};
  animation-fill-mode: forwards;
`;

type CarouselItemProps = {
  index: number;
  currentIndex: number;
  src: string;
};

const CarouselItem = (props: CarouselItemProps): JSX.Element => {
  const { src, index, currentIndex } = props;
  return (
    <Container>
      <CarouselImg isShow={index === currentIndex} src={src} />
    </Container>
  );
};

export default CarouselItem;
