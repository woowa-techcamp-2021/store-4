import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReviewWithProduct } from '../../../models/review';
import getPaginatedArray from '../../../utils/getPaginatedArray';
import ReviewList from './AccountReviewList/AccountReviewList';
import ReviewPagination from '../../Review/ReviewPagination/ReviewPagination';

const REVIEW_TITLE_TEXT = '내 상품후기';
const REVIEW_EMPTY_TEXT = '작성한 후기가 없습니다';
const REVIEW_PER_PAGE = 10;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ReviewTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 600;
`;

const ReviewEmpty = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey4};
`;

const ReviewButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
`;

const Button = styled.button`
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.black};
  padding: 8px 12px;
  cursor: pointer;
`;
const SelectAllButton = styled(Button)`
  color: ${(props) => props.theme.color.black};
  margin-right: 12px;
`;

const DeleteButton = styled(Button)`
  color: ${(props) => props.theme.color.white1};
  background-color: ${(props) => props.theme.color.black};
`;

type Props = {
  reviews: ReviewWithProduct[];
  onDeleteButtonClick: (reviews: ReviewWithProduct[]) => void;
};
const Review = (props: Props): JSX.Element => {
  const { reviews, onDeleteButtonClick } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / REVIEW_PER_PAGE);
  const showPagination = totalPages > 1;
  const displayedReviews = getPaginatedArray(reviews, REVIEW_PER_PAGE, currentPage);

  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);
  const isAllSelected = isSelectedList.length && isSelectedList.every(Boolean);

  const getCheckboxClickHandler = (index: number) => () =>
    setIsSelectedList((prevList) => [
      ...prevList.slice(0, index),
      !prevList[index],
      ...prevList.slice(index + 1),
    ]);

  const handlePageNumClick = useCallback((pageNum: number) => setCurrentPage(pageNum), []);
  const handlePageNavButtonClick = useCallback(
    (type: 'prev' | 'next') =>
      setCurrentPage((prevCurrentPage) =>
        type === 'prev' ? prevCurrentPage - 1 : prevCurrentPage + 1
      ),
    []
  );
  const handleCheckAllButtonClick = useCallback(
    () => setIsSelectedList(new Array(displayedReviews.length).fill(!isAllSelected)),
    [displayedReviews.length, isAllSelected]
  );
  const handleDeleteButtonClick = useCallback(() => {
    const deleteReviews = displayedReviews.filter((review, index) => isSelectedList[index]);

    onDeleteButtonClick(deleteReviews);
  }, [displayedReviews, isSelectedList, onDeleteButtonClick]);

  useEffect(() => {
    setIsSelectedList(new Array(displayedReviews.length).fill(false));
  }, [displayedReviews.length]);

  return (
    <Container>
      <ReviewTitle>{REVIEW_TITLE_TEXT}</ReviewTitle>
      {reviews.length === 0 ? (
        <ReviewEmpty data-testid="no-review">{REVIEW_EMPTY_TEXT}</ReviewEmpty>
      ) : (
        <>
          <ReviewButtonGroup>
            <SelectAllButton onClick={handleCheckAllButtonClick}>
              {isAllSelected ? '선택 해제' : '전체 선택'}
            </SelectAllButton>
            <DeleteButton onClick={handleDeleteButtonClick}>삭제</DeleteButton>
          </ReviewButtonGroup>
          <ReviewList
            reviews={displayedReviews}
            getCheckboxClickHandler={getCheckboxClickHandler}
            isSelectedList={isSelectedList}
          />
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
