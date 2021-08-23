import React from 'react';
import styled from 'styled-components';
import { Mock } from '../../../containers/ReviewContainer';
import ReviewListItem from './ReviewListItem/ReviewListItem';

const Container = styled.ul`
  margin: 16px 0;
`;

type Props = {
  reviews: Mock[];
};

const ReviewList = (props: Props): JSX.Element => {
  const { reviews } = props;

  const ReviewListItems = reviews.map((review) => (
    <ReviewListItem key={review.id} review={review} />
  ));

  return <Container>{ReviewListItems}</Container>;
};

export default ReviewList;
