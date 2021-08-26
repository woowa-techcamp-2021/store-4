import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';

const PAGE_TITLE_TEXT = '마이페이지';

const Container = styled.nav`
  flex-shrink: 0;
  width: 200px;
  margin-right: 120px;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  padding: 0 0 16px 8px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
`;

const NavList = styled.ul`
  padding-left: 10px;
  margin-top: 16px;
`;

const NavListItem = styled.li`
  font-size: ${(props) => props.theme.fontSize.small};
  margin: 8px 0;
  padding: 8px 0;
`;

const NavListItemText = styled.span`
  :hover {
    position: relative;

    ::before {
      display: block;
      position: absolute;
      content: ' ';
      background: ${(props) => props.theme.color.mint2};
      width: calc(100% + 4px);
      height: 9px;
      opacity: 0.4;
      left: -2px;
      bottom: -1px;
    }
  }
`;

type Props = {
  pathTextList: { path: string; text: string }[];
};
const AccountNavList = (props: Props): JSX.Element => {
  const { pathTextList } = props;

  const NavListItems = pathTextList.map(({ path, text }, i) => (
    <NavListItem key={i}>
      <Link to={path}>
        <NavListItemText>{text}</NavListItemText>
      </Link>
    </NavListItem>
  ));

  return (
    <Container>
      <PageTitle>
        <Link to="/account">{PAGE_TITLE_TEXT}</Link>
      </PageTitle>
      <NavList>{NavListItems}</NavList>
    </Container>
  );
};

export default AccountNavList;
