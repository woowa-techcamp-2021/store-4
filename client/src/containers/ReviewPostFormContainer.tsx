import React, { MouseEventHandler } from 'react';
import ReviewPostForm from '../components/Review/ReviewPost/ReviewPostModal/ReviewPostForm/ReviewPostForm';

type Props = {
  onCancelButtonClick: MouseEventHandler;
};
const ReviewPostFormContainer = (props: Props): JSX.Element => {
  const { onCancelButtonClick } = props;

  return <ReviewPostForm onCancelButtonClick={onCancelButtonClick} />;
};

export default ReviewPostFormContainer;
