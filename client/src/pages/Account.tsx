import React from 'react';
import styled from 'styled-components';
import { Route, Switch, useParams } from '../lib/router';
import AccountNavList from '../components/Account/AccountNavList/AccountNavList';
import AccountLanding from '../components/Account/AccountLanding/AccountLanding';
import ManageDeliveryAddressContainer from '../containers/ManageDeliveryAddressContainer';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import AccountReviewContainer from '../containers/AccountReviewContainer';
import apis from '../api';

type PathItem = {
  path: string;
  text: string;
  Component: () => JSX.Element;
};
const PATH_ITEM_LIST: PathItem[] = [
  { path: 'delivery-address', text: '배송지 관리', Component: ManageDeliveryAddressContainer },
  { path: 'reviews', text: '내 상품후기', Component: AccountReviewContainer },
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

const NotUser = styled.div``;

const AccountPage = (): JSX.Element => {
  const Routes = PATH_ITEM_LIST.map(({ path, Component }, i) => (
    <Route exact key={i} path={`/account/${path}`} component={Component} />
  ));
  const pathTextList = PATH_ITEM_LIST.map(({ path, text }) => ({ path: `/account/${path}`, text }));

  const { id } = useParams();

  return userStore.user ? (
    <Container>
      <div
        onClick={() => {
          const token = localStorage.getItem('token');
          apis.productAPI.fetchWishList(token, +id);
        }}
      >
        찜리스트 fetch api 테스트
      </div>
      <AccountNavList pathTextList={pathTextList} />
      <RouteContainer>
        <Switch>
          <Route exact path={'/account'}>
            <AccountLanding user={userStore.user} />
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
