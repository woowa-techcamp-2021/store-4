import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';

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

type SeperatorProps = {
  isLastItem: boolean;
};
const Seperator = styled.span<SeperatorProps>`
  display: ${(props) => (props.isLastItem ? 'none' : '')};
  width: 1px;
  height: 7px;
  background-color: ${(props) => props.theme.color.grey2};
`;

type NavItem = {
  text: string;
  path: string;
  badge: number | null;
};

type Props = {
  navItems: NavItem[];
};

const NavBar = (props: Props): JSX.Element => {
  const { navItems } = props;

  const NavListContent = navItems.map((item, index) => (
    <React.Fragment key={item.path}>
      <NavListItem>
        <Link to={item.path}>
          {item.text} {item.badge !== null && <Badge>{item.badge}</Badge>}
        </Link>
      </NavListItem>
      <Seperator isLastItem={index === navItems.length - 1} />
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
