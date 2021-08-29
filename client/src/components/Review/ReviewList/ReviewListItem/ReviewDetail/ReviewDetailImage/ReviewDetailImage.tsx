import React from 'react';
import styled from 'styled-components';
import LazyImage from '../../../../../LazyImage/LazyImage';

const Container = styled.li`
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
`;

type Props = {
  imageUrl: string;
};

const ReviewDetailImage = (props: Props): JSX.Element => {
  const { imageUrl } = props;

  return (
    <Container>
      <LazyImage
        width={165}
        height={210}
        objectFit={'cover'}
        src={imageUrl}
        borderRadius={5}
        alt="리뷰 이미지"
      />
    </Container>
  );
};

export default ReviewDetailImage;
