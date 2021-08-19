import React from 'react';
import NavBar from './NavBar/NavBar';
import HeaderMain from './HeaderMain/HeaderMain';
import styled from 'styled-components';

const Container = styled.header``;

const Header = (): JSX.Element => {
  return (
    <Container>
      <NavBar />
      <HeaderMain />
    </Container>
  );
};

export default Header;
