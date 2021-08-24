import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from '../lib/router';
import AccountNavList from '../components/AccountNavList/AccountNavList';
import ManageDeliveryAddressContainer from '../containers/ManageDeliveryAddressContainer';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';

type PathItem = {
  path: string;
  text: string;
  Component: () => JSX.Element;
};
const PATH_ITEM_LIST: PathItem[] = [
  { path: 'delivery-address', text: '배송지 관리', Component: ManageDeliveryAddressContainer },
];

const Container = styled.section`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
  padding: 48px 0;
  display: flex;
`;

const RouteContainer = styled.div`
  flex: 1;
  display: flex;
`;

const AccountWelcome = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const NotUser = styled.div``;

const AccountPage = (): JSX.Element => {
  const Routes = PATH_ITEM_LIST.map(({ path, Component }, i) => (
    <Route key={i} path={`/account/${path}`} component={Component} />
  ));
  const pathTextList = PATH_ITEM_LIST.map(({ path, text }) => ({ path: `/account/${path}`, text }));

  return userStore.user ? (
    <Container>
      <AccountNavList pathTextList={pathTextList} />
      <RouteContainer>
        <Switch>
          <Route exact path={'/account'}>
            <AccountWelcome>환영합니다, {userStore.user.name} 님</AccountWelcome>
          </Route>
          {Routes}
        </Switch>
      </RouteContainer>
    </Container>
  ) : (
    <NotUser>로그인이 필요한 페이지입니다</NotUser>
  );
};

export default observer(AccountPage);
