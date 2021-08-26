import React from 'react';
import styled from 'styled-components';
import { ReviewWithProduct } from '../../../../models/review';
import ReviewListItem from './AccountReviewListItem/AccountReviewListItem';

const Container = styled.ul`
  margin: 16px 0;
`;

type Props = {
  reviews: ReviewWithProduct[];
  isSelectedList: boolean[];
  getCheckboxClickHandler: (index: number) => () => void;
};

const ReviewList = (props: Props): JSX.Element => {
  const { reviews, isSelectedList, getCheckboxClickHandler } = props;

  const ReviewListItems = reviews.map((review, i) => (
    <ReviewListItem
      key={review.id}
      review={review}
      isSelected={isSelectedList[i]}
      onCheckboxClick={getCheckboxClickHandler(i)}
    />
  ));

  return <Container>{ReviewListItems}</Container>;
};

export default ReviewList;
