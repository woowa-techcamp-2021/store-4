import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReviewWithProduct } from '../../../../../models/review';
import formatDate from '../../../../../utils/formatDate';
import ReviewDetail from '../../../../Review/ReviewList/ReviewListItem/ReviewDetail/ReviewDetail';
import ReviewSummary from '../../../../Review/ReviewList/ReviewListItem/ReviewSummary/ReviewSummary';
import Star from '../../../../Review/ReviewList/ReviewListItem/Star/Star';

const MAX_TITLE_WIDTH = 550;
const MAX_REVIEW_POINT = 5;

const Container = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey2};

  :first-child {
    padding-top: 0;
  }
`;

const ReviewDisplayContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewStarsContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  margin-right: 30px;
  display: flex;
`;

const ReviewDate = styled.div`
  flex-shrink: 0;
  width: 100px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: right;
`;

const ReviewCheckbox = styled.input`
  margin-left: 20px;
`;

type Props = {
  review: ReviewWithProduct;
};

const ReviewListItem = (props: Props): JSX.Element => {
  const { review } = props;
  const [reviewDetailOpen, setReviewDetailOpen] = useState(false);
  const titleText = `[${review.productName}]  ${review.content}`;
  const titleRef = useRef<HTMLSpanElement>(null);
  const [hasMoreContent, setHasMoreContent] = useState(review.reviewImages.length > 0);
  const Stars = Array.from({ length: MAX_REVIEW_POINT }).map((_, i) => (
    <Star key={i} isFilled={i < review.point} />
  ));

  useLayoutEffect(() => {
    const isTitleOverflowed = titleRef.current?.clientWidth === MAX_TITLE_WIDTH;
    setHasMoreContent((hasMoreContent) => hasMoreContent || isTitleOverflowed);
  }, []);

  const handleReviewSummaryClick = useCallback(
    () => setReviewDetailOpen((reviewDetailOpen) => !reviewDetailOpen),
    [setReviewDetailOpen]
  );

  return (
    <Container data-testid="review-list-item">
      <ReviewDisplayContainer>
        <ReviewStarsContainer>{Stars}</ReviewStarsContainer>
        <ReviewSummary
          content={titleText}
          maxTitleWidth={MAX_TITLE_WIDTH}
          onClick={handleReviewSummaryClick}
          isClickable={hasMoreContent}
          ref={titleRef}
          reviewDetailOpen={reviewDetailOpen}
        />
        <ReviewDate>{formatDate(review.updatedAt)}</ReviewDate>
        <ReviewCheckbox type="checkbox" />
      </ReviewDisplayContainer>
      {reviewDetailOpen && hasMoreContent && <ReviewDetail review={review} />}
    </Container>
  );
};

export default ReviewListItem;
