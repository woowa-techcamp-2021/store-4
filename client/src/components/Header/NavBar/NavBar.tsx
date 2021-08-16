import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';

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

  .seperator {
    display: inline-block;
    width: 1px;
    height: 7px;
    background-color: #ddd;
  }

  :last-child .seperator {
    display: none;
  }

  .badge {
    font-size: 10px;
    line-height: 11px;
    color: #29c1bc;
    padding: 0 2px;
  }
`;

const NavBar = (): JSX.Element => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const NavListItems = NAV_ITEMS.map((item, index) => (
    <NavListItem key={index}>
      <Link to={item.path}>
        {item.text} {item.path === 'cart' ? <span className="badge">{cartItemCount}</span> : null}
      </Link>
      <span className="seperator"></span>
    </NavListItem>
  ));

  return (
    <Wrapper>
      <Nav>
        <NavList>{NavListItems}</NavList>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;
