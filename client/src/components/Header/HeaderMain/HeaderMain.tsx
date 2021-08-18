import React from 'react';
import styled from 'styled-components';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import LOGO from './logo.png';
import SearchBar from './SearchBar/SearchBar';

const LOGO_SIZE = 160;
const HEADER_HEIGHT = 100;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.theme.device.desktop};
  height: ${HEADER_HEIGHT}px;
  margin: 0 auto;
  padding: 0 50px;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${LOGO_SIZE}px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const HeaderMain = (): JSX.Element => {
  return (
    <Container>
      <CategoryMenu />
      <LogoContainer>
        <LogoImage src={LOGO} />
      </LogoContainer>
      <SearchBar />
    </Container>
  );
};

export default HeaderMain;
