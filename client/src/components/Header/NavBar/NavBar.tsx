import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';

const CART_PATH = 'cart';
const NAV_ITEMS = [
  { text: '로그인', path: 'login' },
  { text: '회원가입', path: 'signup' },
  { text: '마이페이지', path: 'my' },
  { text: '장바구니', path: CART_PATH },
];
const NAV_BAR_HEIGHT = 40;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${NAV_BAR_HEIGHT}px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
`;

const Nav = styled.nav`
  width: ${(props) => props.theme.device.desktop};
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

const NavListItem = styled.li`
  color: ${(props) => props.theme.color.grey4};
  padding: 0 10px;
`;

const Badge = styled.span`
  font-size: 10px;
  line-height: 11px;
  color: ${(props) => props.theme.color.mint2};
  padding: 0 2px;
`;

const Seperator = styled.span`
  display: inline-block;
  width: 1px;
  height: 7px;
  background-color: ${(props) => props.theme.color.grey2};
`;

const NavBar = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItemCount, setCartItemCount] = useState(0);

  const NavListContent = NAV_ITEMS.map((item, index) => (
    <React.Fragment key={index}>
      <NavListItem>
        <Link to={item.path}>
          {item.text} {item.path === CART_PATH && <Badge>{cartItemCount}</Badge>}
        </Link>
      </NavListItem>
      {index !== NAV_ITEMS.length - 1 && <Seperator />}
    </React.Fragment>
  ));

  return (
    <Container>
      <Nav>
        <NavList>{NavListContent}</NavList>
      </Nav>
    </Container>
  );
};

export default NavBar;
