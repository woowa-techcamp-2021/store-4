import React, { useCallback } from 'react';
import styled from 'styled-components';

const PAGINATION_WIDTH = 450;
const PREV_BUTTON_TEXT = '<';
const NEXT_BUTTON_TEXT = '>';
const MAX_NUMBER_BUTTONS = 9;

const Container = styled.nav`
  width: ${PAGINATION_WIDTH}px;
  margin: 0 auto;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey5};
  cursor: pointer;

  :disabled {
    color: ${(props) => props.theme.color.grey2};
    cursor: not-allowed;
  }
`;

const NavList = styled.ul`
  display: flex;
`;

const NavListItem = styled.li`
  width: 36px;
  text-align: center;
`;

type NumberButtonProps = {
  isCurrent: boolean;
};
const NumberButton = styled.button<NumberButtonProps>`
  border: none;
  background: none;
  color: ${(props) => (props.isCurrent ? props.theme.color.mint2 : props.theme.color.grey5)};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.color.mint3};
  }
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

  const [start, end] = getNumberButtonRange(currentPage, totalPages, MAX_NUMBER_BUTTONS);

  const renderNavListItems = navListItems.slice(start, end);

  return (
    <Container>
      <NavButton onClick={onPrevButtonClick} disabled={currentPage === 1}>
        {PREV_BUTTON_TEXT}
      </NavButton>
      <NavList>{renderNavListItems}</NavList>
      <NavButton onClick={onNextButtonClick} disabled={currentPage === totalPages}>
        {NEXT_BUTTON_TEXT}
      </NavButton>
    </Container>
  );
};

export default ReviewPagination;

const getNumberButtonRange = (current: number, total: number, max: number): [number, number] => {
  if (total <= max) return [0, total];

  if (current <= max / 2) return [0, max];
  else if (current >= total - max / 2) return [total - max, total];
  else return [Math.floor(current - max / 2), Math.floor(current + max / 2)];
};
