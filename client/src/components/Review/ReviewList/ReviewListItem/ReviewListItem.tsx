import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Mock } from '../../../../containers/ReviewContainer';
import formatDate from '../../../../utils/formatDate';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import { generateStars } from './Stars/Stars';

const MAX_TITLE_WIDTH = 700;

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
  review: Mock;
};

const ReviewListItem = (props: Props): JSX.Element => {
  const { review } = props;
  const [reviewDetailOpen, setReviewDetailOpen] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [hasMoreContent, setHasMoreContent] = useState(review.reviewImages.length > 0);
  const stars = generateStars(review.point);

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
        <ReviewStarsContainer>{stars}</ReviewStarsContainer>
        <ReviewSummary
          content={review.content}
          maxTitleWidth={MAX_TITLE_WIDTH}
          onClick={handleReviewSummaryClick}
          isClickable={hasMoreContent}
          reviewTitleRef={titleRef}
          reviewDetailOpen={reviewDetailOpen}
        />
        <ReviewDate>{formatDate(review.updatedAt)}</ReviewDate>
      </ReviewDisplayContainer>
      {reviewDetailOpen && hasMoreContent && <ReviewDetail review={review} />}
    </Container>
  );
};

export default ReviewListItem;
