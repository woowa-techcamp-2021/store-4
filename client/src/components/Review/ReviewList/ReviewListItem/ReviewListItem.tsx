import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Mock } from '../../../../containers/ReviewContainer';
import formatDate from '../../../../utils/formatDate';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import { generateStars } from './Star';
import CHEVRON_DOWN from './chevronDown.png';

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

const ReviewStars = styled.div`
  flex-shrink: 0;
  width: 80px;
  margin-right: 40px;
  display: flex;
`;

type ClickContainerProps = {
  isClickable: boolean;
};
const ClickContainer = styled.div<ClickContainerProps>`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
`;

const ReviewTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
  max-width: ${MAX_TITLE_WIDTH}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type SeeMoreProps = {
  isClose: boolean;
};
const SeeMore = styled.button<SeeMoreProps>`
  width: 10px;
  height: 10px;
  margin-right: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-image: url(${CHEVRON_DOWN});
  background-size: contain;
  transform: rotate(${(props) => (props.isClose ? '-180' : '0')}deg);
  transition: transform 0.3s ease-in-out;
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasMoreContent, setHasMoreContent] = useState(review.reviewImages.length > 0);
  const stars = generateStars(review.point);

  useLayoutEffect(() => {
    const isTitleOverflowed = titleRef.current?.clientWidth === MAX_TITLE_WIDTH;
    setHasMoreContent((prevState) => prevState || isTitleOverflowed);
  }, []);

  const handleReviewItemClick = useCallback(
    () => setReviewDetailOpen((prev) => !prev),
    [setReviewDetailOpen]
  );

  return (
    <Container>
      <ReviewDisplayContainer>
        <ReviewStars>{stars}</ReviewStars>
        <ClickContainer onClick={handleReviewItemClick} isClickable={hasMoreContent}>
          <ReviewTitle ref={titleRef}>{review.content}</ReviewTitle>
          {hasMoreContent && <SeeMore isClose={reviewDetailOpen} />}
        </ClickContainer>
        <ReviewDate>{formatDate(review.updatedAt)}</ReviewDate>
      </ReviewDisplayContainer>
      {reviewDetailOpen && hasMoreContent && <ReviewDetail review={review} />}
    </Container>
  );
};

export default ReviewListItem;
