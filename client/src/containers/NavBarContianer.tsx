import React from 'react';
import { observer } from 'mobx-react';
import NavBar from '../components/Header/NavBar/NavBar';
import userStore from '../stores/userStore';

const NavBarContainer = (): JSX.Element => {
  const navItems = [
    {
      text: userStore.user ? '로그아웃' : '로그인',
      path: userStore.user ? '/logout' : '/login',
      badge: null,
    },
    { text: '마이페이지', path: '/account', badge: null },
    { text: '장바구니', path: '/cart', badge: 0 },
  ];

  return <NavBar navItems={navItems} />;
};

export default observer(NavBarContainer);
