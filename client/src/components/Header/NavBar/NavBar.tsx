import React from 'react';
import styled from 'styled-components';

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

type SeperatorProps = {
  isLastItem: boolean;
};
const Seperator = styled.span<SeperatorProps>`
  display: ${(props) => (props.isLastItem ? 'none' : '')};
  width: 1px;
  height: 7px;
  background-color: ${(props) => props.theme.color.grey2};
`;

type Props = {
  links: JSX.Element[];
};

const NavBar = (props: Props): JSX.Element => {
  const { links } = props;

  const NavListContent = links.map((link, i) => (
    <React.Fragment key={i}>
      <NavListItem>{link}</NavListItem>
      <Seperator isLastItem={i === links.length - 1} />
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
