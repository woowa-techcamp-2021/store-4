import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Mock } from '../../containers/ReviewContainer';
import getPaginatedArray from '../../utils/getPaginatedArray';
import ReviewList from './ReviewList/ReviewList';
import ReviewPagination from './ReviewPagination/ReviewPagination';

const REVIEW_TITLE_TEXT = '상품후기';
const REVIEW_EMPTY_TEXT = '첫 번째 후기를 남겨보세요!';
const REVIEW_PER_PAGE = 2;

const Container = styled.section`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
`;

const ReviewTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 500;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

type ReviewTitleBadgeProps = {
  hasNoReview: boolean;
};
const ReviewTitleBadge = styled.span<ReviewTitleBadgeProps>`
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => (props.hasNoReview ? props.theme.color.mint1 : props.theme.color.mint2)};
  padding: 0 10px;
`;

const ReviewEmpty = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey4};
`;

type Props = {
  reviews: Mock[];
};
const Review = (props: Props): JSX.Element => {
  const { reviews } = props;
  const hasNoReview = reviews.length === 0;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / REVIEW_PER_PAGE);
  const showPagination = totalPages > 1;
  const displayedReviews = getPaginatedArray(reviews, REVIEW_PER_PAGE, currentPage);

  const handlePageNumClick = useCallback((pageNum) => setCurrentPage(pageNum), []);
  const handlePageNavButtonClick = useCallback(
    (isPrev) => setCurrentPage((prevPage) => (isPrev ? prevPage - 1 : prevPage + 1)),
    []
  );

  return (
    <Container>
      <ReviewTitle>
        {REVIEW_TITLE_TEXT}
        <ReviewTitleBadge hasNoReview={hasNoReview}>{reviews.length}</ReviewTitleBadge>
      </ReviewTitle>
      {hasNoReview ? (
        <ReviewEmpty>{REVIEW_EMPTY_TEXT}</ReviewEmpty>
      ) : (
        <>
          <ReviewList reviews={displayedReviews} />
          {showPagination && (
            <ReviewPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageNumClick={handlePageNumClick}
              onPageNavButtonClick={handlePageNavButtonClick}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Review;
