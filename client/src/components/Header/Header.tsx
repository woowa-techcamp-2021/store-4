import React from 'react';
import NavBar from './NavBar';
import HeaderMain from './HeaderMain';

const Header = (): JSX.Element => {
  return (
    <header>
      <NavBar />
      <HeaderMain />
    </header>
  );
};

export default Header;
