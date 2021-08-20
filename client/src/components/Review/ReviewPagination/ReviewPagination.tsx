import React from 'react';
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

const NumberButton = styled.button``;

const ReviewPagination = (): JSX.Element => {
  const totalPages = 10;
  const navListItems = Array.from({ length: totalPages }).map((_, i) => (
    <NavListItem key={i}>
      <NumberButton>{i + 1}</NumberButton>
    </NavListItem>
  ));

  return (
    <Container>
      <NavButton>이전</NavButton>
      <NavList>{navListItems}</NavList>
      <NavButton>다음</NavButton>
    </Container>
  );
};

export default ReviewPagination;
