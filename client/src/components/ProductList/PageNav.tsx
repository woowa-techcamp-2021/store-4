import React from 'react';
import styled from 'styled-components';
import { range } from '../../utils/range';

const Container = styled.ul`
  margin-top: 16px;
  list-style: none;

  display: flex;
  justify-content: center;

  padding: 0;
`;

type PageNavItemProps = {
  isSelected: boolean;
};
const PageNavItem = styled.li<PageNavItemProps>`
  padding: 5px;
  color: ${(props) => (props.isSelected ? props.theme.color.black : props.theme.color.grey4)};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.black};
  }
`;

type Props = {
  currentPage: number;
  totalPageCount: number;
  onClickPageNum: (pageNum: number) => () => void;
};

const PageNav = (props: Props): JSX.Element => {
  const { currentPage, totalPageCount, onClickPageNum } = props;

  const PageNavItems = range(totalPageCount).map((index) => {
    const pageNum = index + 1;
    return (
      <PageNavItem
        key={pageNum}
        isSelected={currentPage === pageNum}
        onClick={onClickPageNum(pageNum)}
        data-testid={`pageNav${pageNum}`}
      >
        {pageNum}
      </PageNavItem>
    );
  });

  return <Container>{PageNavItems}</Container>;
};

export default PageNav;
