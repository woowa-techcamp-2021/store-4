import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
`;

const ReviewDetailImg = styled.img`
  width: 165px;
  height: 210px;
  object-fit: cover;
  border-radius: 5px;
`;

type Props = {
  imageUrl: string;
};

const ReviewDetailImage = (props: Props): JSX.Element => {
  const { imageUrl } = props;

  return (
    <Container>
      <ReviewDetailImg src={imageUrl} alt="리뷰 이미지" />
    </Container>
  );
};

export default ReviewDetailImage;
