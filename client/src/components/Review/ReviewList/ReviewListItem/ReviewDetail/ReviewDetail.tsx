import React from 'react';
import styled from 'styled-components';
import { Mock } from '../../../../../containers/ReviewContainer';
import ReviewDetailImage from './ReviewDetailImage/ReviewDetailImage';

type Props = {
  review: Mock;
};

const REVIEW_DETAIL_WIDTH = 950;
const IMAGE_GRID_COLUMNS = 5;

const Container = styled.div`
  width: ${REVIEW_DETAIL_WIDTH}px;
  margin: 20px auto 0;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.color.grey1};
  border-radius: 5px;
`;

const ReviewImageList = styled.ul`
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(${IMAGE_GRID_COLUMNS}, 1fr);
  grid-gap: 10px;
`;

const ReviewContent = styled.p`
  line-height: 1.6;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const ReviewDetail = (props: Props): JSX.Element => {
  const { review } = props;
  const reviewImages = review.reviewImages.map((imageUrl, i) => (
    <ReviewDetailImage
      key={i}
      imageUrl={imageUrl}
      height={REVIEW_DETAIL_WIDTH / IMAGE_GRID_COLUMNS}
    />
  ));
  const shouldRenderReviewImageList = reviewImages.length > 0;

  return (
    <Container>
      {shouldRenderReviewImageList && <ReviewImageList>{reviewImages}</ReviewImageList>}
      <ReviewContent>{review.content}</ReviewContent>
    </Container>
  );
};

export default ReviewDetail;
