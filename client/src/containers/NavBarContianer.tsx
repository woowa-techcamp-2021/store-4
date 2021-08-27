import React, { Fragment } from 'react';
import userStore from '../stores/userStore';
import cartStore from '../stores/cartStore';
import { observer } from 'mobx-react';
import NavBar from '../components/Header/NavBar/NavBar';
import Badge from '../components/Header/Badge/Badge';
import User from '../models/user';
import { isNotNone } from '../utils/typeGuard';
import { Link, ConditionLink } from '../lib/router';
import toast from '../lib/toast';

const getUserNavItem = (user: User | null) => {
  return isNotNone(user) ? <Link to="/logout">로그아웃</Link> : <Link to="/login">로그인</Link>;
};

const NavBarContainer = (): JSX.Element => {
  const cartItemCount = cartStore.cartItemList.length;
  const { user } = userStore;

  const handleAccountLinkClick = () => {
    if (isNotNone(user)) {
      return true;
    } else {
      return false;
    }
  };
  const handleFail = () => toast.info('로그인이 필요합니다');

  const navLinks = [
    getUserNavItem(user),
    <ConditionLink key={1} to="/account" onClick={handleAccountLinkClick} onFail={handleFail}>
      마이페이지
    </ConditionLink>,
    <Fragment key={2}>
      <Link to="/cart">장바구니</Link>
      <Badge>{cartItemCount}</Badge>
    </Fragment>,
  ];

  return <NavBar links={navLinks} />;
};

export default observer(NavBarContainer);
