import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';
import SearchBarContainer from '../../../containers/SearchBarContainer';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import LOGO from './logo.png';

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
        <Link to="/">
          <LogoImage src={LOGO} alt="로고" />
        </Link>
      </LogoContainer>
      <SearchBarContainer />
    </Container>
  );
};

export default HeaderMain;
