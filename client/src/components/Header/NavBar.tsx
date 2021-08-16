import React from 'react';
import styled from 'styled-components';
import { Link } from '../../lib/router';

const NAV_ITEMS = [
  { text: '로그인', path: 'login' },
  { text: '회원가입', path: 'signup' },
  { text: '마이페이지', path: 'my' },
  { text: '장바구니', path: 'cart' },
];

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eaeaea;
`;

const Nav = styled.nav`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  font-size: 12px;
`;

const NavListItem = styled.li`
  color: #717171;

  a {
    text-decoration: none;
    color: inherit;
    padding: 0 10px;
  }

  span {
    display: inline-block;
    width: 1px;
    height: 7px;
    background-color: #ddd;
  }

  :last-child span {
    display: none;
  }
`;

const NavListItems = NAV_ITEMS.map((item, index) => (
  <NavListItem key={index}>
    <Link to={item.path}>{item.text}</Link>
    <span></span>
  </NavListItem>
));

const NavBar = (): JSX.Element => {
  return (
    <Wrapper>
      <Nav>
        <NavList>{NavListItems}</NavList>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;
