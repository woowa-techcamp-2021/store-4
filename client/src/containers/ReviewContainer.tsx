import React from 'react';
import Review from '../components/Review/Review';
import ReviewModel from '../models/review';

type Props = {
  reviews: ReviewModel[];
};

const ReviewConatiner = (props: Props): JSX.Element => {
  const { reviews } = props;
  return <Review reviews={reviews} />;
};

export default ReviewConatiner;
