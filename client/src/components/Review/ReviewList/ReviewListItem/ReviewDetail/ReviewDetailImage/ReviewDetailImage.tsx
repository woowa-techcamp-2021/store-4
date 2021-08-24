import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  height: number;
};

const Container = styled.li<ContainerProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  border: 1px solid transparent;
  border-radius: 5px;
`;

const ReviewDetailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
`;

type Props = {
  imageUrl: string;
  height: number;
};

const ReviewDetailImage = (props: Props): JSX.Element => {
  const { imageUrl, height } = props;

  return (
    <Container height={height}>
      <ReviewDetailImg src={imageUrl} />
    </Container>
  );
};

export default ReviewDetailImage;
