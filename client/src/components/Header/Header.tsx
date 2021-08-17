import React from 'react';
import NavBar from './NavBar/NavBar';
import HeaderMain from './HeaderMain/HeaderMain';

const Header = (): JSX.Element => {
  return (
    <header>
      <NavBar />
      <HeaderMain />
    </header>
  );
};

export default Header;
