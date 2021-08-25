import React from 'react';
import styled from 'styled-components';
import { ReviewWithProduct } from '../../../../models/review';
import ReviewListItem from './AccountReviewListItem/AccountReviewListItem';

const Container = styled.ul`
  margin: 16px 0;
`;

type Props = {
  reviews: ReviewWithProduct[];
};

const ReviewList = (props: Props): JSX.Element => {
  const { reviews } = props;

  const ReviewListItems = reviews.map((review) => (
    <ReviewListItem key={review.id} review={review} />
  ));

  return <Container>{ReviewListItems}</Container>;
};

export default ReviewList;
