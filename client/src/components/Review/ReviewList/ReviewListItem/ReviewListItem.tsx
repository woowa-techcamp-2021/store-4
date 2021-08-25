import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReviewModel from '../../../../models/review';
import formatDate from '../../../../utils/formatDate';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import Star from './Star/Star';

const MAX_TITLE_WIDTH = 700;
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
  margin-right: 40px;
  display: flex;
`;

const ReviewDate = styled.div`
  flex-shrink: 0;
  width: 100px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: right;
`;

type Props = {
  review: ReviewModel;
};

const ReviewListItem = (props: Props): JSX.Element => {
  const { review } = props;
  const [reviewDetailOpen, setReviewDetailOpen] = useState(false);
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
          content={review.content}
          maxTitleWidth={MAX_TITLE_WIDTH}
          onClick={handleReviewSummaryClick}
          isClickable={hasMoreContent}
          ref={titleRef}
          reviewDetailOpen={reviewDetailOpen}
        />
        <ReviewDate>{formatDate(review.updatedAt)}</ReviewDate>
      </ReviewDisplayContainer>
      {reviewDetailOpen && hasMoreContent && <ReviewDetail review={review} />}
    </Container>
  );
};

export default ReviewListItem;
