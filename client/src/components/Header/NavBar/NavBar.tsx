import React from 'react';
import styled, { css } from 'styled-components';

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

type NavListItemProps = {
  isLastItem: boolean;
};

const NavListItem = styled.li<NavListItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.grey4};
  padding: 0 10px;
  height: 7px;
  ${(props) =>
    !props.isLastItem &&
    css`
      border-right: 1px solid ${props.theme.color.grey2};
    `}
`;

type Props = {
  links: JSX.Element[];
};

const NavBar = (props: Props): JSX.Element => {
  const { links } = props;

  const NavListContent = links.map((link, i) => (
    <React.Fragment key={i}>
      <NavListItem isLastItem={i === links.length - 1}>{link}</NavListItem>
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
