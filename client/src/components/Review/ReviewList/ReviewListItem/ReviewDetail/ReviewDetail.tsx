import React from 'react';
import styled from 'styled-components';
import ReviewModel from '../../../../../models/review';
import ReviewDetailImage from './ReviewDetailImage/ReviewDetailImage';

type Props = {
  review: ReviewModel;
};

const IMAGE_GRID_COLUMNS = 5;

const Container = styled.div`
  width: 80%;
  margin: 2% auto 0;
  padding: 1.5% 2%;
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
  const ReviewImages = review.reviewImages.map((reviewImage) => (
    <ReviewDetailImage key={reviewImage.id} imageUrl={reviewImage.url} />
  ));
  const shouldRenderReviewImageList = review.reviewImages.length > 0;

  return (
    <Container>
      {shouldRenderReviewImageList && <ReviewImageList>{ReviewImages}</ReviewImageList>}
      <ReviewContent>{review.content}</ReviewContent>
    </Container>
  );
};

export default ReviewDetail;
