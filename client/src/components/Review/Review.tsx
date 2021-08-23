import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Mock } from '../../containers/ReviewContainer';
import getPaginatedArray from '../../utils/getPaginatedArray';
import ReviewHeader from './ReviewHeader/ReviewHeader';
import ReviewList from './ReviewList/ReviewList';
import ReviewPagination from './ReviewPagination/ReviewPagination';

const REVIEW_TITLE_TEXT = '상품후기';
const REVIEW_EMPTY_TEXT = '첫 번째 후기를 남겨보세요!';
export const REVIEW_PER_PAGE = 5;

const Container = styled.section`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / REVIEW_PER_PAGE);
  const showPagination = totalPages > 1;
  const displayedReviews = getPaginatedArray(reviews, REVIEW_PER_PAGE, currentPage);

  const handlePageNumClick = useCallback((pageNum) => setCurrentPage(pageNum), []);
  const handlePageNavButtonClick = useCallback(
    (type) =>
      setCurrentPage((prevCurrentPage) =>
        type === 'prev' ? prevCurrentPage - 1 : prevCurrentPage + 1
      ),
    []
  );

  return (
    <Container>
      <ReviewHeader title={REVIEW_TITLE_TEXT} reviewCount={reviews.length} />
      {reviews.length === 0 ? (
        <ReviewEmpty data-testid="no-review">{REVIEW_EMPTY_TEXT}</ReviewEmpty>
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
