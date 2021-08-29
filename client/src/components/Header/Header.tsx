import React from 'react';
import NavBarContainer from '../../containers/NavBarContianer';
import HeaderMain from './HeaderMain/HeaderMain';
import styled from 'styled-components';

const Container = styled.header``;

const Header = (): JSX.Element => {
  return (
    <Container>
      <NavBarContainer />
      <HeaderMain />
    </Container>
  );
};

export default Header;
