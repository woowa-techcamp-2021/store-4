import React from 'react';
import styled from 'styled-components';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import logo from './logo.png';
import SearchBar from './SearchBar/SearchBar';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 100px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const HeaderMain = (): JSX.Element => {
  return (
    <Wrapper>
      <CategoryMenu />
      <LogoContainer>
        <img src={logo} />
      </LogoContainer>
      <SearchBar />
    </Wrapper>
  );
};

export default HeaderMain;
