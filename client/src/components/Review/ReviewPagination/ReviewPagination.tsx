import React, { useCallback } from 'react';
import styled from 'styled-components';

const PAGINATION_WIDTH = 450;

const Container = styled.nav`
  width: ${PAGINATION_WIDTH}px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled.button``;

const NavList = styled.ul`
  display: flex;
`;

const NavListItem = styled.li`
  margin: 0 6px;
`;

type NumberButtonProps = {
  isCurrent: boolean;
};
const NumberButton = styled.button<NumberButtonProps>`
  color: ${(props) => (props.isCurrent ? props.theme.color.mint2 : props.theme.color.grey5)};
`;

type Props = {
  currentPage: number;
  totalPages: number;
  onPageNumClick: (pageNum: number) => void;
  onPageNavButtonClick: (isPrev: boolean) => void;
};
const ReviewPagination = (props: Props): JSX.Element => {
  const { currentPage, totalPages, onPageNumClick, onPageNavButtonClick } = props;
  const onPrevButtonClick = useCallback(() => onPageNavButtonClick(true), [onPageNavButtonClick]);
  const onNextButtonClick = useCallback(() => onPageNavButtonClick(false), [onPageNavButtonClick]);

  const navListItems = Array.from({ length: totalPages }).map((_, i) => {
    const pageNum = i + 1;

    return (
      <NavListItem key={i}>
        <NumberButton onClick={() => onPageNumClick(pageNum)} isCurrent={currentPage === pageNum}>
          {pageNum}
        </NumberButton>
      </NavListItem>
    );
  });

  return (
    <Container>
      <NavButton onClick={onPrevButtonClick} disabled={currentPage === 1}>
        이전
      </NavButton>
      <NavList>{navListItems}</NavList>
      <NavButton onClick={onNextButtonClick} disabled={currentPage === totalPages}>
        다음
      </NavButton>
    </Container>
  );
};

export default ReviewPagination;
