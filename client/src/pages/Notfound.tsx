import React from 'react';
import styled from 'styled-components';
import { Link } from '../lib/router';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotfoundText = styled.h1``;

const ToMainText = styled.div`
  margin-top: 20px;
  padding: 18px 60px;
  border: 1px solid ${(props) => props.theme.color.grey5};
  color: ${(props) => props.theme.color.grey5};
`;

const NotfoundPage = (): JSX.Element => {
  return (
    <Container>
      <NotfoundText>페이지를 찾을 수 없습니다</NotfoundText>
      <Link to="/">
        <ToMainText>메인으로</ToMainText>
      </Link>
    </Container>
  );
};

export default NotfoundPage;
