import React from 'react';
import { observer } from 'mobx-react';
import NavBar from '../components/Header/NavBar/NavBar';
import userStore from '../stores/userStore';
import User from '../models/user';
import { isNotNone } from '../utils/typeGuard';

const getUserNavItem = (user: User | null) =>
  isNotNone(user)
    ? { text: '로그아웃', path: '/logout', badge: null }
    : { text: '로그인', path: '/login', badge: null };

const NavBarContainer = (): JSX.Element => {
  const navItems = [
    getUserNavItem(userStore.user),
    { text: '마이페이지', path: '/account', badge: null },
    { text: '장바구니', path: '/cart', badge: 0 },
  ];

  return <NavBar navItems={navItems} />;
};

export default observer(NavBarContainer);
